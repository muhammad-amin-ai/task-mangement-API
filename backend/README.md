# Task Management API

A production-grade REST API for managing users and their tasks, built with **FastAPI**, **SQLAlchemy**, and **MySQL**, secured with **JWT authentication**.

## Stack

| Layer          | Technology              |
|----------------|--------------------------|
| Framework      | FastAPI                 |
| Database       | MySQL                   |
| ORM            | SQLAlchemy 2.0           |
| DB Driver      | PyMySQL                 |
| Validation     | Pydantic v2              |
| Auth           | JWT (python-jose)        |
| Password hash  | Passlib + bcrypt         |
| Migrations     | Alembic                  |
| Testing        | Pytest + httpx           |

## Architecture

```
Client → FastAPI Router → Pydantic Schema → Service Layer → SQLAlchemy ORM → MySQL → Response
```

- `app/routers/` — HTTP layer: request in, response out. No business logic.
- `app/services/` — business logic: auth, ownership checks, DB queries.
- `app/models/` — SQLAlchemy ORM table definitions.
- `app/schemas/` — Pydantic request/response contracts.
- `app/database/` — engine, session factory, declarative base.
- `app/utils/security.py` — password hashing + JWT encode/decode.

## Project structure

```
task-management-api/
├── app/
│   ├── main.py                # FastAPI app + router registration
│   ├── config.py              # env-driven settings
│   ├── database/
│   │   ├── connection.py      # engine, SessionLocal, get_db
│   │   └── base.py            # declarative Base
│   ├── models/                # user.py, task.py
│   ├── schemas/                # user_schema.py, task_schema.py
│   ├── routers/                # auth.py, tasks.py
│   ├── services/                # auth_service.py, task_service.py
│   └── utils/security.py
├── tests/                     # test_auth.py, test_tasks.py (SQLite in-memory)
├── migrations/                # Alembic
├── init_database.py           # automated DB + table creation
├── setup_project.py           # scaffolding generator
├── requirements.txt
├── .env / .env.example
└── README.md
```

## Getting started

```bash
python -m venv venv
source venv/bin/activate        # Windows: venv\Scripts\activate
pip install -r requirements.txt

cp .env.example .env            # then fill in your real MySQL credentials

python init_database.py         # creates the DB (if missing) + all tables

uvicorn app.main:app --reload   # http://127.0.0.1:8000/docs
```

## Running tests

Tests run against an isolated in-memory SQLite database — no MySQL server required:

```bash
pytest -v
```

## API Reference

### Auth

| Method | Endpoint         | Description                          |
|--------|------------------|---------------------------------------|
| POST   | `/auth/register` | Create a user (hashes password)       |
| POST   | `/auth/login`    | Validate credentials, return JWT      |

`/auth/login` expects `application/x-www-form-urlencoded` body (`username`, `password`) — this is what makes the Swagger UI "Authorize" button work out of the box.

### Tasks (all require `Authorization: Bearer <token>`)

| Method | Endpoint       | Description                  |
|--------|----------------|-------------------------------|
| GET    | `/tasks`       | List the current user's tasks |
| GET    | `/tasks/{id}`  | Get one task (must be owner)  |
| POST   | `/tasks`       | Create a task                 |
| PUT    | `/tasks/{id}`  | Update a task (partial)       |
| DELETE | `/tasks/{id}`  | Delete a task                 |

A task belonging to another user returns `404` (not `403`) so task IDs can't be enumerated.

## Database schema

**users**: `id, username (unique), email (unique), password_hash, created_at, updated_at`
**tasks**: `id, title, description, status [pending|in_progress|completed], priority [low|medium|high], due_date, user_id (FK → users.id, CASCADE), created_at, updated_at`

One user → many tasks. Indexed on `user_id`, and on `(user_id, status)` for fast filtered dashboards.

## Migrations (optional, alongside init_database.py)

`init_database.py` is enough for local dev / demos. For schema changes over time in a real deployment, use Alembic:

```bash
alembic revision --autogenerate -m "describe change"
alembic upgrade head
```

## Common errors & fixes

| Error                              | Cause                                  | Fix                                             |
|-------------------------------------|------------------------------------------|--------------------------------------------------|
| `OperationalError: Can't connect`  | MySQL not running / wrong host-port    | Start MySQL, check `.env`                        |
| `Access denied for user`           | Wrong `DB_USER`/`DB_PASSWORD`          | Fix credentials in `.env`                        |
| `401 Could not validate credentials` | Missing/expired/malformed JWT        | Re-login via `/auth/login` for a fresh token      |
| `409 already exists`               | Duplicate username/email on register   | Choose a different username/email                |
| `ModuleNotFoundError`              | Venv not activated / deps not installed | `pip install -r requirements.txt`                |
