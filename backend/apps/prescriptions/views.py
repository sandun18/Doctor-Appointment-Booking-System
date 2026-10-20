"""
Views for digital prescriptions and medication regimens.
"""
from rest_framework import status
from rest_framework.views import APIView
from rest_framework.response import Response

class PrescriptionStatusView(APIView):
    """Temporary status view to verify prescriptions routing."""
    def get(self, request):
        return Response({
            "module": "prescriptions",
            "status": "ready"
        }, status=status.HTTP_200_OK)
