import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import EnquiryForm from "../components/EnquiryForm";
import "./ProjectDetail.css";
import FooterJB from "../components/FooterJB";
import axios from "axios";

const ProjectDetail = () => {
  const { id } = useParams();
  const [showEnquiryForm, setShowEnquiryForm] = useState(false);
  const [project, setProject] = useState(null);

  const [popupOpen, setPopupOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const fetchProject = async () => {
      try {
        const res = await axios.get(
          "https://samplebuildapi-1.onrender.com/product/getAlprojectsSchema"
        );

        const data = res.data.data.find((p) => p._id === id);
        setProject(data);
      } catch (err) {
        console.error("API Error:", err);
      }
    };

    fetchProject();
  }, [id]);

  if (!project) return <div className="loading">Loading...</div>;

  const allImages = [project.image, ...project.files.map((f) => f.url)];

  const nextImage = () => {
    setActiveIndex((prev) => (prev + 1) % allImages.length);
  };

  const prevImage = () => {
    setActiveIndex((prev) => (prev === 0 ? allImages.length - 1 : prev - 1));
  };

  return (
    <div className="project-detail-page">

      {/* HERO */}
      <div
        className="project-hero"
        style={{ backgroundImage: `url(${project.image})` }}
      >
        <div className="project-hero-overlay">
          <h1 className="project-title">{project.name}</h1>
          <p className="project-location">{project.location}</p>
        </div>
      </div>

      {/* CONTENT */}
      <div className="container project-detail-content">

        {/* LEFT SECTION */}
        <div className="project-main">

          {/* GALLERY */}
          <div className="project-image-gallery">

            <div className="main-image">
              <img
                src={allImages[activeIndex]}
                alt="Main"
                onClick={() => setPopupOpen(true)}
              />
            </div>

            <div className="image-thumbnails">
              {allImages.map((img, index) => (
                <img
                  key={index}
                  src={img}
                  className={`thumbnail ${
                    index === activeIndex ? "active-thumbnail" : ""
                  }`}
                  onClick={() => setActiveIndex(index)}
                  alt="Thumbnail"
                />
              ))}
            </div>
          </div>
        </div>

        {/* RIGHT SIDEBAR */}
        <div className="project-sidebar">
          <div className="enquiry-box">
            <h3>Project Information</h3>

            <div className="project-info">
              <div className="info-item">
                <span className="info-label">BHK:</span>
                <span className="info-value">{project.bhk}</span>
              </div>

              <div className="info-item">
                <span className="info-label">Location:</span>
                <span className="info-value">{project.location}</span>
              </div>
            </div>

            <button
              className="enquire-button"
              onClick={() => setShowEnquiryForm(true)}
            >
              Enquire Now
            </button>
          </div>
        </div>
      </div>

      {/* POPUP */}
      {popupOpen && (
        <div className="popup-overlay">
          <div className="popup-content">

            <button className="close-btn" onClick={() => setPopupOpen(false)}>
              ✕
            </button>

            <button className="nav-btn left" onClick={prevImage}>❮</button>

            <img
              src={allImages[activeIndex]}
              alt="Large View"
              className="popup-image"
            />

            <button className="nav-btn right" onClick={nextImage}>❯</button>
          </div>
        </div>
      )}

      {/* ENQUIRY FORM */}
      {showEnquiryForm && (
        <EnquiryForm
          title={`Enquire About ${project.name}`}
          subtitle={project.location}
          onClose={() => setShowEnquiryForm(false)}
        />
      )}

      <FooterJB />
    </div>
  );
};

export default ProjectDetail;
