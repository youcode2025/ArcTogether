import React from 'react';

const LoadingSpinner: React.FC = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50">
      <div className="relative">
        <div className="h-16 w-16 border-t-4 border-b-4 border-gray-800 rounded-full animate-spin"></div>
        <div className="mt-4 text-gray-700 text-center font-medium">Loading...</div>
      </div>
    </div>
  );
};

export default LoadingSpinner; 