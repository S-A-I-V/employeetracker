import React from 'react';
import { Navigate } from 'react-router-dom';

const PrivateRoute = ({ children }) => {
  const isAdmin = localStorage.getItem('isAdmin') === 'true';

  // If the user is not admin, redirect to login page
  return isAdmin ? children : <Navigate to="/admin-login" />;
};

export default PrivateRoute;
