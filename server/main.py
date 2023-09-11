# Main Imports

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from mongoengine import connect

# Routes Import

from routes.prediction import router as prediction_router
from routes.user import router as user_router
from routes.user import router as user_router
from routes.auth import router as auth_router
from routes.password_reset import router as password_reset_router
from routes.item import router as item_router


# Running FastAPI app

app = FastAPI()


# Configure CORS (Cross-Origin Resource Sharing)
# Replace the list of allowed origins with your specific requirements
origins = [
    "http://localhost",  # Allow requests from your frontend's development server
    "https://yourfrontend.com",  # Replace with the actual domain of your frontend
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],  # You can specify specific HTTP methods if needed
    allow_headers=["*"],  # You can specify specific headers if needed
)


connect(db='charaka', host='localhost', port=27017)

app.include_router(prediction_router)
app.include_router(user_router)
app.include_router(auth_router)
app.include_router(password_reset_router)
app.include_router(item_router)

