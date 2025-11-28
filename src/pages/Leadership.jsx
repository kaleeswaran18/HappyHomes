import React, { useEffect, useState } from "react";
import "./Leadership.css";
import headerBg from "../asset/MediaBG.jpeg";
import axios from "axios";

const Leadership = () => {
  const [teamMembers, setTeamMembers] = useState([]);

  const fetchLeadership = async () => {
    try {
      const res = await axios.get(
        "http://localhost:6001/product/LeadershipgetSchema"
      );

      if (res.data?.data) {
        setTeamMembers(res.data.data);
      }
    } catch (err) {
      console.log("Error fetching leadership data", err);
    }
  };

  useEffect(() => {
    fetchLeadership();
  }, []);

  return (
    <div className="leadership-page">
      {/* Header */}
      <div
        className="services-header"
        style={{ backgroundImage: `url(${headerBg})` }}
      >
        <div className="services-header-overlay"></div>
        <div className="services-header-left">
          <h1>Leadership Team</h1>
          <p>Experienced Professionals Leading the Way</p>
        </div>
      </div>

      <div className="container">
        <section className="leadership-content">
          {/* Intro */}
          <div className="leadership-intro">
            <h2>Meet Our Leadership Team</h2>
            <p>
              Our leadership team brings decades of expertise in real estate,
              construction, and management. Their dedication drives Happy Homes
              to remain Madurai's most trusted builders.
            </p>
          </div>

          {/* Team Cards */}
          <div className="team-grid">
            {teamMembers.length === 0 ? (
              <p>Loading leadership team...</p>
            ) : (
              teamMembers.map((member) => (
                <div key={member._id} className="team-card">
                  <div className="team-image">
                    {member.mediaType === "image" && (
                      <img
                        src={member.image}
                        alt={member.name}
                        onError={(e) => {
                          e.target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(
                            member.name
                          )}&size=400&background=c49b3a&color=fff&bold=true`;
                        }}
                      />
                    )}

                    {member.mediaType === "video" && (
                      <video
                        src={member.image}
                        autoPlay
                        loop
                        muted
                        className="team-video"
                      />
                    )}
                  </div>

                  <div className="team-details">
                    <h3>{member.name}</h3>
                    <p className="team-position">{member.role}</p>
                    <p className="team-description">
                      {member.description || "No description available."}
                    </p>
                  </div>
                </div>
              ))
            )}
          </div>
        </section>
      </div>
    </div>
  );
};

export default Leadership;
