from django.contrib.auth.models import User
from rest_framework.test import APIRequestFactory, APITestCase, force_authenticate

from .api import RegistrationAPI, LoginAPI, UserAPI, UpdateUserAPI, DeactivateUserAPI


# Test Setup
factory = APIRequestFactory()


class UserTest(APITestCase):
    def setUp(self):
        self.user = User.objects.create_user(
            username="Test", password="123456", email="test@test.com")

    def test_register(self):
        """ Test Registration """
        view = RegistrationAPI.as_view()

        data = {
            "username": "Test2",
            "password": "123456",
            "email": "test2@test.com"
        }
        data2 = {
            "username": "Test",
            "password": "123456",
            "email": "test@test.com"
        }
        request = factory.post('/api/auth/register', data, format='json')
        request2 = factory.post('/api/auth/register', data2, format='json')
        response = view(request)
        response2 = view(request2)

        assert response.status_code == 201
        assert response2.status_code == 400
        assert "Test2" == response.data['user']['username']
        assert "123456" not in response.data['user'].values()
        assert "test2@test.com" == response.data['user']['email']
        assert response.data['token'] != None

    def test_login(self):
        """ Test Login """
        view = LoginAPI.as_view()

        data = {
            "username": "Test",
            "password": "123456",
        }
        request = factory.post('/api/auth/login', data, format='json')
        response = view(request)

        assert response.status_code == 200
        assert "Test" == response.data['user']['username']
        assert "123456" not in response.data['user'].values()
        assert "test@test.com" == response.data['user']['email']
        assert response.data['token'] != None

    def test_user_info(self):
        """ Test Login """
        view = UserAPI.as_view()

        request = factory.get('/api/auth/user')
        force_authenticate(request, user=self.user)
        response = view(request)

        assert response.status_code == 200
        assert "Test" == response.data['username']
        assert "123456" != response.data.values()
        assert "test@test.com" == response.data['email']

    def test_user_update(self):
        """  Test Update User """
        view = UpdateUserAPI.as_view()

        data = {
            "username": "Test",
            "email": "test@test2.com",
            "first_name": "Tester",
            "last_name": "TheAPI"
        }
        request = factory.patch('/api/auth/user/update', data, format='json')
        force_authenticate(request, user=self.user)
        response = view(request)

        assert response.status_code == 200
        assert response.data['message'] == "Account Updated"
        assert "Test" in response.data['user'].values()
        assert "Tester" == response.data['user']['first_name']
        assert "TheAPI" == response.data['user']['last_name']
        assert "test@test2.com" in response.data['user'].values()
        assert "123456" not in response.data['user'].values()

    def test_user_deactivate(self):
        """  Test Deactivate User """
        view = DeactivateUserAPI.as_view()

        request = factory.get('/api/auth/user/deactivate')
        force_authenticate(request, user=self.user)
        response = view(request)

        assert response.status_code == 200
        assert response.data['deleted'] == "Account Deactivated"
