import json
import os

from elasticsearch import Elasticsearch
from fastapi import APIRouter

BASE_DIR = os.path.dirname(os.path.abspath(__file__))
PARENT_DIR = os.path.dirname(os.path.dirname(BASE_DIR))
SECRET_FILE = os.path.join(PARENT_DIR, 'secrets.json')

with open(SECRET_FILE) as f:
    secrets = json.load(f)

ES = secrets['ES']
router = APIRouter(
    prefix="/inites",
)

@router.get("")
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
    doc1 = {'article_id': 0, 'title': 'test', 'content': '§', 'image_url': 'test'}
    es.index(index='article', doc_type='_doc', body=doc1)

    return {"message": "init es"}
