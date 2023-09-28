from flask import Blueprint, request

secret_blueprint = Blueprint("secret", __name__, url_prefix="secret/")

@secret_blueprint.post()
def add_new_secret():
    return "hello"


@secret_blueprint.get('/<hashID>')
def get_secret(hashID):
    return "hello"
