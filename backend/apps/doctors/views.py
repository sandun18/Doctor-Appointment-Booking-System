"""
Views for doctor catalog, availability, and scheduling.
"""
from rest_framework import status
from rest_framework.views import APIView
from rest_framework.response import Response

class DoctorStatusView(APIView):
    """Temporary status view to verify doctors routing."""
    def get(self, request):
        return Response({
            "module": "doctors",
            "status": "ready"
        }, status=status.HTTP_200_OK)
