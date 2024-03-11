from cgitb import text

from fastapi import FastAPI
from category_crawling import do_crawling
from database import get_db, engine
from sqlalchemy.orm import sessionmaker

Session = sessionmaker(bind=engine)
session = Session()

app = FastAPI()


@app.get("/")
async def root():
  return {"message": "Hello World"}


@app.get("/hello/{name}")
async def say_hello(name: str):
  return {"message": f"Hello {name}"}

@app.get("/crawling")
async def start_crawling():
  do_crawling()
  return {"message": "complete crawling"}

# Path: category_cra

@app.get("/member" )
def read_items():
  connection = next(get_db())
  try:
    print("1")
    # SQL 쿼리
    # result = session.query(Member).all()
    # result = connection.execute(text("SELECT * FROM member"))
    # member = result.first()
    # print(member)
  finally:
    # 데이터베이스 연결 종료
    connection.close()

