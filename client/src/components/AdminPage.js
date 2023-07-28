import React, { useState, useEffect } from 'react';
import UserList from './UserList';
import axios from 'axios';
import EditUserModal from './EditUserModal';
import Header from './Header';
import sleep from '../utils';
import LoadingTemplate from './LoadingTemplate';
import ErrorTemplate from './ErrorTemplate';
const AdminPage = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedUser, setSelectedUser] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

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

  const handleUserUpdate = async (userPayload) => {

    const response = await authAxios.patch(`/users/${selectedUser._id}`, userPayload);
    const updatedUser = response.data;

    setUsers((prevUsers) =>
      prevUsers.map((user) => (user._id === updatedUser._id ? updatedUser : user))
    );
    console.log('Updated User Data:', updatedUser);
    handleCloseModal();
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
     <div className="container mx-auto py-10">
      <h1 className="text-3xl font-semibold mb-6">Admin Page</h1>
      <UserList users={users} onDeleteClick={handleDeleteUser} onEditClick={handleEditUser} />

      {isModalOpen && (
        <EditUserModal user={selectedUser} onClose={handleCloseModal} onUpdate={handleUserUpdate} />
      )}
     </div>
    </>
    
  );
};

export default AdminPage;
