from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from lib.database import get_db

from lib.crud.submission import (
    get_submission,
    get_verdicts,
    get_user_submissions,
    get_problem_submissions,
)

router = APIRouter(prefix="/submission")


@router.get("/{submission_id}")
async def get_submission_by_id(submission_id: int, db: Session = Depends(get_db)):
    """Get a specific submission by ID"""
    submission = get_submission(db, submission_id)
    if not submission:
        raise HTTPException(status_code=404, detail="Submission not found")
    return submission


@router.get("/{submission_id}/verdicts")
async def get_submission_verdicts(submission_id: int, db: Session = Depends(get_db)):
    """Get all verdicts for a specific submission"""
    submission = get_submission(db, submission_id)
    if not submission:
        raise HTTPException(status_code=404, detail="Submission not found")
    verdicts = get_verdicts(db, submission_id)
    return verdicts


@router.get("/user/{user_id}")
async def get_submissions_by_user(user_id: int, db: Session = Depends(get_db)):
    """Get all submissions by a specific user"""
    submissions = get_user_submissions(db, user_id)
    return submissions


@router.get("/problem/{problem_id}")
async def get_submissions_by_problem(problem_id: int, db: Session = Depends(get_db)):
    """Get all submissions for a specific problem"""
    submissions = get_problem_submissions(db, problem_id)
    return submissions
