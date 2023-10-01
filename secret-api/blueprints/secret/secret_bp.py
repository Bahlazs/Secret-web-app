from flask import Blueprint, request
from services.EmailService import EmailService
from services.SecretService import SecretService
from repositorties.SecretRepository import SecretRepository
from utils import response_creator

secret_blueprint = Blueprint("secret", __name__, url_prefix="/secret")


@secret_blueprint.post('')
def add_new_secret():
    secret_service = SecretService()
    secret_repository = SecretRepository()
    secret_data = request.get_json()
    secret = secret_service.build_secret(secret_data)
    email = secret.email
    hash_id = secret.hash_id
    email_service = EmailService(email, hash_id)
    email_service.send_email()
    secret_repository.save_secret(secret)
    accept_header = request.headers.get('Accept')
    message = {
        "message": "secret saved"
    }
    return response_creator.generate_response("response", accept_header, message)


@secret_blueprint.get('/<hash_id>')
def get_secret(hash_id):
    secret_repository = SecretRepository()
    secret = secret_repository.find_secret_by_hash(hash_id)
    accept_header = request.headers.get('Accept')
    secret_response = {
        "secret": secret.body
    }
    return response_creator.generate_response("secret", accept_header, secret_response)
