from django.urls import path, include
from .api import RegistrationAPI, LoginAPI, UserAPI, UpdateUserAPI, DeactivateUserAPI
from knox import views as knox_views

# User Auth API paths
urlpatterns = [
    path('api/auth', include('knox.urls')),
    path('api/auth/register', RegistrationAPI.as_view()),
    path('api/auth/login', LoginAPI.as_view()),
    path('api/auth/user', UserAPI.as_view()),
    path('api/auth/user/update', UpdateUserAPI.as_view()),
    path('api/auth/user/deactivate', DeactivateUserAPI.as_view()),
    path('api/auth/logout', knox_views.LogoutView.as_view())
]
