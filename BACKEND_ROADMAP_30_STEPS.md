# 🏥 Smart Healthcare Platform — Backend Architecture Roadmap
**30-Step Production-Grade Implementation Guide**

> **Goal:** Build a robust, scalable, privacy-aware healthcare backend utilizing **Django, Django REST Framework (DRF), and FastAPI Microservices**, integrated with **PostgreSQL** (relational entities), **MongoDB** (unstructured EHR & clinical notes), and **Redis** (caching, distributed slot locking & task queuing).
>
> **Core Focus:** Clean REST APIs, Role-Based Access Control (RBAC), HIPAA/GDPR privacy compliance, concurrency-safe appointment booking, and seamless AI microservice integration.

---

## 📋 Table of Contents
- [Phase 1: Architecture, Scaffolding & Environment Setup (Steps 1–5)](#phase-1-architecture-scaffolding--environment-setup-steps-15)
- [Phase 2: Custom Authentication & Role-Based Access Control (Steps 6–10)](#phase-2-custom-authentication--role-based-access-control-steps-610)
- [Phase 3: Core Domain Models & Schemas (Steps 11–16)](#phase-3-core-domain-models--schemas-steps-1116)
- [Phase 4: High-Performance Business Logic, APIs & Caching (Steps 17–21)](#phase-4-high-performance-business-logic-apis--caching-steps-1721)
- [Phase 5: Microservices & AI Service Integration (Steps 22–26)](#phase-5-microservices--ai-service-integration-steps-2226)
- [Phase 6: Security, Compliance, Testing & Production Readiness (Steps 27–30)](#phase-6-security-compliance-testing--production-readiness-steps-2730)

---

## 🏗️ Phase 1: Architecture, Scaffolding & Environment Setup (Steps 1–5)

- [x] **Step 01: Project Directory Scaffolding & Microservice Architecture**
  - Establish a clean, decoupled modular monolith for the core business domain + API gateway, alongside the FastAPI AI microservice:
    ```text
    backend/
    ├── config/                  # Django project root settings, asgi/wsgi, urls
    ├── apps/
    │   ├── accounts/            # User authentication, RBAC, Profiles
    │   ├── doctors/             # Doctor profiles, specialties, schedules
    │   ├── patients/            # Patient demographics, medical vitals
    │   ├── appointments/        # Slot reservation engine, states, calendar
    │   ├── prescriptions/       # Digital scripts, drug inventory/dosage
    │   ├── medical_records/     # Privacy-aware EHR, clinical consultation notes
    │   └── gateway/             # Proxy routes to AI microservice & telemetry
    ├── core/                    # Custom middleware, base models, exceptions
    ├── tests/                   # PyTest integration & unit suites
    ├── Dockerfile
    ├── docker-compose.yml
    └── requirements.txt
    ```

- [ ] **Step 02: Python Virtual Environment & Dependency Locking**
  - Initialize isolated virtualenv for Django (`backend/venv`).
  - Configure production dependencies:
    - Web & Framework: `django`, `djangorestframework`, `django-cors-headers`, `drf-spectacular`
    - Databases: `psycopg2-binary` (PostgreSQL), `pymongo` / `djongo` (MongoDB), `redis` (Cache & Locks)
    - Asynchronous & Tasks: `celery`, `django-celery-beat`, `httpx` (async HTTP for AI service)
    - Security & Auth: `djangorestframework-simplejwt`, `cryptography` (EHR field encryption)

- [ ] **Step 03: Multi-Database Orchestration (PostgreSQL + MongoDB + Redis)**
  - Configure **PostgreSQL** as default relational store for ACID transactional data (Users, Doctors, Appointments, Billing).
  - Configure **MongoDB** client via connection pooling for flexible, document-based clinical consultation logs and historical EHR audit logs.
  - Configure **Redis** connection strings for caching, token blacklisting, and distributed locks.

- [ ] **Step 04: Environment Configuration & Dynamic Settings**
  - Implement 12-factor configuration using `django-environ`.
  - Decouple settings into `base.py`, `development.py`, and `production.py`.
  - Configure CORS whitelist matching frontend Next.js/Vite domains (`http://localhost:5173`, `http://localhost:3000`).

- [ ] **Step 05: Docker Compose Multi-Container Local Stack**
  - Create `docker-compose.yml` orchestrating:
    - `backend_api`: Django DRF (Port 8000)
    - `postgres_db`: PostgreSQL 16 (Port 5432)
    - `mongo_db`: MongoDB 7.0 (Port 27017)
    - `redis_cache`: Redis Alpine (Port 6379)
    - `ai_microservice`: FastAPI AI Engine (Port 8001)

---

## 🔐 Phase 2: Custom Authentication & Role-Based Access Control (Steps 6–10)

- [ ] **Step 06: Custom AbstractBaseUser & UUID Primary Keys**
  - Replace default Django integer PKs with non-enumerable, collision-safe `UUIDv4`.
  - Use `email` as unique login identifier (case-insensitive) instead of username.
  - Implement `SoftDeleteModel` base class with `is_deleted` timestamp flag.

- [ ] **Step 07: Multi-Tenant Role Modeling (RBAC)**
  - Define user roles: `PATIENT`, `DOCTOR`, `STAFF_NURSE`, `HOSPITAL_ADMIN`.
  - Maintain strict separation of concerns via 1-to-1 Profile models: `PatientProfile` and `DoctorProfile`.

- [ ] **Step 08: JWT Authentication with Token Blacklisting**
  - Configure `djangorestframework-simplejwt` with short-lived Access Tokens (15 mins) and sliding Refresh Tokens (7 days).
  - Enable token blacklisting on logout using Redis / DB token storage.

- [ ] **Step 09: Granular Custom Permission Classes**
  - Build declarative permission decorators:
    - `IsPatientOnly`: Restricts medical vitals editing to the owner patient.
    - `IsDoctorOnly`: Restricts clinical note signing and prescription writing to verified doctors.
    - `IsOwnerOrTreatingDoctor`: Grants clinical record read access only if an active appointment relationship exists.

- [ ] **Step 10: Auth & Identity Endpoints**
  - Implement endpoints:
    - `POST /api/v1/auth/register/` (Differentiated registration for Patient vs Doctor)
    - `POST /api/v1/auth/login/` (Issues JWT tokens + role claims)
    - `POST /api/v1/auth/token/refresh/`
    - `POST /api/v1/auth/logout/` (Blacklists active refresh token)
    - `GET /api/v1/auth/me/` (Returns authenticated user profile & permissions)

---

## 📊 Phase 3: Core Domain Models & Schemas (Steps 11–16)

- [ ] **Step 11: Patient Profile & Health Demographics Model**
  - Fields: `date_of_birth`, `gender`, `blood_group`, `emergency_contact_phone`, `allergies` (ArrayField), `chronic_conditions` (ArrayField).
  - Encrypted fields: National Identification Number / SSN using Fernet symmetric encryption.

- [ ] **Step 12: Doctor Profile, Credentials & Specialty Models**
  - `Specialty` Model: `name`, `code`, `description`, `icon_url`.
  - `DoctorProfile` Model: `specialty_id`, `license_number` (unique), `years_of_experience`, `consultation_fee`, `bio`, `hospital_affiliation`, `is_verified` (approval status by admin).

- [ ] **Step 13: Doctor Availability & Weekly Slot Engine**
  - `DoctorAvailability` Model: Day of week (`MONDAY`..`SUNDAY`), `start_time`, `end_time`, `slot_duration_minutes` (default: 20 mins), `break_start`, `break_end`.
  - Algorithm to dynamically compute open slots for any target date excluding booked appointments.

- [ ] **Step 14: Appointment State Machine & Double-Booking Prevention**
  - `Appointment` Model:
    - Status enum: `PENDING`, `CONFIRMED`, `IN_CONSULTATION`, `COMPLETED`, `CANCELLED`, `NO_SHOW`.
    - Type enum: `IN_CLINIC`, `VIDEO_CONSULTATION`.
    - Unique database constraint: `UniqueConstraint(fields=['doctor', 'appointment_date', 'start_time'], condition=Q(status__in=['PENDING', 'CONFIRMED']))`.

- [ ] **Step 15: Digital Prescription & Drug Regimen Models**
  - `Prescription` Model: Linked to `Appointment`, `Doctor`, and `Patient`, with digital verification hash.
  - `PrescriptionItem` Model: `medication_name`, `dosage`, `frequency` (e.g. TID, BID), `duration_days`, `instructions` (e.g. "Take after food").

- [ ] **Step 16: Privacy-Aware Electronic Health Records (EHR)**
  - Hybrid storage pattern:
    - PostgreSQL: Metadata, appointment links, doctor sign-off timestamp.
    - MongoDB: Clinical consultation documents (Chief Complaint, History of Present Illness, Physical Examination findings, Lab Results attachment links).

---

## ⚡ Phase 4: High-Performance Business Logic, APIs & Caching (Steps 17–21)

- [ ] **Step 17: Serializers & Validation Layer**
  - Implement DRF Serializers with comprehensive clinical validations (e.g. preventing past-date bookings, ensuring doctor availability).
  - Optimize querysets using `select_related()` and `prefetch_related()` to eliminate N+1 query bottlenecks.

- [ ] **Step 18: Doctor Directory, Multi-Factor Filtering & Search**
  - Implement `GET /api/v1/doctors/` with `django-filter`:
    - Filter by `specialty`, `rating__gte`, `available_today=true`, `max_fee`.
    - Full-text search on Doctor name, Hospital, and Bio.

- [ ] **Step 19: Concurrency-Safe Slot Reservation with Redis Distributed Lock**
  - Wrap the booking transaction inside an ACID atomic block (`transaction.atomic()`).
  - Acquire Redis distributed mutex lock `lock:doctor:{id}:slot:{timestamp}` for 10 seconds during checkout to prevent two simultaneous users from booking the same slot.

- [ ] **Step 20: Redis Multi-Tier Caching Layer**
  - Cache static specialties catalog (`cache_page` for 24 hours).
  - Cache doctor profile view endpoints with automatic cache invalidation using Django Post-Save signals.

- [ ] **Step 21: Asynchronous Processing with Celery & Redis**
  - Configure Celery worker & beat scheduler:
    - `send_appointment_confirmation_email` (triggered immediately upon booking).
    - `send_sms_reminder_24h` (scheduled automated reminder task).
    - `auto_expire_unpaid_slots` (runs every 5 minutes to release pending hold reservations).

---

## 🤖 Phase 5: Microservices & AI Service Integration (Steps 22–26)

- [ ] **Step 22: API Gateway & Inter-Service Async Client**
  - Create a dedicated asynchronous HTTP service client (`apps.gateway.ai_client.AIClient`) using `httpx`.
  - Implement Circuit Breaker pattern, connection timeout (3s), and retry policies.

- [ ] **Step 23: Feature A — Symptom-to-Specialist Triage Endpoint**
  - `POST /api/v1/ai/triage/`:
    - Receives patient symptom narrative.
    - Forwards payload to FastAPI AI microservice (`/api/v1/nlp/triage`).
    - Enriches AI response by automatically querying and appending top 3 matching doctors in that specialty.

- [ ] **Step 24: Feature B — Chronic Disease Risk Assessment Endpoint**
  - `POST /api/v1/ai/risk-assessment/`:
    - Auto-populates request with patient's latest recorded vitals (BP, BMI, Blood Glucose).
    - Obtains predictive risk score & lifestyle modifications from the AI engine.
    - Saves historical risk calculation record in patient EHR timeline.

- [ ] **Step 25: Feature C — Clinical Note Summarizer & Prescription Auto-Draft**
  - `POST /api/v1/ai/summarize-notes/`:
    - Allows doctors to input consultation transcripts.
    - AI parses out diagnoses and candidate prescriptions.
    - Returns structured drafts ready to be approved and saved into the `Prescription` database table.

- [ ] **Step 26: Telehealth Video Room Token Generation**
  - Implement WebRTC / Daily.co / Twilio Video room token generation endpoint `POST /api/v1/appointments/{id}/video-room/`.
  - Validate that only the scheduled doctor and patient can obtain the token within 15 minutes of the appointment slot.

---

## 🛡️ Phase 6: Security, Compliance, Testing & Production Readiness (Steps 27–30)

- [ ] **Step 27: HIPAA & GDPR Healthcare Compliance Layer**
  - Implement audit logging middleware: Every single access to a patient's medical records or vitals is recorded in an immutable audit collection (`who`, `when`, `which_patient`, `ip_address`).
  - Implement data masking for non-treating staff.
  - Implement Right-to-be-Forgotten anonymization routine.

- [ ] **Step 28: API Rate Limiting & Throttling**
  - Configure DRF ScopedRateThrottle:
    - `anon`: 20 requests/minute (DDoS prevention).
    - `user`: 120 requests/minute.
    - `auth_login`: 5 attempts/minute (Brute force protection).
    - `ai_endpoints`: 10 requests/minute per patient.

- [ ] **Step 29: Comprehensive PyTest Automation Suite**
  - Write test suites:
    - Unit tests: Model methods, custom permissions, encryption utils.
    - Integration tests: Complete appointment booking cycle, concurrency double-booking tests, RBAC authorization boundaries.
    - Mocked external tests: AI microservice integration resilience tests.

- [ ] **Step 30: OpenAPI 3.0 Documentation & CI/CD Pipeline**
  - Auto-generate interactive Swagger & Redoc documentation using `drf-spectacular` at `/api/v1/docs/`.
  - Export Postman Environment and Collection.
  - Setup GitHub Actions CI workflow to run linter (`flake8` / `ruff`), type checking, and PyTest suites on every pull request.
