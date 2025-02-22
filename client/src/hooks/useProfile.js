import { useState, useEffect } from 'react';
import apiClient from '../utils/api';

const useProfile = () => {
  const [profile, setProfile] = useState({ walletAddress: '' });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);

  const fetchProfile = async () => {
    try {
      const response = await apiClient.get('/profile');
      setProfile(response.data);
      setError(null);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to fetch profile');
    } finally {
      setLoading(false);
    }
  };

  const updateProfile = async (newData) => {
    try {
      const response = await apiClient.post('/profile', newData); // Change to POST
      setProfile(response.data.user);
      setSuccessMessage('Wallet address updated successfully');
      setError(null);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to update wallet address');
    }
  };

  useEffect(() => {
    fetchProfile();
  }, []);

  return { profile, loading, error, successMessage, updateProfile, setProfile };
};

export default useProfile;
