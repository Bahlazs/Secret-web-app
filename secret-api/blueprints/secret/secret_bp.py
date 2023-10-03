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
    email_message = "Your secrets id: "
    email_service.send_email(email_message)
    secret_repository.save_secret(secret)
    accept_header = request.headers.get('Accept')
    response_message = {
        "message": "secret saved"
    }
    return response_creator.generate_response("response", accept_header, response_message)


@secret_blueprint.get('/<hash_id>')
def get_secret(hash_id):
    secret_repository = SecretRepository()
    secret = secret_repository.find_secret_by_hash(hash_id)
    secret.remaining_views -= 1
    secret_repository.save_secret(secret)
    accept_header = request.headers.get('Accept')
    secret_response = {
        "secret": secret.body
    }
    return response_creator.generate_response("secret", accept_header, secret_response)


@secret_blueprint.post('/share')
def share_secret():
    secret_repository = SecretRepository()
    shared_secret_data = request.get_json()
    secret = secret_repository.find_secret_by_hash(shared_secret_data.get("hashId"))
    email = shared_secret_data.get("email")
    share_id = shared_secret_data.get("shareId")

    secret.share_id = share_id
    secret_repository.save_secret(secret)
    name = shared_secret_data.get("name")
    subject = shared_secret_data.get("subject")
    email_message = f"A secret was shared with you by {name} on : http://localhost:5173/share-secret/"
    email_service = EmailService(email, share_id)
    email_service.send_email(email_message, subject=subject)
    accept_header = request.headers.get('Accept')
    response_message = {
        "message": "secret shared"
    }
    return response_creator.generate_response("response", accept_header, response_message)


@secret_blueprint.get("/share/<shared_id>")
def get_shared_secret(shared_id):
    secret_repository = SecretRepository()
    secret = secret_repository.find_secret_by_share_id(shared_id)
    secret.remaining_views -= 1
    secret_repository.save_secret(secret)
    accept_header = request.headers.get('Accept')
    secret_response = {
        "secret": secret.body
    }
    return response_creator.generate_response("secret", accept_header, secret_response)