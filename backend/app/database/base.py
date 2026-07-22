"""
Declarative base shared by every ORM model.

Kept in its own module (separate from connection.py) so Alembic's
env.py can import Base and target_metadata without pulling in the
live engine / session, avoiding circular imports.
"""
from sqlalchemy.orm import declarative_base

Base = declarative_base()
