from flask import Blueprint, request

from controllers.SecretController import SecretController

secret_blueprint = Blueprint("secret", __name__, url_prefix="/secret")
secret_controller = SecretController()


@secret_blueprint.post('')
def add_new_secret():
    secret_data = request.get_json()
    accept_headers = request.headers.get("Accept")
    return secret_controller.handle_new_secret(secret_data, accept_headers)


@secret_blueprint.get('/<hash_id>')
def get_secret(hash_id):
    accept_headers = request.headers.get("Accept")
    return secret_controller.handle_get_secret(hash_id, accept_headers)


@secret_blueprint.post('/share')
def share_secret():
    shared_secret_data = request.get_json()
    accept_header = request.headers.get('Accept')
    return secret_controller.handle_share(shared_secret_data, accept_header)


@secret_blueprint.get("/share/<shared_id>")
def get_shared_secret(shared_id):
    accept_header = request.headers.get('Accept')
    return secret_controller.handle_get_shared_secret(shared_id, accept_header)