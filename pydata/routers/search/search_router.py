from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from typing import List
from routers.search.search_schema import Articles, Keyword
from elasticsearch import helpers, Elasticsearch

from database import get_db

router = APIRouter(
    prefix="/news",
)

@router.post("", response_model=List[Articles])
def search(keyword: Keyword):
    keyword = keyword.keyword
    print(keyword)
    res = []
    index_name = 'article'

    es = Elasticsearch("http://localhost:9200/")
    results = es.search(index=index_name, body={'from': 0, 'size': 10, 'query': {'match': {'content': keyword}}})
    for result in results['hits']['hits']:
        article_id = result['_source']['article_id']
        title = result['_source']['title']
        image_url = result['_source']['image_url']
        article = Articles(article_id=article_id, title=title, image_url=image_url)
        res.append(article)
    return res
