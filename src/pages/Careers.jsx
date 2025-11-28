import React, { useState, useEffect } from "react";
import "./Careers.css";
import headerBg from "../asset/CareersectionBG.webp";
import FooterJB from '../components/FooterJB';
import axios from "axios";

const Careers = () => {
  const [jobOpenings, setJobOpenings] = useState([]);
  const [showPopup, setShowPopup] = useState(false);
  const [selectedJob, setSelectedJob] = useState(null);

  // Fetch API
  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const res = await axios.get("https://samplebuildapi-1.onrender.com/product/getcarrer");
        setJobOpenings(res.data.data || []);
      } catch (err) {
        console.error("Career Fetch Error:", err);
      }
    };

    fetchJobs();
  }, []);

  const openPopup = (job) => {
    setSelectedJob(job);
    setShowPopup(true);
  };

  return (
    <div className="careers-page">
      {/* HEADER SECTION */}
      <div
        className="services-header"
        style={{ backgroundImage: `url(${headerBg})` }}
      >
        <div className="services-header-overlay"></div>
        <div className="services-header-left">
          <h1>Careers</h1>
          <p>Join Our Team and Build the Future</p>
        </div>
      </div>

      {/* MAIN CONTENT */}
      <div className="container">
        <section className="careers-content">
          {/* INTRO */}
          <div className="careers-intro">
            <h2>Why Work With Us?</h2>
            <p>
              At Happy Homes, we believe in nurturing talent and providing
              opportunities for growth. We offer a dynamic work environment and
              career advancement.
            </p>
          </div>

          {/* BENEFITS SECTION */}
          <div className="benefits-section">
            <h2>Employee Benefits</h2>

            <div className="benefits-grid">
              <div className="benefit-item">
                <span className="benefit-icon">💰</span>
                <h4>Competitive Salary</h4>
                <p>Attractive compensation packages</p>
              </div>
              <div className="benefit-item">
                <span className="benefit-icon">🏥</span>
                <h4>Health Insurance</h4>
                <p>Comprehensive medical coverage</p>
              </div>
              <div className="benefit-item">
                <span className="benefit-icon">📚</span>
                <h4>Training & Development</h4>
                <p>Continuous learning opportunities</p>
              </div>
              <div className="benefit-item">
                <span className="benefit-icon">🎯</span>
                <h4>Career Growth</h4>
                <p>Clear progression paths</p>
              </div>
            </div>
          </div>

          {/* CURRENT OPENINGS */}
          <div className="openings-section">
            <h2>Current Openings</h2>

            <div className="jobs-list">
              {jobOpenings.map((job) => (
                <div key={job._id} className="job-card">
                  <div className="job-header">
                    <h3>{job.title}</h3>
                    <span className="job-type">{job.type}</span>
                  </div>

                  <div className="job-details">
                    <span className="job-dept">{job.department}</span>
                    <span className="job-location">📍 {job.location}</span>
                  </div>

                  <button
                    className="apply-btn"
                    onClick={() => openPopup(job)}
                  >
                    Apply Now
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* GENERAL APPLY */}
          <div className="apply-section">
            <h2>Don't See a Role That Fits?</h2>
            <p>
              Send us your resume and we’ll keep you in mind for future roles.
            </p>

            <a href="mailto:hello@happyhome.com" className="general-apply-btn">
              Submit General Application
            </a>
          </div>
        </section>
      </div>

      {/* POPUP MESSAGE */}
      {showPopup && (
        <div className="popup-overlay">
          <div className="popup-box">
            <h2>Apply — {selectedJob?.title}</h2>
            <p className="popup-text">
              Please send your resume to:
              <br />
              <strong>hello@happyhome.com</strong>
            </p>

            <button
              className="popup-close-btn"
              onClick={() => setShowPopup(false)}
            >
              Close
            </button>
          </div>
        </div>
      )}
       <FooterJB />
    </div>
  );
};

export default Careers;
