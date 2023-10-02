import uuid
from models.Secret import Secret


class SecretService:

    def generate_secret_id(self):
        return uuid.uuid4()

    def build_secret(self, secret_data):
        hash_id = self.generate_secret_id()
        return Secret(hash_id=hash_id,
                      body=secret_data.get("secret"),
                      exp_date=secret_data.get("expDate"),
                      remaining_views=secret_data.get("views"),
                      email=secret_data.get("email"))

