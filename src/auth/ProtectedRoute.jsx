import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "./AuthContext";

const ProtectedRoute = ({ roles }) => {
  const { token, loading, hasRole } = useAuth();

  // While checking token & role
  if (loading) {
    return <div style={{ padding: 20 }}>Loading...</div>;
  }

  // Not logged in → redirect to admin login
  if (!token) {
    return <Navigate to="/admin/login" replace />;
  }

  // Role mismatch → no permission
  if (roles && !hasRole(roles)) {
    return <Navigate to="/admin/login" replace />;
  }

  // Authorized → load nested admin routes
  return <Outlet />;
};

export default ProtectedRoute;
