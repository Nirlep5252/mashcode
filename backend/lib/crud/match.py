from sqlalchemy import or_
from sqlalchemy.orm import Session

from lib.models import Match


def get_matches(
    db: Session, user_id: int, limit: int = 10, skip: int = 0
) -> list[Match]:
    return (
        db.query(Match)
        .order_by(Match.created_at.desc())
        .filter(or_(Match.player1_id == user_id, Match.player2_id == user_id))
        .offset(skip)
        .limit(limit)
        .all()
    )


def create_match(
    db: Session, player1_id: int, player2_id: int, problem_id: int
) -> Match:
    match = Match(
        problem_id=problem_id,
        player1_id=player1_id,
        player2_id=player2_id,
    )
    db.add(match)
    db.commit()
    db.refresh(match)
    return match
