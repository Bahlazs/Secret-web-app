from project_config import orm
from sqlalchemy import create_engine, URL
import logging

logging.basicConfig()
logging.getLogger('sqlalchemy.engine').setLevel(logging.DEBUG)


url_object = URL.create(
    "postgresql",
    username="postgres",
    password="secret-test-pw",  # plain (unescaped) text
    host="db.ocscrttarmteeesaekdy.supabase.co",
    database="postgres",
)

engine = create_engine(url_object, echo=True)
orm.metadata.create_all(bind=engine)