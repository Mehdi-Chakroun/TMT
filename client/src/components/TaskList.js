import React, { useState } from 'react';
import TaskView from './TaskView';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faPlay, faCheck, faTimes, faReply, faClock } from '@fortawesome/free-solid-svg-icons';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import '../css/styles.css';
import TypeIcon from './TypeIcon';


const TaskList = ({ tasks, updateTaskState }) => {
  const [selectedTask, setSelectedTask] = useState(null);
  const handleTaskClick = (task) => {
    setSelectedTask(task);
  };
  const handleUpdateTaskState = async (taskId, newState) => {
    await updateTaskState(taskId, newState);
  };
  const formattedDueDate = (dueDate) => {
    return new Date(dueDate).toLocaleString('en-US', {
      year: 'numeric',
      month: 'numeric',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className="min-w-200">
      {tasks.length === 0 && <p className="text-center italic">No tasks to show</p>}
      <TransitionGroup component={null}>
        {tasks.map((task) => (
          <CSSTransition key={task._id} classNames="task" timeout={300}>
            <div key={task._id} className="border rounded-lg p-4 mb-4">
              <div className="flex justify-between items-center mb-2">
                <h3 className="text-xl font-semibold text-black">{task.title}</h3>
                <div className='flex'>
                  <button
                    className={`px-2 py-1 border border-black-500 text-black-500 hover:text-white rounded-lg transition-colors ${
                      task.state === 'TODO' ? 'hover:bg-purple-500' : ''} ${
                      task.state === 'IN_PROGRESS' ? 'hover:bg-yellow-500' : ''} ${
                      task.state === 'IN_REVIEW' ? 'hover:bg-blue-500' : ''} ${
                      task.state === 'DONE' ? 'hover:bg-green-500' : ''}`}
                    onClick={() => handleTaskClick(task)}
                  >
                    
                    <FontAwesomeIcon icon={faEye} />
                  </button>
                  
                  {task.state === 'TODO' && (
                    <button
                      className="px-2 py-1 border border-black-500 text-black-500 hover:bg-purple-500 hover:text-white rounded-lg transition-colors ml-2"
                      onClick={() => handleUpdateTaskState(task._id, 'IN_PROGRESS')}
                    >
                      <FontAwesomeIcon icon={faPlay} />
                    </button>
                  )}
                  {task.state === 'IN_PROGRESS' && (
                    <>
                      <button
                        className="px-2 py-1 border border-black-500 text-black-500 hover:bg-yellow-500 hover:text-white rounded-lg transition-colors ml-2"
                        onClick={() => handleUpdateTaskState(task._id, 'IN_REVIEW')}
                      >
                        <FontAwesomeIcon icon={faCheck} />
                      </button>
                      <button
                        className="px-2 py-1 border border-black-500 text-black-500 hover:bg-yellow-500 hover:text-white rounded-lg transition-colors ml-2"
                        onClick={() => handleUpdateTaskState(task._id, 'TODO')}
                      >
                        <FontAwesomeIcon icon={faTimes} />
                      </button>
                    </>
                  )}
                  {task.state === 'IN_REVIEW' && (
                    <button
                      className="px-2 py-1 border border-black-500 text-black-500 hover:bg-blue-500 hover:text-white rounded-lg transition-colors ml-2"
                      onClick={() => handleUpdateTaskState(task._id, 'IN_PROGRESS')}
                    >
                      <FontAwesomeIcon icon={faReply} />
                    </button>
                  )}
                </div>
              </div>
              <p className="text-gray-600 mb-1"><TypeIcon type={task.type}/> {task.type} </p>
              <p className="text-gray-600 mb-1"> <FontAwesomeIcon icon={faClock} /> {formattedDueDate(task.dueDate)}</p>
            </div>
          </CSSTransition>
        ))}
      </TransitionGroup>
      {selectedTask && <TaskView task={selectedTask} onClose={() => setSelectedTask(null)} />}
  
    </div>
  );
};

export default TaskList;
