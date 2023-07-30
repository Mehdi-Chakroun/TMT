import React, { useState } from 'react';
import axios from 'axios';

const AddTaskModal = ({ onClose, users }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [assignees, setAssignees] = useState([]);
  const [dueDate, setDueDate] = useState('');
  const [type, setType] = useState('config');

  const authAxios = axios.create({
    baseURL: 'http://localhost:4000/api',
    headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
    },
    });

  const handleSubmit = async (e) => {
    e.preventDefault();

    const taskPayload = {
      title,
      description,
      assignees,
      dueDate,
      type
    };

    try {
      await authAxios.post('/tasks', taskPayload);
      onClose();
    } catch (error) {
      console.error('Error creating task:', error);
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white rounded-lg shadow-md p-4 max-w-md">
        <h2 className="text-2xl font-semibold mb-4">Add Task</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="title" className="block text-sm font-medium text-gray-700">
              Title
            </label>
            <input
              type="text"
              id="title"
              className="mt-1 focus:ring-blue-500 focus:border-blue-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="description" className="block text-sm font-medium text-gray-700">
              Description
            </label>
            <textarea
              id="description"
              className="mt-1 focus:ring-blue-500 focus:border-blue-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>
          <div className="mb-4">
            <label htmlFor="assignees" className="block text-sm font-medium text-gray-700">
              Assignees
            </label>
            <select
              id="assignees"
              multiple
              className="mt-1 focus:ring-blue-500 focus:border-blue-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
              value={assignees}
              onChange={(e) => setAssignees(Array.from(e.target.selectedOptions, (option) => option.value))}
              required
            >
              <option value="" disabled>Select an assignee</option>
              {users.map((user) => (
                <option key={user._id} value={user._id}>
                  {`${user.firstName} ${user.lastName}`}
                </option>
              ))}
            </select>
          </div>
          <div className="mb-4">
            <label htmlFor="dueDate" className="block text-sm font-medium text-gray-700">
              Due Date
            </label>
            <input
              type="date"
              id="dueDate"
              className="mt-1 focus:ring-blue-500 focus:border-blue-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
              value={dueDate}
              onChange={(e) => setDueDate(e.target.value)}
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="type" className="block text-sm font-medium text-gray-700">
              Type
            </label>
            <select
              id="type"
              className="mt-1 focus:ring-blue-500 focus:border-blue-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
              value={type}
              onChange={(e) => setType(e.target.value)}
              required
            >
              <option value="config">Config</option>
              <option value="integration">Integration</option>
              <option value="consulting">Consulting</option>
              <option value="development">Development</option>
              <option value="training">Training</option>
              <option value="maintenance">Maintenance</option>
              <option value="security">Security</option>
              <option value="testing">Testing</option>
            </select>
          </div>
          <div className="flex justify-end">
            <button
              type="button"
              className="mr-4 px-4 py-2 border border-gray-500 text-gray-500 hover:bg-gray-500 hover:text-white rounded-lg transition-colors"
              onClick={onClose}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 border border-blue-500 text-blue-500 hover:bg-blue-500 hover:text-white rounded-lg transition-colors"
            >
              Add Task
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddTaskModal;
