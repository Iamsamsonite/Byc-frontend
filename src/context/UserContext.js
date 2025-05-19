import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify'; // Switch to react-toastify

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const userData = localStorage.getItem('user');
    return userData ? JSON.parse(userData) : null;
  });
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    return !!localStorage.getItem('token');
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          console.log('UserContext: No token found');
          setIsAuthenticated(false);
          setUser(null);
          setLoading(false);
          return;
        }

        const res = await axios.get('https://byc-backend-hkgk.onrender.com/api/byc/auth/me', {
          headers: { Authorization: `Bearer ${token}` },
          timeout: 5000,
        });
        console.log('UserContext: Fetched user:', res.data);
        const fetchedUser = {
          _id: res.data._id,
          email: res.data.emailAddress,
          name: res.data.name,
          role: res.data.role || 'user',
        };
        localStorage.setItem('user', JSON.stringify(fetchedUser));
        setUser(fetchedUser);
        setIsAuthenticated(true);
        setLoading(false);
      } catch (err) {
        console.error('UserContext: Error checking auth:', err.response?.data || err.message);
        if (err.response?.status === 401 || err.response?.status === 400) {
          localStorage.removeItem('token');
          localStorage.removeItem('user');
          setIsAuthenticated(false);
          setUser(null);
          toast.error(err.response?.data?.message || 'Session expired, please log in again', {
            autoClose: 4000,
          });
        } else {
          toast.error('Failed to verify session, please try again', { autoClose: 4000 });
        }
        setLoading(false);
      }
    };
    checkAuth();
  }, []);

  const login = async (email, password) => {
    try {
      const res = await axios.post('https://byc-backend-hkgk.onrender.com/api/byc/auth/login', {
        emailAddress: email,
        password,
      });
      const { token, user } = res.data;
      if (!user?._id) {
        console.error('UserContext: Login response missing user._id:', user);
        throw new Error('Invalid user data');
      }
      const userInfo = {
        _id: user._id,
        email: user.emailAddress,
        name: user.name,
        role: user.role || 'user',
      };
      localStorage.setItem('token', token);
      localStorage.setItem('user', JSON.stringify(userInfo));
      setUser(userInfo);
      setIsAuthenticated(true);
      console.log('UserContext: Logged in:', userInfo);
      toast.success('Logged in successfully', { autoClose: 4000 });
      return true;
    } catch (err) {
      console.error('UserContext: Login error:', err.response?.data || err.message);
      toast.error(err.response?.data?.message || 'Login failed', { autoClose: 4000 });
      return false;
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setUser(null);
    setIsAuthenticated(false);
    toast.success('Logged out successfully', { autoClose: 4000 });
  };

  return (
    <UserContext.Provider
      value={{ user, isAuthenticated, setUser, setIsAuthenticated, login, logout, loading }}
    >
      {children}
    </UserContext.Provider>
  );
};