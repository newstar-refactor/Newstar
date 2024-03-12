from sqlalchemy.orm import Session
from services.learning.news_recommend import recomm

def get_recommend_list(db: Session):
    li = []
    recommend_list =  recomm(li)
    return recommend_list

