from fastapi import FastAPI, Request, APIRouter, HTTPException
from fastapi.testclient import TestClient
from sqlalchemy import MetaData
from sqlalchemy.orm import Session
from starlette.responses import JSONResponse

from app.category_crawling import do_crawling
from app.database import engine, SessionLocal
from app.models import init_db
from app.routers.elasticsearch import es_service, es_router
from app.routers.member.member_crud import get_user_by_pw
from app.routers.record import record_router
from app.routers.recommend import recommend_router
from app.routers.recommend.recommend_router import makemodel
from app.routers.search import search_router
from app.routers.verify_header import verify_header

app = FastAPI(docs_url='/api/data/docs', redoc_url='/api/data/redoc')
# 307 redirect 에러 해결
app.router.redirect_slashes = False
router = APIRouter(prefix="/api/data")

client = TestClient(app)

# 메타데이터를 생성한다.
metadata_obj = MetaData()

# 헤더 uuid추출
@app.middleware("http")
async def add_process(request: Request, call_next):
  # 요청 URL 경로를 문자열로 얻기
  request_path = str(request.url.path)

  # 특정 경로에 대해서만 처리
  if (request_path.startswith('/api/data/news')) or (request_path.startswith('/api/data/search')):
    with Session(engine) as db:
      # 요청 헤더로부터 user_id 추출
      pw = request.headers.get("X-User-Id")
      if pw is not None:
        try:
          member_id = await get_user_by_pw(db, pw)
          # 요청 객체의 state 속성을 사용하여 user_id 저장
          request.state.member_id = member_id
        except HTTPException as e:
          # get_user_by_pw 함수에서 HTTPException이 발생한 경우 처리
          return JSONResponse(status_code=e.status_code, content={"detail": e.detail})
      else:
        return JSONResponse(status_code=400, content={"detail": "X-User-Id 헤더가 필요합니다."})

  response = await call_next(request)
  return response


@app.on_event("startup")
async def startup():
  init_db()
  makemodel()

@router.get("/crawling", dependencies=[verify_header()])
def start_crawling():
  do_crawling().to_sql(name='article', con= engine, if_exists='append', index=False)
  makemodel()
  article_id = es_service.last_article_id()

  if article_id.loc[0]['article_id'] == 0:
    es_service.init_es()
  else:
    es_service.add_es(article_id.loc[0]['article_id'])

  es_service.update_last_article_id()
  return {"message": "complete crawling"}

app.include_router(router)
app.include_router(recommend_router.router)
app.include_router(record_router.router)
app.include_router(search_router.router)
app.include_router(es_router.router)
