"""
Base models for MedicareAI backend.
Provides UUID primary keys, auditing timestamps, and soft-delete capabilities.
"""
import uuid
from django.db import models
from django.utils import timezone


class UUIDModel(models.Model):
    """Abstract base model replacing sequential integer IDs with UUIDv4."""
    id = models.UUIDField(
        primary_key=True,
        default=uuid.uuid4,
        editable=False,
        help_text="Unique UUID identifier"
    )

    class Meta:
        abstract = True


class TimeStampedModel(models.Model):
    """Abstract base model providing automated creation and update timestamps."""
    created_at = models.DateTimeField(auto_now_add=True, db_index=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        abstract = True


class SoftDeleteQuerySet(models.QuerySet):
    def delete(self):
        return self.update(is_deleted=True, deleted_at=timezone.now())

    def hard_delete(self):
        return super().delete()

    def alive(self):
        return self.filter(is_deleted=False)

    def dead(self):
        return self.filter(is_deleted=True)


class SoftDeleteManager(models.Manager):
    def get_queryset(self):
        return SoftDeleteQuerySet(self.model, using=self._db).filter(is_deleted=False)


class SoftDeleteModel(models.Model):
    """Abstract model providing soft-deletion support."""
    is_deleted = models.BooleanField(default=False, db_index=True)
    deleted_at = models.DateTimeField(null=True, blank=True)

    objects = SoftDeleteManager()
    all_objects = models.Manager()

    def delete(self, using=None, keep_parents=False):
        self.is_deleted = True
        self.deleted_at = timezone.now()
        self.save(update_fields=['is_deleted', 'deleted_at'])

    def hard_delete(self):
        super().delete()

    def restore(self):
        self.is_deleted = False
        self.deleted_at = None
        self.save(update_fields=['is_deleted', 'deleted_at'])

    class Meta:
        abstract = True


class BaseAuditableModel(UUIDModel, TimeStampedModel, SoftDeleteModel):
    """Combines UUID, TimeStamps, and SoftDeletion into one reusable model base."""
    class Meta:
        abstract = True
