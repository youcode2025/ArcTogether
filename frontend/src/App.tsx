import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Events from './HomePage';
import RewardPage from './pages/RewardPage';
import LoginPage from './pages/LoginPage';
import ProtectedRoute from './components/ProtectedRoute';
import { AuthProvider } from './contexts/AuthContext';
import Event from './pages/Event';

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          {/* Public route - login page */}
          <Route path="/login" element={<LoginPage />} />
          
          {/* Protected routes - require authentication */}
          <Route element={<ProtectedRoute />}>
            <Route path="/" element={<Events />} />
            <Route path="/reward" element={<RewardPage />} />
            <Route path="/event/:id" element={<Event />} />
          </Route>
          
          {/* Redirect any unknown routes to login */}
          <Route path="*" element={<Navigate to="/login" replace />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
