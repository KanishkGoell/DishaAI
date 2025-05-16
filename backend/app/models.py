from sqlalchemy import Column, Integer, String, Text
from pydantic import BaseModel
from .database import Base

# SQLAlchemy model
class TaskModel(Base):
    __tablename__ = "tasks"

    id = Column(Integer, primary_key=True, index=True)
    title = Column(String, index=True)
    description = Column(Text, nullable=True)
    status = Column(String, index=True)  # 'todo', 'in-progress', 'done'

# Pydantic models for API
class TaskBase(BaseModel):
    title: str
    description: str = None
    status: str

class TaskCreate(TaskBase):
    pass

class Task(TaskBase):
    id: int

    class Config:
        orm_mode = True