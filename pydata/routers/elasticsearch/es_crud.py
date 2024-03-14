from sqlalchemy.orm import Session
from sqlalchemy import text

from routers.elasticsearch import es_schema

from database import get_db, engine
import pandas as pd

def get_last_article_id(db: Session):
    article_id = pd.read_sql("SELECT * FROM last_article_id", con = engine)
    return article_id

def get_article_all(db: Session):
    articles = pd.read_sql("SELECT article_id, title, content, image_url FROM article", con = engine)
    return articles

def get_max_article_id(db: Session):
    max = pd.read_sql("SELECT max(article_id) FROM article", con = engine)
    return max

def update_last_article_id(max_value: int, db: Session):
    pd.DataFrame({'article_id': [max_value]}).to_sql('last_article_id', con=engine, if_exists='replace', index=False)

# def update_last_article_id(max_value: int, db: Session):
#     # 데이터베이스에서 해당 열을 가져옵니다.
#     last_article_id = db.query(LastArticleId).first()
#
#     # 가져온 열을 업데이트합니다.
#     if last_article_id:
#         last_article_id.article_id = max_value
#     else:
#         # 행이 없을 경우 새로운 행을 생성합니다.
#         last_article_id = LastArticleId(article_id=max_value)
#         db.add(last_article_id)
#
#     # 변경사항을 커밋합니다.
#     db.commit()