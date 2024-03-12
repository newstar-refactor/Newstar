from models import Recommend
from sqlalchemy.orm import Session
from news_recomm import recomm

def get_recommend_list(db: Session):
    li = []
    recommend_list =  recomm(li)
    return recommend_list

