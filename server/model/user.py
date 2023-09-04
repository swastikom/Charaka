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
    itemList: List[Item]
    password_reset_otp: str

class ItemCreate(BaseModel):
    fever:str
    cough:str
    fatigue:str
    diff_breathing:str
    age:int
    gender:str
    blood_pressure:str
    col_level:str
    dis_freq:str
    outcome:str