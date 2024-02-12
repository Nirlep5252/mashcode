import aiohttp
from fastapi import APIRouter, Request, Depends
from fastapi.responses import RedirectResponse, Response
from sqlalchemy.orm import Session

from lib.constants import API_URL, GITHUB_CLIENT_ID, GITHUB_CLIENT_SECRET
from lib.crud.user import get_user, create_user
from lib.database import get_db

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
        request: Request,
        db: Session = Depends(get_db),
):
    if not request.state.user:
        return Response(status_code=401, content="Unauthorized")

    user = get_user(db, request.state.user["id"])
    if not user:
        create_user(db, request.state.user["id"])

    return request.state.user
