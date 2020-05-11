from django.utils import timezone
from rest_framework.test import APIRequestFactory, APITestCase, force_authenticate

from .models import Trip
from .api import TripList, GetTripInfo, AddTrip, DeleteTrip, GetResultsCSV, GetAllCSV
from .serializers import TripSerializer
from django.contrib.auth.models import User
from .googleapi import gmaps


# Test Setup
factory = APIRequestFactory()

# Create your tests here.


class TripTest(APITestCase):

    def setUp(self):
        self.user = User.objects.create(username='Test', password='123456')
        self.user2 = User.objects.create(username='Test2', password='123456')
        self.trip1 = Trip.objects.create(origin='Boston', destination='New York', distance_traveled=float(
            218), date_traveled=timezone.now(), date_added=timezone.now(), user=self.user)
        self.trip2 = Trip.objects.create(origin='Boston', destination='Rhode Island',
                                         distance_traveled=float(71), date_traveled=timezone.now(), date_added=timezone.now(), user=self.user)
        self.trip3 = Trip.objects.create(origin='Boston', destination='Rhode Island',
                                         distance_traveled=float(71), date_traveled=timezone.now(), date_added=timezone.now(), user=self.user2)

    def test_list(self):
        """ Test get trips list """
        view = TripList.as_view()
        trips = Trip.objects.all().order_by('-date_traveled')
        serializer = TripSerializer(trips, many=True)

        request = factory.get('/api/trips')
        unauthorized_request = factory.get('/api/trips')
        force_authenticate(request, user=self.user)
        response = view(request)
        response2 = view(unauthorized_request)

        assert response.status_code == 200
        assert response2.status_code == 401
        assert response.data != serializer.data

    def test_add(self):
        """ Test add trip """
        view = AddTrip.as_view()

        data = {"origin": 'Boston', "destination": 'New York', "distance_traveled": float(
            218), "date_traveled": timezone.now(), "date_added": timezone.now(), "user": self.user.id}
        request = factory.post('/api/trips/add', data, format='json')
        request2 = factory.post('/api/trips/add', data, format='json')
        force_authenticate(request, user=self.user)
        response = view(request)
        response2 = view(request2)

        assert response.status_code == 200
        assert response2.status_code == 401
        assert "Boston" in response.data.values()
        assert "New York" in response.data.values()
        assert 218 in response.data.values()

    def test_delete(self):
        """ Test delete trip """
        view = DeleteTrip.as_view()

        request = factory.delete('/api/trips')
        request2 = factory.delete('/api/trips')
        force_authenticate(request, user=self.user)
        response = view(request, pk=self.trip1.id)
        response2 = view(request2, pk=self.trip2.id)

        assert response.status_code == 204
        assert response2.status_code == 401

    def test_get_info(self):
        """ Test Google API """
        view = GetTripInfo.as_view()

        data = {"origin": 'Boston', "destination": 'New York'}
        request = factory.post('/api/trips/get_info', data, format='json')
        request2 = factory.post('/api/trips/get_info', data, format='json')
        force_authenticate(request, user=self.user)
        response = view(request)
        response2 = view(request2)

        assert response.status_code == 200
        assert response2.status_code == 401

    def test_all_csv(self):
        """ Test get csv of all trips """
        view = GetAllCSV.as_view()

        request = factory.get('/api/trips/csv/all')
        request2 = factory.get('/api/trips/csv/all')
        force_authenticate(request, user=self.user)
        response = view(request)
        response2 = view(request2)

        assert response.status_code == 200
        assert response2.status_code == 401
        assert 'text/csv' in response._content_type_for_repr

    def test_results_csv(self):
        """ Test get csv of search results """
        view = GetResultsCSV.as_view()

        data = [
            {
                "origin": 'Boston',
                "destination": 'New York',
                "distance_traveled": float(218),
                "date_traveled": timezone.now(),
                "date_added": timezone.now()
            },
            {
                "origin": 'Boston',
                "destination": 'Rhode Island',
                "distance_traveled": float(71),
                "date_traveled": timezone.now(),
                "date_added": timezone.now()
            }
        ]
        request = factory.post('/api/trips/csv/results', data, format='json')
        request2 = factory.post('/api/trips/csv/results', data, format='json')
        force_authenticate(request, user=self.user)
        response = view(request)
        response2 = view(request2)

        assert response.status_code == 200
        assert response2.status_code == 401
        assert 'text/csv' in response._content_type_for_repr
