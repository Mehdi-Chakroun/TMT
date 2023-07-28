import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faTrashAlt, faEdit } from '@fortawesome/free-solid-svg-icons';
import RoleIcon from './RoleIcon';

const UserCard = ({ user, onEditClick, onDeleteClick }) => {
  const currentUserRole = localStorage.getItem('role');
  console.log('currentUserRole: ', currentUserRole);
  console.log('user.role: ', user.role);
  return (
    <div className="bg-white rounded-lg shadow-md p-4">
      <div className="flex justify-between items-center mb-2">
        <h3 className="text-xl font-semibold"><FontAwesomeIcon className="mr-1" icon={faUser} /> {user.firstName} {user.lastName}</h3>
        { ((currentUserRole === 'ADMIN' && user.role === 'USER') || (currentUserRole === 'SUPER_ADMIN' && user.role !== 'SUPER_ADMIN')) &&
          
          <div className="flex">
          <button
            className="px-2 py-1 text-blue-500 hover:bg-blue-500 hover:text-white rounded-lg transition-colors mr-2"
            onClick={() => onEditClick(user)}
          >
            <FontAwesomeIcon icon={faEdit} />
          </button>
          <button
            className="px-2 py-1 text-red-500 hover:bg-red-500 hover:text-white rounded-lg transition-colors mr-2"
            onClick={() => onDeleteClick(user._id)}
          >
            <FontAwesomeIcon icon={faTrashAlt} />
          </button>
        </div>
        }
        
      </div>
      <RoleIcon role={user.role} />
    </div>
  );
};

export default UserCard;
