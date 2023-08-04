import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faListAlt, faCheck, faTasks, faTimes } from '@fortawesome/free-solid-svg-icons';

const TaskIcon = ({ state }) => {
  const getIconForStatus = () => {
    switch (state) {
      case 'IN_PROGRESS':
        return faListAlt;
      case 'DONE':
        return faCheck;
      case 'TODO':
        return faTasks;
      default:
        return faTimes;
    }
  };

  return (
    <FontAwesomeIcon icon={getIconForStatus()} className="text-base" />
  );
};

export default TaskIcon;
