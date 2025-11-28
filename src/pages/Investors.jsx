import React from 'react';
import './Investors.css';

const Investors = () => {
  return (
    <div className="investors-page">
      <div className="page-header">
        <div className="container">
          <h1>Investors</h1>
          <p>Information for Investors and Stakeholders</p>
        </div>
      </div>

      <div className="container">
        <section className="investors-content">
          <div className="investors-intro">
            <h2>Investor Relations</h2>
            <p>
              Happy Homes is committed to transparency and building long-term value 
              for our investors and stakeholders. We provide comprehensive information about 
              our financial performance, corporate governance, and future growth plans.
            </p>
          </div>

          <div className="investor-sections">
            <div className="investor-card">
              <h3>Financial Reports</h3>
              <p>Access our annual reports, quarterly results, and financial statements.</p>
              <a href="/#" role="button" className="investor-link">View Reports →</a>
            </div>

            <div className="investor-card">
              <h3>Corporate Governance</h3>
              <p>Learn about our corporate governance practices and board of directors.</p>
              <a href="/#" role="button" className="investor-link">Learn More →</a>
            </div>

            <div className="investor-card">
              <h3>Investor Updates</h3>
              <p>Stay informed with the latest investor news and announcements.</p>
              <a href="/#" role="button" className="investor-link">View Updates →</a>
            </div>

            <div className="investor-card">
              <h3>Contact Investor Relations</h3>
              <p>Get in touch with our investor relations team for any queries.</p>
              <a href="/#" role="button" className="investor-link">Contact Us →</a>
            </div>
          </div>

          <div className="key-metrics">
            <h2>Key Performance Metrics</h2>
            <div className="metrics-grid">
              <div className="metric-item">
                <div className="metric-value">32+</div>
                <div className="metric-label">Years in Business</div>
              </div>
              <div className="metric-item">
                <div className="metric-value">5000+</div>
                <div className="metric-label">Homes Delivered</div>
              </div>
              <div className="metric-item">
                <div className="metric-value">100%</div>
                <div className="metric-label">RERA Compliant</div>
              </div>
              <div className="metric-item">
                <div className="metric-value">2</div>
                <div className="metric-label">Cities</div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Investors;


