from fastapi import APIRouter, Depends, HTTPException
from jose import jwt, JWTError
from enum import Enum
from email_validator import validate_email, EmailNotValidError
from mongoengine import DoesNotExist
from model.user import NewUser, EmailUpdateRequest
from functions.auth import oauth2_scheme, SECRET_KEY, ALGORITHM, get_password_hash
from schemas.user import User
import json


router = APIRouter()


class Tags(Enum):
    users = "User Routes"

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
        email=new_user.email,
        password=hashed_password,
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



@router.get("/current_user", tags=[Tags.users])
def get_current_user(token: str = Depends(oauth2_scheme)):
    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        email = payload.get("sub")
        user = User.objects.get(email=email)
        user_data = json.loads(user.to_json())
        return {"current_user": user_data}
    except (JWTError, User.DoesNotExist):
        raise HTTPException(status_code=401, detail="Invalid or expired token")


@router.delete('/user/delete', tags=[Tags.users])
async def delete_user(token: str = Depends(oauth2_scheme)):
    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        email = payload.get("sub")
        user = User.objects.get(email=email)
        user.delete()
        return {'message': 'User deleted successfully'}
    except DoesNotExist:
        raise HTTPException(status_code=404, detail='User not found')



@router.put('/user/update/email', tags=[Tags.users])
async def update_email(email: EmailUpdateRequest, token: str = Depends(oauth2_scheme)):
    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        email = payload.get("sub")
        user = User.objects.get(email=email)
        user.email = email.email
        user.save()
        return {'message': 'Name Updated Successfully !'}
    except DoesNotExist:
        raise HTTPException(status_code=404, detail='User not found')
