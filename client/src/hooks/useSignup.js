// import { useState } from 'react';
// import axios from 'axios';

// const useSignup = () => {
//   const [loading, setLoading] = useState(false); // Indicates if the signup is in progress
//   const [error, setError] = useState(''); // Stores any error messages
//   const [successMessage, setSuccessMessage] = useState(''); // Stores success messages

//   // Function to handle user signup
//   const signup = async (username, email, password, referredBy, isAdmin) => {
//     try {
//       // Set loading state to true
//       setLoading(true);
//       setError(''); // Clear any previous errors
//       setSuccessMessage(''); // Clear any previous success messages

//       // Prepare the request body
//       const requestBody = {
//         username,
//         email,
//         password,
//         referredBy: referredBy || null, // Optional referral code
//         isAdmin: isAdmin || false, // Default to false unless specified
//       };

//       // Send the POST request to the backend
//       const response = await axios.post('http://localhost:5000/api/auth/register', requestBody);

//       // Handle the response
//       if (response.status === 201) {
//         setSuccessMessage('User registered successfully');
//         return response.data;
//       }
//     } catch (error) {
//       // Handle errors
//       console.error('Signup Error:', error);
//       if (error.response && error.response.data && error.response.data.message) {
//         setError(error.response.data.message);
//         console.log(error)

//       } else {
//         setError('An unexpected error occurred.');
//       }
//     } finally {
//       // Reset loading state
//       setLoading(false)
//     }
//   };

//   return { signup, loading, error, successMessage };
// };

// export default useSignup;


import { useState } from "react";
import axios from "axios";

const useRegister = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  const registerUser = async ({ username, email, password, referredBy }) => {
    setLoading(true);
    setError(null);
    setSuccess(null);

    try {
      const response = await axios.post("/api/auth/register", {
        username,
        email,
        password,
        referredBy,
      });

      setSuccess(response.data.message);
      return response.data;
    } catch (err) {
      setError(err.response?.data?.message || "Registration failed");
      return null;
    } finally {
      setLoading(false);
    }
  };

  return { registerUser, loading, error, success };
};

export default useRegister;
