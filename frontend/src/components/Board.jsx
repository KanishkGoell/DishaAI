import React, { useState, useEffect } from 'react';
import { DragDropContext } from 'react-beautiful-dnd';
import Column from './Column';
import { fetchTasks, createTask, updateTask, deleteTask } from '../services/api';

const Board = () => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Define columns
  const columns = [
    { id: 'todo', title: 'To Do' },
    { id: 'in-progress', title: 'In Progress' },
    { id: 'done', title: 'Done' },
  ];

  // Load tasks from API
  useEffect(() => {
    const loadTasks = async () => {
      try {
        setLoading(true);
        const data = await fetchTasks();
        console.log('🗂️ loaded tasks:', data);

        setTasks(data);
        setError(null);
      } catch (err) {
        setError('Failed to load tasks. Please try again later.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    loadTasks();
  }, []);

  // Handle task creation
  const handleTaskCreate = async (newTask) => {
    try {
      const createdTask = await createTask(newTask);
      setTasks([...tasks, createdTask]);
    } catch (err) {
      setError('Failed to create task. Please try again.');
      console.error(err);
    }
  };

  // Handle task update
  const handleTaskUpdate = async (updatedTask) => {
    try {
      await updateTask(updatedTask.id, updatedTask);
      setTasks(
        tasks.map((task) =>
          task.id === updatedTask.id ? updatedTask : task
        )
      );
    } catch (err) {
      setError('Failed to update task. Please try again.');
      console.error(err);
    }
  };

  // Handle task deletion
  const handleTaskDelete = async (taskId) => {
    try {
      await deleteTask(taskId);
      setTasks(tasks.filter((task) => task.id !== taskId));
    } catch (err) {
      setError('Failed to delete task. Please try again.');
      console.error(err);
    }
  };

  // Handle drag end event
  const handleDragEnd = async (result) => {
    const { destination, source, draggableId } = result;

    // If dropped outside a droppable area
    if (!destination) return;

    // If dropped in the same place
    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return;
    }

    // Find the task that was dragged
    const taskId = parseInt(draggableId);
    const taskToUpdate = tasks.find((task) => task.id === taskId);

    if (!taskToUpdate) return;

    // Create updated task with new status
    const updatedTask = {
      ...taskToUpdate,
      status: destination.droppableId,
    };

    // Optimistically update UI
    const updatedTasks = tasks.map((task) =>
      task.id === taskId ? updatedTask : task
    );

    setTasks(updatedTasks);

    // Update in backend
    try {
      await updateTask(taskId, updatedTask);
    } catch (err) {
      // Revert to original state if update fails
      setTasks(tasks);
      setError('Failed to update task status. Please try again.');
      console.error(err);
    }
  };

  // Filter tasks by column/status
  const getTasksByStatus = (status) => {
    return tasks.filter((task) => task.status === status);
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="text-lg">Loading tasks...</div>
      </div>
    );
  }

  return (
    <div className="h-full">
      {error && (
        <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-4">
          <p>{error}</p>
        </div>
      )}

      <DragDropContext onDragEnd={handleDragEnd}>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 h-full">
          {columns.map((column) => (
            <Column
              key={column.id}
              id={column.id}
              title={column.title}
              tasks={getTasksByStatus(column.id)}
              onTaskCreate={handleTaskCreate}
              onTaskUpdate={handleTaskUpdate}
              onTaskDelete={handleTaskDelete}
            />
          ))}
        </div>
      </DragDropContext>
    </div>
  );
};

export default Board;