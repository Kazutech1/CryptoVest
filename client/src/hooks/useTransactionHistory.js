// src/hooks/useTransactions.js
import { useState, useEffect } from 'react';
import apiClient from '../utils/api';

const useTransactions = () => {
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null); 

  // Function to fetch user's transactions
  const fetchTransactions = async () => {
    try {
      const response = await apiClient.get('/profile/history');
      setTransactions(response.data);
      setError(null);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to fetch transactions');
    } finally {
      setLoading(false);
    }
  };

  // Fetch transactions on component mount
  useEffect(() => {
    fetchTransactions();
  }, []); // Empty dependency array means this effect runs only once after the initial render

  return {
    transactions,
    loading,
    error,
  };
};

export default useTransactions;