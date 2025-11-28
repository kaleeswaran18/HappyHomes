import React, { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { getToken, getRole, saveAuth, clearAuth } from './storage';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(null);
  const [role, setRole] = useState(null);
  const [loading, setLoading] = useState(true);

  // Load token from localStorage on page refresh
  useEffect(() => {
    const existingToken = getToken();
    const existingRole = getRole();
    if (existingToken) setToken(existingToken);
    if (existingRole) setRole(existingRole);
    setLoading(false);
  }, []);

  // ------------------------
  // 🔐 LOGIN (Backend API)
  // ------------------------
  const login = async ({ username, password }) => {
    try {
      const response = await fetch(
        "http://localhost:6001/product/login",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({ username, password })
        }
      );

      if (!response.ok) {
        const err = await response.json().catch(() => ({}));
        throw new Error(err.message || "Invalid credentials");
      }

      const data = await response.json();

      const issuedToken = data.token;
      const issuedRole = data.role || "admin"; // default role if backend not sending

      // Save token + role to localStorage
      saveAuth({ token: issuedToken, role: issuedRole });
      setToken(issuedToken);
      setRole(issuedRole);

      return { token: issuedToken, role: issuedRole };

    } catch (error) {
      console.error("Login Error:", error);
      throw error;
    }
  };

  // ------------------------
  // 🚪 LOGOUT
  // ------------------------
  const logout = () => {
    clearAuth();
    setToken(null);
    setRole(null);
  };

  // ------------------------
  // 🔐 ROLE CHECK
  // ------------------------
  const hasRole = (required) => {
    if (!required) return !!token;
    if (!role) return false;
    if (Array.isArray(required)) return required.includes(role);
    return role === required;
  };

  const value = useMemo(
    () => ({ token, role, loading, login, logout, hasRole }),
    [token, role, loading]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
};
