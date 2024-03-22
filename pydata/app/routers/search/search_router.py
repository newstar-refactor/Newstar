import os
import json

from fastapi import APIRouter
from typing import List
from app.routers.search.search_schema import Articles, Keyword
from elasticsearch import Elasticsearch
from app.config import conf
from app.routers.verify_header import verify_header

ES = conf['ES']

router = APIRouter(
    prefix="/api/data/search",
)

@router.post("", response_model=List[Articles], dependencies=[verify_header()])
def search(keyword: Keyword):
    keyword = keyword.keyword
    print(keyword)
    res = []
    index_name = 'article'

    es = Elasticsearch(f"{ES['host']}")
    results = es.search(
        index=index_name,
        body={
            'from': 0,
            'size': 10,
            'query': {'match': {'content': keyword}},
            'collapse': {'field': 'title'}
        }
    )
    for result in results['hits']['hits']:
        article_id = result['_source']['article_id']
        title = result['_source']['title']
        image_url = result['_source']['image_url']
        article = Articles(article_id=article_id, title=title, image_url=image_url)
        res.append(article)
    return res
