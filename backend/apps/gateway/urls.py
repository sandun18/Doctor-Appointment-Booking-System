"""
URL patterns for AI gateway and microservice proxy endpoints.
"""
from django.urls import path
from .views import GatewayStatusView

app_name = 'gateway'

urlpatterns = [
    path('status/', GatewayStatusView.as_view(), name='gateway-status'),
]
