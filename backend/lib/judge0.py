import json

import aiohttp

from lib.constants import JUDGE0_URL

assert JUDGE0_URL is not None, "Please set `JUDGE0_URL` in the `.env` file."


async def get_token(language_id: int, problem_id: int, source_code: str):
    problem_details_data = json.load(open("routers/problem_details.json"))
    async with aiohttp.ClientSession() as session:
        submission_data = {
            "language_id": language_id,
            "source_code": source_code,
            "stdin": problem_details_data[str(problem_id)]["sample_input"],
            "expected_output": problem_details_data[str(problem_id)]["sample_output"],
            "cpu_time_limit": int(
                float(
                    problem_details_data[str(problem_id)]["problem_time_limit"].strip(
                        "s"
                    )
                )
            ),
            "memory_limit": int(
                float(
                    problem_details_data[str(problem_id)]["problem_memory_limit"].strip(
                        "MB"
                    )
                )
                * 1000
            ),
            "max_file_size": 1024,
        }
        async with session.post(
            f"{JUDGE0_URL}/submissions?wait=true", json=submission_data
        ) as response:
            return await response.json()


async def get_submission_verdict(
    problem_id: int,
    source_code: str,
    language_id: int = 71,
):
    async with aiohttp.ClientSession() as session:
        token = (await get_token(language_id, problem_id, source_code))["token"]
        async with session.get(f"{JUDGE0_URL}/submissions/{token}") as response:
            return await response.json()
