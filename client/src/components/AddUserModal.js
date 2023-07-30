import React, {useState} from 'react';

const AddUserModal = ({onAdd, onCloseModal }) => {
    const [newUsername, setNewUsername] = useState('');
    const [newFirstName, setNewFirstName] = useState('');
    const [newLastName, setNewLastName] = useState('');
    const [newRole, setNewRole] = useState('USER');
    const [newPassword, setNewPassword] = useState('');
    const currentUserRole = localStorage.getItem('role');

    const onNewUsernameChange = (event) => {
        setNewUsername(event.target.value);
    };

    const onNewFirstNameChange = (event) => {
        setNewFirstName(event.target.value);
    };
    
    const onNewLastNameChange = (event) => {
        setNewLastName(event.target.value);
    };

    const onNewRoleChange = (event) => {
        setNewRole(event.target.value);
    };

    const onNewPasswordChange = (event) => {
        setNewPassword(event.target.value);
    };

    const onClose = () => {
        onCloseModal();
    };

    const onSubmit = async (event) => {
        event.preventDefault();
        await onAdd({
            username: newUsername,
            password: newPassword,
            firstName: newFirstName,
            lastName: newLastName,
            role: newRole
        });
    };
    
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white rounded-lg shadow-md p-4 max-w-md">
        <h2 className="text-2xl font-semibold mb-4">Add User</h2>
        <form onSubmit={onSubmit}>
          <div className="mb-4">
            <label htmlFor="newUsername" className="block text-sm font-medium text-gray-700">
              Username
            </label>
            <input
              type="text"
              id="newUsername"
              className="mt-1 focus:ring-blue-500 focus:border-blue-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
              value={newUsername}
              onChange={onNewUsernameChange}
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="newFirstName" className="block text-sm font-medium text-gray-700">
              First Name
            </label>
            <input
              type="text"
              id="newFirstName"
              className="mt-1 focus:ring-blue-500 focus:border-blue-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
              value={newFirstName}
              onChange={onNewFirstNameChange}
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="newLastName" className="block text-sm font-medium text-gray-700">
              Last Name
            </label>
            <input
              type="text"
              id="newLastName"
              className="mt-1 focus:ring-blue-500 focus:border-blue-200 block w-full shadow-sm sm:text-sm border-blue-300 rounded-md items-center"
              value={newLastName}
              onChange={onNewLastNameChange}
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="newPassword" className="block text-sm font-medium text-gray-700">
                Password
            </label>
            <input
                type="password"
                id="newPassword"
                className="mt-1 focus:ring-blue-500 focus:border-blue-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                value={newPassword}
                onChange={onNewPasswordChange}
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
                    className="form-radio text-green-500 focus:ring-green-500"
                    value="ADMIN"
                    checked={newRole === 'ADMIN'}
                    onChange={onNewRoleChange}
                  />
                  <span className="ml-2 text-green-500">Admin</span>
                </label>
                <label className="inline-flex items-center ml-6">
                  <input
                    type="radio"
                    className="form-radio text-yellow-600 focus:ring-yellow-500"
                    value="USER"
                    checked={newRole === 'USER'}
                    onChange={onNewRoleChange}
                  />
                  <span className="ml-2 text-yellow-600">User</span>
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
              Save User
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddUserModal;
