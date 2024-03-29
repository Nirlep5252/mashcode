# languageid, problemid, sourcecode submitted to docker container

import json

import aiohttp

from lib.constants import JUDGE0_URL

assert JUDGE0_URL is not None, "Please set `JUDGE0_URL` in the `.env` file."


async def get_token(language_id, problem_id, source_code):
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
        async with session.post(f"{JUDGE0_URL}/submissions?wait=true", json=submission_data) as response:
            request_json = await response.json()
            print(request_json)
            token = request_json["token"]
            return {"token": token}


async def get_submission_verdict(
    problem_id,
    lanuage_id=71,
    source_code="print('Hello World')",
):
    async with aiohttp.ClientSession() as session:
        token = await get_token(lanuage_id, problem_id, source_code)
        token = token["token"]
        print(token)
        async with session.get(f"{JUDGE0_URL}/submissions/{token}") as response:
            request_json = await response.json()
            print(request_json)
            return request_json["status"]["description"]
