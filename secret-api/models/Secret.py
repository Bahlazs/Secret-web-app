from db_operations.db_provider import db
from sqlalchemy import Column, String, DateTime


class Secret(db.Model):
    __tablename__ = "secret"

    hash = Column(String(255), primary_key=True)
    body = Column(String(700))
    creation_date = Column(DateTime)
    exp_date = Column(DateTime)
    email = Column(String(255))
    secret_url = Column(String(255), nullable=True)


