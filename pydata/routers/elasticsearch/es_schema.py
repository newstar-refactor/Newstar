from pydantic import BaseModel

class LightArticle(BaseModel):
    articleId : int
    title : str
    content : str
    image_url : str

# class LastArticleId(BaseModel):
#     article_id : int