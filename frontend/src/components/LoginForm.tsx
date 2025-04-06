import React, { useState } from 'react';
import { Eye, EyeOff, LogIn, User, Lock } from "lucide-react";
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const LoginForm = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const navigate = useNavigate();
  const { login } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');
    setSuccessMessage('');

    if (!username || !password) {
      setErrorMessage('Please enter both username and password.');
      return;
    }

    setIsLoading(true);

    try {
      // Simulate login delay
      await new Promise(resolve => setTimeout(resolve, 1500));

      // For demo purposes, any username/password combination works
      // In a real app, you would validate with a backend
      const userData = {
        id: '1',
        name: username,
        points: 150,
        activitiesHosted: [],
        activitiesJoined: [],
        skills: '',
      };

      // Use the login function from AuthContext
      login(userData);
      
      setSuccessMessage('Login successful! Welcome back.');
      
      // Small delay for showing success message before redirect
      await new Promise(resolve => setTimeout(resolve, 500));
      navigate('/');
    } catch (error) {
      setErrorMessage('Login failed. Please check your credentials and try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="backdrop-blur-xl bg-white/20 border border-white/30 shadow-xl animate-fade-in overflow-hidden rounded-lg max-w-md mx-auto">
      <div className="absolute inset-0 bg-gradient-to-br from-emerald-50/30 to-blue-50/20 opacity-50 z-0"></div>
      <div className="relative z-10 space-y-1 flex flex-col items-center justify-center pt-8 mb-5">
        <div className="w-40 h-40 mb-0 drop-shadow-lg">
          <img
            src="https://1000logos.net/wp-content/uploads/2022/05/Arcteryx-Logo.png"
            alt="Arcteryx Logo"
            className="w-full h-full object-contain"
          />
        </div>
        <h2 className="text-2xl font-bold text-center text-gray-900 drop-shadow-sm"> Arc'Together </h2>
        <p className="text-center text-gray-700">
          Enter your credentials to access your adventure
        </p>
      </div>
      <div className="relative z-10 pb-2 px-6">
        <form onSubmit={handleSubmit} className="space-y-4">
          {errorMessage && (
            <div className="text-red-500 text-sm text-center">{errorMessage}</div>
          )}
          {successMessage && (
            <div className="text-green-500 text-sm text-center">{successMessage}</div>
          )}
          <div className="space-y-2">
            <div className="relative">
              <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
                <User className="h-5 w-5 text-white" />
              </div>
              <input
                type="text"
                placeholder="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="pl-10 py-3 w-full backdrop-blur-sm bg-white/20 border border-white/30 focus:border-blue-400 
                          focus:ring-blue-500 transition-all hover:bg-white/30 text-gray-800 placeholder:text-gray-500  rounded-md"
              />
            </div>
          </div>
          <div className="space-y-2">
            <div className="relative">
              <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
                <Lock className="h-5 w-5 text-white" />
              </div>
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="pl-10 pr-10 py-3 w-full backdrop-blur-sm bg-white/20 border border-white/30 focus:border-blue-400 
                          focus:ring-blue-500 transition-all hover:bg-white/30 text-gray-800 placeholder:text-gray-500 rounded-md"
              />
              <button
                type="button"
                onClick={toggleShowPassword}
                className="absolute inset-y-0 right-0 flex items-center pr-3 text-white/70 hover:text-white"
              >
                {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
              </button>
            </div>
          </div>
          <button
            type="submit"
            className="w-full py-3 bg-gray-800/90 hover:bg-gray-900/90 
                      text-white font-medium rounded-md transition-all duration-200 flex items-center justify-center group backdrop-blur-sm"
            disabled={isLoading}
          >
            {isLoading ? (
              <div className="h-5 w-5 border-t-2 border-b-2 border-white rounded-full animate-spin" />
            ) : (
              <>
                Sign In
                <LogIn className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </>
            )}
          </button>
        </form>
      </div>
      <div className="relative z-10 flex flex-col space-y-2 pt-0 text-sm text-center px-6 pb-6">
        <div className="flex items-center justify-center space-x-1 my-4">
          <span className="text-white/80">Don't have an account?</span>
          <button className="p-0 text-blue-300 hover:text-blue-200 underline">
            Sign up
          </button>
        </div>
        <button className="p-0 text-white/70 hover:text-white text-sm underline">
          Forgot password?
        </button>
      </div>
    </div>
  );
};

export default LoginForm;