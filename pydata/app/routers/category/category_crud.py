from sqlalchemy import func
from sqlalchemy.orm import Session

from app.models import Category
from app.database import engine
import pandas as pd

def get_category_list(db: Session, member_id):
    category = db.query(Category).filter(Category.member_id(member_id))
    return category

# def get_news_all(db : Session):
#     news_df = pd.read_sql("SELECT * FROM article", con = engine)
#     return news_df
#
# def get_recommend_info(db: Session, li):
#     recommended_ids = li
#     articles = db.query(Article).filter(Article.article_id.in_(recommended_ids)).all()
#     return articles
