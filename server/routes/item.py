from fastapi import APIRouter, Depends, HTTPException
from jose import jwt
from mongoengine import DoesNotExist
from model.user import ItemCreate
from functions.auth import oauth2_scheme, SECRET_KEY, ALGORITHM
from schemas.user import User, Item
from enum import Enum
import uuid

router = APIRouter()


class Tags(Enum):
    item_tag = "Item routes"

# Create Item


@router.post("/user/addItem", tags=[Tags.item_tag])
def add_new_item(item_data: ItemCreate, token: str = Depends(oauth2_scheme)):
    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        email = payload.get("sub")
        user = User.objects.get(email=email)

        # Generate a UUID for the item Id
        item_id = str(uuid.uuid4())

        item = Item(
            Id=item_id,
            Fever=item_data.fever,
            Cough=item_data.cough,
            Fatigue=item_data.fatigue,
            Difficulty_Breathing=item_data.diff_breathing,
            Age=item_data.age,
            Gender=item_data.gender,
            Blood_Pressure=item_data.blood_pressure,
            Cholesterol_Level=item_data.col_level,
            Disease_freq=item_data.dis_freq,
            outcome=item_data.outcome
        )
        user.itemList.append(item)
        user.save()
        return {"Message": "Item added Successfully!"}
    except DoesNotExist:
        raise HTTPException(status_code=404, detail="User not found")



# # Get particular Item 
# @router.get("/user/item/{itemID}", tags=[Tags.item_tag])
# def get_item_by_id(itemID: str, token: str = Depends(oauth2_scheme)):
#     try:
#         payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
#         email = payload.get("sub")
#         user = User.objects.get(email=email)
#         users = User.objects()

#         for user in users:
#             for item in user.itemList:
#                 if item.itemID == itemID:
#                         item_data = {
#                         "fever": item.fever,
#                         "cough": item.cough,
#                         "fatigue": item.fatigue,
#                         "diff_breathing": item.diff_breathing,
#                         "age": item.age,
#                         'gender': item.gender,
#                         'blood_pressure': item.blood_pressure,
#                         'col_level': item.col_level,
#                         'dis_freq': item.dis_freq,
#                         'outcome': item.outcome
#                     }
#                 return item_data

#         raise HTTPException(status_code=404, detail="Item not found.")

#     except Exception as e:
#         raise HTTPException(status_code=500, detail=str(e))

