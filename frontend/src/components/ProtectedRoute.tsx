import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import LoadingSpinner from './LoadingSpinner';

const ProtectedRoute: React.FC = () => {
  const { isAuthenticated, isLoading } = useAuth();

  // If still loading, show the loading spinner
  if (isLoading) {
    return <LoadingSpinner />;
  }

  // If not authenticated after loading, redirect to login page
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  // Otherwise, render the protected child routes
  return <Outlet />;
};

export default ProtectedRoute; 