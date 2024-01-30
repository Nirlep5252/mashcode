import enum
from datetime import datetime

from sqlalchemy import Column, DateTime, Enum, ForeignKey, Integer
from sqlalchemy.orm import relationship

from lib.database import Base


class MatchWinner(enum.Enum):
    PLAYER1 = 1
    PLAYER2 = 2


class MatchStatus(enum.Enum):
    PENDING = 1
    COMPLETED = 2


class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True, nullable=False)
    created_at = Column(DateTime, nullable=False, default=datetime.utcnow)
    rating = Column(Integer, nullable=False, default=0)


class Match(Base):
    __tablename__ = "matches"

    id = Column(
        Integer, autoincrement=True, primary_key=True, index=True, nullable=False
    )
    created_at = Column(DateTime, nullable=False)
    winner: Column[MatchWinner] = Column(Enum(MatchWinner), nullable=True)
    status: Column[MatchStatus] = Column(
        Enum(MatchStatus), nullable=False, default=MatchStatus.PENDING
    )
    problem_id = Column(Integer, nullable=False)

    player1_id = Column(Integer, ForeignKey("users.id"))
    player2_id = Column(Integer, ForeignKey("users.id"))

    player1 = relationship("User", foreign_keys=[player1_id])
    player2 = relationship("User", foreign_keys=[player2_id])
