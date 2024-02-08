from fastapi import APIRouter, Depends, Request
from sqlalchemy.orm import Session

from lib.crud.match import get_matches
from lib.database import get_db

router = APIRouter(prefix="/match")


@router.get("/history")
async def match_history(request: Request, db: Session = Depends(get_db)):
    matches = get_matches(db, request.state.user["id"])
    return matches
