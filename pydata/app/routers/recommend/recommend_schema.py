from pydantic import BaseModel
from datetime import datetime

class Recommend(BaseModel):
    articleId : int
    rank : int

class ArticleSchema(BaseModel):
    article_id: int
    title: str
    url: str
    date: datetime
    Bcategory: int
    Scategory: int
    image_url: str
    content: str
