import React from 'react';
import Comments from './Comments';
const TaskView = ({ task, onClose }) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div className="modal-overlay fixed inset-0 bg-black opacity-50"></div>
      <div className="modal-container bg-white w-5/6 md:max-w-3xl mx-auto rounded shadow-lg z-50 overflow-y-auto transform transition-all duration-300">
        <div className="modal-content py-4 px-6">
          <div className="flex justify-between items-center pb-3">
            <h2 className="text-2xl font-semibold">{task.title}</h2>
            <button
              className="modal-close-button cursor-pointer z-50"
              onClick={onClose}
            >
              <span className="text-2xl">×</span>
            </button>
          </div>
          <p className="mb-4">Type: {task.type}</p>
          <p className="mb-4">Description: {task.description}</p>
          <p className="mb-4">Status: {task.state}</p>
          <p className="mb-4">Due Date: {task.dueDate}</p>
          <div className="flex justify-between items-center text-gray-500 mt-4">
            <span>Created By: {task.createdBy}</span>
            <span>Created At: {task.createdAt}</span>
          </div>
        </div>
        <Comments comments={task.comments} />
      </div>
    </div>
  );
};

export default TaskView;
