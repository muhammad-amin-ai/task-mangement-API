"""
Owns the SQLAlchemy engine and session lifecycle.

- engine: one per process, pool_pre_ping avoids "MySQL server has
  gone away" errors on stale connections.
- SessionLocal: session factory, one instance per request.
- get_db: FastAPI dependency that yields a session and guarantees
  it's closed even if the request raises.
"""
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker

from app.config import settings

engine = create_engine(
    settings.DATABASE_URL,
    pool_pre_ping=True,
    pool_recycle=3600,
)

SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)


def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()
