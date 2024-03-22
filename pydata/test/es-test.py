from fastapi.testclient import TestClient

from app.main import app
from app.config import conf
client = TestClient(app)

PW = conf['TEST']

def test_search():
    key = {"keyword": "t☆e☆s☆t"}
    #member 테이블에 있는 pw 참고 해서 headers 변경하기 (application.yml -> TEST -> member_pw)
    response = client.post("/api/data/search", headers={"X-User-ID": f"{PW['member_pw']}"}, json=key)

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
