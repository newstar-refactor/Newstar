from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.database import get_db

router = APIRouter(
    prefix="/api/data/recode",
)


@router.get("")
def recode(db: Session = Depends(get_db)):
    return