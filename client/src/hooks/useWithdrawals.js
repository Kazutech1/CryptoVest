// src/hooks/useWithdrawals.js
import { useState, useEffect } from 'react';
import apiClient from '../utils/api';

export const useWithdrawals = () => {
  const [withdrawalRequests, setWithdrawalRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [createLoading, setCreateLoading] = useState(false);
  const [createError, setCreateError] = useState(null);
  const [createSuccess, setCreateSuccess] = useState(null);

  // Function to fetch user's withdrawal requests
  const fetchWithdrawalRequests = async () => {
    try {
      const response = await apiClient.get('/withdrawal/requests');
      setWithdrawalRequests(response.data);
      setError(null);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to fetch withdrawal requests');
    } finally {
      setLoading(false);
    }
  };

  // Function to create a new withdrawal request
  const createWithdrawalRequest = async (amount) => {
    setCreateLoading(true);
    setCreateError(null);
    setCreateSuccess(null);
    try {
      const response = await apiClient.post('/withdrawal/request', { amount });
      setCreateSuccess(response.data.message);
      setCreateError(null);
      fetchWithdrawalRequests(); // Refresh withdrawal requests after creation
    } catch (err) {
      setCreateError(err.response?.data?.message || 'Failed to create withdrawal request');
    } finally {
      setCreateLoading(false);
    }
  };

  // Fetch withdrawal requests on component mount
  useEffect(() => {
    fetchWithdrawalRequests();
  }, []); // Empty dependency array means this effect runs only once after the initial render

  return {
    withdrawalRequests,
    loading,
    error,
    createWithdrawalRequest,
    createLoading,
    createError,
    createSuccess,
  };
};


