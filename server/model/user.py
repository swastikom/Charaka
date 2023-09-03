from pydantic import BaseModel,EmailStr
from typing import List


class NewUser(BaseModel):
    name: str
    password: str
    email: EmailStr
    country: str

