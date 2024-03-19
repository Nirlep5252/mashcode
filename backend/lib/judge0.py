# languageid, problemid, sourcecode submitted to docker container

import asyncio
import json

import aiohttp

problem_details = open("./routers/problem_details.json")
problem_details_data = json.load(problem_details)

# print(int(float(problem_details_data["1"]["problem_time_limit"].strip("s").strip())))
# print(int(float(problem_details_data["1"]["problem_memory_limit"].strip("MB").strip())))


async def judge0(language_id, problem_id, source_code, url):
    async with aiohttp.ClientSession() as session:
        submission_data = {
            "language_id": language_id,
            "source_code": source_code,
            "stdin": "",
            "expected_output": "",
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
            return await response.json()


# testing the judge0 function

print(
    asyncio.run(
        judge0(
            71,
            1,
            "print('Hello World')",
            "http://localhost:2358/submissions",
        )
    )
)
