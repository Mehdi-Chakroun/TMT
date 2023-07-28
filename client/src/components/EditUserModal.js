import React, { useState } from 'react';

const EditUserModal = ({ user, onClose, onUpdate }) => {
    const [username, setUsername] = useState(user.username);
    const [firstName, setFirstName] = useState(user.firstName);
    const [lastName, setLastName] = useState(user.lastName);
    const [role, setRole] = useState(user.role);

    
    const currentUserRole = localStorage.getItem('role');
    console.log('currentUserRole: ', currentUserRole);
    console.log('user.role: ', user.role);
    const handleUsernameChange = (event) => {
      setUsername(event.target.value);
    };
  
    const handleFirstNameChange = (event) => {
      setFirstName(event.target.value);
    };
  
    const handleLastNameChange = (event) => {
      setLastName(event.target.value);
    };
  
    const handleRoleChange = (event) => {
      setRole(event.target.value);
    };
  
    const handleSubmit = (event) => {
      event.preventDefault();
      // Perform the update here with the updated user data
      onUpdate({
        username,
        firstName,
        lastName,
        role,
      });
      onClose();
    };
  
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
        <div className="bg-white rounded-lg shadow-md p-4 max-w-md">
          <h2 className="text-2xl font-semibold mb-4">Edit User</h2>
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label htmlFor="username" className="block text-sm font-medium text-gray-700">
                Username
              </label>
              <input
                type="text"
                id="username"
                className="mt-1 focus:ring-blue-500 focus:border-blue-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                value={username}
                onChange={handleUsernameChange}
                required
              />
            </div>
            <div className="mb-4">
              <label htmlFor="firstName" className="block text-sm font-medium text-gray-700">
                First Name
              </label>
              <input
                type="text"
                id="firstName"
                className="mt-1 focus:ring-blue-500 focus:border-blue-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                value={firstName}
                onChange={handleFirstNameChange}
                required
              />
            </div>
            <div className="mb-4">
              <label htmlFor="lastName" className="block text-sm font-medium text-gray-700">
                Last Name
              </label>
              <input
                type="text"
                id="lastName"
                className="mt-1 focus:ring-blue-500 focus:border-blue-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                value={lastName}
                onChange={handleLastNameChange}
                required
              />
            </div>
            {currentUserRole === 'SUPER_ADMIN' && (
              <div className="mb-4">
                <span className="block text-sm font-medium text-gray-700">Role</span>
                <div className="mt-1">
                  <label className="inline-flex items-center">
                    <input
                      type="radio"
                      className="form-radio text-blue-500 focus:ring-blue-500"
                      value="ADMIN"
                      checked={role === 'ADMIN'}
                      onChange={handleRoleChange}
                    />
                    <span className="ml-2">Admin</span>
                  </label>
                  <label className="inline-flex items-center ml-6">
                    <input
                      type="radio"
                      className="form-radio text-blue-500 focus:ring-blue-500"
                      value="USER"
                      checked={role === 'USER'}
                      onChange={handleRoleChange}
                    />
                    <span className="ml-2">User</span>
                  </label>
                </div>
              </div>
            )}
            <div className="flex justify-end">
              <button
                type="button"
                className="mr-4 px-4 py-2 border border-gray-500 text-gray-500 hover:bg-gray-500 hover:text-white rounded-lg transition-colors"
                onClick={onClose}
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 border border-blue-500 text-blue-500 hover:bg-blue-500 hover:text-white rounded-lg transition-colors"
              >
                Save Changes
              </button>
            </div>
          </form>
        </div>
      </div>
    );
};

export default EditUserModal;
