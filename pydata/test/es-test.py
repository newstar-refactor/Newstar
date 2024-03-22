import json
import os

from fastapi.testclient import TestClient

from app.main import app

client = TestClient(app)

BASE_DIR = os.path.dirname(os.path.abspath(__file__))
PARENT_DIR = os.path.dirname(os.path.dirname(BASE_DIR))
SECRET_FILE = os.path.join(PARENT_DIR, './pydata/app/secrets.json')

with open(SECRET_FILE) as f:
    secrets = json.load(f)

PW = secrets['MEMBER_PW']

def test_search():
    key = {"keyword": "t☆e☆s☆t"}
    #member 테이블에 있는 pw 참고 해서 headers 변경하기 (secrets.json)
    response = client.post("/api/data/search", headers={"X-User-ID": f"{PW['pw']}"}, json=key)

    # 서버 응답이 비어있는 경우를 처리
    assert response.status_code == 200  # 응답 코드가 정상이 아니면 실패로 간주

    first_result = response.json()
    
    expected_result = [
        {
            "article_id": -1,
            "title": "t☆e☆s☆t",
            "image_url": "t☆e☆s☆t"
        }
    ]
    assert first_result == expected_result
