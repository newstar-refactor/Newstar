from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from news_recomm import recomm
from recommend_schema import Recommend

from database import get_db

router = APIRouter(
    prefix="/recommend",
)


@router.get("")
def recommend(db: Session = Depends(get_db)):
    recommendList = recomm()
    recommendList2 = db.query(Recommend).order_by(Recommend.rank).all()
    return recommendList

@router.post("")
def recommend_add(db: Session = Depends(get_db)):
    return 0