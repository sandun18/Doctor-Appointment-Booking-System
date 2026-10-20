"""
Views for accounts authentication and profile management.
"""
from rest_framework import status
from rest_framework.views import APIView
from rest_framework.response import Response

class AuthStatusView(APIView):
    """Temporary status view to verify auth routing."""
    def get(self, request):
        return Response({
            "module": "accounts",
            "status": "ready"
        }, status=status.HTTP_200_OK)
