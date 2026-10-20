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

from django.db import connection
from core.mongodb import check_mongo_health
from core.redis_client import check_redis_health

def health_check(request):
    db_status = "connected"
    db_engine = "unknown"
    try:
        connection.ensure_connection()
        db_engine = connection.vendor
    except Exception as exc:
        db_status = f"disconnected: {str(exc)}"

    mongo_status = check_mongo_health()
    redis_status = check_redis_health()

    return JsonResponse({
        "status": "healthy" if db_status == "connected" else "degraded",
        "service": "medicare-ai-backend",
        "version": "1.0.0",
        "databases": {
            "relational_db": {
                "engine": db_engine,
                "status": db_status
            },
            "mongodb_ehr": mongo_status,
            "redis_cache": redis_status,
        }
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
