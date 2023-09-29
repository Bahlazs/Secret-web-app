from utils.project_config import orm
from sqlalchemy import Column, String, Date, Boolean




class Secret(orm.Model):
    __tablename__ = "secret"
    id = Column(String(255), primary_key=True)
    body = Column(String(700))
    exp_date = Column(Date)
    email = Column(String(255))
    secret_url = Column(String(255), nullable=True)
    expired = Column(Boolean, default=False)

