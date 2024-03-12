from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from services.learning.news_recommend import recomm
from routers.recommend import recommend_schema

from database import get_db

router = APIRouter(
    prefix="/recommend",
)


@router.get("")
def recommend(db: Session = Depends(get_db)):
    return recomm()

# @router.post("")
# def recommend_add(db: Session = Depends(get_db)):
#     return 0