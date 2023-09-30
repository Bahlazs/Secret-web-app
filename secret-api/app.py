from flask import Flask
from dotenv import load_dotenv, find_dotenv
from blueprints.secret.secret import secret_blueprint


def create_app():
    flask_app = Flask(__name__)
    flask_app.register_blueprint(secret_blueprint)
    flask_app.config["SQLALCHEMY_DATABASE_URI"] = "psql -h db.ocscrttarmteeesaekdy.supabase.co -p 5432 -d postgres -U postgres"
    load_dotenv(find_dotenv(".env"))
    return flask_app


if __name__ == '__main__':
    app = create_app()
    app.run(
        debug=True,
        port=8080
    )
