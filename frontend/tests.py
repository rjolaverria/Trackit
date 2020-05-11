from rest_framework.test import APIRequestFactory, APITestCase, force_authenticate
from . import views

# Test Setup
factory = APIRequestFactory()

# Create your tests here.


class FrontEndTest(APITestCase):
    def test_index(self):
        request = factory.get('/')
        response = views.index(request)
        assert response.status_code == 200
        assert 'text/html' in response._content_type_for_repr
