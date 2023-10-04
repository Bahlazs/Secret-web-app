from repositorties.SecretRepository import SecretRepository
from services.SecretService import SecretService
from services.EmailService import EmailService
from reponse_operations.response_mapper import chose_response_generator


class SecretController:

    def __init__(self):
        self.secret_repository = SecretRepository()
        self.secret_service = SecretService()
        self.email_service = EmailService()

    def create_secret_response(self, secret):
        if self.secret_service.secret_is_valid(secret):
            secret.remaining_views = self.secret_service.decrease_secret_remaining_views(secret.remaining_views)
            secret_text = secret.body
            self.secret_repository.save_secret(secret)
            secret_response = {
                "text": secret_text
            }
        else:
            secret_response = {
                "text": "secret has expired"
            }
        return secret_response

    def handle_new_secret(self, secret_data, accept_headers):
        response_generator = chose_response_generator(accept_headers)
        try:
            secret = self.secret_service.build_secret(secret_data)
            hash_id = secret.hash_id
            email = secret.email
            self.secret_repository.save_secret(secret)
            email_message = self.email_service.generate_secret_id_message(hash_id)
            self.email_service.send_email(email_message, email)
            response_message = {
                "message": "successful operation"
            }
            return response_generator.generate_response(response_message, 200)
        except Exception as error:
            error_message = {
                "error": str(error)
            }
            return response_generator.generate_response(error_message, 500)

    def handle_get_secret(self, hash_id, accept_headers):
        response_generator = chose_response_generator(accept_headers)
        try:
            secret = self.secret_repository.find_secret_by_hash(hash_id)
            secret_response = self.create_secret_response(secret)
            return response_generator.generate_response(secret_response, 200)
        except Exception as error:
            error_message = {
                "error": str(error)
            }
            return response_generator.generate_response(error_message, 404)

    def handle_share(self, shared_secret_data, accept_headers):
        response_generator = chose_response_generator(accept_headers)
        try:
            secret = self.secret_repository.find_secret_by_hash(shared_secret_data.get("hashId"))
            secret.share_id = shared_secret_data.get("shareId")
            self.secret_repository.save_secret(secret)
            email_message = self.email_service.generate_shared_secret_message(shared_secret_data.get("shareId"),
                                                                              shared_secret_data.get("name"))
            self.email_service.send_email(email_message,
                                          shared_secret_data.get("email"),
                                          subject=shared_secret_data.get("subject"))
            response_message = {
                "message": "Secret shared"
            }
            return response_generator.generate_response(response_message, 200)
        except Exception as error:
            error_message = {
                "error": str(error)
            }
            return response_generator.generate_response(error_message, 500)

    def handle_get_shared_secret(self, shared_id, accept_headers):
        response_generator = chose_response_generator(accept_headers)
        try:
            secret = self.secret_repository.find_secret_by_share_id(shared_id)
            shared_secret_response = self.create_secret_response(secret)
            return response_generator.generate_response(shared_secret_response, 200)
        except Exception as error:
            error_message = {
                "error": str(error)
            }
            return response_generator.generate_response(error_message, 404)


