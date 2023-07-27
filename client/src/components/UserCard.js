import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faTrashAlt, faEdit } from '@fortawesome/free-solid-svg-icons';

const UserCard = ({ user, onDelete, onEdit }) => {
  const [selectedUser, setSelectedUser] = useState(null);

  return (
    <div className="bg-white rounded-lg shadow-md p-4">
      <div className="flex justify-between items-center mb-2">
        <h3 className="text-xl font-semibold"><FontAwesomeIcon className="mr-1" icon={faUser} /> {user.firstName} {user.lastName}</h3>
        <div className="flex">
          <button
            className="px-3 py-1 border border-blue-500 text-blue-500 hover:bg-blue-500 hover:text-white rounded-lg transition-colors mr-2"
            onClick={() => onEdit(user._id)}
          >
            <FontAwesomeIcon icon={faEdit} />
          </button>
          <button
            className="px-3 py-1 border border-red-500 text-red-500 hover:bg-red-500 hover:text-white rounded-lg transition-colors mr-2"
            onClick={() => onDelete(user._id)}
          >
            <FontAwesomeIcon icon={faTrashAlt} />
          </button>
        </div>
      </div>
      <p className="text-gray-600 mb-1">Username: {user.username}</p>
      <p className="text-gray-600 mb-1">Role: {user.role}</p>
    </div>
  );
};

export default UserCard;
