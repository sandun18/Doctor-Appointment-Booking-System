"""
Views for medical records and patient EHR timeline.
"""
from rest_framework import status
from rest_framework.views import APIView
from rest_framework.response import Response

class MedicalRecordStatusView(APIView):
    """Temporary status view to verify medical records routing."""
    def get(self, request):
        return Response({
            "module": "medical_records",
            "status": "ready"
        }, status=status.HTTP_200_OK)
