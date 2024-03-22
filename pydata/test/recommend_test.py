from fastapi.testclient import TestClient

from app.main import app
from app.config import conf
client = TestClient(app)

PW = conf['TEST']

def test_recommend_test():
    response = client.get("/api/data/news", headers={"X-User-ID": f"{PW['member_pw']}"})

    assert response.status_code == 200
    first_result = response.json()
    expected_result = []

    assert first_result == expected_result

