from sqlalchemy.orm import Session
from lib.models import Submission, SubmissionVerdict, Verdict

def get_submission_history(db: Session, user_id: int):
    result = submissions = db.query(Submission).filter(Submission.user_id == user_id).order_by(Submission.time.desc()).all()
    all_verdict = db.query(SubmissionVerdict).filter(SubmissionVerdict.submission_id.in_([i.id for i in result])).all()

    all_submissions = []

    for submission in submissions:
        submission_verdicts = [verdict for verdict in all_verdict if verdict.submission_id == submission.id]

        time = []
        memory = []
        final_verdict = "Accepted"

        for verdict in submission_verdicts:
            time.append(verdict.execution_time)
            memory.append(verdict.memory_used)

            if (final_verdict == "Accepted" and verdict.verdict != Verdict.Accepted):
                final_verdict = Verdict(verdict.verdict).name

        final_memory = sum(memory) / len(memory) if memory else 0
        final_time = sum(time) / len(time) if time else 0

        all_submissions.append({
            "problem_id": submission.problem_id,
            "time": final_time,
            "memory": final_memory,
            "verdict": final_verdict
        })

    return all_submissions


async def create_submission(db: Session, source_code: str, problem_id: int, language_id: int, user_id: int):
    new_submission = Submission(
                        user_id=user_id,
                        source_code=source_code,
                        language_id=language_id,
                        problem_id=problem_id
                    )
    db.add(new_submission)
    db.commit()
    db.refresh(new_submission)
    return new_submission.id

async def create_verdict(db: Session, submission_id: int, testcase: int, memory: int, time: int, verdict: int, output: str):
    new_verdict = SubmissionVerdict(
        submission_id=submission_id,
        memory_used=memory,
        execution_time=time,
        test_case=testcase,
        verdict=Verdict(verdict),
        output=output
    )
    db.add(new_verdict)
    db.commit()
    db.refresh(new_verdict)
    return new_verdict.id