import React, { useState, useEffect } from 'react';
import TaskList from './TaskList';
import axios from 'axios';
import Header from './Header';
import LoadingTemplate from './LoadingTemplate';
import sleep from '../utils';
import ErrorTemplate from './ErrorTemplate';
import { FaTasks, FaCheckCircle, FaTimesCircle, FaSpinner } from 'react-icons/fa';

const Dashboard = () => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedTask, setSelectedTask] = useState(null);

  const authAxios = axios.create({
    baseURL: 'http://localhost:4000/api',
    headers: {
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    },
  });
  
  useEffect(() => {
    const fetchTasks = async () => {
    setLoading(true);
    await sleep(1000);
    try {
      const response = await authAxios.get('/tasks');
      setTasks(response.data);
      console.log('Tasks:', response.data);
    } catch (error) {
      setError(error);
      console.error('Error loading tasks:', error);
    }
    setLoading(false);
  };
    fetchTasks();
  }, [authAxios]);

  const todoTasks = tasks.filter((task) => task.state === 'TODO');
  const inProgressTasks = tasks.filter((task) => task.state === 'IN_PROGRESS');
  const doneTasks = tasks.filter((task) => task.state === 'DONE');
  const inReviewTasks = tasks.filter((task) => task.state === 'IN_REVIEW');

  if (loading) {
    return <div><LoadingTemplate /></div>;
  }

  if (error) {
    return (
    <div>
      <ErrorTemplate errorMessage={error.message}/>
    </div>
    );
  }

  const handleTaskClick = (task) => {
    setSelectedTask(task);
  };


  const updateTaskState = async (taskId, newState) => {
    try {
      const response = await authAxios.patch(`/tasks/${taskId}`, { state: newState });
      setTasks((prevTasks) =>
        prevTasks.map((task) => (task._id === response.data._id ? response.data : task)));
    } catch (error) {
      console.error('Error updating task state:', error);
    }
  };

  
  return (
    <>
     <Header />
      <div className="flex justify-center py-10 flex-wrap container mx-auto">
        <div className="flex flex-col mx-4 flex-1 text-purple-500">
          <h2 className="text-2xl font-semibold mb-4 flex items-center"> <FaTasks className='mr-2' />To Do</h2>
          <div className="h-1 w-full bg-purple-500"></div>
          <div className="bg-white rounded-lg p-4 grow">
            <TaskList
              tasks={todoTasks}
              onTaskClick={handleTaskClick}
              updateTaskState={updateTaskState}
              />
          </div>
        </div>

        <div className="flex flex-col mx-4 flex-1 text-yellow-500">
          <h2 className="text-2xl font-semibold mb-4 flex items-center"><FaSpinner className='mr-2 ' /> In Progress</h2>
          <div className="h-1 w-full bg-yellow-500"></div>
          <div className="bg-white rounded-lg p-4 grow">
            <TaskList
              tasks={inProgressTasks}
              onTaskClick={handleTaskClick}
              updateTaskState={updateTaskState} />
          </div>
        </div>

        <div className="flex flex-col mx-4 flex-1 text-blue-500">
          <h2 className="text-2xl font-semibold mb-4 flex items-center"><FaTimesCircle className='mr-2' /> In Review</h2>
          <div className="h-1 w-full bg-blue-500"></div>
          <div className="bg-white rounded-lg p-4 grow">
            <TaskList
              tasks={inReviewTasks}
              onTaskClick={handleTaskClick}
              updateTaskState={updateTaskState} />
          </div>
        </div>

        <div className="flex flex-col mx-4 flex-1 text-green-500">
          <h2 className="text-2xl font-semibold mb-4 flex items-center"><FaCheckCircle className='mr-2' /> Done</h2>
          <div className="h-1 w-full bg-green-500"></div>

          <div className="bg-white rounded-lg p-4 grow">
            <TaskList
              tasks={doneTasks}
              onTaskClick={handleTaskClick}
              updateTaskState={updateTaskState} />
          </div>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
