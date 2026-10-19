"""
Production settings for MedicareAI backend.
Strict security, SSL enforcement, and production database bindings.
"""
from .base import *
import dj_database_url

DEBUG = False

ALLOWED_HOSTS = os.getenv('DJANGO_ALLOWED_HOSTS', '').split(',')

# Production PostgreSQL Database
DATABASES = {
    'default': dj_database_url.config(
        default=os.getenv('DATABASE_URL'),
        conn_max_age=600,
        ssl_require=True
    )
}

# Strict CORS
CORS_ALLOWED_ORIGINS = os.getenv('CORS_ALLOWED_ORIGINS', '').split(',')
CORS_ALLOW_CREDENTIALS = True

# Security Headers & SSL
SECURE_PROXY_SSL_HEADER = ('HTTP_X_FORWARDED_PROTO', 'https')
SECURE_SSL_REDIRECT = True
SESSION_COOKIE_SECURE = True
CSRF_COOKIE_SECURE = True
SECURE_BROWSER_XSS_FILTER = True
SECURE_CONTENT_TYPE_NOSNIFF = True
X_FRAME_OPTIONS = 'DENY'
