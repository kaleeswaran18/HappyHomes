import React from 'react';
import './Topbar.css';
import { useAuth } from '../../auth/AuthContext';

const Topbar = ({ title }) => {
  const { logout, role } = useAuth();
  return (
    <div className="admin-topbar">
      <h3>{title}</h3>
      <div className="topbar-actions">
        <span className="pill">{role}</span>
        <button className="btn-outline" onClick={() => window.location.reload()}>Refresh</button>
        <button className="btn-primary" onClick={logout}>Logout</button>
      </div>
    </div>
  );
};

export default Topbar;