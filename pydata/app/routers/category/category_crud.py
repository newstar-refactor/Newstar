from fastapi import HTTPException
from sqlalchemy import func
from sqlalchemy.orm import Session

from app.models import Category
from app.database import engine
import pandas as pd

def get_user_category(db: Session, member_id):
    categories = db.query(Category.number).filter(Category.member_id == member_id).all()
    categories = [item[0] for item in categories]
    if len(categories) == 0:
        categories = [100,101,105]
    return categories

# def get_news_all(db : Session):
#     news_df = pd.read_sql("SELECT * FROM article", con = engine)
#     return news_df
#
# def get_recommend_info(db: Session, li):
#     recommended_ids = li
#     articles = db.query(Article).filter(Article.article_id.in_(recommended_ids)).all()
#     return articles
