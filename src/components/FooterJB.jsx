import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  FaFacebookF,
  FaTwitter,
  FaYoutube,
  FaInstagram,
  FaPinterestP,
  FaSlideshare,
} from "react-icons/fa";
import "./FooterJB.css";

const Footer = () => {
  const [projects, setProjects] = useState([]);

  // ⭐ Fetch projects
  useEffect(() => {
    axios
      .get("https://samplebuildapi-1.onrender.com/product/getprojectsSchema")
      .then((res) => {
        setProjects(res.data.data || []);
      })
      .catch((err) => {
        console.log("Footer project fetch error:", err);
      });
  }, []);

  return (
    <footer className="footer-container">
      <div className="footer-top-shape"></div>

      <div className="footer-inner">
        {/* Logo and intro */}
        <div className="footer-section logo-section">
          <img
            alt="Happy Homes"
            className="footer-logo"
          />
          <p className="footer-intro">
            <strong>Welcome to Happy Homes!</strong> We’re among the best
            builders in Madurai, known for quality and trust.
          </p>
        </div>

        {/* ⭐ Our Current Projects (Dynamic) */}
        <div className="footer-section">
          <h4>Our Current Projects</h4>
          <ul>
            {projects.length > 0 ? (
              projects.slice(0, 6).map((item) => (
                <li key={item._id}>
                  <a href={`/project/${item._id}`}>
                    {item.name}
                  </a>
                </li>
              ))
            ) : (
              <li>No projects available</li>
            )}
          </ul>
        </div>

        {/* Contact Info */}
        <div className="footer-section contact-section">
          <h4>Corporate Office</h4>
          <address>
            <strong>Happy Homes Pvt Ltd</strong>
            <br />
            M.A.R Tower, Madurai – 625020
            <br />
            <a href="tel:+916385847074">📞 +91 63858 47074</a>
            <br />
            <a href="mailto:info@HappyHomes.com">
              ✉️ info@HappyHomes.com
            </a>
          </address>
        </div>

        {/* Social Links */}
        <div className="footer-section social-section-JB">
          <h4>Follow Us</h4>
          <div className="social-icons">
            <a className="social-box facebook"><FaFacebookF /></a>
            <a className="social-box twitter"><FaTwitter /></a>
            <a className="social-box youtube"><FaYoutube /></a>
            <a className="social-box instagram"><FaInstagram /></a>
            <a className="social-box pinterest"><FaPinterestP /></a>
            <a className="social-box slideshare"><FaSlideshare /></a>
          </div>
        </div>
      </div>

      <div className="footer-bottom-shape"></div>
    </footer>
  );
};

export default Footer;
