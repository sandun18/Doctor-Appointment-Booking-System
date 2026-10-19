"""
Custom exception handlers ensuring uniform JSON error responses across all APIs.
"""
from rest_framework.views import exception_handler
from rest_framework.response import Response
from rest_framework import status
import logging

logger = logging.getLogger(__name__)


def custom_exception_handler(exc, context):
    """
    Returns standard error structure:
    {
        "success": false,
        "error_code": "VALIDATION_ERROR",
        "message": "Human readable message",
        "details": {...}
    }
    """
    response = exception_handler(exc, context)

    if response is not None:
        error_code = exc.__class__.__name__
        details = response.data

        # Extract message if available
        if isinstance(details, dict) and 'detail' in details:
            message = details.pop('detail')
        elif isinstance(details, list) and len(details) > 0:
            message = details[0]
        else:
            message = "An error occurred while processing your request."

        custom_data = {
            'success': False,
            'error_code': error_code,
            'message': str(message),
            'details': details
        }
        response.data = custom_data
    else:
        logger.error(f"Unhandled server exception: {exc}", exc_info=True)
        response = Response({
            'success': False,
            'error_code': 'INTERNAL_SERVER_ERROR',
            'message': 'An unexpected server error occurred. Please contact healthcare system support.',
            'details': {}
        }, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

    return response
