# Main Imports

from fastapi import FastAPI
from mongoengine import connect
from routes.prediction import router as prediction_router

# Running FastAPI app

app = FastAPI()

connect(db='charaka', host='localhost', port=27017)

app.include_router(prediction_router)
