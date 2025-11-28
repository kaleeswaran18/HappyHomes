// Basic API service stub. Replace baseURL with your Node backend.
const baseURL = process.env.REACT_APP_API_BASE_URL || 'http://localhost:4000/api';

const json = async (res) => {
  const data = await res.json().catch(() => ({}));
  if (!res.ok) throw new Error(data.message || 'API Error');
  return data;
};

export const api = {
  get: (path, options = {}) => fetch(`${baseURL}${path}`, { ...options, method: 'GET' }).then(json),
  post: (path, body, options = {}) => fetch(`${baseURL}${path}`, {
    ...options,
    method: 'POST',
    headers: { 'Content-Type': 'application/json', ...(options.headers || {}) },
    body: JSON.stringify(body),
  }).then(json),
  put: (path, body, options = {}) => fetch(`${baseURL}${path}`, {
    ...options,
    method: 'PUT',
    headers: { 'Content-Type': 'application/json', ...(options.headers || {}) },
    body: JSON.stringify(body),
  }).then(json),
  del: (path, options = {}) => fetch(`${baseURL}${path}`, { ...options, method: 'DELETE' }).then(json),
};

export default api;