from fastapi import APIRouter, Depends, Request, HTTPException
from sqlalchemy.orm import Session
from typing import List

from starlette.responses import JSONResponse

from app.routers.category.category_crud import get_user_category
from app.routers.record.record_crud import get_like_list, get_user_view_list
from app.routers.recommend.recommend_crud import get_news_all, get_recommend_info, get_article_count, \
    get_random_articles_by_categories
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
    # 시청 기록 불러오기
    views = get_user_view_list(db, member_id)
    # 좋아요 기록 불러오기
    li = await get_like_list(db, member_id)
    # 전체 기사의 수 가져오기
    maxsize = get_article_count(db)
    # 좋아요 한 데이터 없을 때 처리
    if len(li) == 0:
        user_category = get_user_category(db, member_id)
        li = get_random_articles_by_categories(db, user_category)
    # 추천 모델로부터 추천 aricle_list 받아오기
    recommend_list = recomm(li, maxsize, views)

    return get_recommend_info(db, recommend_list)

# 모델 재생성
@router.post("/model")
def makemodel(db: Session = Depends(get_db)):
    make_model(get_news_all(db))
    return {"message" : "makemodel"}