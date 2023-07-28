import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faTrashAlt, faEdit } from '@fortawesome/free-solid-svg-icons';
import RoleIcon from './RoleIcon';
import { FaUserAlt } from 'react-icons/fa';

const UserCard = ({ user, onEditClick, onDeleteClick }) => {

  return (
    <div className="bg-white rounded-lg shadow-md p-4">
      <div className="flex justify-between items-center mb-2">
        <h3 className="text-xl font-semibold"><FontAwesomeIcon className="mr-1" icon={faUser} /> {user.firstName} {user.lastName}</h3>
        <div className="flex">
          <button
            className="px-3 py-1 border border-blue-500 text-blue-500 hover:bg-blue-500 hover:text-white rounded-lg transition-colors mr-2"
            onClick={() => onEditClick(user)}
          >
            <FontAwesomeIcon icon={faEdit} />
          </button>
          <button
            className="px-3 py-1 border border-red-500 text-red-500 hover:bg-red-500 hover:text-white rounded-lg transition-colors mr-2"
            onClick={() => onDeleteClick(user._id)}
          >
            <FontAwesomeIcon icon={faTrashAlt} />
          </button>
        </div>
      </div>
      <RoleIcon role={user.role} />
    </div>
  );
};

export default UserCard;
