import json
import os

from elasticsearch import Elasticsearch
from fastapi import APIRouter, Security
from fastapi.security import APIKeyHeader
from app.config import conf


ES = conf['ES']
router = APIRouter(
    prefix="/api/data/inites",
)

def verify_header(access_token = Security(APIKeyHeader(name='X-User-ID'))):
    return access_token

@router.get("", dependencies=[verify_header()])
def init_es():
    es = Elasticsearch(f"{ES['host']}")  # 환경에 맞게 바꿀 것
    es.info()

    # def make_index(es, index_name):
    #     if es.indices.exists(index=index_name):
    #         es.indices.delete(index=index_name)
    #     print(es.indices.create(index=index_name))

    with open('./app/routers/elasticsearch/mapping.json', 'r') as f:
        mapping = json.load(f)
        settings = mapping.get("settings", {})
    mappings = mapping.get("mappings", {})

    # index 생성 요청
    es.indices.create(index='article', body={"settings": settings, "mappings": mappings})

    #test data
    # doc1 = {'article_id': 0, 'title': 'test', 'content': '§', 'image_url': 'test'}
    doc1 = {'article_id': -1, 'title': 't☆e☆s☆t', 'content': 't☆h☆i☆s i☆s j☆u☆s☆t t☆e☆s☆t d☆a☆t☆a', 'image_url': 't☆e☆s☆t'}
    es.index(index='article', doc_type='_doc', body=doc1)

    return {"message": "init es"}
