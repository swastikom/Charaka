# Main Imports

from fastapi import FastAPI
from mongoengine import connect

# Running FastAPI app

app = FastAPI()

connect(db='charaka', host='localhost', port=27017)
