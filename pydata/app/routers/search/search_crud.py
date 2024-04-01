import pandas as pd
from app.database import engine

def get_search_news(keyword: str):
    query = f"SELECT article_id, title, image_url FROM article WHERE content LIKE '%%{keyword}%%' LIMIT 10"
    articles = pd.read_sql(query, con=engine)
    return articles