from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from dotenv import load_dotenv, find_dotenv
from blueprints.secret.secret_bp import secret_blueprint
from db_operations.db_provider import db

app = Flask(__name__)
app.register_blueprint(secret_blueprint)
app.config["SQLALCHEMY_DATABASE_URI"
] = "postgresql://postgres:secret-test-pw@db.ocscrttarmteeesaekdy.supabase.co:5432/postgres"
load_dotenv(find_dotenv(".env"))
db.init_app(app)


if __name__ == '__main__':
    app.run(
        debug=False,
        port=8080
    )
