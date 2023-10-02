from db_operations.db_provider import get_db
from models.Secret import Secret


class SecretRepository:

    def __init__(self):
        self.db = get_db()

    def save_secret(self, secret):
        self.db.session.add(secret)
        self.db.session.commit()

    def find_secret_by_hash(self, hash_id):
        secret = self.db.session.query(Secret).filter_by(hash_id=hash_id).first()
        return secret

    def find_secret_by_share_id(self, share_id):
        secret = self.db.session.query(Secret).filter_by(share_id=share_id).first()
        return secret
