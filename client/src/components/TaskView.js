import React from 'react';
import Comments from './Comments';
import axios from 'axios';
import { useEffect, useState } from 'react';

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


  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 overflow-y-auto text-black">
      <div className="modal-overlay fixed inset-0 bg-black opacity-50 overflow-y-auto"></div>
      <div className="modal-container bg-white w-5/6 md:max-w-3xl mx-auto rounded shadow-lg z-50 overflow-y-auto">
        <div className="modal-content py-4 px-6 flex flex-col h-screen">
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
          <Comments comments={comments} handleAddComment={addComment} />

        </div>

      </div>
    </div>
  );
};

export default TaskView;
