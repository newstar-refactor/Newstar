from sqlalchemy.orm import Session

from models import Article
from services.learning.news_recommend import recomm
from database import get_db, engine
import pandas as pd

def get_like_list(db: Session):
    recommend_list =  recomm()
    return recommend_list


def get_news_all(db : Session):
    news_df = pd.read_sql("SELECT * FROM article", con = engine)
    return news_df
