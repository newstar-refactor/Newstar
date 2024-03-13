from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from typing import List

from routers.recommend.recommend_crud import get_news_all, get_recommend_info
from routers.recommend.recommend_schema import ArticleSchema
from services.learning.news_doc2vec import make_model
from services.learning.news_recommend import recomm


from database import get_db

router = APIRouter(
    prefix="/recommend",
)

# 추천할 뉴스 뽑기
@router.get("", response_model=List[ArticleSchema])
def recommend(db: Session = Depends(get_db)):

    return get_recommend_info(db, recomm())

# 모델 재생성
@router.get("/makemodel")
def makemodel(db: Session = Depends(get_db)):
    make_model(get_news_all(db))
    return {"message" : "makemodel"}