import React, { useState } from 'react';
import { Draggable } from 'react-beautiful-dnd';
import TaskForm from './TaskForm';

const TaskCard = ({ task, index, onUpdate, onDelete }) => {
  const [isEditing, setIsEditing] = useState(false);

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleUpdate = (updatedTask) => {
    onUpdate(updatedTask);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setIsEditing(false);
  };

  return (
    <Draggable draggableId={task.id.toString()} index={index}>
  {(provided) => (
    <div
      ref={provided.innerRef}
      {...provided.draggableProps}
      className="bg-white p-3 rounded shadow mb-2 border-l-4 border-blue-500"
    >
      {/* Drag handle */}
      <div {...provided.dragHandleProps} className="text-gray-400 cursor-move mb-2">≡</div>

      {/* Content — do not conditionally replace the wrapper */}
      <div>
        {isEditing ? (
          <TaskForm
            initialValues={task}
            onSubmit={handleUpdate}
            onCancel={handleCancel}
            isEditing={true}
          />
        ) : (
          <>
            <div className="flex justify-between items-start">
              <h3 className="font-medium text-gray-800">{task.title}</h3>
              <div className="flex space-x-2">
                <button
                  onClick={handleEdit}
                  className="text-xs text-blue-600 hover:text-blue-800"
                >
                  Edit
                </button>
                <button
                  onClick={() => onDelete(task.id)}
                  className="text-xs text-red-600 hover:text-red-800"
                >
                  Delete
                </button>
              </div>
            </div>
            {task.description && (
              <p className="text-sm text-gray-600 mt-2">{task.description}</p>
            )}
          </>
        )}
      </div>
    </div>
  )}
</Draggable>

  );
};

export default TaskCard;