from pydantic import BaseModel

class Recommend(BaseModel):
    articleId : int
    rank : int
