import { useState, useEffect } from 'react';
import apiClient from '../utils/api';

const useAdminActions = (token) => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Fetch all users
  const fetchUsers = async () => {
    setLoading(true);
    try {
      const response = await apiClient.get('/admin/users')
       
      setUsers(response.data);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to fetch users');
    } finally {
      setLoading(false);
    }
  };

  // Update a user
  const updateUser = async (id, userData) => {
    setLoading(true);
    try {
      const response = await apiClient.put(`/admin/users/${id}`, userData, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setUsers((prevUsers) => prevUsers.map(user => (user._id === id ? response.data : user)));
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to update user');
    } finally {
      setLoading(false);
    }
  };

  // Delete a user
  const deleteUser = async (id) => {
    setLoading(true);
    try {
      await apiClient.delete(`/admin/users/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setUsers((prevUsers) => prevUsers.filter(user => user._id !== id));
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to delete user');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
   
      fetchUsers();
    
  }, []);

  return { users, loading, error, fetchUsers, updateUser, deleteUser };
};

export default useAdminActions;
