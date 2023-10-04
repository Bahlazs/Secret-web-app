import uuid
from db_operations import db_provider
from models.Secret import Secret
from datetime import datetime, timedelta
import pytz


class SecretService:

    def __init__(self):
        self.db = db_provider.get_db()

    def generate_secret_id(self):
        return uuid.uuid4()

    def build_secret(self, secret_data):
        hash_id = self.generate_secret_id()
        secret = Secret(hash_id=hash_id,
                        body=secret_data.get("secret"),
                        exp_date=self.calculate_expire_date(int(secret_data.get("expireAfter"))),
                        remaining_views=secret_data.get("expireAfterViews"),
                        email=secret_data.get("email"))
        return secret

    def decrease_secret_remaining_views(self, remaining_views):
        remaining_views -= 1
        return remaining_views

    def calculate_expire_date(self, minutes):
        if minutes == 0:
            return None
        else:
            current_time = datetime.now()
            expire_date = current_time + timedelta(minutes=minutes)
            return expire_date

    def is_secret_not_expired(self, expire_date):
        if expire_date is not None:
            if pytz.utc.localize(expire_date) < datetime.now(pytz.utc):
                return False
        else:
            return True

    def has_secret_views(self, remaining_views):
        if remaining_views == 0:
            return False
        else:
            return True

    def secret_is_valid(self, secret):
        if self.is_secret_not_expired(secret.exp_date) and self.has_secret_views(secret.remaining_views):
            return True
        else:
            return False
