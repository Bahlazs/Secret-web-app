from db_operations.db_provider import db
from sqlalchemy import Column, String, DateTime, Integer
from sqlalchemy.sql import func


class Secret(db.Model):
    __tablename__ = "secrets"

    hash_id = Column(String(255), primary_key=True)
    body = Column(String(700))
    created = Column(DateTime(timezone=True), server_default=func.now())
    exp_date = Column(DateTime(timezone=True))
    remaining_views = Column(Integer)
    email = Column(String(255))
    share_id = Column(String(255), nullable=True)


