from enum import Enum
from fastapi import APIRouter, FastAPI, HTTPException,Path
from pydantic import BaseModel, EmailStr
from mongoengine import connect
from schemas.user import User
from bson import ObjectId  # Import ObjectId from bson

router = APIRouter()


class Tags(Enum):
    user = "User Route"


class RequestData(BaseModel):
    email: EmailStr


@router.post("/fetch_itemlist", tags=[Tags.user])
def fetch_itemlist(request_data: RequestData):
    try:
        # Find the user with the specified email
        user = User.objects.get(email=request_data.email)

        # Extract and convert the itemList to a list of dictionaries
        item_list = [item.to_mongo().to_dict() for item in user.itemList]

        # Convert ObjectId to strings in the dictionaries
        for item in item_list:
            if "_id" in item:
                item["_id"] = str(item["_id"])

        return {"itemList": item_list}
    except User.DoesNotExist:
        raise HTTPException(status_code=404, detail="User not found")


@router.delete("/items/{item_id}")
async def delete_item(item_id: str = Path(..., title="Item ID")):
    try:
        # Find the user by ID
        user = User.objects(itemList__id=item_id).first()

        if user:
            # Remove the item by its ID
            user.itemList = [
                item for item in user.itemList if str(item._id) != item_id]
            user.save()
            return {"message": "Item deleted successfully"}

        raise HTTPException(status_code=404, detail="Item not found")

    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
