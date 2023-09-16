from pydantic import EmailStr
from fastapi import HTTPException, APIRouter
from schemas.user import User
from functions.password_reset import generate_otp, send_email, get_saved_otp_from_database
from functions.auth import get_password_hash
from model.password_reset import newPasswordSave
import json
from enum import Enum
from pydantic import BaseModel

router = APIRouter()


class Tags(Enum):
    passwordReset = "Password Reset Routes"
    

class RequestData(BaseModel):
    email: EmailStr
    

class otpVerifyData(BaseModel):
    email: EmailStr
    otp: str


@router.post("/password_reset/request", tags=[Tags.passwordReset])
def request_password_reset(request_data: RequestData):
    email = request_data.email
    try:
        user = User.objects.get(email=email)
    except User.DoesNotExist:
        raise HTTPException(
            status_code=404, detail="User with specified email not found")

    otp = generate_otp()
    user.otp = otp  # Save the OTP in the user object
    user.save()  # Save the user object to update the OTP

    message = f"Your OTP for password reset is: {otp}"
    send_email(email, message)

    return user


# @router.post("/password_reset/verify", tags=[Tags.passwordReset])
# def verify_password_reset(payload: OTPVerifyPayload, email: EmailStr, password_payload: newPasswordSave):

#     otp = payload.otp

#     # Retrieve the saved OTP from your database or cache for verification
#     saved_otp = get_saved_otp_from_database(email)

#     if otp == saved_otp:
#         otp = "NULL"
#         user = User.objects.get(email=email)
#         user.otp = otp

#         new_password = password_payload.newPassword
#         confirm_password = password_payload.confirmNewPassword
#         if len(new_password) < 8:
#             raise HTTPException(
#                 status_code=400, detail="Password must be at least 8 characters long.")
#         if not any(char.isdigit() for char in new_password):
#             raise HTTPException(
#                 status_code=400, detail="Password must contain at least one digit.")
#         if not any(char.islower() for char in new_password):
#             raise HTTPException(
#                 status_code=400, detail="Password must contain at least one lowercase letter.")
#         if not any(char.isupper() for char in new_password):
#             raise HTTPException(
#                 status_code=400, detail="Password must contain at least one uppercase letter.")
#         else:
#             if new_password == confirm_password:
#                 user.password = get_password_hash(confirm_password)
#                 user.save()
#                 newly_saved_user = json.loads(user.to_json())
#                 return {"Updated User": newly_saved_user}

#             else:
#                 raise HTTPException(
#                     status_code=400, detail="Confirmed Password didn't match !")

#     else:
#         raise HTTPException(status_code=400, detail="Invalid OTP")


@router.post("/password_reset/verify", tags=[Tags.passwordReset])
def verify_otp(request_data: otpVerifyData):

    otp = request_data.otp

    # Retrieve the saved OTP from your database or cache for verification
    saved_otp = get_saved_otp_from_database(request_data.email)

    if otp == saved_otp:
        otp = "NULL"
        user = User.objects.get(email=request_data.email)
        user.otp = otp
        user.save()

        return {"Message": "OTP Verified"}

    else:
        raise HTTPException(status_code=400, detail="Invalid OTP")


@router.post("/password_reset", tags=[Tags.passwordReset])
def reset_password(password_payload: newPasswordSave):

    new_password = password_payload.newPassword
    confirm_password = password_payload.confirmNewPassword

    if len(new_password) < 8:
        raise HTTPException(
            status_code=400, detail="Password must be at least 8 characters long.")
    if not any(char.isdigit() for char in new_password):
        raise HTTPException(
            status_code=400, detail="Password must contain at least one digit.")
    if not any(char.islower() for char in new_password):
        raise HTTPException(
            status_code=400, detail="Password must contain at least one lowercase letter.")
    if not any(char.isupper() for char in new_password):
        raise HTTPException(
            status_code=400, detail="Password must contain at least one uppercase letter.")
    if new_password == confirm_password:
        user = User.objects.get(email=password_payload.email)
        user.password = get_password_hash(confirm_password)
        user.save()
        newly_saved_user = json.loads(user.to_json())
        return {"Updated User": newly_saved_user}
    else:
        raise HTTPException(
            status_code=400, detail="Confirmed Password didn't match !")
