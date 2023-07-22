import React, { useState } from 'react';
import TaskView from './TaskView';

const TaskList = ({ tasks }) => {
  const [selectedTask, setSelectedTask] = useState(null);

  const handleTaskClick = (task) => {
    setSelectedTask(task);
  };

  return (
    <div>
      {tasks.map((task) => (
        <div key={task.id} className="task-item" onClick={() => handleTaskClick(task)}>
          <h3>{task.title}</h3>
          <p>Type: {task.type}</p>
          <p>Due Date: {task.dueDate}</p>
        </div>
      ))}

      {selectedTask && <TaskView task={selectedTask} onClose={() => setSelectedTask(null)} />}
    </div>
  );
};

export default TaskList;
