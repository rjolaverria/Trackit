import csv
from django.http import HttpResponse, Http404
from rest_framework import generics, permissions, views, status
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.settings import api_settings
import googlemaps
from .googleapi import gmaps

from .models import Trip
from .serializers import TripSerializer, TripCSVSerializer


# CSV Response helper
def CSVResponse(data):
    response = HttpResponse(content_type='text/csv')
    response['Content-Disposition'] = 'attachment; filename="trips.csv"'
    header = ['origin', 'destination',
              'distance_traveled', 'date_traveled', 'date_added']
    total_distance = 0
    writer = csv.DictWriter(response, fieldnames=header)
    writer.writeheader()
    for row in data:
        writer.writerow(row)
        total_distance += row['distance_traveled']

    writer.writerow({'origin': '**Total miles**', 'destination': ' ',
                     'distance_traveled': round(total_distance, 2), 'date_traveled': ' ', 'date_added': ' '})
    return response

# List Trips


class TripList(generics.ListAPIView):
    permission_classes = [
        permissions.IsAuthenticated
    ]
    serializer_class = TripSerializer

    def get_queryset(self):
        user = self.request.user
        trips = Trip.objects.filter(user=user).order_by('-date_traveled')
        return trips

# Add Trip


class AddTrip(generics.ListAPIView):
    permission_classes = [
        permissions.IsAuthenticated
    ]
    serializer_class = TripSerializer

    def post(self, request):
        data = request.data
        data['user'] = request.user.id
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response(serializer.data)

# Get Trip Information


class GetTripInfo(generics.ListAPIView):
    permission_classes = [
        permissions.IsAuthenticated
    ]

    def post(self, request):
        data = request.data
        try:
            results = gmaps.directions(
                origin=data['origin'], destination=data['destination'])
            return Response(results)
        except googlemaps.exceptions.HTTPError as error:
            return Response({
                "error": "Bad Request"
            }, status=status.HTTP_400_BAD_REQUEST)


# Delete Trip
class DeleteTrip(views.APIView):
    def get_object(self, pk):
        try:
            return Trip.objects.get(pk=pk)
        except Trip.DoesNotExist:
            raise Http404

    def delete(self, request, pk, format=None):
        trip = self.get_object(pk)
        if trip.user == request.user:
            trip.delete()
            return Response({
                "deleted": "Trip Deleted",
                "id": pk
            }, status=status.HTTP_204_NO_CONTENT)
        else:
            return Response({
                "Authorization": "Not Authorized"
            }, status=status.HTTP_401_UNAUTHORIZED)


# Get All Trips CSV
class GetAllCSV(views.APIView):
    permission_classes = [
        permissions.IsAuthenticated
    ]
    serializer_class = TripCSVSerializer

    def get(self, request):
        user = self.request.user
        trips = Trip.objects.values('origin', 'destination', 'distance_traveled',
                                    'date_traveled', 'date_added').filter(user=user).order_by('-date_traveled')
        return CSVResponse(trips)


# Get Results CSV
class GetResultsCSV(generics.ListAPIView):
    permission_classes = [
        permissions.IsAuthenticated
    ]

    def post(self, request):
        data = request.data
        return CSVResponse(data)
