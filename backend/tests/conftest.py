"""
Shared pytest fixtures.

Tests do NOT touch the real MySQL database. Each test gets a fresh
in-memory SQLite database via dependency override on get_db, so the
suite is fast, isolated, and runnable in CI without provisioning MySQL.
"""
import pytest
from fastapi.testclient import TestClient
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from sqlalchemy.pool import StaticPool

from app.database.base import Base
from app.database.connection import get_db
from app.main import app
from app.models import user, task  # noqa: F401 — register tables


@pytest.fixture()
def client():
    engine = create_engine(
        "sqlite:///:memory:",
        connect_args={"check_same_thread": False},
        poolclass=StaticPool,
    )
    TestingSessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)
    Base.metadata.create_all(bind=engine)

    def override_get_db():
        db = TestingSessionLocal()
        try:
            yield db
        finally:
            db.close()

    app.dependency_overrides[get_db] = override_get_db
    with TestClient(app) as test_client:
        yield test_client
    app.dependency_overrides.clear()


@pytest.fixture()
def auth_headers(client):
    """Registers and logs in a test user, returns Authorization headers."""
    client.post(
        "/auth/register",
        json={"username": "testuser", "email": "test@example.com", "password": "strongpass123"},
    )
    resp = client.post(
        "/auth/login", data={"username": "testuser", "password": "strongpass123"}
    )
    token = resp.json()["access_token"]
    return {"Authorization": f"Bearer {token}"}
