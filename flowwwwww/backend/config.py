from pydantic_settings import BaseSettings, SettingsConfigDict
from pydantic import Field
from typing import Optional


class Settings(BaseSettings):
    model_config = SettingsConfigDict(env_file=".env", env_file_encoding="utf-8")

    database_url: str = Field(default="sqlite:///./flowpoint.db", alias="DATABASE_URL")
    cors_origins: str = Field(default="http://localhost:3000", alias="CORS_ORIGINS")
    log_level: str = Field(default="INFO", alias="LOG_LEVEL")
    whatsapp_number: str = Field(default="+917670976226", alias="WHATSAPP_NUMBER")
    contact_email: str = Field(default="agoaqua99@gmail.com", alias="CONTACT_EMAIL")
    jwt_secret: str = Field(default="change-me-in-production", alias="JWT_SECRET")
    jwt_algorithm: str = Field(default="HS256", alias="JWT_ALGORITHM")
    jwt_expiry_minutes: int = Field(default=1440, alias="JWT_EXPIRY_MINUTES")
    field_encryption_key: str = Field(default="", alias="FIELD_ENCRYPTION_KEY")
    recaptcha_site_key: str = Field(default="", alias="RECAPTCHA_SITE_KEY")
    recaptcha_secret_key: str = Field(default="", alias="RECAPTCHA_SECRET_KEY")


settings = Settings()
