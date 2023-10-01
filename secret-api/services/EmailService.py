import dotenv
import smtplib
import ssl
from email.message import EmailMessage


class EmailService:

    def __init__(self, email_to, secret_id):
        self.sender_email = "it.bahzsi@gmail.com"
        self.email_to = email_to
        self.password = dotenv.dotenv_values(".env").get("EMAIL_PASSWORD")
        self.subject = "Secret Id"
        self.body = secret_id

    def create_email(self):
        email = EmailMessage()
        email['From'] = self.sender_email
        email['To'] = self.email_to
        email['Subject'] = self.subject
        email.set_content(self.body)
        return email

    def send_email(self):
        context = ssl.create_default_context()
        email = self.create_email()
        with smtplib.SMTP_SSL('smtp.gmail.com', 465, context=context) as smtp:
            smtp.login(self.sender_email, self.password)
            smtp.sendmail(self.sender_email, self.email_to, email.as_string())
