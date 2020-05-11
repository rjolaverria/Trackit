from django.urls import path
from .api import TripList, GetTripInfo, AddTrip, DeleteTrip, GetResultsCSV, GetAllCSV

urlpatterns = [
    path('api/trips', TripList.as_view(), name='trips_list'),
    path('api/trips/get_info', GetTripInfo.as_view(), name='trips_info'),
    path('api/trips/add', AddTrip.as_view(), name='add_trip'),
    path('api/trips/<pk>', DeleteTrip.as_view(), name="delete_trip"),
    path('api/trips/csv/results', GetResultsCSV.as_view(), name='get_csv'),
    path('api/trips/csv/all', GetAllCSV.as_view(), name='get_all_csv'),
]
