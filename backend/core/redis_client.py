"""
Redis Client, Distributed Mutex Locks, and Caching Utilities for MedicareAI Platform.
Used for caching, token blacklisting, and concurrency-safe doctor slot reservations.
"""
import os
import logging
from contextlib import contextmanager
from typing import Optional, Generator, Any
from django.conf import settings

logger = logging.getLogger(__name__)

try:
    import redis
    from redis.exceptions import ConnectionError, TimeoutError, LockError
except ImportError:
    redis = None
    ConnectionError = Exception
    TimeoutError = Exception
    LockError = Exception


class RedisManager:
    """
    Singleton connection manager for Redis with connection pooling.
    """
    _instance: Optional['RedisManager'] = None
    _client: Optional[Any] = None
    _pool: Optional[Any] = None

    def __new__(cls):
        if cls._instance is None:
            cls._instance = super(RedisManager, cls).__new__(cls)
        return cls._instance

    @property
    def client(self) -> Optional['redis.Redis']:
        if self._client is None:
            self._connect()
        return self._client

    def _connect(self):
        if redis is None:
            logger.warning("Redis package is not installed.")
            return

        redis_url = getattr(settings, 'REDIS_URL', os.getenv('REDIS_URL', 'redis://localhost:6379/0'))
        try:
            self._pool = redis.ConnectionPool.from_url(
                redis_url,
                max_connections=50,
                socket_timeout=3.0,
                socket_connect_timeout=3.0,
                decode_responses=True
            )
            self._client = redis.Redis(connection_pool=self._pool)
            logger.info(f"Redis connected successfully to: {redis_url}")
        except Exception as exc:
            logger.error(f"Failed to connect to Redis at {redis_url}: {exc}")
            self._client = None

    def check_connection(self) -> dict:
        """Ping Redis server to verify connectivity."""
        if redis is None:
            return {"status": "unavailable", "detail": "redis library not installed"}
        try:
            client = self.client
            if client is None:
                return {"status": "down", "detail": "redis client initialization failed"}
            client.ping()
            return {"status": "connected", "url": getattr(settings, 'REDIS_URL', 'redis://localhost:6379/0')}
        except Exception as exc:
            return {"status": "disconnected", "error": str(exc)}

    @contextmanager
    def distributed_lock(
        self,
        lock_name: str,
        timeout: int = 10,
        blocking_timeout: int = 5
    ) -> Generator[bool, None, None]:
        """
        Acquire a distributed lock using Redis mutex lock.
        Prevents race conditions (e.g. concurrent appointment slot booking).
        
        :param lock_name: Unique lock key (e.g. 'lock:doctor:123:slot:2026-10-21T09:00')
        :param timeout: Expiration time in seconds (auto-released to avoid deadlocks)
        :param blocking_timeout: Maximum time in seconds to wait to acquire the lock
        """
        client = self.client
        if client is None:
            logger.warning(f"Redis unavailable, proceeding without distributed lock for: {lock_name}")
            yield False
            return

        lock = client.lock(
            name=lock_name,
            timeout=timeout,
            blocking_timeout=blocking_timeout
        )
        acquired = False
        try:
            acquired = lock.acquire(blocking=True)
            if not acquired:
                logger.warning(f"Could not acquire lock: {lock_name} within {blocking_timeout}s")
            yield acquired
        except LockError as exc:
            logger.error(f"Lock error on {lock_name}: {exc}")
            yield False
        finally:
            if acquired:
                try:
                    lock.release()
                except LockError:
                    # Lock may have already timed out or expired
                    pass


# Global Manager Instance
redis_manager = RedisManager()


def get_redis_client() -> Optional[Any]:
    """Helper to access raw Redis client."""
    return redis_manager.client


def check_redis_health() -> dict:
    """Helper for health check routes."""
    return redis_manager.check_connection()


@contextmanager
def slot_reservation_lock(doctor_id: str, appointment_date: str, start_time: str, timeout: int = 15):
    """
    Dedicated distributed lock helper for doctor appointment slot booking.
    Prevents double-booking race conditions between concurrent requests.
    """
    lock_key = f"lock:slot:doctor:{doctor_id}:{appointment_date}:{start_time}"
    with redis_manager.distributed_lock(lock_key, timeout=timeout, blocking_timeout=4) as acquired:
        yield acquired
