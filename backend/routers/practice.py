import json

from fastapi import APIRouter
from fastapi.exceptions import HTTPException
from pydantic import BaseModel

from lib.judge0 import get_submission_verdict

router = APIRouter(prefix="/practice_questions")


@router.get("/question_list")
async def get_question_list():
    try:
        with open("routers/problem_details.json") as f:
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
        with open("routers/problem_details.json") as f:
            problem_details = json.load(f)

        problem_details = problem_details[str(question_id)]
        return problem_details
    except Exception as e:
        return {"error": str(e)}


class Submission(BaseModel):
    language_id: int
    source_code: str


@router.post("/submission/{problem_id}")
async def get_verdict(problem_id: int, submission: Submission):
    if submission.source_code == "":
        return HTTPException(status_code=400, detail="Source code cannot be empty")
    return await get_submission_verdict(
        problem_id=problem_id,
        lanuage_id=submission.language_id,
        source_code=submission.source_code,
    )
