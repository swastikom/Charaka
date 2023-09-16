from pydantic import BaseModel, EmailStr


class OTPVerifyPayload(BaseModel):
    otp: str


class newPasswordSave(BaseModel):
    email: EmailStr
    newPassword: str
    confirmNewPassword: str
