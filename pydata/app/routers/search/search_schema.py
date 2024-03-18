from pydantic import BaseModel

class Articles(BaseModel):
    article_id : int
    title : str
    image_url : str

class Keyword(BaseModel):
    keyword : str