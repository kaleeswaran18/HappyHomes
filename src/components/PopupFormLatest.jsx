import React from "react";
import "./PopupFormLatest.css";

const PopupForm = ({ onClose }) => {
  // Function to handle overlay click (close when clicked outside the popup)
  const handleOverlayClick = (e) => {
    if (e.target.classList.contains("popup-overlay")) {
      onClose();
    }
  };

  return (
    <div className="popup-overlay" onClick={handleOverlayClick}>
      <div className="popup-container animated rotateInDownLeft">
        {/* Floating image */}
        <div className="popup-image">
          <img
            src="https://jayabharath.com/wp-content/uploads/2025/01/small_c_popup-150x150.png"
            alt="Popup"
            width="150"
            height="150"
          />
        </div>

        {/* Popup content */}
        <div className="popup-content">
          {/* Close button */}
          <button
            className="close-button"
            onClick={() => {
              console.log("❌ Close button clicked");
              onClose();
            }}
          >
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 28.2843 28.2843">
              <polygon
                points="28.284 1.414 26.87 0 14.142 12.728 1.414 0 0 1.414 12.728 14.142 0 26.87 1.414 28.284 14.142 15.556 26.87 28.284 28.284 26.87 15.556 14.142 28.284 1.414"
                style={{ fillRule: "evenodd" }}
              />
            </svg>
          </button>

          <h2>Happy Homes!</h2>
          <h3>Ultra-Luxury Villas &amp; Apartments!</h3>

          {/* Contact form */}
          <form className="popup-form">
            <div className="form-group">
              <label>Your Name</label>
              <input type="text" placeholder="(e.g., Happy Homes)" required />
            </div>

            <div className="form-group">
              <label>Phone</label>
              <input
                type="tel"
                placeholder="(e.g., 9994422222)"
                pattern="[0-9()#&+*-=.]+"
                title="Only numbers and phone characters (#, -, *, etc) are accepted."
                required
              />
            </div>

            <div className="form-group">
              <label>Message</label>
              <textarea
                rows="4"
                placeholder="Type your requirement: (e.g., Need a 2BHK villa in Madurai)"
                required
              ></textarea>
            </div>

            <button type="submit" className="submit-btn">
              <p>
                <span className="icon">
                  <svg
                    aria-hidden="true"
                    viewBox="0 0 448 512"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M190.5 66.9l22.2-22.2c9.4-9.4 24.6-9.4 33.9 0L441 239c9.4 9.4 9.4 24.6 0 33.9L246.6 467.3c-9.4 9.4-24.6 9.4-33.9 0l-22.2-22.2c-9.5-9.5-9.3-25 .4-34.3L311.4 296H24c-13.3 0-24-10.7-24-24v-32c0-13.3 10.7-24 24-24h287.4L190.9 101.2c-9.8-9.3-10-24.8-.4-34.3z" />
                  </svg>
                </span>
              </p>
              <p>
                <span>Submit</span>
              </p>
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default PopupForm;
