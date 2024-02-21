from pydantic import BaseModel

class User(BaseModel):
    email: str
    total_apps: int
    rejected_apps: int
    pending_apps: int
    accepted_apps: int