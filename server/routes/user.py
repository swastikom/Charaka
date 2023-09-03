from fastapi import APIRouter, Depends, HTTPException
from functions.auth import get_password_hash
from jose import jwt, JWTError
from enum import Enum
from email_validator import validate_email, EmailNotValidError
from mongoengine import DoesNotExist
from model.user import NewUser
from schemas.user import User
import json


router = APIRouter()

#Create User
@router.post("/signup", tags=['User'])
def signup(new_user: NewUser):
    password = new_user.password
    confirm_password = new_user.confirm_password
    

    if len(password) < 8:
        raise HTTPException(
            status_code=400, detail="Password must be at least 8 characters long.")
    if not any(char.isdigit() for char in password):
        raise HTTPException(
            status_code=400, detail="Password must contain at least one digit.")
    if not any(char.islower() for char in password):
        raise HTTPException(
            status_code=400, detail="Password must contain at least one lowercase letter.")
    if not any(char.isupper() for char in password):
        raise HTTPException(
            status_code=400, detail="Password must contain at least one uppercase letter.")

    
    if password!=confirm_password:
        raise HTTPException(
            status_code=400, detail="Password did not matched!")
    hashed_password = get_password_hash(password)
    
    user_signup = User(
        name=new_user.name,
        password=hashed_password,
        email=new_user.email,
        country=new_user.country
        )

    try:
        validate_email(new_user.email)  # Validate the email
        if User.objects.filter(email=new_user.email).first():
            raise HTTPException(
                status_code=409, detail="This email is already in use!")
        else:
            user_signup.email = new_user.email
    except EmailNotValidError:
        raise HTTPException(status_code=400, detail="Invalid email address!")

    user_signup.save()
    saved_user = json.loads(user_signup.to_json())
    return {"saved User": saved_user}

