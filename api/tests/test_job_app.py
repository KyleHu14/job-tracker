from fastapi.testclient import TestClient
from app.main import app

client = TestClient(app)

def test_post_job_app():
    payload = { 
        "title" : "Test Job Title",
        "company_name" : "Test Company",
        "location" : "Test Location",
        "status" : "Pending",
        "date" : "11/29/2023",
        "user_email" : "test@email.com",
        "link" : "test.com"
    }

    response = client.post(
        "/jobapp",
        json=payload
    )
    
    jsonResponse = response.json()
    jsonData = jsonResponse["data"][0]

    # Check for response errors
    assert response.status_code == 200

    # Check for any errors db side
    assert jsonResponse["error"] == "none"

    # Check for actual errors in the data returned
    assert jsonData["title"] == "Test Job Title"
    assert jsonData["company_name"] == "Test Company"
    assert jsonData["location"] == "Test Location"
    assert jsonData["status"] == "Pending"
    assert jsonData["date"] == "11/29/2023"
    assert jsonData["user_email"] == "test@email.com"
    assert jsonData["link"] == "test.com"

def test_get_job_app():
    response = client.get(
        "/jobapp"
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
    assert jsonData["title"] == "Test Job Title"
    assert jsonData["company_name"] == "Test Company"
    assert jsonData["location"] == "Test Location"
    assert jsonData["status"] == "Pending"
    assert jsonData["date"] == "11/29/2023"
    assert jsonData["user_email"] == "test@email.com"
    assert jsonData["link"] == "test.com"

def test_put_job_app():
    # The put route requires an id, so we have to call get and grab the id first before testing put
    getResponse = client.get(
        "/jobapp"
    )

    # Check for response errors
    assert getResponse.status_code == 200

    # Get the job id of the most recently created job application
    jobId = getResponse.json()["data"][-1]["id"]

    # Prepare the payload
    payload = { 
        "title" : "Edit Test Job Title",
        "company_name" : "",
        "location" : "",
        "status" : "Rejected",
        "date" : "",
        "user_email" : "",
        "link" : ""
    }

    # With the job id, we can call a put request, we will change two fields
    putResponse = client.put(
        f"/jobapp/{jobId}",
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
    assert jsonData["title"] == "Edit Test Job Title"
    assert jsonData["company_name"] == "Test Company"
    assert jsonData["location"] == "Test Location"
    assert jsonData["status"] == "Rejected"
    assert jsonData["date"] == "11/29/2023"
    assert jsonData["user_email"] == "test@email.com"
    assert jsonData["link"] == "test.com"

def test_delete_job_app():
    # The delete route requires an id, so we have to call get on the API and grab the id first before testing 
    getResponse = client.get(
        "/jobapp"
    )

    # Check for response errors
    assert getResponse.status_code == 200

    # Get the job id of the most recently created job application
    jobId = getResponse.json()["data"][-1]["id"]

    # With the job id, we can call a delete request
    delResponse = client.delete(
        f"/jobapp/{jobId}"
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
    assert jsonData["title"] == "Edit Test Job Title"
    assert jsonData["company_name"] == "Test Company"
    assert jsonData["location"] == "Test Location"
    assert jsonData["status"] == "Rejected"
    assert jsonData["date"] == "11/29/2023"
    assert jsonData["user_email"] == "test@email.com"
    assert jsonData["link"] == "test.com"