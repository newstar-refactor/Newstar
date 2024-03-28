from fastapi import HTTPException
from sqlalchemy.orm import Session
from app.models import Member

def get_user_by_pw(db: Session, pw: str):
    result = db.query(Member).with_entities(Member.member_id).filter(Member.pw == pw).first()
    if result is None:
        raise HTTPException(status_code=401, detail="해당 유저를 찾을 수 없습니다.")
    else:
        member_id = result.member_id
    return member_id
