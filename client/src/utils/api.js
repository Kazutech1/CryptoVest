// src/utils/api.js
import axios from 'axios';

const API_URL = '/api'; // Adjust as needed

const apiClient = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Function to get JWT token from localStorage
const getToken = () => {
  return localStorage.getItem('authToken');
};

// Interceptor to add the JWT token to the request headers
apiClient.interceptors.request.use((config) => {
  const token = getToken();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
}, (error) => {
  return Promise.reject(error);
});

export default apiClient;