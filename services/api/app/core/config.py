from pydantic_settings import BaseSettings, SettingsConfigDict
from typing import List


class Settings(BaseSettings):
    app_name: str = "Aurora API"
    app_env: str = "dev"
    api_prefix: str = "/api/v1"
    openai_api_key: str = ""
    openai_model: str = "gpt-4o-mini"
    cors_origins: List[str] = [
        "http://localhost:3000",
        "http://localhost:3001",
        "http://172.19.212.38:3000",
        "http://172.19.212.38:3001",
    ]

    model_config = SettingsConfigDict(
        env_file=".env",
        env_file_encoding="utf-8",
        extra="ignore",
    )


settings = Settings()
