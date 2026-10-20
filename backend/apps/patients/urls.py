"""
URL patterns for patient profile management endpoints.
"""
from django.urls import path
from .views import PatientStatusView

app_name = 'patients'

urlpatterns = [
    path('status/', PatientStatusView.as_view(), name='patient-status'),
]
