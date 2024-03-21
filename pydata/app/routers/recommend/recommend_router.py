from fastapi import APIRouter, Depends, Request, HTTPException
from sqlalchemy.orm import Session
from typing import List

from app.routers.record.record_crud import get_like_list
from app.routers.recommend.recommend_crud import get_news_all, get_recommend_info, get_article_count
from app.routers.recommend.recommend_schema import ArticleSchema
from app.services.learning.news_doc2vec import make_model
from app.services.learning.news_recommend import recomm


from app.database import get_db

router = APIRouter(
    prefix="/api/data/news",
)

# 추천할 뉴스 뽑기
@router.get("", response_model=List[ArticleSchema])
async def recommend(request: Request, db: Session = Depends(get_db)):
    member_id = request.state.member_id

    if member_id != "":
        li = await get_like_list(db, member_id)
        # 좋아요 한 리스트가 없을때 처리
        # if len(li) == 0:

        # print("print li : " + str(li))
        # print("type li : "+str(type(li)))
    # member_id == "" 일때 처리 ( member_id 안넘어옴 )
    else:
        li = []

    maxsize = get_article_count(db)
    return get_recommend_info(db, recomm(li, maxsize))

# 모델 재생성
@router.post("/model")
def makemodel(db: Session = Depends(get_db)):
    make_model(get_news_all(db))
    return {"message" : "makemodel"}