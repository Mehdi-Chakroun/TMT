import React from 'react';
import TaskList from './TaskList';
import { useState } from 'react';
import TaskView from './TaskView';

const Dashboard = () => {
  const testTasks = [
    {
      id: 1,
      title: 'Task 1',
      type: 'bug',
      description: 'This is a description of task 1',
      status: 'TODO',
      dueDate: '2021-01-01',
      assignees: ['user1', 'user2'],
      comments: [
        {
          id: 1,
          text: 'This is a comment',
          user: {
            id: 1,
            name: 'John Doe'
          }
        },
        {
          id: 2,
          text: 'This is another comment',
          user: {
            id: 2,
            name: 'Jane Smith'
          }
        },
        {
          id: 3,
          text: 'This is a third comment',
          user: {
            id: 1,
            name: 'John Doe'
          }
        }
      ]
    },
    {
      id: 2,
      title: 'Task 2',
      type: 'bug',
      description: 'This is a description of task 2',
      status: 'TODO',
      dueDate: '2021-01-01',
      assignees: ['user3', 'user4'],
      comments: [
        {
          id: 6,
          text: 'This is a comment'
        },
        {
          id: 4,
          text: 'This is another comment'
        },
        {
          id: 5,
          text: 'This is a third comment'
        }
      ]
    },
    
  ];
  const [selectedTask, setSelectedTask] = useState(null);

  const handleTaskClick = (task) => {
    setSelectedTask(task);
  };

  const handleCloseModal = () => {
    setSelectedTask(null);
  };
  return (
    <div className="flex justify-center py-10">
    <div className="flex flex-col mx-4">
      <h2 className="text-2xl font-semibold mb-4">TODO</h2>
      <div className="bg-white rounded-lg shadow-md p-4">
        <TaskList tasks={testTasks.filter((task) => task.status === 'TODO')} onTaskClick={handleTaskClick} />
      </div>
    </div>

    <div className="flex flex-col mx-4">
      <h2 className="text-2xl font-semibold mb-4">In Progress</h2>
      <div className="bg-white rounded-lg shadow-md p-4">
        <TaskList tasks={testTasks.filter((task) => task.status === 'IN_PROGRESS')} onTaskClick={handleTaskClick} />
      </div>
    </div>

    <div className="flex flex-col mx-4">
      <h2 className="text-2xl font-semibold mb-4">Done</h2>
      <div className="bg-white rounded-lg shadow-md p-4">
        <TaskList tasks={testTasks.filter((task) => task.status === 'DONE')} onTaskClick={handleTaskClick} />
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
