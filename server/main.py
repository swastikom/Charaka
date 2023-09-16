# Main Imports

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from mongoengine import connect

# Routes Import

from routes.prediction import router as prediction_router
from routes.password_reset import router as password_reset_router


# Running FastAPI app

app = FastAPI()


origins = [
    "http://localhost:3000",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

MONGODB_URI = "mongodb+srv://Swastikom:e3qAoLweimTfsfDc@cluster0.z4dpept.mongodb.net/charaka_db"
connect(host=MONGODB_URI)

app.include_router(prediction_router)
app.include_router(password_reset_router)
