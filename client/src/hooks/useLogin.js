// src/hooks/useLogin.js
import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export const useLogin = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);
  const navigate = useNavigate();

  const login = async (userData) => {
    setIsLoading(true);
    setError(null);
    setSuccessMessage(null);

    try {
      const response = await axios.post('http://localhost:5000/api/auth/login', userData);
      setSuccessMessage(response.data.message);
      // Save the token to local storage or context
      localStorage.setItem('token', response.data.token);
      // Redirect to the dashboard
      navigate('/dashboard');
    } catch (err) {
      if (err.response) {
        setError(err.response.data.message);
      } else {
        setError('An unexpected error occurred');
      }
    } finally {
      setIsLoading(false);
    }
  };

  return { isLoading, error, successMessage, login };
};