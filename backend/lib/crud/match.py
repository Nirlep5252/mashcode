from sqlalchemy import or_
from sqlalchemy.orm import Session

from lib.models import Match, MatchStatus, MatchWinner


def get_match(db: Session, match_id: int) -> Match | None:
    return db.query(Match).filter(Match.id == match_id).first()


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


def get_active_match(db: Session, user_id: int) -> Match | None:
    return (
        db.query(Match)
        .filter(
            or_(Match.player1_id == user_id, Match.player2_id == user_id),
            Match.status == "PENDING",
        )
        .first()
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


def end_match(db: Session, winner: int, match_id: int, rating_delta: int) -> Match:
    match = db.query(Match).filter(Match.id == match_id).first()
    if not match:
        raise ValueError("Match not found")
    match.status = MatchStatus.COMPLETED
    match.winner = (
        MatchWinner.PLAYER1 if winner == match.player1_id else MatchWinner.PLAYER2
    )
    match.rating_delta = rating_delta
    db.commit()
    return match
