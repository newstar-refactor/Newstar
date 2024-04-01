from pydantic import BaseModel

class Articles(BaseModel):
    article_id : int
    title : str
    image_url : str

class ArticlesSec(BaseModel):
    article_id : str
    title : str
    image_url : str

class Keyword(BaseModel):
    keyword : str