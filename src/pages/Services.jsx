


import React from 'react';
import './Services.css';
import FooterJB from '../components/FooterJB';
const Services = () => {
  const services = [
    {
      icon: '🏗️',
      title: 'Residential Construction',
      description: 'Building premium villas and apartments with modern architecture and superior quality materials.'
    },
    {
      icon: '🏘️',
      title: 'Gated Communities',
      description: 'Developing secure gated communities with world-class amenities and facilities.'
    },
    {
      icon: '📋',
      title: 'Legal Documentation',
      description: 'Ensuring 100% legal clarity with RERA approval and clear property titles.'
    },
    {
      icon: '🏠',
      title: 'Property Consultation',
      description: 'Expert consultation services to help you find the perfect home for your needs.'
    },
    {
      icon: '🔑',
      title: 'Post-Sale Support',
      description: 'Comprehensive after-sales service and support for all our homeowners.'
    },
    {
      icon: '💰',
      title: 'Investment Solutions',
      description: 'Strategic investment opportunities with high returns and rental potential.'
    }
  ];

  return (
    <div className="services-page">
      {/* Header with poster background */}
      <div className="services-header">
        <div className="services-header-overlay"></div>

        <div className="services-header-left">
          <h1>Our Services</h1>
          <p>HOME / SERVICES</p>
        </div>

        {/* optional right area - can place badge or image */}
        <div className="services-header-right" aria-hidden="true"></div>
      </div>

      <div className="container">
        <section className="services-content">
          <div className="services-intro">
            <h2>What We Offer</h2>
            <p>
              Happy Homes provides end-to-end real estate solutions, from planning and construction
              to post-sale support. Our comprehensive services ensure a seamless experience
              for our customers.
            </p>
          </div>

          <div className="services-grid">
            {services.map((service, index) => (
              <div key={index} className="service-card">
                <div className="service-icon">{service.icon}</div>
                <h3>{service.title}</h3>
                <p>{service.description}</p>
              </div>
            ))}
          </div>

          <div className="service-features">
            <h2>Why Choose Our Services?</h2>
            <div className="features-list">
              <div className="feature-item">
                <span className="check-icon">✓</span>
                <div>
                  <h4>32+ Years Experience</h4>
                  <p>Decades of expertise in real estate development</p>
                </div>
              </div>
              <div className="feature-item">
                <span className="check-icon">✓</span>
                <div>
                  <h4>RERA Approved</h4>
                  <p>All projects comply with RERA regulations where applicable</p>
                </div>
              </div>
              <div className="feature-item">
                <span className="check-icon">✓</span>
                <div>
                  <h4>100% Legal Clarity</h4>
                  <p>Transparent documentation and clear titles</p>
                </div>
              </div>
              <div className="feature-item">
                <span className="check-icon">✓</span>
                <div>
                  <h4>Timely Delivery</h4>
                  <p>Projects completed on schedule</p>
                </div>
              </div>
              <div className="feature-item">
                <span className="check-icon">✓</span>
                <div>
                  <h4>Premium Quality</h4>
                  <p>Superior construction and materials</p>
                </div>
              </div>
              <div className="feature-item">
                <span className="check-icon">✓</span>
                <div>
                  <h4>Customer Support</h4>
                  <p>Dedicated support throughout the customer journey</p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
       <FooterJB />
    </div>
  );
};

export default Services;
