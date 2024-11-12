import json
from pprint import pprint

from fastapi import APIRouter, Depends, Request
from fastapi.exceptions import HTTPException
from pydantic import BaseModel
from sqlalchemy.orm import Session
from lib.database import get_db

from lib.judge0 import get_submission_verdict
from lib.crud.practice import get_submission_history, create_submission, create_verdict

router = APIRouter(prefix="/practice_questions")

@router.get("/question_list")
async def get_question_list():
    try:
        with open("db/problem_details.json") as f:
            problem_details = json.load(f)

        problem_id_and_title: list[dict[str, object]] = []
        for problem_id in problem_details:
            problem_id_and_title.append(
                {
                    "id": problem_id,
                    "title": problem_details[problem_id]["problem_title"],
                }
            )
        return problem_id_and_title
    except Exception as e:
        return {"error": str(e)}


@router.get("/get_question/{question_id}")
async def get_question(question_id: int):
    try:
        with open("db/problem_details.json") as f:
            problem_details = json.load(f)

        problem_details = problem_details[str(question_id)]
        return problem_details
    except Exception as e:
        return {"error": str(e)}


class Submission(BaseModel):
    language_id: int
    source_code: str
    run: bool


@router.post("/submission/{problem_id}")
async def get_verdict(request: Request, problem_id: int, submission: Submission, db: Session = Depends(get_db)):
    user_id = request.state.user["id"]

    if submission.source_code == "":
        return HTTPException(status_code=400, detail="Source code cannot be empty")
    verdicts = await get_submission_verdict(
        problem_id=problem_id,
        language_id=submission.language_id,
        source_code=submission.source_code,
        run=submission.run,
    )
    if not submission.run:
        submission_id = await create_submission(
            db=db,
            source_code=submission.source_code,
            problem_id=problem_id,
            language_id=submission.language_id,
            user_id=user_id
        )

        for key, value in verdicts.items():
            testcase = int(key.split()[1])
            memory = value.get("memory") or 0
            time = float(value.get("time") or "0")
            output = value.get("stdout") or ""

            status = value["status"]
            verdict = int(status["id"])

            await create_verdict(
                db=db,
                submission_id=submission_id,
                testcase=testcase,
                memory=memory,
                time=time,
                verdict=verdict,
                output=output
            )

    return verdicts


@router.get("/practice_history/{user_id}")
async def get_practice_history(user_id: int, db: Session = Depends(get_db)):
    if user_id == "":
        return HTTPException(status_code=400, detail="User id cannot be empty")
    submissions = get_submission_history(db=db, user_id=user_id)

    if (submissions == None):
        return {"error": "No submissions found for the user"}
    return submissions