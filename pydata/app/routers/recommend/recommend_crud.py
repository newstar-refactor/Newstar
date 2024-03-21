from typing import List

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

def get_random_articles_by_categories(db: Session, user_categories: List[int]) -> List[int]:
    article_ids = []
    for category in user_categories:
        # 각 카테고리에 대해 article 테이블에서 랜덤으로 2개의 레코드를 선택
        random_articles = db.query(Article.article_id) \
            .filter(Article.Bcategory == category) \
            .order_by(func.random()) \
            .limit(2) \
            .all()
        # 선택된 레코드의 article_id를 article_ids 리스트에 추가
        article_ids.extend([article.article_id for article in random_articles])

    return article_ids