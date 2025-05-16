import React, { useState } from 'react';
import { Droppable } from 'react-beautiful-dnd';
import TaskCard from './TaskCard';
import TaskForm from './TaskForm';
import Modal from './Modal';

const Column = ({ id, title, tasks, onTaskCreate, onTaskUpdate, onTaskDelete }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleCreateTask = (task) => {
    onTaskCreate({ ...task, status: id });
    handleCloseModal();
  };

  const getColumnColor = () => {
    switch (id) {
      case 'todo':
        return 'bg-gray-100';
      case 'in-progress':
        return 'bg-blue-50';
      case 'done':
        return 'bg-green-50';
      default:
        return 'bg-gray-100';
    }
  };

  const getHeaderColor = () => {
    switch (id) {
      case 'todo':
        return 'bg-gray-200';
      case 'in-progress':
        return 'bg-blue-100';
      case 'done':
        return 'bg-green-100';
      default:
        return 'bg-gray-200';
    }
  };

  return (
    <div className={`flex flex-col h-full rounded ${getColumnColor()} shadow`}>
      <div
        className={`p-3 ${getHeaderColor()} rounded-t flex justify-between items-center`}
      >
        <h2 className="font-semibold">{title}</h2>
        <button
          onClick={handleOpenModal}
          className="px-2 py-1 bg-blue-500 text-white rounded text-sm hover:bg-blue-600"
        >
          + Add
        </button>
      </div>

      <Droppable droppableId={id}>
        {(provided) => (
          <div
            ref={provided.innerRef}
            {...provided.droppableProps}
            className="flex-1 p-2 overflow-y-auto"
            style={{ minHeight: '200px' }}
          >
            {tasks.map((task, index) => (
              <TaskCard
                key={task.id}
                task={task}
                index={index}
                onUpdate={onTaskUpdate}
                onDelete={onTaskDelete}
              />
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>

      <Modal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        title={`Add Task to ${title}`}
      >
        <TaskForm onSubmit={handleCreateTask} onCancel={handleCloseModal} />
      </Modal>
    </div>
  );
};

export default Column;