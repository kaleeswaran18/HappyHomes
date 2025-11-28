import React from 'react';
import { Link } from 'react-router-dom';
import './AboutUs.css';
import headerBg from '../asset/MediaBG.jpeg'

const AboutUs = () => {
  return (
    <div className="about-us-page">
     <div className="services-header" style={{ backgroundImage: `url(${headerBg})` }}>
                <div className="services-header-overlay"></div>
               <div className="services-header-left">
          <h1>About Happy Homes</h1>
          <p>Best Builders in Madurai Since 1993</p>
        </div>
      </div>

      <div className="container">
        <section className="about-content-section">
          <div className="about-intro">
            <h2>Our Story</h2>
            <p>
              Happy Homes has been a trusted name in the real estate industry since 1993. 
              With over 32 years of experience, we have successfully built more than 5000 homes 
              across Madurai and Coimbatore, establishing ourselves as the best builders in Madurai.
            </p>
            <p>
              Our journey began with a simple vision: to create homes that are not just structures, 
              but spaces where families can build their dreams. Over the years, we have maintained 
              our commitment to quality, innovation, and customer satisfaction, making us one of the 
              top builders in Madurai.
            </p>
          </div>

          <div className="stats-section">
            <div className="stat-item">
              <div className="stat-number">32+</div>
              <div className="stat-label">Years of Experience</div>
            </div>
            <div className="stat-item">
              <div className="stat-number">5000+</div>
              <div className="stat-label">Homes Built</div>
            </div>
            <div className="stat-item">
              <div className="stat-number">100%</div>
              <div className="stat-label">Legal Clarity</div>
            </div>
            <div className="stat-item">
              <div className="stat-number">RERA</div>
              <div className="stat-label">Approved Projects</div>
            </div>
          </div>

          <div className="about-sections">
            <div className="about-card">
              <h3>Our Mission</h3>
              <p>
                To deliver exceptional quality homes that exceed customer expectations while maintaining 
                the highest standards of construction, design, and service.
              </p>
            </div>
            <div className="about-card">
              <h3>Our Vision</h3>
              <p>
                To be the most trusted and preferred builder in Madurai and Coimbatore, known for 
                innovation, quality, and customer-centric approach.
              </p>
            </div>
            <div className="about-card">
              <h3>Our Values</h3>
              <ul>
                <li>Integrity and Transparency</li>
                <li>Quality Excellence</li>
                <li>Customer First</li>
                <li>Innovation</li>
                <li>Timely Delivery</li>
              </ul>
            </div>
          </div>

          <div className="quick-links">
            <h2>Learn More About Us</h2>
            <div className="links-grid">
              <Link to="/founder" className="link-card">
                <h3>Founder and MD</h3>
                <p>Meet the visionary behind Happy Homes</p>
              </Link>
              <Link to="/leadership" className="link-card">
                <h3>Leadership Team</h3>
                <p>Our experienced leadership team</p>
              </Link>
              <Link to="/completed-projects" className="link-card">
                <h3>Completed Projects</h3>
                <p>Explore our successful project portfolio</p>
              </Link>
              <Link to="/services" className="link-card">
                <h3>Our Services</h3>
                <p>Comprehensive real estate solutions</p>
              </Link>
              <Link to="/testimonials" className="link-card">
                <h3>Testimonials</h3>
                <p>What our customers say about us</p>
              </Link>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default AboutUs;


