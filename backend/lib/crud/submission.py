from sqlalchemy.orm import Session
from lib.models import Submission, SubmissionVerdict, Verdict


async def create_verdict(
    db: Session,
    submission_id: int,
    testcase: int,
    memory: int,
    time: int,
    verdict: int,
    output: str,
):
    new_verdict = SubmissionVerdict(
        submission_id=submission_id,
        memory_used=memory,
        execution_time=time,
        test_case=testcase,
        verdict=Verdict(verdict),
        output=output,
    )
    db.add(new_verdict)
    db.commit()
    db.refresh(new_verdict)
    return new_verdict.id


async def create_submission(
    db: Session, source_code: str, problem_id: int, language_id: int, user_id: int
):
    new_submission = Submission(
        user_id=user_id,
        source_code=source_code,
        language_id=language_id,
        problem_id=problem_id,
    )
    db.add(new_submission)
    db.commit()
    db.refresh(new_submission)
    return new_submission.id


def get_submission(db: Session, submission_id: int) -> Submission | None:
    return db.query(Submission).filter(Submission.id == submission_id).first()


def get_verdicts(db: Session, submission_id: int) -> list[SubmissionVerdict]:
    return (
        db.query(SubmissionVerdict)
        .filter(SubmissionVerdict.submission_id == submission_id)
        .all()
    )


def get_user_submissions(db: Session, user_id: int) -> list[Submission]:
    return db.query(Submission).filter(Submission.user_id == user_id).all()


def get_problem_submissions(db: Session, problem_id: int) -> list[Submission]:
    return db.query(Submission).filter(Submission.problem_id == problem_id).all()
