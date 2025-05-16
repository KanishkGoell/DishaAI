# Task Board Application

A Trello-like task management board that allows users to organize tasks using drag and drop functionality.

## Features

- View tasks organized in columns (To Do, In Progress, Done)
- Create new tasks
- Edit existing tasks
- Delete tasks
- Drag and drop tasks between columns
- Responsive design for mobile and desktop

## Tech Stack

### Frontend
- React with Vite
- Tailwind CSS for styling
- react-beautiful-dnd for drag-and-drop functionality
- Axios for API requests

### Backend
- FastAPI (Python)
- SQLAlchemy ORM
- SQLite database

## Setup Instructions

### Prerequisites
- Node.js (v14+)
- Python (v3.9+)
- npm or yarn

### Backend Setup

1. Navigate to the backend directory:
   ```
   cd backend
   ```

2. Create a virtual environment:
   ```
   python -m venv venv
   ```

3. Activate the virtual environment:
   - On Windows:
     ```
     venv\Scripts\activate
     ```
   - On macOS/Linux:
     ```
     source venv/bin/activate
     ```

4. Install dependencies:
   ```
   pip install -r requirements.txt
   ```

5. Run the development server:
   ```
   uvicorn app.main:app --reload
   ```
   
   The API will be accessible at http://localhost:8000

### Frontend Setup

1. Navigate to the frontend directory

2. Install dependencies:
   ```
   npm install
   # or
   yarn install
   ```

3. Start the development server:
   ```
   npm run dev
   # or
   yarn dev
   ```

   The application will be accessible at http://localhost:5173

## API Endpoints

- `GET /api/tasks` - Get all tasks
- `POST /api/tasks` - Create a new task
- `GET /api/tasks/{task_id}` - Get a specific task
- `PUT /api/tasks/{task_id}` - Update a task
- `DELETE /api/tasks/{task_id}` - Delete a task

## Project Structure

```
project/
├── backend/
│   ├── app/
│   │   ├── __init__.py
│   │   ├── main.py
│   │   ├── models.py
│   │   ├── database.py
│   │   └── routers/
│   │       └── tasks.py
│   └── requirements.txt
└── frontend/
    ├── public/
    ├── src/
    │   ├── components/
    │   │   ├── Board.jsx
    │   │   ├── Column.jsx
    │   │   ├── TaskCard.jsx
    │   │   ├── TaskForm.jsx
    │   │   └── Modal.jsx
    │   ├── services/
    │   │   └── api.js
    │   ├── App.jsx
    │   └── main.jsx
    ├── index.html
    ├── package.json
    └── vite.config.js
```

## Development Notes

This project was developed with the assistance of AI tools. The AI was used to help generate boilerplate code, structure the project, and implement the drag-and-drop functionality.

## Deployment

The application is deployed at: [Your Deployment URL]

## Future Improvements

- User authentication and authorization
- Task filtering and searching
- Due dates and priority levels for tasks
- File attachments for tasks
- Activity log and notifications
- Multiple boards support

## License

This project is licensed under the MIT License.