from fastapi import APIRouter
from ...models.job_app import JobApp
from ...database import supabase

router = APIRouter()

# [Helper Functions]
def _convert_to_object(input_class):
    '''
    Converts a pydantic class into a dictionary. 
    '''
    final_obj = {}

    for row in input_class:
        if row[1]:
            final_obj[row[0]] = row[1]
        
    return final_obj

def _increment_total_apps(user_email: str):
    supabase.rpc("increment_total_apps", params={"useremail" : user_email}).execute()

def _decrement_total_apps(user_email: str):
    supabase.rpc("decrement_total_apps", params={"useremail" : user_email}).execute()

def _increment_status(user_email: str, status: str):
    supabase.rpc(f"increment_{status}_apps", params={"useremail" : user_email}).execute()

def _decrement_status(user_email: str, status: str):
    supabase.rpc(f"decrement_{status}_apps", params={"useremail" : user_email}).execute()

# [GET Routes]
@router.get("/jobapp")
def get_job_app():
    try:
        # Get data from supabase
        res = supabase.table("job_apps").select("*").execute()

        # Return Data
        return {"data" : res.data, "error" : "none"}
    # If an Exception has occured
    except Exception as err:
        return {"data" : [], "error" : err}

# [POST Routes]
@router.post("/jobapp")
def create_job_app(new_job_app: JobApp):
    try:
        # Convert new_job_app into an object first
        job_app_obj = _convert_to_object(new_job_app)

        # Create a new job app given the new_job_app passed through the request
        res = supabase.table("job_apps").insert(job_app_obj).execute()

        # Increment the counter of total apps & the corresponding status counter of the user associated with this job application
        _increment_total_apps(user_email = new_job_app.user_email)
        _increment_status(user_email = new_job_app.user_email, status = new_job_app.status)

        # Return response
        return {"data" : res.data, "error" : "none"}
    except Exception as err:
        return {"data" : [], "error" : err}

# [PUT Routes]
@router.put("/jobapp/{job_id}")
def update_job_app(job_id:int, update_job_app: JobApp):
    # update_job_app takes on the form as an array of tuples
    # Here is an example : 
    # ('title', 'API title')
    # ('company_name', '')
    # ('location', '')
    # ('status', '')
    # ('date', 'API title')
    # ('user_email', 'lloydpearce4@gmail.com')
    # ('link', 'API title')
    # Row represents one of these tuples
    try:
        # We convert the update_job_app into an object since .update() takes in an object
        new_update_obj = _convert_to_object(update_job_app)

        # Get the original job application before updating it, so we know what status to decrement if the status of the new update_obj has changed
        old_job_app = supabase.table("job_apps").select("*").eq("id", job_id).execute().data[0]
        
        # Check if the new obj has a different status
        if new_update_obj["status"] and new_update_obj["status"] != old_job_app["status"]:
            _decrement_status(user_email = old_job_app["user_email"], status = old_job_app["status"])
            _increment_status(user_email = old_job_app["user_email"], status = new_update_obj["status"]) 

        # Perform Update
        res = supabase.table("job_apps").update(new_update_obj).eq("id", job_id).execute()

        return {"data" : res.data, "error" : "none"} 
    except Exception as err:
        return {"data" : [], "error" : err}

# [DELETE Routes]
@router.delete("/jobapp/{job_id}")
def delete_job_app(job_id : int):
    try:
        deleted_job_app = supabase.table("job_apps").delete().eq("id", job_id).execute().data[0]

        # Decrement total apps & corresponding status
        _decrement_total_apps(user_email = deleted_job_app["user_email"])
        _decrement_status(user_email = deleted_job_app["user_email"], status = deleted_job_app["status"])

        return {"data" : deleted_job_app, "error" : "none"}
    # If an Exception has occured
    except Exception as err:
        return {"data" : [], "error" : err}