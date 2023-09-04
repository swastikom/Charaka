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

# Get all Items


@router.get("/user/items", tags=[Tags.item_tag])
def get_all_items(token: str = Depends(oauth2_scheme)):
    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        email = payload.get("sub")
        user = User.objects.get(email=email)

        item_list = []

        for item in user.itemList:
            item_data = {
                "Id": item.Id,
                "Fever": item.Fever,
                "Cough": item.Cough,
                "Fatigue": item.Fatigue,
                "Difficulty_Breathing": item.Difficulty_Breathing,
                "Age": item.Age,
                'Gender': item.Gender,
                'Blood_Pressure': item.Blood_Pressure,
                'Cholesterol_Level': item.Cholesterol_Level,
                'Disease_freq': item.Disease_freq,
                'Outcome': item.outcome
            }
            item_list.append(item_data)

        return item_list

    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

# Get particular Item 
@router.get("/user/item/{itemID}", tags=[Tags.item_tag])
def get_item_by_id(itemID: str, token: str = Depends(oauth2_scheme)):
    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        email = payload.get("sub")
        user = User.objects.get(email=email)
        users = User.objects()

        for user in users:
            for item in user.itemList:
                if item.Id == itemID:
                    item_data = {
                        "fever": item.Fever,
                        "cough": item.Cough,
                        "fatigue": item.Fatigue,
                        "diff_breathing": item.Difficulty_Breathing,
                        "age": item.Age,
                        'gender': item.Gender,
                        'blood_pressure': item.Blood_Pressure,
                        'col_level': item.Cholesterol_Level,
                        'dis_freq': item.Disease_freq,
                        'outcome': item.outcome
                    }
                return item_data

        raise HTTPException(status_code=404, detail="Item not found.")

    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

#Delete a particular Item
@router.delete("/user/item/{itemID}", tags=[Tags.item_tag])
def delete_item_by_id(itemID: str, token: str = Depends(oauth2_scheme)):
    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        email = payload.get("sub")
        user = User.objects.get(email=email)

        for item in user.itemList:
            if item.Id == itemID:
                # Remove the item from the user's itemList
                user.itemList.remove(item)
                user.save()  # Save the user to update the itemList
                return {"message": "Item deleted successfully"}

        raise HTTPException(status_code=404, detail="Item not found")

    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


