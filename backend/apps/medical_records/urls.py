"""
URL patterns for electronic health record endpoints.
"""
from django.urls import path
from .views import MedicalRecordStatusView

app_name = 'medical_records'

urlpatterns = [
    path('status/', MedicalRecordStatusView.as_view(), name='medical-record-status'),
]
