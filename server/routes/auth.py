
from fastapi import APIRouter, Depends, HTTPException
from fastapi.security import OAuth2PasswordRequestForm
from datetime import timedelta
from functions.auth import authenticate_user, create_access_token

router = APIRouter()


@router.post("/token", tags=['Token Generation Route (Authenticatiion)'])
def login(form_data: OAuth2PasswordRequestForm = Depends()):
    email = form_data.username
    password = form_data.password

    if authenticate_user(email, password):
        access_token = create_access_token(
            data={"sub": email}, expires_delta=timedelta(minutes=30))
        return {"access_token": access_token, "token_type": "bearer"}
    else:
        raise HTTPException(
            status_code=400, detail="Incorrect email or password!")
