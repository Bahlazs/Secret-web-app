from flask import Blueprint, request
from services import secret_service

secret_blueprint = Blueprint("secret", __name__, url_prefix="/secret/")


@secret_blueprint.post('/')
def add_new_secret():
    id = secret_service.generate_secret_id()
    return "hello"


@secret_blueprint.get('/<hashID>')
def get_secret(hashID):
    return "hello"
