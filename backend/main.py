import logging

import aiohttp
from fastapi import FastAPI, Request
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import RedirectResponse, Response

from lib import database
from lib.constants import API_URL, GITHUB_CLIENT_ID, HOME_URL
from routers.auth import router as auth_router
from routers.match import router as match_router
from routers.practice import router as practice_router

database.Base.metadata.create_all(bind=database.engine)
logging.info("Connected to database")

origins = [HOME_URL]

app = FastAPI()
app.include_router(auth_router)
app.include_router(match_router)
app.include_router(practice_questions_router)
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.middleware("http")
async def auth_middleware(
        request: Request,
        call_next,
):
    ignored_routes = ["auth/callback", "login", "docs", "openapi.json"]
    if any([request.url.path.startswith(f"/{route}") for route in ignored_routes]):
        return await call_next(request)

    if request.method == "OPTIONS":
        return await call_next(request)

    authorization = request.headers.get("Authorization")

    if not authorization:
        return Response(
            status_code=401, content="Unauthorized, missing Authorization header."
        )

    async with aiohttp.ClientSession() as session:
        async with session.get(
                "https://api.github.com/user",
                headers={
                    "Authorization": authorization,
                },
        ) as resp:
            user_data = await resp.json()

            if "message" in user_data:
                return Response(status_code=400, content=user_data["message"])

            request.state.user = user_data
    return await call_next(request)


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
