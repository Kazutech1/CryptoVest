import React, { createContext, useState, useEffect, useContext } from 'react';
import axios from 'axios';

// Create the Auth Context
const AuthContext = createContext();

// Export a custom hook to use the context
export const useAuth = () => {
  return useContext(AuthContext);
};

// Auth Provider Component
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null); // Stores the authenticated user (regular/admin)
  const [loading, setLoading] = useState(true); // Loading state during token verification

  // Function to log in the user (both regular & admin)
  const login = async (email, password) => {
    try {
      const response = await axios.post('http://localhost:5000/api/auth/login', { email, password });
      const { token, role } = response.data; // Assuming the backend returns a role ('admin' or 'user')

      localStorage.setItem('authToken', token);
      localStorage.setItem('Role', role);
      setUser({ token, role });

      return true;
    } catch (error) {
      console.error('Login Error:', error);
      return false;
    }
  };

  // Function to log out the user
  const logout = () => {
    localStorage.removeItem('authToken');
    localStorage.removeItem('Role');

    setUser(null);
  };

  // Function to check if the user is authenticated
  const isAuthenticated = () => {
    return !!localStorage.getItem('authToken');
  };

  // Function to check if the user is an admin
  const isAdmin = () => {
    return localStorage.getItem('Role') === "admin";
  };
  

  // Verify the token on component mount
  useEffect(() => {
    const verifyToken = async () => {
      const token = localStorage.getItem('authToken');

      if (token) {
        try {
          const response = await axios.get('http://localhost:5000/api/auth/verify', {
            headers: { Authorization: `Bearer ${token}` },
          });

          // Set user with role
          setUser({ token, role: response.data.role });
        } catch (error) {
          console.error('Token Verification Failed:', error);
          localStorage.removeItem('authToken');
        }
      }
      setLoading(false);
    };

    verifyToken();
  }, []);

  return (
    <AuthContext.Provider value={{ user, login, logout, isAuthenticated, isAdmin, loading }}>
      {children}
    </AuthContext.Provider>
  );
};
