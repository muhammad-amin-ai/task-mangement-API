from fastapi import HTTPException, status
from sqlalchemy.orm import Session
from sqlalchemy import select

from app.models.task import Task
from app.models.user import User
from app.schemas.task_schema import TaskCreate, TaskUpdate


def list_tasks(db: Session, current_user: User) -> list[Task]:
    return db.execute(
        select(Task).where(Task.user_id == current_user.id).order_by(Task.created_at.desc())
    ).scalars().all()


def get_owned_task(db: Session, task_id: int, current_user: User) -> Task:
    task = db.get(Task, task_id)
    if task is None:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Task not found.")
    if task.user_id != current_user.id:
        # 404 (not 403) so we don't leak which task IDs exist for other users.
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Task not found.")
    return task


def create_task(db: Session, task_in: TaskCreate, current_user: User) -> Task:
    task = Task(**task_in.model_dump(), user_id=current_user.id)
    db.add(task)
    db.commit()
    db.refresh(task)
    return task


def update_task(db: Session, task_id: int, task_in: TaskUpdate, current_user: User) -> Task:
    task = get_owned_task(db, task_id, current_user)
    for field, value in task_in.model_dump(exclude_unset=True).items():
        setattr(task, field, value)
    db.commit()
    db.refresh(task)
    return task


def delete_task(db: Session, task_id: int, current_user: User) -> None:
    task = get_owned_task(db, task_id, current_user)
    db.delete(task)
    db.commit()
