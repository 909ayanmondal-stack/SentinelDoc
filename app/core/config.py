# app/core/config.py

from pydantic_settings import BaseSettings

class Settings(BaseSettings):
    MONGODB_URL: str
    DB_NAME: str
    OPENAI_API_KEY: str = ""
    LLM_PROVIDER: str = "openai"

    SECRET_KEY: str
    JWT_ALGORITHM: str = "HS256"
    ACCESS_TOKEN_EXPIRE_MINUTES: int = 30

    class Config:
        env_file = ".env"

settings = Settings()