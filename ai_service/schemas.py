"""
Smart Healthcare Platform — AI Microservice Data Contracts & Schemas
Defines Pydantic request and response schemas for all AI/ML endpoints.
"""

from typing import List, Optional
from enum import Enum
from pydantic import BaseModel, Field


# ==========================================================
# Enums
# ==========================================================

class GenderEnum(str, Enum):
    MALE = "male"
    FEMALE = "female"
    OTHER = "other"


class UrgencyLevelEnum(str, Enum):
    ROUTINE = "ROUTINE"        # Can book general appointment in upcoming days
    URGENT = "URGENT"          # Consult a physician within 24 hours
    CRITICAL = "CRITICAL"      # Requires immediate emergency room attention


class RiskTierEnum(str, Enum):
    LOW = "LOW"
    MODERATE = "MODERATE"
    HIGH = "HIGH"


# ==========================================================
# 1. Feature A: Symptom-to-Specialist Triage Schemas
# ==========================================================

class SymptomTriageRequest(BaseModel):
    symptoms_text: str = Field(
        ...,
        min_length=5,
        max_length=2000,
        description="Free-form description of symptoms experienced by the patient.",
        examples=["I have a severe throbbing headache on the right side, sensitivity to light and nausea."]
    )
    patient_age: Optional[int] = Field(
        default=None,
        ge=0,
        le=120,
        description="Patient's age in years."
    )
    gender: Optional[GenderEnum] = Field(
        default=None,
        description="Patient's biological gender."
    )
    duration_days: Optional[int] = Field(
        default=None,
        ge=0,
        description="Approximate number of days the symptoms have persisted."
    )
    existing_conditions: Optional[List[str]] = Field(
        default_factory=list,
        description="List of known chronic conditions (e.g. ['Hypertension', 'Asthma'])."
    )


class AlternativeSpecialty(BaseModel):
    specialty: str = Field(..., description="Alternative medical specialty.")
    confidence: float = Field(..., ge=0.0, le=1.0, description="Confidence score between 0 and 1.")


class SymptomTriageResponse(BaseModel):
    recommended_specialty: str = Field(..., description="Primary suggested medical specialty (e.g., 'Neurology').")
    confidence_score: float = Field(..., ge=0.0, le=1.0, description="Primary confidence score (0.0 to 1.0).")
    urgency_level: UrgencyLevelEnum = Field(..., description="Urgency classification.")
    alternatives: List[AlternativeSpecialty] = Field(default_factory=list, description="Top alternative specialties.")
    explainability_tags: List[str] = Field(
        default_factory=list,
        description="Key symptom tokens extracted from text that influenced prediction.",
        examples=[["throbbing headache", "photophobia", "nausea"]]
    )
    suggested_actions: List[str] = Field(
        default_factory=list,
        description="Safe clinical next steps / pre-visit guidelines."
    )
    disclaimer: str = Field(
        default="AI-generated recommendation for informational triage only. Not a definitive clinical diagnosis. Seek emergency care immediately if experiencing life-threatening symptoms.",
        description="Mandatory medical legal disclaimer."
    )


# ==========================================================
# 2. Feature B: Chronic Disease Risk Assessment Schemas
# ==========================================================

class DiseaseRiskRequest(BaseModel):
    age: int = Field(..., ge=1, le=120, description="Age in years.")
    gender: GenderEnum = Field(..., description="Gender.")
    bmi: float = Field(..., ge=10.0, le=70.0, description="Body Mass Index (kg/m^2).")
    blood_pressure_systolic: int = Field(..., ge=60, le=260, description="Systolic Blood Pressure (mmHg).")
    blood_pressure_diastolic: int = Field(..., ge=40, le=160, description="Diastolic Blood Pressure (mmHg).")
    fasting_blood_glucose: Optional[float] = Field(None, ge=40.0, le=500.0, description="Fasting Glucose in mg/dL.")
    cholesterol_total: Optional[float] = Field(None, ge=80.0, le=500.0, description="Total Cholesterol in mg/dL.")
    is_smoker: bool = Field(default=False, description="Whether patient currently smokes.")
    family_history_diabetes: bool = Field(default=False, description="Family history of Diabetes.")
    family_history_hypertension: bool = Field(default=False, description="Family history of Hypertension.")


class DiseaseRiskResponse(BaseModel):
    condition: str = Field(..., description="Evaluated medical condition (e.g., 'Type 2 Diabetes' or 'Cardiovascular Risk').")
    risk_percentage: float = Field(..., ge=0.0, le=100.0, description="Calculated probability percentage (0 to 100%).")
    risk_tier: RiskTierEnum = Field(..., description="Risk tier: LOW, MODERATE, HIGH.")
    contributing_factors: List[str] = Field(
        default_factory=list,
        description="Clinical factors that significantly elevated the risk score."
    )
    lifestyle_recommendations: List[str] = Field(
        default_factory=list,
        description="Preventive health guidelines based on clinical risk factors."
    )
    disclaimer: str = Field(
        default="Statistical risk estimation tool. Requires confirmatory clinical laboratory tests by a certified doctor.",
        description="Medical disclaimer."
    )


# ==========================================================
# 3. Feature C: Clinical Note & Prescription Summarizer Schemas
# ==========================================================

class PrescriptionItem(BaseModel):
    name: str = Field(..., description="Medication name (e.g., 'Metformin').")
    dosage: str = Field(..., description="Dosage amount (e.g., '500mg').")
    frequency: str = Field(..., description="Intake frequency (e.g., 'Twice daily after meals').")
    duration: Optional[str] = Field(None, description="Duration (e.g., '30 days').")


class ClinicalSummaryRequest(BaseModel):
    clinical_note_text: str = Field(..., min_length=10, description="Raw doctor consultation notes or discharge summary.")


class ClinicalSummaryResponse(BaseModel):
    summary: str = Field(..., description="Structured summary of the clinical consultation.")
    diagnoses: List[str] = Field(default_factory=list, description="Extracted clinical diagnoses.")
    active_medications: List[PrescriptionItem] = Field(default_factory=list, description="Parsed prescriptions.")
    follow_up_instructions: Optional[str] = Field(None, description="Follow-up timeframe and doctor instructions.")
