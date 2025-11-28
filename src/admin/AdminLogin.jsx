import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../auth/AuthContext';

const AdminLogin = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      await login({ username, password });
      navigate('/admin');
    } catch (err) {
      setError(err.message || 'Login failed');
    }
  };

  return (
    <div style={styles.pageWrapper}>
      <div style={styles.card}>
        <h2 style={styles.title}>Admin Login</h2>

        {error && <div style={styles.error}>{error}</div>}

        <form onSubmit={handleSubmit}>

          <label style={styles.label}>Username</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Enter username"
            style={styles.input}
          />

          <label style={styles.label}>Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter password"
            style={styles.input}
          />

          <button type="submit" style={styles.button}>
            Sign In
          </button>
        </form>
      </div>
    </div>
  );
};

const styles = {
  pageWrapper: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: '88vh',
    background: '#f4f4f4',
    padding: '20px',
  },
  card: {
    width: '100%',
    maxWidth: '420px',
    background: '#fff',
    padding: '32px',
    borderRadius: '12px',
    boxShadow: '0 6px 20px rgba(0,0,0,0.1)',
    border: '1px solid #e5e5e5',
  },
  title: {
    marginBottom: '24px',
    fontSize: '24px',
    fontWeight: '700',
    color: '#222',
    textAlign: 'center',
  },
  label: {
    display: 'block',
    marginBottom: '6px',
    fontSize: '14px',
    color: '#555',
    fontWeight: 500,
  },
  input: {
    width: '100%',
    padding: '12px',
    borderRadius: '8px',
    border: '1px solid #ccc',
    marginBottom: '16px',
    fontSize: '15px',
    outline: 'none',
    transition: '0.2s',
  },
  button: {
    width: '100%',
    padding: '14px',
    background: '#111',
    color: '#fff',
    border: 'none',
    borderRadius: '8px',
    fontSize: '15px',
    cursor: 'pointer',
    fontWeight: 600,
    transition: '0.3s',
  },
  error: {
    background: '#ffe6e6',
    padding: '12px',
    borderRadius: '6px',
    color: '#b30000',
    marginBottom: '16px',
    textAlign: 'center',
    fontSize: '14px',
  },
};

// Hover effects
styles.input[':focus'] = {
  borderColor: '#c59b2e',
};

export default AdminLogin;
