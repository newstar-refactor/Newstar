from fastapi import APIRouter, Depends, Request, HTTPException
from sqlalchemy.orm import Session
from typing import List

from app.routers.recode.recode_crud import get_like_list
from app.routers.recommend.recommend_crud import get_news_all, get_recommend_info
from app.routers.recommend.recommend_schema import ArticleSchema
from app.services.learning.news_doc2vec import make_model
from app.services.learning.news_recommend import recomm


from app.database import get_db

router = APIRouter(
    prefix="/recommend",
)

# 추천할 뉴스 뽑기
@router.get("", response_model=List[ArticleSchema])
async def recommend(request: Request, db: Session = Depends(get_db)):
    member_id = request.state.member_id

    if member_id is None:
        raise HTTPException(status_code=400, detail="member_id is missing in the header")
    elif member_id != "":
        li = await get_like_list(db, member_id)
    else:
        li = ""

    return get_recommend_info(db, recomm(li))

# 모델 재생성
@router.post("/models")
def makemodel(db: Session = Depends(get_db)):
    make_model(get_news_all(db))
    return {"message" : "makemodel"}