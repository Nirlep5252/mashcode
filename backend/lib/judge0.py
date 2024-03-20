# languageid, problemid, sourcecode submitted to docker container

import json
import time

import aiohttp

problem_details_data = json.load(open("routers/problem_details.json"))


async def get_token(
    language_id, problem_id, source_code, url, expected_output="Hello World"
):
    async with aiohttp.ClientSession() as session:
        submission_data = {
            "language_id": language_id,
            "source_code": source_code,
            "stdin": "",
            "expected_output": expected_output,
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
        async with session.post(url, json=submission_data) as response:
            request_json = await response.json()
            token = request_json["token"]
            return {"token": token}


async def get_submission_verdict(
    url,
    problem_id,
    lanuage_id=71,
    source_code="print('Hello World')",
    expected_output="Hello World",
):
    async with aiohttp.ClientSession() as session:
        token = await get_token(
            lanuage_id,
            problem_id,
            source_code,
            url,
            expected_output=expected_output,
        )
        token = token["token"]
        time.sleep(
            int(
                float(
                    problem_details_data[str(problem_id)]["problem_time_limit"].strip(
                        "s"
                    )
                )
            )
            + 5
        )
        async with session.get(url + token) as response:
            request_json = await response.json()
            return request_json["status"]["description"]


# verdict = asyncio.run(get_submission_verdict("http://localhost:2358/submissions/", 1))
# print(verdict)
