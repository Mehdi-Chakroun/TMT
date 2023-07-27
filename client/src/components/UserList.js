import React from 'react';
import UserCard from './UserCard';

const UserList = ({ users, onEditClick, onDeleteClick }) => {
  return (
    <div className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {users.map((user) => (
        <UserCard key={user._id} user={user} onEditClick={onEditClick} onDeleteClick={onDeleteClick} />
      ))}
    </div>
  );
};

export default UserList;
