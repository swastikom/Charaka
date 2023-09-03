from pydantic import BaseModel,EmailStr
from model.outcome import Item
from typing import List


class NewUser(BaseModel):
    name: str
    password: str
    confirm_password: str
    email: EmailStr
    country: str
    

class UserDeleteRequest(BaseModel):
    username: str


class EmailUpdateRequest(BaseModel):
    email: str


class NameUpdateRequest(BaseModel):
    name: str

class IdealUser(BaseModel):
    country: str
    name: str
    username: str
    password: str
    email: EmailStr
    propertyList: List[Item]
    password_reset_otp: str

