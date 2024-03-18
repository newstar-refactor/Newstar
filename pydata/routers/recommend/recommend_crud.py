from sqlalchemy.orm import Session

from models import Article
from services.learning.news_recommend import recomm
from database import get_db, engine
import pandas as pd

def get_recommend_list(db: Session):
    li = []
    recommend_list =  recomm(li)
    return recommend_list

def get_news_all(db : Session):
    news_df = pd.read_sql("SELECT * FROM article", con = engine)
    return news_df

def get_recommend_info(db: Session, li):
    recommended_ids = li
    articles = db.query(Article).filter(Article.article_id.in_(recommended_ids)).all()
    return articles
