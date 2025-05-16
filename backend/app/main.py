from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from . import models
from .database import engine
from .routers import tasks

# Create database tables
models.Base.metadata.create_all(bind=engine)

app = FastAPI(title="Task Board API")

# Configure CORS
origins = [
    "http://localhost:5173",  # Vite default development server
    "http://localhost:3000",
    "http://localhost:8080",
    "*",  # Allow all origins in development
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include routers
app.include_router(tasks.router, prefix="/api", tags=["tasks"])

# Example startup data
@app.on_event("startup")
async def startup_db_client():
    from sqlalchemy.orm import Session
    from .database import SessionLocal
    import random
    
    # Add some example tasks if the database is empty
    db = SessionLocal()
    task_count = db.query(models.TaskModel).count()
    
    if task_count == 0:
        example_tasks = [
            {"title": "Research project requirements", "description": "Gather all necessary information for the new project", "status": "todo"},
            {"title": "Design database schema", "description": "Create ERD and define relationships", "status": "todo"},
            {"title": "Setup development environment", "description": "Configure Docker, IDE and all required tools", "status": "in-progress"},
            {"title": "Create API documentation", "description": "Write comprehensive documentation for all endpoints", "status": "in-progress"},
            {"title": "Implement user authentication", "description": "Add JWT-based authentication flow", "status": "done"},
            {"title": "Deploy staging environment", "description": "Setup CI/CD pipeline for automatic deployment", "status": "done"},
        ]
        
        for task_data in example_tasks:
            task = models.TaskModel(**task_data)
            db.add(task)
        
        db.commit()
    
    db.close()

@app.get("/")
def read_root():
    return {"message": "Welcome to the Task Board API. Use /api/tasks to access the tasks."}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run("app.main:app", host="0.0.0.0", port=8000, reload=True)