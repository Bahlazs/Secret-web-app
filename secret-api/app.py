from flask import Flask

app = Flask(__name__)


def print_hello_world():
    print("hello world")


if __name__ == '__main__':
    app.run(
        debug=True,
        port=8080
    )
