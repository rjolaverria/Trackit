from django.db import models
from django.contrib.auth.models import User


# Create your models here.
class Trip(models.Model):
    user = models.ForeignKey(
        User, related_name="trips", on_delete=models.CASCADE)
    origin = models.CharField(max_length=100)
    destination = models.CharField(max_length=100)
    distance_traveled = models.FloatField()
    date_traveled = models.DateTimeField(null=True)
    date_added = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"From:{self.origin} - To: {self.destination}, On:{self.date_traveled}"
