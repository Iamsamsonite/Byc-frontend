 // C:/Users/HP/Desktop/desktop/bycfrontend/src/context/AuthContext.js
import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const checkAuth = async () => {
      const token = localStorage.getItem('token');
      if (token) {
        try {
          const response = await axios.get('https://byc-backend-hkgk.onrender.com/api/byc/auth/me', {
            headers: { Authorization: `Bearer ${token}` }
          });
          setUser(response.data);
          setIsAuthenticated(true);
          console.log('User authenticated:', response.data);
        } catch (error) {
          console.error('Auth check failed:', error.response?.data || error.message);
          localStorage.removeItem('token');
          setIsAuthenticated(false);
          setUser(null);
        }
      }
    };
    checkAuth();
  }, []);

  const login = async (emailAddress, password) => {
    try {
      const response = await axios.post('https://byc-backend-hkgk.onrender.com/api/byc/auth/login', {
        emailAddress,
        password
      });
      const { token, role } = response.data;
      localStorage.setItem('token', token);
      const userResponse = await axios.get('https://byc-backend-hkgk.onrender.com/api/byc/auth/me', {
        headers: { Authorization: `Bearer ${token}` }
      });
      setUser(userResponse.data);
      setIsAuthenticated(true);
      toast.success('Logged in successfully');
      navigate('/admin/dashboard');
    } catch (error) {
      console.error('Login error:', error.response?.data || error.message);
      toast.error(error.response?.data?.message || 'Login failed');
      throw error;
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    setIsAuthenticated(false);
    setUser(null);
    toast.success('Logged out successfully');
    navigate('/account');
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};


