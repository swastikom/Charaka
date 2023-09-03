from fastapi import APIRouter, Depends, HTTPException
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

    # hashed_password = get_password_hash(password)
    user_signup = User(
        name=new_user.name,
        country=new_user.country,
        username=new_user.username,
        password=password,
        email=new_user.email
    )

    try:
        validate_email(new_user.email)  # Validate the email
        if User.objects.filter(email=new_user.email).first():
            raise HTTPException(
                status_code=409, detail="This email is already in use!")
        elif User.objects.filter(username=new_user.username).first():
            raise HTTPException(
                status_code=409, detail="This username is already in use!")
        else:
            user_signup.email = new_user.email
    except EmailNotValidError:
        raise HTTPException(status_code=400, detail="Invalid email address!")

    user_signup.save()
    saved_user = json.loads(user_signup.to_json())
    return {"saved User": saved_user}

