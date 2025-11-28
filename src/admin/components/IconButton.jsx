import React from 'react';
import './IconButton.css';

const IconButton = ({ icon: Icon, label, variant = 'success', onClick, className = '', iconOnly = false }) => {
  return (
    <button className={`icon-btn ${variant} ${iconOnly ? 'icon-only' : ''} ${className}`} onClick={onClick}>
      {Icon && <Icon />}
      {!iconOnly && label}
    </button>
  );
};

export default IconButton;