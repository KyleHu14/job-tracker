# Instructions for Starting the Project

1. Install all the requirements by running : pip install -r requirements.txt 

2. Start the venv by running the command : ./venv/Scripts/activate

3. Run the command "uvicorn app.main:app"


  

# Structure of Project

	.
	├── app                    # App : Root Folder
	│   ├── api                # API : Contains all files API related
	│   │   └── routes         # Routes : Contains all API routes that are registered in main.py
	│   │       ├── job_app.py
	│   │       └── user.py
	│   ├── models             # Models : Contains pydantic schemas used in routes
	│   │   ├── job_app.py
	│   │   └── user.py
	│   ├── __init__.py
	│   ├── database.py       # Establishes the connection to supabase
	│   ├── main.py
	│   └── tags.py
	└── tests                 # Tests : Contains tests for all routes of the API
	
# Documentation
## Job App Route
### GET /jobapp
#### Description
Returns a list of job applications. Each job application is represented by an object with the following string fields : "id", "title", "company_name", "location", "status", "date", "user_email", "link".

#### Example Response : 

    {
		"data": [
			{
				"id": 61,
				"title": "SWE Intern",
				"company_name": "Amazon",
				"location": "Redwood, CA",
				"status": "rejected",
				"date": "1/1/2021",
				"user_email": "email@gmail.com",
				"link": "jobapp.com"
			}
		],
		"error": "none"
    }

### POST /jobapp
#### Description
Inserts a job application into the database using the fields received in the body. A successful post request returns the newly created job application. A JSON body is required for this request.

#### Requirements
- A JSON body
- The JSON object must contain the following string fields : title, company_name, location, status, date, user_email, link
- The date field must be a valid date field conforming to the MM/DD/YYYY format

#### Example Body :
	{
		"title" : "Title",
		"company_name" : "Name",
		"location" : "Location",
		"status" : "Pending",
		"date" : "11/29/2023",
		"user_email" : "test@email.com",
		"link" : "test.com"
	}

#### Example Response : 
    {
		"data": [
			{
				"title" : "Put Title",
				"company_name" : "Put Name",
				"location" : "Put Location",
				"status" : "Pending",
				"date" : "11/29/2023",
				"user_email" : "test@email.com",
				"link" : "test.com"
			}
		],
		"error": "none"
    }

### PUT /jobapp/{job_id}
#### Description
Edits an existing job application given the job_id. The request takes the id given, finds the job application with the same id, and copies the body's fields to the corresponding job application in the database. A successful put request returns the newly created job application. A JSON body is required for this request.

#### Example Body :
	{
		"title" : "Edit Title",
		"company_name" : "",
		"location" : "",
		"status" : "",
		"date" : "",
		"user_email" : "",
		"link" : ""
	}

#### Example Response : 
    {
		"data": [
			{
				"title" : "Put Title",
				"company_name" : "Put Name",
				"location" : "Put Location",
				"status" : "Pending",
				"date" : "11/29/2023",
				"user_email" : "test@email.com",
				"link" : "test.com"
			}
		],
		"error": "none"
    }