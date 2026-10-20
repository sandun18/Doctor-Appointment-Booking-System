"""
Views for routing and proxying AI microservice requests.
"""
from rest_framework import status
from rest_framework.views import APIView
from rest_framework.response import Response

class GatewayStatusView(APIView):
    """Temporary status view to verify gateway routing."""
    def get(self, request):
        return Response({
            "module": "gateway",
            "status": "ready"
        }, status=status.HTTP_200_OK)
