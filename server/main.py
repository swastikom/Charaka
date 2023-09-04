# Main Imports

from fastapi import FastAPI
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

connect(db='charaka', host='localhost', port=27017)

app.include_router(prediction_router)
app.include_router(user_router)
app.include_router(auth_router)
app.include_router(password_reset_router)
app.include_router(item_router)

