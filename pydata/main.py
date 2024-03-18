from fastapi import FastAPI, Request
from sqlalchemy import Table, select, MetaData
from sqlalchemy.orm import Session
from sqlalchemy.ext.asyncio import AsyncSession

from category_crawling import do_crawling
from database import get_db, engine, SessionLocal
from models import init_db
from routers.elasticsearch import es_service
from routers.member.member_crud import get_user_by_pw
from routers.recode import recode_router
from routers.recommend import recommend_router
from routers.search import search_router
from routers.elasticsearch import es_router

app = FastAPI()
# 메타데이터를 생성한다.
metadata_obj = MetaData()

# 헤더 uuid추출
@app.middleware("http")
async def add_process(request: Request, call_next):
  with Session(engine) as db:
    # 요청 헤더로부터 user_id 추출
    pw = request.headers.get("X-User-ID")
    if(pw != None):
      member_id = await get_user_by_pw(db, pw)
      # 요청 객체의 state 속성을 사용하여 user_id 저장
      request.state.member_id = member_id
      # 요청을 다음 단계로 전달

    response = await call_next(request)
    return response

@app.on_event("startup")
async def startup():
  init_db()

@app.get("/crawling")
async def start_crawling():
  do_crawling().to_sql(name='article', con= engine, if_exists='append', index=False)
  article_id = es_service.last_article_id()

  if article_id.loc[0]['article_id'] == 0:
    es_service.init_es()
  else:
    es_service.add_es(article_id.loc[0]['article_id'])

  es_service.update_last_article_id()
  return {"message": "complete crawling"}


app.include_router(recommend_router.router)
app.include_router(recode_router.router)
app.include_router(search_router.router)
app.include_router(es_router.router)
