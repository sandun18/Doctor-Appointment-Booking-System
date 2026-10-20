"""
URL patterns for digital prescription endpoints.
"""
from django.urls import path
from .views import PrescriptionStatusView

app_name = 'prescriptions'

urlpatterns = [
    path('status/', PrescriptionStatusView.as_view(), name='prescription-status'),
]
