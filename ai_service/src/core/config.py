# pyrefly: ignore [missing-import]
from pydantic_settings import BaseSettings
from pathlib import Path


class Settings(BaseSettings):
    PROJECT_NAME: str = "Smart Healthcare Platform — AI Microservice"
    VERSION: str = "1.0.0"
    API_V1_STR: str = "/api/v1/ai"
    
    BASE_DIR: Path = Path(__file__).resolve().parent.parent.parent
    DATA_RAW_DIR: Path = BASE_DIR / "data" / "raw"
    DATA_PROCESSED_DIR: Path = BASE_DIR / "data" / "processed"
    MODELS_DIR: Path = BASE_DIR / "models" / "artifacts"
    
    CONFIDENCE_THRESHOLD: float = 0.65
    
    class Config:
        env_file = ".env"
        case_sensitive = True


settings = Settings()
