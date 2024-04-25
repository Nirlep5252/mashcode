from sqlalchemy import desc
from sqlalchemy.orm import Session

from lib.models import User


def get_user(db: Session, user_id: int) -> User | None:
    return db.query(User).filter(User.id == user_id).first()


def create_user(db: Session, user_id: int) -> User:
    user = User(id=user_id)
    db.add(user)
    db.commit()
    db.refresh(user)
    return user


def get_top_users(db: Session, limit: int) -> list[User]:
    return db.query(User).order_by(desc(User.rating)).limit(limit).all()
