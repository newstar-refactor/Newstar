import pytest
from fastapi import Response, FastAPI
from fastapi.testclient import TestClient
from app.main import app

client = TestClient(app)

def test_search():
    key = {"keyword": "hello"}
    response = client.post("/api/data/search", headers={"X-User-ID": "feb91399-aaf3-40ef-856d-35e6ddf8befb"}, json=key)

    # 서버 응답이 비어있는 경우를 처리
    assert response.status_code == 200  # 응답 코드가 정상이 아니면 실패로 간주

    first_result = response.json()
    # result는 es에 있는 데이터에 따라 변경
    expected_result = [
        {
            "article_id": 3,
            "title": "hello world!",
            "image_url": "aaaa"
        },
        {
            "article_id": 4,
            "title": "hello world!!!",
            "image_url": "aaaa"
        }
    ]
    assert first_result == expected_result
