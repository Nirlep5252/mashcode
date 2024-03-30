import aiohttp
from fastapi import APIRouter, Depends, Request, WebSocket, WebSocketDisconnect
from fastapi.responses import Response
from sqlalchemy.orm import Session

from lib.crud.match import create_match, get_active_match, get_match, get_matches
from lib.crud.user import create_user, get_top_users, get_user
from lib.database import get_db
from lib.models import MatchStatus, User

router = APIRouter(prefix="/match")


@router.get("/get_match/{match_id}")
async def get_match_from_id(
    request: Request, match_id: int, db: Session = Depends(get_db)
):
    match = get_match(db, match_id)
    if not match:
        return Response(status_code=404, content="Match not found")
    if (
        match.player1_id != request.state.user["id"]
        and match.player2_id != request.state.user["id"]
    ):
        return Response(status_code=401, content="Unauthorized")
    return match


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
async def queue(
    websocket: WebSocket,
    db: Session = Depends(get_db),
):
    await websocket.accept()

    # First thing we need to authorize user before adding them to queue
    auth_data = await websocket.receive_json()
    if auth_data.get("type") != "auth":
        await websocket.send_json({"type": "error", "message": "Missing auth"})
        await websocket.close()
        return

    token = auth_data.get("token")
    if not token:
        await websocket.send_json({"type": "error", "message": "Missing token"})
        await websocket.close()
        return

    user_github_data = None
    async with aiohttp.ClientSession() as session:
        async with session.get(
            "https://api.github.com/user", headers={"Authorization": f"Bearer {token}"}
        ) as response:
            user_github_data = await response.json()
            if "message" in user_github_data:
                await websocket.send_json(
                    {"type": "error", "message": user_github_data["message"]}
                )
                await websocket.close()
                return

    user_db_data = get_user(db, user_github_data["id"])
    if not user_db_data:
        user_db_data = create_user(db, user_github_data["id"])

    is_user_in_match = get_active_match(db, user_db_data.id)
    if is_user_in_match:
        await websocket.send_json(
            {
                "type": "error",
                "message": "You are already in a match. Please finish that first.",
            }
        )
        await websocket.close()
        return

    await websocket.send_json(
        {
            "type": "comment",
            "message": f"Finding suitable players for {user_github_data['login']} with rating close to {user_db_data.rating}...",
        }
    )

    users_waiting = list(users_queued.keys())
    users_waiting.sort(key=lambda x: abs(user_db_data.rating - x.rating))
    if (
        users_waiting
        and abs(users_waiting[0].rating - user_db_data.rating) < rating_threshold
    ):
        await websocket.send_json(
            {
                "type": "found",
                "opponent": users_waiting[0].id,
                "message": f"Match Found! Opponent: {users_waiting[0].id} with rating {users_waiting[0].rating}!",
            }
        )
        await users_queued[users_waiting[0]].send_json(
            {
                "type": "found",
                "opponent": user_db_data.id,
                "message": f"Match Found! Opponent: {user_db_data.id} with rating {user_db_data.rating}!",
            }
        )
        player1_ws = websocket
        player2_ws = users_queued[users_waiting[0]]
        match = create_match(db, users_waiting[0].id, user_db_data.id, 1)
        redirect_json = {
            "type": "redirect",
            "to": f"/match/{match.id}",
            "message": "Redirecting to match...",
        }
        await player1_ws.send_json(redirect_json)
        await player2_ws.send_json(redirect_json)
        del users_queued[users_waiting[0]]
        await player1_ws.close()
        await player2_ws.close()
        return
    else:
        users_queued[user_db_data] = websocket

    try:
        while True:
            data = await websocket.receive_text()
            await websocket.send_text(f"Message text was: {data}")
    except WebSocketDisconnect:
        if user_db_data in users_queued:
            del users_queued[user_db_data]


@router.websocket("/{match_id}")
async def match_ws(websocket: WebSocket, match_id: int, db: Session = Depends(get_db)):
    await websocket.accept()

    # First thing we need to authorize user before adding them to queue
    auth_data = await websocket.receive_json()
    if auth_data.get("type") != "auth":
        await websocket.send_json({"type": "error", "message": "Missing auth"})
        await websocket.close()
        return

    token = auth_data.get("token")
    if not token:
        await websocket.send_json({"type": "error", "message": "Missing token"})
        await websocket.close()
        return

    user_github_data = None
    async with aiohttp.ClientSession() as session:
        async with session.get(
            "https://api.github.com/user", headers={"Authorization": f"Bearer {token}"}
        ) as response:
            user_github_data = await response.json()
            if "message" in user_github_data:
                await websocket.send_json(
                    {"type": "error", "message": user_github_data["message"]}
                )
                await websocket.close()
                return

    match = get_match(db, match_id)
    if not match:
        await websocket.send_json({"type": "error", "message": "Match not found"})
        await websocket.close()
        return

    if match.status == MatchStatus.COMPLETED:
        await websocket.send_json(
            {"type": "error", "message": "Match already completed"}
        )
        await websocket.close()
        return

    if (
        match.player1_id != user_github_data["id"]
        and match.player2_id != user_github_data["id"]
    ):
        await websocket.send_json({"type": "error", "message": "Unauthorized"})
        await websocket.close()
        return

    while True:
        data = await websocket.receive_json()

        if "type" not in data:
            await websocket.send_json({"type": "error", "message": "Missing type"})
            continue
