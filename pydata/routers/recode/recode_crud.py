from sqlalchemy.orm import Session

from models import Article
from services.learning.news_recommend import recomm
from database import get_db, engine
import pandas as pd

async def get_like_list(db: Session, member_id):
    query = f"SELECT article_id FROM recode WHERE member_id = {member_id} AND likes = 1"
    like_list_df = pd.read_sql(query, con = engine)
    # DataFrame에서 article_id 컬럼의 값을 리스트로 변환
    like_list = like_list_df['article_id'].tolist()
    return like_list


def get_news_all(db : Session):
    news_df = pd.read_sql("SELECT * FROM article", con = engine)
    return news_df
