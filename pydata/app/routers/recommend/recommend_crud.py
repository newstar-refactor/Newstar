from sqlalchemy import func
from sqlalchemy.orm import Session

from app.models import Article
from app.database import engine
import pandas as pd

def get_news_all(db : Session):
    news_df = pd.read_sql("SELECT * FROM article", con = engine)
    return news_df

def get_recommend_info(db: Session, li):
    recommended_ids = li
    articles = db.query(Article).filter(Article.article_id.in_(recommended_ids)).all()
    return articles

def get_article_count(db: Session):
    count = db.query(func.count(Article.article_id)).scalar()
    return count