from sqlalchemy.orm import Session
from lib.models import Submission

def get_submission_history(db: Session, user_id: int):
    result = db.query(Submission).filter(Submission.user_id == user_id).order_by(Submission.time.desc()).all()
    print(result)
    return result
