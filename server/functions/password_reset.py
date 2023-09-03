
from schemas.user import User
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart
from dotenv import load_dotenv
import smtplib
import random
import os

load_dotenv()


SMTP_SERVER = os.getenv("SMTP_SERVER")
SMTP_PORT = int(os.getenv("SMTP_PORT"))
SENDER_EMAIL = os.getenv("SENDER_EMAIL")
SENDER_PASS_CODE = os.getenv("SENDER_PASS_CODE")


def generate_otp():
    return str(random.randint(1000, 9999))


def get_saved_otp_from_database(email: str):
    try:
        user = User.objects.get(email=email)
        return user.password_reset_otp
    except User.DoesNotExist:
        return None


def send_email(receiver_email: str, message: str):
    # Replace the placeholders with your email server details
    smtp_server = SMTP_SERVER
    smtp_port = SMTP_PORT
    sender_email = SENDER_EMAIL
    sender_password = SENDER_PASS_CODE

    # Create a multipart message
    msg = MIMEMultipart()
    msg["From"] = sender_email
    msg["To"] = receiver_email
    msg["Subject"] = "Password Reset OTP"

    # Add the message body
    msg.attach(MIMEText(message, "plain"))

    # Convert the message to a string
    text = msg.as_string()

    with smtplib.SMTP(smtp_server, smtp_port) as server:
        server.starttls()
        server.login(sender_email, sender_password)
        server.sendmail(sender_email, receiver_email, text)
