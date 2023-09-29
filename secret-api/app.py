from flask import Flask
from dotenv import load_dotenv, find_dotenv
from blueprints.secret.secret import secret_blueprint


app = Flask(__name__)
app.register_blueprint(secret_blueprint)
load_dotenv(find_dotenv(".env"))

if __name__ == '__main__':
    app.run(
        debug=True,
        port=8080
    )
