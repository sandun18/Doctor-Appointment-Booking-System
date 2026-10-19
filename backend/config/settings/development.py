"""
Development settings for MedicareAI backend.
"""
from .base import *
import dj_database_url

DEBUG = True

ALLOWED_HOSTS = ['*']

# Database: PostgreSQL with fallback to SQLite for local bootstrap
DATABASE_URL = os.getenv('DATABASE_URL')
if DATABASE_URL:
    DATABASES = {
        'default': dj_database_url.parse(DATABASE_URL)
    }
else:
    DATABASES = {
        'default': {
            'ENGINE': 'django.db.backends.sqlite3',
            'NAME': BASE_DIR / 'db.sqlite3',
        }
    }

# CORS configuration for frontend dev servers
CORS_ALLOW_ALL_ORIGINS = True
CORS_ALLOW_CREDENTIALS = True

# Email backend for development (outputs to console)
EMAIL_BACKEND = 'django.core.mail.backends.console.EmailBackend'
