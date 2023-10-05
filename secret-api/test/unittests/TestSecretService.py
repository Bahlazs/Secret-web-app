import unittest
import uuid
from datetime import datetime, timedelta
from models.Secret import Secret
from services.SecretService import SecretService


class TestSecretService(unittest.TestCase):

    def setUp(self):
        self.secret_service = SecretService()

    def test_generate_secret_id(self):
        secret_id = self.secret_service.generate_secret_id()
        self.assertIsInstance(secret_id, uuid.UUID)

    def test_decrease_secret_remaining_views(self):
        remaining_views = 5
        new_remaining_views = self.secret_service.decrease_secret_remaining_views(remaining_views)
        self.assertEqual(new_remaining_views, 4)

    def test_calculate_expire_date(self):
        expire_date = self.secret_service.calculate_expire_date(30)
        current_time = datetime.now()
        expected_expire_date = current_time + timedelta(minutes=30)
        self.assertEqual(expire_date, expected_expire_date)

        expire_date = self.secret_service.calculate_expire_date(0)
        self.assertIsNone(expire_date)

    def test_is_secret_not_expired(self):
        current_time = datetime.now()
        expire_date = current_time + timedelta(minutes=30)
        self.assertTrue(self.secret_service.is_secret_not_expired(expire_date))

        expire_date = current_time - timedelta(minutes=30)
        self.assertFalse(self.secret_service.is_secret_not_expired(expire_date))

        self.assertTrue(self.secret_service.is_secret_not_expired(None))

    def test_has_secret_views(self):
        self.assertTrue(self.secret_service.has_secret_views(5))
        self.assertFalse(self.secret_service.has_secret_views(0))
        self.assertTrue(self.secret_service.has_secret_views(1))

    def test_secret_is_valid(self):
        valid_secret = Secret(hash_id=uuid.uuid4(), body="Test Secret", exp_date=self.secret_service.calculate_expire_date(30),
                              remaining_views=5, email="test@example.com")
        expired_secret = Secret(hash_id=uuid.uuid4(), body="Test Secret", exp_date=datetime(2021, 1, 1, 0, 0),
                                remaining_views=5, email="test@example.com")
        zero_views_secret = Secret(hash_id=uuid.uuid4(), body="Test Secret", exp_date=datetime(2023, 1, 1, 0, 0),
                                   remaining_views=0, email="test@example.com")

        self.assertTrue(self.secret_service.secret_is_valid(valid_secret))
        self.assertFalse(self.secret_service.secret_is_valid(expired_secret))
        self.assertFalse(self.secret_service.secret_is_valid(zero_views_secret))


if __name__ == '__main__':
    unittest.main()
