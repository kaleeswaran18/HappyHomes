import React, { useEffect } from 'react';
import './Toast.css';

const Toast = ({ message, type = 'success', onClose, duration = 1600 }) => {
  useEffect(() => {
    const id = setTimeout(onClose, duration);
    return () => clearTimeout(id);
  }, [onClose, duration]);

  if (!message) return null;
  return (
    <div className="toast-container">
      <div className={`toast ${type}`}>{message}</div>
    </div>
  );
};

export default Toast;