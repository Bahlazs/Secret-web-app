from flask_sqlalchemy import SQLAlchemy
from sqlalchemy import create_engine, URL
import logging

logging.basicConfig()
logging.getLogger('sqlalchemy.engine').setLevel(logging.DEBUG)


url_object = URL.create(
    "postgresql",
    username="postgres",
    password="secret-test-pw",
    host="db.ocscrttarmteeesaekdy.supabase.co",
    database="postgres",
)

engine = create_engine(url_object, echo=True)

db = SQLAlchemy()


def get_db():
    return db
