import os
import smtplib
import ssl
from email.message import EmailMessage


class EmailService:

    def __init__(self):
        self.sender_email = os.environ.get("EMAIL_ADDRESS")
        self.password = os.environ.get("EMAIL_PASSWORD")


    def create_email(self, message, receiver_email, subject):
        email = EmailMessage()
        email['From'] = self.sender_email
        email['To'] = receiver_email
        email['Subject'] = subject
        email.set_content(message)
        return email

    def send_email(self, message, receiver_email, subject="Your Secret"):
        context = ssl.create_default_context()
        email = self.create_email(message, receiver_email, subject)
        with smtplib.SMTP_SSL('smtp.gmail.com', 465, context=context) as smtp:
            smtp.login(self.sender_email, self.password)
            smtp.sendmail(self.sender_email, receiver_email, email.as_string())

    def generate_secret_id_message(self, id_to_send):
        return f"Your secrets id: {id_to_send}"

    def generate_shared_secret_message(self, id_to_send, name):
        return f"""A secret was shared with you by {name} 
                on : https://your-secret-app.netlify.app//share-secret/{id_to_send}"""
