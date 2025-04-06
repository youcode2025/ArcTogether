import React, { createContext, useState, useContext, useEffect, ReactNode } from 'react';
import { User } from '../types';

interface AuthContextType {
  isAuthenticated: boolean;
  user: User | null;
  login: (user: User) => void;
  logout: () => void;
  updateUser: (user: User) => void;
  isLoading: boolean;
}

const defaultUser: User = {
  id: '1',
  name: 'John Doe',
  points: 150,
  activitiesHosted: [],
  activitiesJoined: [],
  skills: '',
};

const AuthContext = createContext<AuthContextType>({
  isAuthenticated: false,
  user: null,
  login: () => {},
  logout: () => {},
  updateUser: () => {},
  isLoading: true,
});

export const useAuth = () => useContext(AuthContext);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  // Check if user is already logged in on mount
  useEffect(() => {
    const loadUserFromStorage = () => {
      const savedUser = localStorage.getItem('user');
      const savedAuthStatus = localStorage.getItem('isAuthenticated');
      
      if (savedUser && savedAuthStatus === 'true') {
        setUser(JSON.parse(savedUser));
        setIsAuthenticated(true);
      }
      
      // Set loading to false once we've checked localStorage
      setIsLoading(false);
    };

    // Load initial state
    loadUserFromStorage();

    // Listen for storage events (for cross-tab synchronization)
    const handleStorageChange = () => {
      loadUserFromStorage();
    };

    window.addEventListener('storage', handleStorageChange);
    
    // Cleanup listener
    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  }, []);

  const login = (userData: User) => {
    setUser(userData);
    setIsAuthenticated(true);
    localStorage.setItem('user', JSON.stringify(userData));
    localStorage.setItem('isAuthenticated', 'true');
  };

  const updateUser = (userData: User) => {
    setUser(userData);
    localStorage.setItem('user', JSON.stringify(userData));
  };

  const logout = () => {
    setUser(null);
    setIsAuthenticated(false);
    localStorage.removeItem('user');
    localStorage.removeItem('isAuthenticated');
    // Also clear joined events since they are user-specific
    localStorage.removeItem('joinedEvents');
  };

  const value = {
    isAuthenticated,
    user,
    login,
    logout,
    updateUser,
    isLoading,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export default AuthContext; 