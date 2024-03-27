from typing import List

from sqlalchemy.orm import Session

from app.database import engine
import pandas as pd

from app.models import Record


def get_like_list(db: Session, member_id):
    query = f"SELECT article_id FROM record WHERE member_id = {member_id} AND likes = 1"
    like_list_df = pd.read_sql(query, con = engine)
    # DataFrame에서 article_id 컬럼의 값을 리스트로 변환
    like_list = like_list_df['article_id'].tolist()
    return like_list

def get_user_view_list(db: Session, member_id) -> List[int]:
    article_ids = []
    records = db.query(Record.article_id).filter(Record.member_id == member_id).all()
    article_ids.extend(record.article_id for record in records)
    return article_ids

def get_news_all(db : Session):
    news_df = pd.read_sql("SELECT * FROM article", con = engine)
    return news_df
