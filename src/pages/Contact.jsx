import React, { useState, useEffect } from "react";
import EnquiryForm from "../components/EnquiryForm";
import "./Contact.css";
import MapSection from "../components/MapSection";
import headerBg from "../asset/MediaBG.jpeg";
import axios from "axios";

const Contact = () => {
  const [showEnquiryForm, setShowEnquiryForm] = useState(false);
  const [contactInfo, setContactInfo] = useState([]);

  useEffect(() => {
    const fetchProject = async () => {
      try {
        const res = await axios.get("https://samplebuildapi-1.onrender.com/product/getcontact");
        setContactInfo(res.data.data);
      } catch (err) {
        console.error("API Error:", err);
      }
    };
    fetchProject();
  }, []);

  const data = contactInfo[0] || {}; // ⭐ Stops crashing

  return (
    <div className="contact-page">

      {/* HEADER */}
      <div className="contact-hero" style={{ backgroundImage: `url(${headerBg})` }}>
        <div className="hero-overlay"></div>

        <div className="hero-content">
          <h1>Contact Us</h1>
          <p>We’re here to help you. Reach out anytime!</p>
        </div>
      </div>

      {/* CONTACT SECTION */}
      <div className="container">
        <section className="contact-content">

          <div className="contact-grid-modern">

            {/* LEFT CARD */}
            <div className="info-card-modern">
              <h2>Get in Touch</h2>

              <div className="info-line">
                <div className="icon-box">📍</div>
                <div>
                  <h4>Address</h4>
                  <p>{data.address || "Loading..."}</p>
                </div>
              </div>

              <div className="info-line">
                <div className="icon-box">📞</div>
                <div>
                  <h4>Phone</h4>
                  <p>{data.phone || "Loading..."}</p>
                </div>
              </div>

              <div className="info-line">
                <div className="icon-box">✉️</div>
                <div>
                  <h4>Email</h4>
                  <p>{data.email || "Loading..."}</p>
                </div>
              </div>

              <div className="info-line">
                <div className="icon-box">🕒</div>
                <div>
                  <h4>Business Hours</h4>
                  <p>{data.businessHours || "Loading..."}</p>
                </div>
              </div>
            </div>

            {/* RIGHT */}
            <div className="form-card-modern">
              <h2>Send a Message</h2>
              <p>We typically respond within 24 hours.</p>

              <button
                className="modern-btn"
                onClick={() => {
                  console.log("Button clicked!"); // for debugging
                  setShowEnquiryForm(true);
                }}
              >
                Open Enquiry Form
              </button>
            </div>

          </div>
        </section>

        {/* MAP */}
        <div className="map-section-modern">
          <MapSection />
        </div>

      </div>

      {/* POPUP FORM */}
      {showEnquiryForm && (
        <EnquiryForm
          title="Contact Happy Homes"
          subtitle="We’re happy to answer your queries."
          onClose={() => setShowEnquiryForm(false)}
        />
      )}
    </div>
  );
};

export default Contact;
