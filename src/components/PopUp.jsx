import React from "react";
import "./PopUp.css";

const Popup = ({ onClose }) => {
  return (
    <div className="popup-overlay">
      <div className="popup-content">
        <h2>Welcome to Happy Homes </h2>
        <p>Discover our latest premium projects and offers.</p>
        <button className="popup-btn" onClick={onClose}>
          Continue
        </button>
      </div>
    </div>
  );
};

export default Popup;
