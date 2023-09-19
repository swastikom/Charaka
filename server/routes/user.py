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
    

class DeleteItemRequest(BaseModel):
    email: EmailStr
    index: int


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


@router.delete("/delete_user/{email}")
async def delete_user_by_email(email: str):
    try:
        # Find the user by email
        user = User.objects(email=email).first()

        if not user:
            raise HTTPException(status_code=404, detail="User not found")

        # Delete the user
        user.delete()

        return {"message": f"User with email {email} deleted successfully"}
    except Exception as e:
        return {"error": str(e)}


@router.delete("/delete_item")
async def delete_item(request_data: DeleteItemRequest):
    try:
        # Find the user by email
        user = User.objects(email=request_data.email).first()
        if not user:
            raise HTTPException(status_code=404, detail="User not found")

        # Check if the index is within the range of the itemList
        if request_data.index < 0 or request_data.index >= len(user.itemList):
            raise HTTPException(status_code=400, detail="Invalid index")

        # Delete the item based on the index
        deleted_item = user.itemList.pop(request_data.index)

        # Save the updated user object
        user.save()

        return {"message": "Item deleted successfully", "deleted_item": deleted_item}

    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
