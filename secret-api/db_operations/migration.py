from db_provider import engine
from sqlalchemy import Table, Column, String, MetaData, DateTime, Integer
from sqlalchemy.sql import func


def create_tables():
    meta = MetaData()
    Table(
        'secrets',
        meta,
        Column('hash_id', String, primary_key=True),
        Column("body", String,  nullable=False),
        Column("exp_date", DateTime(timezone=False), nullable=True),
        Column("created", DateTime(timezone=False), server_default=func.now()),
        Column("remaining_views", Integer),
        Column('email', String),
        Column('share_id', String, nullable=True)
    )
    meta.create_all(bind=engine)


def drop_tables():
    meta = MetaData()
    Table("secrets", meta)
    meta.drop_all(bind=engine)


def migrate():
    drop_tables()
    create_tables()


if __name__ == '__main__':
    migrate()

