import json

from fastapi import APIRouter

router = APIRouter(prefix="/practice_questions")


@router.get("/question_list")
async def get_question_list():
    try:
        with open("routers/problem_details.json") as f:
            problem_details = json.load(f)

        problem_id_and_title = []
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
        return problem_details[str(question_id)]
    except Exception as e:
        return {"error": str(e)}
