import React, { useState, useEffect } from 'react';
import TaskList from './TaskList';
import TaskView from './TaskView';
import axios from 'axios';

const Dashboard = () => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [selectedTask, setSelectedTask] = useState(null);
  const [updatedTask, setUpdatedTask] = useState({});
  
  const authAxios = axios.create({
    baseURL: 'http://localhost:4000/api',
    headers: {
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    },
  });
  
  useEffect(() => {
    const fetchTasks = async () => {
    setLoading(true);
    try {
      const response = await authAxios.get('/tasks');
      console.log(response);
      setTasks(response.data);
    } catch (error) {
      setError(error);
      console.error('Error loading tasks:', error);
    }
    setLoading(false);
  };
    fetchTasks();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error loading tasks: {error.message}</div>;
  }

  const handleTaskClick = (task) => {
    setSelectedTask(task);
  };

  const handleCloseModal = () => {
    setSelectedTask(null);
  };

  const updateTaskState = async (taskId, newState) => {
    try {
      setUpdatedTask(tasks.filter((task) => task._id === taskId));
      console.log(updatedTask);
    } catch (error) {
      console.error('Error updating task state:', error);
    }
  };

  
  return (
    <div className="flex justify-center py-10">
      <div className="flex flex-col mx-4">
        <h2 className="text-2xl font-semibold mb-4">TODO</h2>
        <div className="bg-white rounded-lg shadow-md p-4">
          <TaskList
            propTasks={tasks.filter((task) => task.state === 'TODO')}
            onTaskClick={handleTaskClick}
            updateTaskState={updateTaskState}
          />
        </div>
      </div>

      <div className="flex flex-col mx-4">
        <h2 className="text-2xl font-semibold mb-4">In Progress</h2>
        <div className="bg-white rounded-lg shadow-md p-4">
          <TaskList
            propTasks={tasks.filter((task) => task.state === 'IN_PROGRESS')}
            onTaskClick={handleTaskClick}
            updateTaskState={updateTaskState}
          />
        </div>
      </div>

      <div className="flex flex-col mx-4">
        <h2 className="text-2xl font-semibold mb-4">Done</h2>
        <div className="bg-white rounded-lg shadow-md p-4">
          <TaskList
            propTasks={tasks.filter((task) => task.state === 'DONE')}
            onTaskClick={handleTaskClick}
            updateTaskState={updateTaskState}
          />
        </div>
      </div>

      {selectedTask && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white rounded-lg shadow-md p-4 max-w-md">
            <TaskView task={selectedTask} onClose={handleCloseModal} />
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
