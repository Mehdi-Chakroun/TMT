import React from 'react';
import Comments from './Comments';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { faTimes, faUser, faClock, faUserFriends } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';


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

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 overflow-y-auto text-black">
      <div className="modal-overlay fixed inset-0 bg-black opacity-50 overflow-y-auto"></div>
      <div className="modal-container bg-white w-5/6 md:max-w-3xl mx-auto rounded shadow-lg z-50 overflow-y-auto">
        <div className="modal-content py-4 px-6 flex flex-col h-screen">
        <div className="flex justify-between items-center pb-3">
          <h2 className="text-2xl font-semibold mr-4">{task.title}</h2>
          <div className="flex items-center">
            <p className="text-gray-500 text-sm mr-2">{task.state}</p>
            <p className="text-gray-500 text-sm mr-8">{task.dueDate}</p>
            <button
              className="modal-close-button cursor-pointer z-50"
              onClick={onClose}
            >
              <FontAwesomeIcon icon={faTimes} className="text-2xl" />
            </button>
          </div>
        </div>
      <div className="grid grid-cols-2 gap-4 mb-4">
        <div>
          <p className="text-gray-600">
            <FontAwesomeIcon icon={faUser} className="mr-2" />
            Created By: {task.createdBy.firstName} {task.createdBy.lastName}
          </p>
          <p className="text-gray-600">
            <FontAwesomeIcon icon={faClock} className="mr-2" />
            Created At: {task.createdAt}
          </p>
          <p className="text-gray-600">
            <FontAwesomeIcon icon={faUserFriends} className="mr-2" />
            Assignees: {formatAssignees()}
          </p>
        </div>
        <div>
          <p className="text-gray-600">
            Type: {task.type}
          </p>
        </div>
      </div>
      <p className="mb-4">Description: {task.description}</p>
          <Comments comments={comments} handleAddComment={addComment} />

        </div>

      </div>
    </div>
  );
};

export default TaskView;
