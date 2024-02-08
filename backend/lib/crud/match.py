from sqlalchemy.orm import Session

from lib.models import Match


def get_matches(db: Session, user_id: int, limit: int = 10, skip: int = 0):
    return (
        db.query(Match)
        .filter(Match.player1_id == user_id or Match.player2_id == user_id)
        .offset(skip)
        .limit(limit)
        .all()
    )
