import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import React, { useEffect, useState } from "react";
import "./OngoingProjects.css";
import FooterJB from "../components/FooterJB";
import headerBg from "../asset/Ongoingimagebg.jpg";

const Viewspecificvisit = () => {
  const { id } = useParams();
  const [projects, setProjects] = useState([]);
  const [activeTab, setActiveTab] = useState("all"); // ⭐ default
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(`https://samplebuildapi-1.onrender.com/product/ViewProject/${id}`)
      .then((res) => setProjects(res.data.data || []))
      .catch((err) => console.log(err));
  }, [id]);

  // ⭐ Header video
  const headerVideo = projects.find(p => p.video)?.video;

  // ⭐ Filter projects based on tab
  const filteredProjects = projects.filter((item) => {
    if (activeTab === "all") return true;
    if (activeTab === "sale") return item.iscomplete === false;
    if (activeTab === "sold") return item.iscomplete === true;
    return true;
  });

  return (
    <div className="ongoing-projects-page">
      {/* HEADER */}
      <div
        className="services-header"
        style={{ backgroundImage: `url(${headerBg})` }}
      >
        <div className="services-header-overlay"></div>
        <div className="services-header-left">
          <h1>Ongoing Projects</h1>
          <p>Explore Our Current Developments</p>
        </div>
      </div>

      {/* ⭐ VIDEO SECTION */}
      {headerVideo && (
        <div className="project-top-video">
          <video src={headerVideo} controls autoPlay muted playsInline />
        </div>
      )}

      <div className="container">
        <section className="projects-content">
          <h1 className="visit-title">Project Details</h1>

          {/* ⭐ TABS */}
          <div className="project-tabs">
            <button
              className={activeTab === "all" ? "active" : ""}
              onClick={() => setActiveTab("all")}
            >
              All
            </button>
            <button
              className={activeTab === "sale" ? "active" : ""}
              onClick={() => setActiveTab("sale")}
            >
              For Sale
            </button>
            <button
              className={activeTab === "sold" ? "active" : ""}
              onClick={() => setActiveTab("sold")}
            >
              Sold Out
            </button>
          </div>

          {/* ⭐ PROJECT LIST */}
          <div className="projects-grid">
            {filteredProjects.length > 0 ? (
              filteredProjects.map((item) => (
                <div className="project-card" key={item._id}>
                  <div className="project-img-box">
                    <img src={item.image} alt={item.name} />
                    {item.status === "sold" && (
                      <span className="sold-badge">Sold Out</span>
                    )}
                  </div>

                  <div className="project-card-body">
                    <h3>{item.name}</h3>
                    <p className="desc">
                      {item.description || "No description available."}
                    </p>

                    <div className="project-info">
                      <p><strong>BHK:</strong> {item.bhk}</p>
                      <p><strong>Location:</strong> {item.location}</p>
                    </div>

                    <button
                      className="project-btn"
                      onClick={() => navigate(`/project/${item._id}`)}
                    >
                      View Details
                    </button>
                  </div>
                </div>
              ))
            ) : (
              <p className="no-projects">No projects found</p>
            )}
          </div>
        </section>
      </div>

      <FooterJB />
    </div>
  );
};

export default Viewspecificvisit;
