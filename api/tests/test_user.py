from fastapi.testclient import TestClient
from app.main import app

client = TestClient(app)

def test_post_user():
    payload = {
        "email" : "testemail@gmail.com",
        "total_apps" : 5,
        "rejected_apps" : 3,
        "pending_apps" : 2,
        "accepted_apps" : 0
    }

    response = client.post(
        "/user",
        json=payload
    )
    
    jsonResponse = response.json()
    jsonData = jsonResponse["data"][0]

    # Check for response errors
    assert response.status_code == 200

    # Check for any errors db side
    assert jsonResponse["error"] == "none"

    # Check for actual errors in the data returned
    assert jsonData["email"] == "testemail@gmail.com"
    assert jsonData["total_apps"] == 5
    assert jsonData["rejected_apps"] == 3
    assert jsonData["pending_apps"] == 2
    assert jsonData["accepted_apps"] == 0

def test_get_users():
    response = client.get(
        "/user"
    )

    # Get the general JSON response
    jsonResponse = response.json()

    # We get the last data in the response since thats the most recently posted job app
    jsonData = jsonResponse["data"][-1]

    # Check for response errors
    assert response.status_code == 200

    # Check for any errors db side
    assert jsonResponse["error"] == "none"

    # Check for actual errors in the data returned
    assert jsonData["email"] == "testemail@gmail.com"
    assert jsonData["total_apps"] == 5
    assert jsonData["rejected_apps"] == 3
    assert jsonData["pending_apps"] == 2
    assert jsonData["accepted_apps"] == 0

def test_put_user():
    # The put route requires an id, so we have to call get and grab the id first before testing put
    getResponse = client.get(
        "/user"
    )

    # Check for response errors
    assert getResponse.status_code == 200

    # Get the job id of the most recently created job application
    userId = getResponse.json()["data"][-1]["id"]

    # Prepare the payload
    payload = { 
        "email" : "changed@gmail.com",
        "total_apps" : 1000,
        "rejected_apps" : -1,
        "pending_apps" : -1,
        "accepted_apps" : -1
    }

    # With the job id, we can call a put request, we will change two fields
    putResponse = client.put(
        f"/user/{userId}",
        json=payload
    )

    # Get the general json data
    jsonResponse = putResponse.json()

    # Get the JSON data of the put response
    jsonData = jsonResponse["data"][0]

    # Check for response errors
    assert putResponse.status_code == 200

    # Check for any errors db side
    assert jsonResponse["error"] == "none"

    # Check for actual errors in the data returned
    assert jsonData["email"] == "changed@gmail.com"
    assert jsonData["total_apps"] == 1000
    assert jsonData["rejected_apps"] == 3
    assert jsonData["pending_apps"] == 2
    assert jsonData["accepted_apps"] == 0

def test_delete_user():
    # The delete route requires an id, so we have to call get on the API and grab the id first before testing 
    getResponse = client.get(
        "/user"
    )

    # Check for response errors
    assert getResponse.status_code == 200

    # Get the job id of the most recently created job application
    userId = getResponse.json()["data"][-1]["id"]

    # With the job id, we can call a delete request
    delResponse = client.delete(
        f"/user/{userId}"
    )

    # Get the general json data
    jsonResponse = delResponse.json()

    # Get the JSON data of the put response
    jsonData = jsonResponse["data"][0]

    # Check for response errors
    assert delResponse.status_code == 200

    # Check for any errors db side
    assert jsonResponse["error"] == "none"

    # Check for actual errors in the data returned
    assert jsonData["email"] == "changed@gmail.com"
    assert jsonData["total_apps"] == 1000
    assert jsonData["rejected_apps"] == 3
    assert jsonData["pending_apps"] == 2
    assert jsonData["accepted_apps"] == 0