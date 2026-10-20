"""
MongoDB Client and Connection Pooling for MedicareAI Platform.
Manages flexible document collections for Electronic Health Records (EHR),
clinical consultation notes, and immutable audit logs.
"""
import os
import logging
from typing import Optional, Any
from django.conf import settings

logger = logging.getLogger(__name__)

# Fallback in case pymongo is being installed
try:
    from pymongo import MongoClient, ASCENDING, DESCENDING, IndexModel
    from pymongo.database import Database
    from pymongo.collection import Collection
    from pymongo.errors import ConnectionFailure, ServerSelectionTimeoutError
except ImportError:
    MongoClient = None
    Database = Any
    Collection = Any
    ConnectionFailure = Exception
    ServerSelectionTimeoutError = Exception


class MongoDBManager:
    """
    Singleton connection manager for MongoDB with connection pooling.
    """
    _instance: Optional['MongoDBManager'] = None
    _client: Optional[Any] = None
    _db: Optional[Any] = None

    def __new__(cls):
        if cls._instance is None:
            cls._instance = super(MongoDBManager, cls).__new__(cls)
        return cls._instance

    @property
    def client(self) -> Optional[Any]:
        if self._client is None:
            self._connect()
        return self._client

    @property
    def db(self) -> Optional[Any]:
        if self._db is None:
            self._connect()
        return self._db

    def _connect(self):
        if MongoClient is None:
            logger.warning("PyMongo is not installed. MongoDB connection cannot be established.")
            return

        mongo_uri = getattr(settings, 'MONGO_URI', os.getenv('MONGO_URI', 'mongodb://localhost:27017/medicare_ehr'))
        mongo_db_name = getattr(settings, 'MONGO_DB_NAME', os.getenv('MONGO_DB_NAME', 'medicare_ehr'))

        try:
            self._client = MongoClient(
                mongo_uri,
                maxPoolSize=50,
                minPoolSize=5,
                serverSelectionTimeoutMS=3000,
                connectTimeoutMS=5000,
                socketTimeoutMS=10000,
                retryWrites=True,
            )
            # Verify database binding
            self._db = self._client[mongo_db_name]
            logger.info(f"MongoDB connected successfully to database: {mongo_db_name}")
        except Exception as exc:
            logger.error(f"Failed to connect to MongoDB at {mongo_uri}: {exc}")
            self._client = None
            self._db = None

    def get_collection(self, collection_name: str) -> Optional[Any]:
        """Retrieve a specific collection from the active MongoDB database."""
        database = self.db
        if database is not None:
            return database[collection_name]
        return None

    def check_connection(self) -> dict:
        """Ping MongoDB and return status dictionary for health probes."""
        if MongoClient is None:
            return {"status": "unavailable", "detail": "pymongo not installed"}
        try:
            client = self.client
            if client is None:
                return {"status": "down", "detail": "client initialization failed"}
            client.admin.command('ping')
            return {"status": "connected", "database": getattr(settings, 'MONGO_DB_NAME', 'medicare_ehr')}
        except Exception as exc:
            return {"status": "disconnected", "error": str(exc)}

    def ensure_indexes(self):
        """Create standard indexes for clinical notes and audit logs."""
        if self.db is None:
            return

        try:
            # EHR Clinical Notes Indexes
            notes_col = self.db['clinical_consultation_notes']
            notes_col.create_index([("patient_id", 1), ("created_at", -1)])
            notes_col.create_index([("appointment_id", 1)], unique=True, sparse=True)
            notes_col.create_index([("doctor_id", 1)])

            # Audit Logs Indexes
            audit_col = self.db['ehr_access_audit_logs']
            audit_col.create_index([("patient_id", 1), ("timestamp", -1)])
            audit_col.create_index([("actor_id", 1)])

            logger.info("MongoDB domain indexes created successfully.")
        except Exception as exc:
            logger.warning(f"Could not initialize MongoDB indexes: {exc}")


# Global Manager Instance
mongo_manager = MongoDBManager()


def get_mongo_db() -> Optional[Any]:
    """Helper to get default MongoDB database instance."""
    return mongo_manager.db


def get_ehr_collection() -> Optional[Any]:
    """Collection for unstructured patient electronic health records."""
    return mongo_manager.get_collection('patient_ehr_records')


def get_clinical_notes_collection() -> Optional[Any]:
    """Collection for doctor clinical consultation notes."""
    return mongo_manager.get_collection('clinical_consultation_notes')


def get_audit_logs_collection() -> Optional[Any]:
    """Collection for immutable access and compliance audit logs."""
    return mongo_manager.get_collection('ehr_access_audit_logs')


def check_mongo_health() -> dict:
    """Helper for health check routes."""
    return mongo_manager.check_connection()
