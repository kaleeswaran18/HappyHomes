import React, { useEffect, useState } from "react";
import axios from "axios";
import "./Founder.css";
import headerBg from "../asset/MediaBG.jpeg";

const Founder = () => {
  const [founder, setFounder] = useState(null);

  const fetchFounder = async () => {
    try {
      const res = await axios.get("http://localhost:6001/product/FoundergetSchema");

      if (res.data?.data?.length > 0) {
        const f = res.data.data[0]; // Only 1 founder
        setFounder(f);
      }
    } catch (err) {
      console.log("Error fetching founder", err);
    }
  };

  useEffect(() => {
    fetchFounder();
  }, []);

  return (
    <div className="founder-page">
      {/* Header Section */}
      <div
        className="services-header"
        style={{ backgroundImage: `url(${headerBg})` }}
      >
        <div className="services-header-overlay"></div>
        <div className="services-header-left">
          <h1>Founder and Managing Director</h1>
          <p>Visionary Leadership Since 1993</p>
        </div>
      </div>

      <div className="container">
        <section className="founder-content">
          {!founder ? (
            <p>Loading...</p>
          ) : (
            <>
              {/* Founder Information */}
              <div className="founder-profile">
                
                <div className="founder-image">
                  {founder.mediaType === "image" && (
                    <img
                      src={founder.image}
                      alt={founder.name}
                      className="founder-photo"
                    />
                  )}
                  {founder.mediaType === "video" && (
                    <video
                      src={founder.image}
                      className="founder-photo"
                      autoPlay
                      loop
                      muted
                    />
                  )}
                </div>

                <div className="founder-details">
                  <h2>Our Founder</h2>

                  <p className="founder-name">{founder.name}</p>

                  <p className="founder-title">
                    {founder.role || "Founder & Managing Director"}
                  </p>

                  <div className="founder-bio">
                    <p>{founder.description}</p>
                  </div>
                </div>
              </div>

              {/* Static Achievements */}
              <div className="achievements-section">
                <h2>Key Achievements</h2>
                <div className="achievements-grid">
                  <div className="achievement-item">
                    <h3>32+ Years</h3>
                    <p>Of Excellence in Real Estate</p>
                  </div>
                  <div className="achievement-item">
                    <h3>5000+ Homes</h3>
                    <p>Successfully Delivered</p>
                  </div>
                  <div className="achievement-item">
                    <h3>No. 1 Builder</h3>
                    <p>In Madurai</p>
                  </div>
                  <div className="achievement-item">
                    <h3>100% Legal</h3>
                    <p>All Projects RERA Approved</p>
                  </div>
                </div>
              </div>
            </>
          )}
        </section>
      </div>
    </div>
  );
};

export default Founder;
