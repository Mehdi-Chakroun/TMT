import React from 'react';
import Comments from './Comments';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { faTimes, faUser, faClock, faUserFriends, faCalendarAlt, faFileAlt } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import TaskIcon from './TaskIcon';
import TypeIcon from './TypeIcon';

const TaskView = ({ task, onClose }) => {

  const [comments, setComments] = useState([]);

  const authAxios = axios.create({
    baseURL: 'http://localhost:4000/api',
    headers: {
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    },
  });

  useEffect(() => {
    const fetchComments = async () => {
      try {
        const response = await authAxios.get(`/tasks/${task._id}/comments`);
        setComments(response.data);
      } catch (error) {
        console.error('Error loading comments:', error);
      }
    };
    fetchComments();
  }, []);

  const currentUsername = localStorage.getItem('username');

  const addComment = async (comment) => {
    try {
      const response = await authAxios.post(`/tasks/${task._id}/comments`, {text: comment, username: currentUsername});
      setComments((prevComments) => [...prevComments, response.data]);
    } catch (error) {
      console.error('Error creating comment:', error);
    }
  };
  const formatAssignees = () => {
    return task.assignees.map(assignee => `${assignee.firstName} ${assignee.lastName}`).join(', ');
  };
  const formattedDueDate = new Date(task.dueDate).toLocaleString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
  const formattedCreatedAt = new Date(task.createdAt).toLocaleString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 overflow-y-auto">
      <div className="modal-overlay fixed inset-0 bg-black opacity-50 overflow-y-auto"></div>
      <div className="modal-container bg-white max-w-6xl mx-auto rounded shadow-lg z-50 overflow-y-auto mt-80 min-h-screen">
        <div className="modal-content py-4 px-6 flex flex-col text-black">
          <div className="flex justify-between items-center pb-3">
            <h2 className="text-2xl font-semibold mr-4">{task.title}</h2>
            <button
              className="modal-close-button cursor-pointer z-50"
              onClick={onClose}
            >
              <FontAwesomeIcon icon={faTimes} className="text-2xl" />
            </button>
          </div>
          <div className="grid grid-cols-2 gap-4 mb-4">
            <div>
              <p className="text-gray-600 mt-4">
                <FontAwesomeIcon icon={faUser} className="mr-2" />
                Created By: {task.createdBy.firstName} {task.createdBy.lastName}
              </p>
              <p className="text-gray-600 mt-4">
                <FontAwesomeIcon icon={faCalendarAlt} className="mr-2" />
                Created At: {formattedCreatedAt}
              </p>
              <p className="text-gray-600 mt-4">
                <FontAwesomeIcon icon={faUserFriends} className="mr-2" />
                Assignees: {formatAssignees()}
              </p>
            </div>
            <div>
              <p className="text-gray-600 mt-4">
                <TaskIcon state={task.state} /> {task.state}
              </p>
              <p className="text-gray-600 mt-4">
                <TypeIcon type={task.type} /> {task.type}
              </p>
              <p className="text-gray-600 mt-4">
                <FontAwesomeIcon icon={faClock} /> Due Date: {formattedDueDate}
              </p>
            </div>
          </div>
          <div className="mb-4">
              <h3 className="text-xl font-semibold mb-2"> <FontAwesomeIcon icon={faFileAlt} /> Description:</h3>
              <p className="text-gray-700 ml-8">{task.description}</p>
          </div>
          <Comments comments={comments} handleAddComment={addComment} />

        </div>
      </div>
    </div>
  );
};

export default TaskView;
