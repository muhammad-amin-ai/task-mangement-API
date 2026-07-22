"""
Automated database initialization workflow.

Run:
    python init_database.py

What it does:
    1. Loads environment variables from .env (via app.config.settings)
    2. Connects to the MySQL SERVER (no database selected yet)
    3. Creates the target database if it doesn't already exist
    4. Connects SQLAlchemy to that database
    5. Creates all tables defined by the ORM models (User, Task)
    6. Prints clear success/error messages at each step

This removes the need to ever run manual SQL — it is the single
source of truth for "the database is ready."
"""
import sys

import pymysql
from sqlalchemy import create_engine, inspect

from app.config import settings
from app.database.base import Base

# Import every model module so its table is registered on Base.metadata
# before create_all() runs. Add new model modules here as they're created.
from app.models import user, task  # noqa: F401


def create_database_if_missing() -> None:
    """Step 1-3: connect to the bare MySQL server and create the DB if needed."""
    print(f"[1/3] Connecting to MySQL server at {settings.DB_HOST}:{settings.DB_PORT} ...")
    try:
        connection = pymysql.connect(
            host=settings.DB_HOST,
            port=settings.DB_PORT,
            user=settings.DB_USER,
            password=settings.DB_PASSWORD,
        )
    except pymysql.err.OperationalError as exc:
        print(f"[FAILED] Could not connect to MySQL server.\n  Cause: {exc}")
        print("  Fix: check DB_HOST/DB_PORT/DB_USER/DB_PASSWORD in .env, and that MySQL is running.")
        sys.exit(1)

    try:
        with connection.cursor() as cursor:
            cursor.execute("SHOW DATABASES LIKE %s", (settings.DB_NAME,))
            exists = cursor.fetchone() is not None
            if exists:
                print(f"[2/3] Database '{settings.DB_NAME}' already exists — skipping creation.")
            else:
                print(f"[2/3] Database '{settings.DB_NAME}' not found — creating it now...")
                cursor.execute(
                    f"CREATE DATABASE `{settings.DB_NAME}` "
                    "CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci"
                )
                connection.commit()
                print(f"[OK]   Database '{settings.DB_NAME}' created.")
    except pymysql.MySQLError as exc:
        print(f"[FAILED] Error while creating database.\n  Cause: {exc}")
        sys.exit(1)
    finally:
        connection.close()


def create_tables() -> None:
    """Step 4-5: connect SQLAlchemy to the now-guaranteed-to-exist DB and create tables."""
    print(f"[3/3] Connecting SQLAlchemy and creating tables in '{settings.DB_NAME}' ...")
    try:
        engine = create_engine(settings.DATABASE_URL, pool_pre_ping=True)
        Base.metadata.create_all(bind=engine)
    except Exception as exc:  # noqa: BLE001 - top-level init script, broad catch is intentional
        print(f"[FAILED] Error while creating tables.\n  Cause: {exc}")
        sys.exit(1)

    inspector = inspect(engine)
    tables = inspector.get_table_names()
    print(f"[OK]   Tables ready: {', '.join(tables) if tables else '(none found)'}")


def main() -> None:
    print("=== Task Management API — Database Initialization ===")
    create_database_if_missing()
    create_tables()
    print("=== Database environment is ready. ===")


if __name__ == "__main__":
    main()
