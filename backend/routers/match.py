import aiohttp
from fastapi import APIRouter, Depends, Request, WebSocket
from sqlalchemy.orm import Session

from lib.crud.match import get_matches
from lib.crud.user import get_top_users, get_user, create_user
from lib.database import get_db
from lib.models import User

router = APIRouter(prefix="/match")


@router.get("/history")
async def match_history(request: Request, db: Session = Depends(get_db)):
    matches = get_matches(db, request.state.user["id"])
    return matches


@router.get("/leaderboard")
async def user_leaderboard(db: Session = Depends(get_db)):
    leaderboard = get_top_users(db, limit=10)
    return leaderboard


users_queued: dict[User, WebSocket] = {}
rating_threshold = 100


@router.websocket("/queue")
async def queue(websocket: WebSocket,
                db: Session = Depends(get_db),
                ):
    await websocket.accept()

    # First thing we need to authorize user before adding them to queue
    auth_data = await websocket.receive_json()
    if auth_data.get('type') != "auth":
        await websocket.send_json({
            "type": "error",
            "message": "Missing auth"
        })
        await websocket.close()
        return

    token = auth_data.get("token")
    if not token:
        await websocket.send_json({
            "type": "error",
            "message": "Missing token"
        })
        await websocket.close()
        return

    user_github_data = None
    async with aiohttp.ClientSession() as session:
        async with session.get("https://api.github.com/user", headers={
            "Authorization": f"Bearer {token}"
        }) as response:
            user_github_data = await response.json()
            if "message" in user_github_data:
                await websocket.send_json({
                    "type": "error",
                    "message": user_github_data["message"]
                })
                await websocket.close()
                return

    user_db_data = get_user(db, user_github_data["id"])
    if not user_db_data:
        user_db_data = create_user(db, user_github_data["id"])
    await websocket.send_json({
        "type": "comment",
        "message": f"Finding suitable players for {user_github_data['login']} with rating close to {user_db_data.rating}..."
    })

    users_waiting = list(users_queued.keys())
    users_waiting.sort(key=lambda x: abs(user_db_data.rating - x.rating))
    if users_waiting and abs(users_waiting[0].rating - user_db_data.rating) < rating_threshold:
        await websocket.send_json({
            "type": "found",
            "opponent": users_waiting[0].id,
            "message": f"Match Found! Opponent: {users_waiting[0].id} with rating {users_waiting[0].rating}!"
        })
        await users_queued[users_waiting[0]].send_json({
            "type": "found",
            "opponent": user_db_data.id,
            "message": f"Match Found! Opponent: {user_db_data.id} with rating {user_db_data.rating}!"
        })
        del users_queued[users_waiting[0]]
    else:
        users_queued[user_db_data] = websocket

    while True:
        data = await websocket.receive_text()
        await websocket.send_text(f"Message text was: {data}")
