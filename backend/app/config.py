"""
Centralized application configuration.

Loads and validates environment variables once at import time using
pydantic-settings. If a required variable is missing, the app fails
fast at startup with a clear error instead of failing later with a
confusing database or JWT error.
"""
from functools import lru_cache
from pydantic_settings import BaseSettings, SettingsConfigDict


class Settings(BaseSettings):
    # Database
    DB_HOST: str = "localhost"
    DB_PORT: int = 3306
    DB_USER: str = "root"
    DB_PASSWORD: str = ""
    DB_NAME: str = "task_management"

    # JWT
    SECRET_KEY: str = "change_this_to_a_long_random_secret"
    ALGORITHM: str = "HS256"
    ACCESS_TOKEN_EXPIRE_MINUTES: int = 60

    model_config = SettingsConfigDict(env_file=".env", env_file_encoding="utf-8")

    @property
    def DATABASE_URL(self) -> str:
        return (
            f"mysql+pymysql://{self.DB_USER}:{self.DB_PASSWORD}"
            f"@{self.DB_HOST}:{self.DB_PORT}/{self.DB_NAME}"
        )

    @property
    def SERVER_URL(self) -> str:
        """Connection URL WITHOUT a database selected — used to create the DB itself."""
        return f"mysql+pymysql://{self.DB_USER}:{self.DB_PASSWORD}@{self.DB_HOST}:{self.DB_PORT}"


@lru_cache
def get_settings() -> Settings:
    return Settings()


settings = get_settings()
