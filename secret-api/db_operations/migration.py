from db_provider import engine, db
from sqlalchemy import Table, Column, String, MetaData, DateTime
from sqlalchemy.sql import func


meta = MetaData()


def create_tables():
    Table(
        'secrets',
        meta,
        Column('hash', String, primary_key=True),
        Column("body", String,  nullable=False),
        Column("exp_date", DateTime),
        Column("created", DateTime, server_default=func.now()),
        Column('email', String),
        Column('secret_url', String, nullable=True)
    )
    meta.create_all(bind=engine)


def drop_tables():
    meta.drop_all(bind=engine)


def migrate():
    drop_tables()
    create_tables()


if __name__ == '__main__':
    migrate()

