"""
Views for appointment booking, cancellation, and scheduling.
"""
from rest_framework import status
from rest_framework.views import APIView
from rest_framework.response import Response

class AppointmentStatusView(APIView):
    """Temporary status view to verify appointments routing."""
    def get(self, request):
        return Response({
            "module": "appointments",
            "status": "ready"
        }, status=status.HTTP_200_OK)
