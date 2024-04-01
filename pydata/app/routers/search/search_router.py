from typing import List

from elasticsearch import Elasticsearch
from fastapi import APIRouter, Depends, Request
from sqlalchemy.orm import Session

from app.database import get_db

from app.config import conf
from app.routers.search.search_schema import Articles, Keyword
from app.routers.verify_header import verify_header

from app.routers.search.search_crud import get_search_news

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
    max_article_id = es.search(
        index=index_name,
        body={
            'size': 1,
            'query': {'match_all': {}},  # 모든 문서를 검색
            'sort': [{'article_id': {'order': 'desc'}}]  # article_id를 내림차순으로 정렬
        }
    )
    cur = 0

    for m in max_article_id['hits']['hits']:
        cur = m['_source']['article_id']

    results = es.search(
        index=index_name,
        body={
            'from': 0,
            'size': 10,
            'query': {
                'bool': {
                    'must': [{'match': {'content': keyword}}],
                    'filter': [{'range': {'article_id': {'gte': cur/2}}}]
                }
            },
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

@router.post("/indb", response_model=List[Articles])
def search(keyword: Keyword, db: Session = Depends(get_db)):
    keyword = keyword.keyword
    print(keyword)
    res = []
    articles = get_search_news(keyword)
    for index, row in articles.iterrows():
        a = Articles(article_id=row['article_id'], title=row['title'], image_url=row['image_url'])
        res.append(a)
    return res