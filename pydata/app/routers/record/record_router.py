from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.database import get_db

router = APIRouter(
    prefix="/api/data/record",
)


@router.get("")
def record(db: Session = Depends(get_db)):
    return