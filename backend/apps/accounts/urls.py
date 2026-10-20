"""
URL patterns for user authentication and authorization endpoints.
"""
from django.urls import path
from .views import AuthStatusView

app_name = 'accounts'

urlpatterns = [
    path('status/', AuthStatusView.as_view(), name='auth-status'),
]
