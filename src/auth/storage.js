// Simple storage helpers for auth token and user role
export const STORAGE_KEYS = {
  token: 'hh_admin_token',
  role: 'hh_admin_role',
};

export const saveAuth = ({ token, role }) => {
  if (token) localStorage.setItem(STORAGE_KEYS.token, token);
  if (role) localStorage.setItem(STORAGE_KEYS.role, role);
};

export const clearAuth = () => {
  localStorage.removeItem(STORAGE_KEYS.token);
  localStorage.removeItem(STORAGE_KEYS.role);
};

export const getToken = () => localStorage.getItem(STORAGE_KEYS.token) || null;
export const getRole = () => localStorage.getItem(STORAGE_KEYS.role) || null;