"""
Views for patient profiles and demographic management.
"""
from rest_framework import status
from rest_framework.views import APIView
from rest_framework.response import Response

class PatientStatusView(APIView):
    """Temporary status view to verify patients routing."""
    def get(self, request):
        return Response({
            "module": "patients",
            "status": "ready"
        }, status=status.HTTP_200_OK)
