"""
URL patterns for appointment booking and slot endpoints.
"""
from django.urls import path
from .views import AppointmentStatusView

app_name = 'appointments'

urlpatterns = [
    path('status/', AppointmentStatusView.as_view(), name='appointment-status'),
]
