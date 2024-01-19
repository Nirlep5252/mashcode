from typing import Annotated

import aiohttp
from fastapi import APIRouter, Depends, Header
from fastapi.responses import RedirectResponse, Response
from lib.constants import API_URL, GITHUB_CLIENT_ID, GITHUB_CLIENT_SECRET
from lib.crud.user import create_user, get_user
from lib.database import get_db
from sqlalchemy.orm import Session

router = APIRouter(prefix="/auth")


@router.get("/callback")
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


@router.get("/user")
async def auth_user(
    authorization: Annotated[str, Header()], db: Session = Depends(get_db)
):
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

            user_id = int(data["id"])

            user = get_user(db, user_id)
            if not user:
                create_user(db, user_id)

            return data
