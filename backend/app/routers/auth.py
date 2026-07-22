from fastapi import APIRouter, Depends, status
from fastapi.security import OAuth2PasswordRequestForm
from sqlalchemy.orm import Session

from app.database.connection import get_db
from app.schemas.user_schema import UserCreate, UserOut, Token
from app.services.auth_service import register_user, authenticate_user
from app.utils.security import create_access_token

router = APIRouter(prefix="/auth", tags=["Authentication"])


@router.post("/register", response_model=UserOut, status_code=status.HTTP_201_CREATED)
def register(user_in: UserCreate, db: Session = Depends(get_db)):
    return register_user(db, user_in)


@router.post("/login", response_model=Token)
def login(form_data: OAuth2PasswordRequestForm = Depends(), db: Session = Depends(get_db)):
    # OAuth2PasswordRequestForm expects form fields "username" and "password"
    # (this also makes the endpoint work directly with Swagger's "Authorize" button).
    user = authenticate_user(db, form_data.username, form_data.password)
    access_token = create_access_token(subject=user.username)
    return Token(access_token=access_token)
