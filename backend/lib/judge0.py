# languageid, problemid, sourcecode submitted to docker container

import asyncio

import aiohttp
import aiohttp


async def judge0(language_id, problem_id, source_code, url):
    async with aiohttp.ClientSession() as session:
        time_limit = 2
        memory_limit = 128000
        submission_data = {
            "language_id": language_id,
            "source_code": source_code,
            "stdin": "",
            "expected_output": "",
            "cpu_time_limit": time_limit,
            "memory_limit": memory_limit,
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
