from fastapi import FastAPI, Request
from fastapi.responses import RedirectResponse, Response
from lib import database
from lib.constants import API_URL, GITHUB_CLIENT_ID
from routers.auth import router as auth_router

database.Base.metadata.create_all(bind=database.engine)


app = FastAPI(docs_url="/docs")
app.include_router(auth_router)


@app.middleware("http")
async def db_session_middleware(request: Request, call_next):
    response = Response("Internal Server Error", status_code=500)
    try:
        request.state.db = database.SessionLocal()
        response = await call_next(request)
    finally:
        request.state.db.close()
    return response


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
