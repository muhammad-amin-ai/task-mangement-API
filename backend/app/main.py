"""
Application entrypoint.

Run with:
    uvicorn app.main:app --reload

Table creation is handled by init_database.py (run once before starting
the server), not here — main.py should stay side-effect-free so it can
be imported by tests without touching a real database.
"""
from fastapi import FastAPI, Request, status
from fastapi.responses import JSONResponse
from fastapi.exceptions import RequestValidationError

from app.routers import auth, tasks

app = FastAPI(
    title="Task Management API",
    description="Production-grade Task Management REST API with JWT auth.",
    version="1.0.0",
)

app.include_router(auth.router)
app.include_router(tasks.router)


@app.exception_handler(RequestValidationError)
async def validation_exception_handler(request: Request, exc: RequestValidationError):
    # Returns a clean, consistent 422 payload instead of FastAPI's default
    # verbose trace, so API consumers get predictable error shapes.
    return JSONResponse(
        status_code=status.HTTP_422_UNPROCESSABLE_ENTITY,
        content={"detail": "Validation failed.", "errors": exc.errors()},
    )


@app.get("/health", tags=["Health"])
def health_check():
    return {"status": "ok"}
from fastapi.middleware.cors import CORSMiddleware


app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
