from fastapi.testclient import TestClient
from app.main import app

client = TestClient(app)

def test_root_returns_message():
    response = client.get("/")
    # Test Status Code
    assert response.status_code == 200
    # Test we get a response message
    assert response.json() == {"message": "Welcome to the Job App API"}