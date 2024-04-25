import enum
from datetime import datetime

from sqlalchemy import Boolean, Column, DateTime, Enum, ForeignKey, Integer, String
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
    created_at = Column(DateTime, nullable=False, default=datetime.now())
    rating = Column(Integer, nullable=False, default=0)


class Match(Base):
    __tablename__ = "matches"

    id = Column(
        Integer, autoincrement=True, primary_key=True, index=True, nullable=False
    )
    created_at = Column(DateTime, nullable=False, default=datetime.now())
    winner: MatchWinner = Column(Enum(MatchWinner), nullable=True)
    status: MatchStatus = Column(
        Enum(MatchStatus), nullable=False, default=MatchStatus.PENDING
    )
    problem_id = Column(Integer, nullable=False)

    player1_id = Column(Integer, ForeignKey("users.id"))
    player2_id = Column(Integer, ForeignKey("users.id"))

    player1 = relationship("User", foreign_keys=[player1_id])
    player2 = relationship("User", foreign_keys=[player2_id])

    rating_delta = Column(Integer, nullable=True)


class Submission(Base):
    __tablename__ = "submission"

    id = Column(
        Integer, autoincrement=True, primary_key=True, index=True, nullable=False
    )
    source_code = Column(String, nullable=False)
    language_id = Column(Integer, nullable=False)
    problem_id = Column(Integer, nullable=False)
    time = Column(DateTime, nullable=False, default=datetime.now())

    user_id = Column(Integer, ForeignKey("users.id"))
    user = relationship("User", foreign_keys=[user_id])


class SubmissionVerdict(Base):
    __tablename__ = "submission_verdict"

    id = Column(
        Integer, autoincrement=True, primary_key=True, index=True, nullable=False
    )
    verdict = Column(Integer, nullable=False)
    test_case = Column(Integer, nullable=False)

    submission_id = Column(Integer, ForeignKey("submission.id"))
    submission = relationship("Submission", foreign_keys=[submission_id])

    execution_time = Column(Integer, nullable=False)
    memory_used = Column(Integer, nullable=False)

    output = Column(String, nullable=False)
    is_pretest = Column(Boolean, nullable=False, default=False)
