import os
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, EmailStr
from dotenv import load_dotenv

load_dotenv()

app = FastAPI(title="Skyline Website API")

# Configure CORS with specific origins
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "https://design-reference-website-dcvq1xgg.devinapps.com",
        "http://localhost:5173",
        "http://localhost:3000"
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class ContactForm(BaseModel):
    name: str
    email: EmailStr
    message: str

@app.post("/api/contact")
async def submit_contact(form: ContactForm):
    try:
        # Here we would typically send an email or store in a database
        # For now, we just validate and return success
        return {
            "status": "success",
            "message": "Contact form submitted successfully",
            "data": {
                "name": form.name,
                "email": form.email
            }
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.get("/health")
async def health_check():
    return {
        "status": "healthy",
        "version": "1.0.0",
        "environment": os.getenv("ENV", "production")
    }
