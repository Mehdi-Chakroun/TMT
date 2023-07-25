import React, { useState } from 'react';
import TaskView from './TaskView';
const TaskList = ({ tasks, updateTaskState }) => {
  const [selectedTask, setSelectedTask] = useState(null);

  const handleTaskClick = (task) => {
    setSelectedTask(task);
  };
  const handleUpdateTaskState = async (taskId, newState) => {
    await updateTaskState(taskId, newState);
  };
  

  return (
    <div>
      {tasks.map((task) => (
      <div key={task._id} className="border rounded-lg p-4 mb-4">
      <h3 className="text-xl font-semibold mb-2">{task.title}</h3>
      <p className="text-gray-600 mb-1">Type: {task.type}</p>
      <p className="text-gray-600 mb-1">Due Date: {task.dueDate}</p>
      <button
        className="px-4 py-2 border border-blue-500 text-blue-500 hover:bg-blue-500 hover:text-white rounded-lg transition-colors mr-2"
        onClick={() => handleTaskClick(task)}
      >
        View Task
      </button>
      {task.state === 'TODO' && (
        <button
          className="px-4 py-2 border border-blue-500 text-blue-500 hover:bg-blue-500 hover:text-white rounded-lg transition-colors"
          onClick={() => handleUpdateTaskState(task._id, 'IN_PROGRESS')}
        >
          Start Task
        </button>
      )}
      {task.state === 'IN_PROGRESS' && (
        <button
          className="px-4 py-2 border border-blue-500 text-blue-500 hover:bg-blue-500 hover:text-white rounded-lg transition-colors"
          onClick={() => handleUpdateTaskState(task._id, 'DONE')}
        >
          Complete Task
        </button>
      )}
      </div>
      ))}


      {selectedTask && <TaskView task={selectedTask} onClose={() => setSelectedTask(null)} />}
    </div>
  );
};

export default TaskList;
