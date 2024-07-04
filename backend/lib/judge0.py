import json

import aiohttp

from lib.constants import JUDGE0_URL

assert JUDGE0_URL is not None, "Please set `JUDGE0_URL` in the `.env` file."


async def get_token_run(language_id: int, problem_id: int, source_code: str):
    problem_details_data = json.load(open("db/problem_details.json"))
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


async def get_token_submit(
    language_id: int, problem_id: int, source_code: str, testcase: int
):
    print(f"Running testcase {testcase}...")
    inputpath = f"testcases/{problem_id}/testcase_input_{testcase}.txt"
    outputpath = f"testcases/{problem_id}/testcase_output_{testcase}.txt"
    if not (open(inputpath).read() and open(outputpath).read()):
        print(f"Testcase {testcase} not found.")
        return None
    input_data = open(inputpath).read()
    output_data = open(outputpath).read()
    # print("Input data: ", input_data)
    # print("Output data: ", output_data)
    async with aiohttp.ClientSession() as session:
        submission_data = {
            "language_id": language_id,
            "source_code": source_code,
            "stdin": input_data,
            "expected_output": output_data,
            "cpu_time_limit": 1,
            "memory_limit": 512000,
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
    run: bool = False,
):
    if run:
        async with aiohttp.ClientSession() as session:
            token = (await get_token_run(language_id, problem_id, source_code))["token"]
            async with session.get(f"{JUDGE0_URL}/submissions/{token}") as response:
                return await response.json()

    async with aiohttp.ClientSession() as session:
        verdicts = {}
        for testcase in range(1, 6):
            token = await get_token_submit(
                language_id, problem_id, source_code, testcase
            )
            # print("Token: ", token)
            token = token["token"]
            async with session.get(f"{JUDGE0_URL}/submissions/{token}") as response:
                data = await response.json()
                # verdict = data["status"]["description"]
                verdicts[f"Testcase {testcase}"] = data
        # print("Verdicts: ", verdicts)
        return verdicts
