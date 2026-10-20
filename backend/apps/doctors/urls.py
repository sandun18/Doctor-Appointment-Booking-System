"""
URL patterns for doctor directory and availability endpoints.
"""
from django.urls import path
from .views import DoctorStatusView

app_name = 'doctors'

urlpatterns = [
    path('status/', DoctorStatusView.as_view(), name='doctor-status'),
]
