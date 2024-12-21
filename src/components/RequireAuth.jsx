import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { UserContext } from './UserContextProvider';

export default function RequireAuth({ children }) {
  const { user, loading } = useContext(UserContext);
if (loading) {
  return
}
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return children;
}
