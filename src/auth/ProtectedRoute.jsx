import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from './AuthContext';

const ProtectedRoute = ({ roles }) => {
  const { token, loading, hasRole } = useAuth();
  if (loading) return null; // could render a spinner
  if (!token) return <Navigate to="/admin/login" replace />;
  if (roles && !hasRole(roles)) return <Navigate to="/admin/login" replace />;
  return <Outlet />;
};

export default ProtectedRoute;