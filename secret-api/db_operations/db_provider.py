import dotenv
from flask_sqlalchemy import SQLAlchemy
from sqlalchemy import create_engine, URL
import logging

logging.basicConfig()
logging.getLogger('sqlalchemy.engine').setLevel(logging.DEBUG)

data = dotenv.dotenv_values(".env")
url_object = URL.create(
    "postgresql",
    username=data.get("PSQL_USER_NAME"),
    password=data.get("PSQL_PASSWORD"),
    host=data.get("PSQL_HOST"),
    database=data.get("PSQL_DB_NAME"),
)

engine = create_engine(url_object, echo=True)

db = SQLAlchemy()


def get_db():
    return db
