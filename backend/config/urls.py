"""
MedicareAI Primary URL Configuration.
"""
from django.contrib import admin
from django.urls import path, include
from django.http import JsonResponse

from drf_spectacular.views import (
    SpectacularAPIView,
    SpectacularRedocView,
    SpectacularSwaggerView,
)

def health_check(request):
    return JsonResponse({
        "status": "healthy",
        "service": "medicare-ai-backend",
        "version": "1.0.0"
    })

urlpatterns = [
    path('admin/', admin.site.urls),
    path('health/', health_check, name='health-check'),
    
    # OpenAPI 3.0 Documentation Endpoints
    path('api/schema/', SpectacularAPIView.as_view(), name='schema'),
    path('api/docs/', SpectacularSwaggerView.as_view(url_name='schema'), name='swagger-ui'),
    path('api/redoc/', SpectacularRedocView.as_view(url_name='schema'), name='redoc'),
    
    # API v1 Modular Routes
    path('api/v1/auth/', include('apps.accounts.urls')),
    path('api/v1/doctors/', include('apps.doctors.urls')),
    path('api/v1/patients/', include('apps.patients.urls')),
    path('api/v1/appointments/', include('apps.appointments.urls')),
    path('api/v1/prescriptions/', include('apps.prescriptions.urls')),
    path('api/v1/medical-records/', include('apps.medical_records.urls')),
    path('api/v1/ai/', include('apps.gateway.urls')),
]
