from rest_framework import serializers
from .models import Trip
from django.utils import timezone

# Trip Serializer
class TripSerializer(serializers.ModelSerializer):
    class Meta:
        model = Trip
        fields = '__all__'

# Trip CSV Serializer
class TripCSVSerializer(serializers.ModelSerializer):
    user = serializers.PrimaryKeyRelatedField(read_only=True)

    class Meta:
        model = Trip
        fields = ('id', 'user', 'origin', 'destination',
                  'distance_traveled', 'date_traveled', 'date_added')
