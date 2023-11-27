import React from 'react'
import { useSelector } from 'react-redux'
import { selectIsAuthenticated } from '../features/profile/profileSlice'
import { Navigate, Route } from 'react-router-dom';

const PrivateRoute  = ({ element, ...props })  => {
  const isAuthenticated = useSelector(selectIsAuthenticated);

  return isAuthenticated ? <Route {...props} element={element} /> : <Navigate to="/login" />;
};

export default PrivateRoute


