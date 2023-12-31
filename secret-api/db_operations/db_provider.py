import os
from flask_sqlalchemy import SQLAlchemy
from sqlalchemy import create_engine, URL
import logging

logging.basicConfig()
logging.getLogger('sqlalchemy.engine').setLevel(logging.DEBUG)


url_object = URL.create(
    "postgresql",
    username=os.environ.get('PSQL_USER_NAME'),
    password=os.environ.get('PSQL_PASSWORD'),
    host=os.environ.get('PSQL_HOST'),
    database=os.environ.get('PSQL_DB_NAME'),
)

engine = create_engine(url_object, echo=True)

db = SQLAlchemy()


def get_db():
    return db
