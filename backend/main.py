from typing import Annotated

import aiohttp
from fastapi import FastAPI, Header
from fastapi.responses import RedirectResponse, Response

from utils.constants import API_URL, GITHUB_CLIENT_ID, GITHUB_CLIENT_SECRET

app = FastAPI(docs_url="/docs")


@app.get("/")
async def read_root():
    return {"Hello": "World"}


@app.get("/login")
async def login(redirect: str):
    login_url = "https://github.com/login/oauth/authorize"
    login_url += f"?client_id={GITHUB_CLIENT_ID}"
    login_url += f"&redirect_uri={API_URL}/auth/callback"
    login_url += f"&state={redirect}"

    return RedirectResponse(login_url)


@app.get("/auth/callback")
async def auth_callback(code: str, state: str):
    auth_url = "https://github.com/login/oauth/access_token"
    auth_url += f"?client_id={GITHUB_CLIENT_ID}"
    auth_url += f"&client_secret={GITHUB_CLIENT_SECRET}"
    auth_url += f"&code={code}"
    auth_url += f"&redirect_uri={API_URL}/auth/callback"

    async with aiohttp.ClientSession() as session:
        async with session.post(
            auth_url, headers={"Accept": "application/json"}
        ) as resp:
            data = await resp.json()

            if "access_token" in data:
                access_token = data["access_token"]
                return RedirectResponse(f"{state}?access_token={access_token}")
            else:
                return RedirectResponse(f"{state}?error=Unable to authenticate user.")


@app.get("/auth/user")
async def auth_user(authorization: Annotated[str, Header()]):
    async with aiohttp.ClientSession() as session:
        async with session.get(
            "https://api.github.com/user",
            headers={
                "Authorization": authorization,
            },
        ) as resp:
            data = await resp.json()

            if "message" in data:
                return Response(status_code=400, content=data["message"])

            # user_id = int(data["id"])
            # TODO: Check if user exists in database and create if not

            return data
