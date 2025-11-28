import React, { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { getToken, getRole, saveAuth, clearAuth } from './storage';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(null);
  const [role, setRole] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const existingToken = getToken();
    const existingRole = getRole();
    if (existingToken) setToken(existingToken);
    if (existingRole) setRole(existingRole);
    setLoading(false);
  }, []);

  const login = async ({ username, password }) => {
    // Placeholder: replace with API call to Node backend
    // Example: const { token, role } = await authService.login(username, password);
    // For now, accept a single hardcoded admin credential
    const isAdmin = username === 'admin' && password === 'admin123';
    const isEditor = username === 'editor' && password === 'editor123';
    if (!isAdmin && !isEditor) {
      throw new Error('Invalid credentials');
    }
    const issuedToken = `demo-token-${Date.now()}`;
    const issuedRole = isAdmin ? 'admin' : 'editor';
    saveAuth({ token: issuedToken, role: issuedRole });
    setToken(issuedToken);
    setRole(issuedRole);
    return { token: issuedToken, role: issuedRole };
  };

  const logout = () => {
    clearAuth();
    setToken(null);
    setRole(null);
  };

  const hasRole = (required) => {
    if (!required) return !!token;
    if (!role) return false;
    if (Array.isArray(required)) return required.includes(role);
    return role === required;
  };

  const value = useMemo(() => ({ token, role, loading, login, logout, hasRole }), [token, role, loading]);
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
};