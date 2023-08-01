import React, { useState, useEffect } from 'react';
import UserList from './UserList';
import axios from 'axios';
import EditUserModal from './EditUserModal';
import Header from './Header';
import sleep from '../utils';
import LoadingTemplate from './LoadingTemplate';
import ErrorTemplate from './ErrorTemplate';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserPlus, faTasks, faCheckCircle, faUndo } from '@fortawesome/free-solid-svg-icons';
import AddUserModal from './AddUserModal';
import AddTaskModal from './AddTaskModal';

const AdminPage = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedUser, setSelectedUser] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showCreateUserModal, setShowCreateUserModal] = useState(false);
  const [showCreateTaskModal, setShowCreateTaskModal] = useState(false);
  const [inReviewTasks, setInReviewTasks] = useState([]);

  const authAxios = axios.create({
    baseURL: 'http://localhost:4000/api',
    headers: {
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    },
  });

  useEffect(() => {
    const fetchUsers = async () => {
      await sleep(1000);
      setLoading(true);
      try {
        const response = await authAxios.get('/users');
        console.log('Users:', response.data);
        setUsers(response.data);
      } catch (error) {
        setError(error);
        console.error('Error loading users:', error);
      }
      setLoading(false);
    };
    fetchUsers();
  }, []);

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await authAxios.get('/tasks');
        const tasks = response.data;
        const inReviewTasks = tasks.filter((task) => task.state === 'IN_REVIEW');
        setInReviewTasks(inReviewTasks);
      } catch (error) {
        console.error('Error loading tasks:', error);
      }
    };
    fetchTasks();
  }, []);

  const handleUpdateTaskState = async (taskId, newState) => {
    try {
      await authAxios.patch(`/tasks/${taskId}`, { state: newState });
      const updatedTasks = inReviewTasks.filter((task) => task._id !== taskId);
      setInReviewTasks(updatedTasks);

    } catch (error) {
      console.error('Error updating task state:', error);
    }
  };

  const handleDeleteUser = async (userId) => {
    try {
      await authAxios.delete(`/users/${userId}`);
      setUsers((prevUsers) => prevUsers.filter((user) => user._id !== userId));
    } catch (error) {
      console.error('Error deleting user:', error);
    }
  };

   const handleEditUser = (user) => {
    setSelectedUser(user);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setSelectedUser(null);
    setIsModalOpen(false);
  };

  const handleCloseAddUserModal = () => {
    setShowCreateUserModal(false);
  };

  const handleCloseAddTaskModal = () => {
    setShowCreateTaskModal(false);
  };

  const handleUserUpdate = async (userPayload) => {

    const response = await authAxios.patch(`/users/${selectedUser._id}`, userPayload);
    const updatedUser = response.data;

    setUsers((prevUsers) =>
      prevUsers.map((user) => (user._id === updatedUser._id ? updatedUser : user))
    );
    console.log('Updated User Data:', updatedUser);
    handleCloseModal();
  };

  const openCreateUserModal = () => {
    setShowCreateUserModal(true);
  };
  
  const closeCreateUserModal = () => {
    setShowCreateUserModal(false);
  };
  
  const openCreateTaskModal = () => {
    setShowCreateTaskModal(true);
  };
  
  const onAdd = async (userPayload) => {
    try {
      const response = await authAxios.post('/users', userPayload);
      const newUser = response.data;

      setUsers((prevUsers) => {
        const rolesOrder = { SUPER_ADMIN: 0, ADMIN: 1, USER: 2 };
  
        const updatedUsers = [...prevUsers, newUser].sort((a, b) => rolesOrder[a.role] - rolesOrder[b.role]);
  
        return updatedUsers;
      });
      
      

      closeCreateUserModal();
    } catch (error) {
      console.error('Error creating user:', error);
      setError(error);
    }
  };


  if (loading) {
    return <div> <LoadingTemplate /> </div>;
  }

  if (error) {
    return <div> <ErrorTemplate errorMessage={error.message}/> </div>
  }

  return (
    <>
     <Header />
     <div className="flex items-center justify-center mt-8">
        <button
          onClick={openCreateUserModal}
          className="px-4 py-2 border border-green-500 text-green-500 hover:bg-green-500 hover:text-white rounded-lg transition-colors mr-2"
        >
          <FontAwesomeIcon icon={faUserPlus} className="text-base mr-2" />
          Create User
        </button>

        <button
          onClick={openCreateTaskModal}
          className="px-4 py-2 border border-blue-500 text-blue-500 hover:bg-blue-500 hover:text-white rounded-lg transition-colors mr-2"
        >
          <FontAwesomeIcon icon={faTasks} className="text-base mr-2" />
          Create Task
        </button>
      </div>

     <div className="container mx-auto py-10">
      <h1 className="text-3xl font-semibold mb-6">Users:</h1>
      <UserList users={users} onDeleteClick={handleDeleteUser} onEditClick={handleEditUser} />

      {isModalOpen && (
        <EditUserModal user={selectedUser} onClose={handleCloseModal} onUpdate={handleUserUpdate} />
      )}
      <h2 className="text-2xl font-semibold mb-4 mt-8">Tasks In Review</h2>
      <div className="bg-white rounded-lg shadow-md p-4 grow">
        {inReviewTasks.length > 0 ? (
          <table className="w-full">
            <thead>
              <tr className="bg-gray-100">
                <th className="py-2 px-4 text-left">Title</th>
                <th className="py-2 px-4 text-left">Type</th>
                <th className="py-2 px-4 text-left">Due Date</th>
                <th className="py-2 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {inReviewTasks.map((task) => (
                <tr key={task._id} className="border-t border-gray-300">
                  <td className="py-2 px-4">{task.title}</td>
                  <td className="py-2 px-4">{task.type}</td>
                  <td className="py-2 px-4">{task.dueDate}</td>
                  <td className="py-2 px-4 text-right">
                    <button
                      className="px-4 py-2 border border-green-500 text-green-500 hover:bg-green-500 hover:text-white rounded-lg transition-colors mr-2"
                      onClick={() => handleUpdateTaskState(task._id, 'DONE')}
                    >
                      <FontAwesomeIcon icon={faCheckCircle} className="text-base mr-2" />
                      Mark as Done
                    </button>
                    <button
                      className="px-4 py-2 border border-blue-500 text-blue-500 hover:bg-blue-500 hover:text-white rounded-lg transition-colors"
                      onClick={() => handleUpdateTaskState(task._id, 'IN_PROGRESS')}
                    >
                      <FontAwesomeIcon icon={faUndo} className="text-base mr-2" />
                      Go Back to In Progress
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p className="text-gray-600">No tasks in review.</p>
        )}
      </div>
     </div>
     {showCreateUserModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white rounded-lg shadow-md p-4 max-w-md">
          <AddUserModal onAdd={onAdd} onCloseModal={handleCloseAddUserModal} />
          </div>
        </div>
      )}

      {showCreateTaskModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white rounded-lg shadow-md p-4 max-w-md">
          <AddTaskModal onClose={handleCloseAddTaskModal} users={users} />
          </div>
        </div>
      )}
      
    </>
    
  );
};

export default AdminPage;
