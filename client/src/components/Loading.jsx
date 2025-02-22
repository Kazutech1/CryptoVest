// src/components/LoadingSpinner.jsx
import React from 'react';

export const LoadingSpinner = () => {
  return (
    <div className=" bg-gradient-to-br from-gray-900 via-blue-900 to-gray-900  min-h-screen flex justify-center items-center">
      <div className="w-12 h-12 border-4 border-blue-500 border-solid border-t-transparent rounded-full animate-spin"></div>
    </div>
  ); 
};
