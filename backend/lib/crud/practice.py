from sqlalchemy.orm import Session
from lib.models import Submission, SubmissionVerdict, Verdict


def get_submission_history(db: Session, user_id: int):
    result = submissions = (
        db.query(Submission)
        .filter(Submission.user_id == user_id)
        .order_by(Submission.time.desc())
        .all()
    )
    all_verdict = (
        db.query(SubmissionVerdict)
        .filter(SubmissionVerdict.submission_id.in_([i.id for i in result]))
        .all()
    )

    all_submissions = []

    for submission in submissions:
        submission_verdicts = [
            verdict for verdict in all_verdict if verdict.submission_id == submission.id
        ]

        time = []
        memory = []
        final_verdict = Verdict.Accepted

        for verdict in submission_verdicts:
            time.append(verdict.execution_time)
            memory.append(verdict.memory_used)

            if (
                final_verdict == Verdict.Accepted
                and verdict.verdict != Verdict.Accepted
            ):
                final_verdict = Verdict(verdict.verdict)

        final_memory = (
            sum(x for x in memory if x is not None) / len(memory) if memory else 0
        )
        final_time = sum(x for x in time if x is not None) / len(time) if time else 0

        all_submissions.append(
            {
                "submission_id": submission.id,
                "problem_id": submission.problem_id,
                "time": final_time,
                "memory": final_memory,
                "verdict": final_verdict,
            }
        )

    return all_submissions
