from pydantic import BaseModel

class JobApp(BaseModel):
    title: str
    company_name: str
    location: str
    status: str
    date: str
    user_email: str
    link: str