import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { UserContext } from '../context/UserContext';

const ProtectedRoute = ({ children }) => {
  const context = useContext(UserContext);

  if (!context) {
    console.error('UserContext is undefined. Ensure UserProvider is wrapping the component tree.');
    return <Navigate to="/account" />;
  }

  const { isAuthenticated } = context;

  return isAuthenticated ? children : <Navigate to="/account" />;
};

export default ProtectedRoute;