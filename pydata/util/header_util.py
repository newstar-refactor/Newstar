from fastapi import Header, HTTPException, Depends
from sqlalchemy.orm import Session
from typing import Optional


def get_user_id_from_header(x_pw: Optional[str] = Header(None)) -> str:
    if x_pw is None:
        raise HTTPException(status_code=400, detail="x-pw header missing")
    return x_pw