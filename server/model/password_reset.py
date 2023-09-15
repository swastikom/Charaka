from pydantic import BaseModel


class OTPVerifyPayload(BaseModel):
    otp: str


class newPasswordSave(BaseModel):
    newPassword: str
    confirmNewPassword: str
