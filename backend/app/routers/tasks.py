from fastapi import APIRouter, Depends, status
from sqlalchemy.orm import Session

from app.database.connection import get_db
from app.models.user import User
from app.schemas.task_schema import TaskCreate, TaskUpdate, TaskOut
from app.services import task_service
from app.services.auth_service import get_current_user

router = APIRouter(prefix="/tasks", tags=["Tasks"])


@router.get("", response_model=list[TaskOut])
def list_tasks(db: Session = Depends(get_db), current_user: User = Depends(get_current_user)):
    return task_service.list_tasks(db, current_user)


@router.get("/{task_id}", response_model=TaskOut)
def get_task(
    task_id: int, db: Session = Depends(get_db), current_user: User = Depends(get_current_user)
):
    return task_service.get_owned_task(db, task_id, current_user)


@router.post("", response_model=TaskOut, status_code=status.HTTP_201_CREATED)
def create_task(
    task_in: TaskCreate,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    return task_service.create_task(db, task_in, current_user)


@router.put("/{task_id}", response_model=TaskOut)
def update_task(
    task_id: int,
    task_in: TaskUpdate,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    return task_service.update_task(db, task_id, task_in, current_user)


@router.delete("/{task_id}", status_code=status.HTTP_204_NO_CONTENT)
def delete_task(
    task_id: int, db: Session = Depends(get_db), current_user: User = Depends(get_current_user)
):
    task_service.delete_task(db, task_id, current_user)
    return None
