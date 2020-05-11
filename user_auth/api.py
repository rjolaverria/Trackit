from django.http import HttpResponse
from rest_framework import generics, permissions, status
from rest_framework.response import Response
from knox.models import AuthToken
from django.contrib.auth.models import User
from .serializers import UserSerializer, RegistrationSerializer, LoginSerializer

# Register User


class RegistrationAPI(generics.GenericAPIView):
    serializer_class = RegistrationSerializer

    def post(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = serializer.save()
        _, token = AuthToken.objects.create(user)
        return Response({
            "user": UserSerializer(user, context=self.get_serializer_context()).data,
            "token": token
        }, status=status.HTTP_201_CREATED)

# Login User


class LoginAPI(generics.GenericAPIView):
    serializer_class = LoginSerializer

    def post(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = serializer.validated_data
        _, token = AuthToken.objects.create(user)
        return Response({
            "user": UserSerializer(user, context=self.get_serializer_context()).data,
            "token": token
        })


# Get User Info
class UserAPI(generics.RetrieveAPIView):
    serializer_class = UserSerializer
    permission_classes = [
        permissions.IsAuthenticated,
    ]

    def get_object(self):
        return self.request.user

# Update User Info


class UpdateUserAPI(generics.GenericAPIView):
    permission_classes = [
        permissions.IsAuthenticated
    ]

    def patch(self, request):
        user = User.objects.get(id=request.user.id)
        serializer = UserSerializer(
            instance=user, data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response({
            "message": "Account Updated",
            "user": serializer.data
        })

# Deactivate User


class DeactivateUserAPI(generics.ListAPIView):
    permission_classes = [
        permissions.IsAuthenticated
    ]
    serializer_class = UserSerializer

    def get(self, request):
        user = self.request.user
        user = User.objects.get(pk=user.id)
        user.is_active = False
        user.save()
        return Response({
            "deleted": "Account Deactivated"
        })
