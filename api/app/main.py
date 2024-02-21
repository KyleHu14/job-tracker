# Fast API
from fastapi import FastAPI, APIRouter


# Routers
from .api.routes import job_app
from .api.routes import user

app = FastAPI()

# Include routers
app.include_router(job_app.router)
app.include_router(user.router)

# Get Method
@app.get("/")
def root():
    return {"message": "Welcome to the Job App API"}

