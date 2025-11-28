import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import EnquiryForm from "../components/EnquiryForm";
import "./ProjectDetail.css";
import FooterJB from '../components/FooterJB';
import axios from "axios";

const ProjectDetail = () => {
  const { id } = useParams();
  const [showEnquiryForm, setShowEnquiryForm] = useState(false);
  const [project, setProject] = useState(null);

  // For popup slider
  const [popupOpen, setPopupOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);

  // Fetch project details by id
  useEffect(() => {
    const fetchProject = async () => {
      try {
        const res = await axios.get(
          "https://samplebuildapi-1.onrender.com/product/getAlprojectsSchema"
        );

        // Find by ID
        const data = res.data.data.find((p) => p._id === id);
        setProject(data);
      } catch (err) {
        console.error("API Error:", err);
      }
    };

    fetchProject();
  }, [id]);

  if (!project) return <div>Loading...</div>;

  const allImages = [
    project.image,
    ...project.files.map((f) => f.url),
  ];

  // Popup navigation
  const nextImage = () => {
    setActiveIndex((prev) => (prev + 1) % allImages.length);
  };

  const prevImage = () => {
    setActiveIndex((prev) =>
      prev === 0 ? allImages.length - 1 : prev - 1
    );
  };

  return (
    <div className="project-detail-page">
      {/* HERO SECTION */}
      <div className="project-hero  style={{ backgroundImage: `url(${project.image})` }}">
        <div className="container">
          <div className="project-hero-content">
            {/* <h1>{project.name}</h1>
            <p className="project-location">{project.location}</p>
            <p className="project-status">Ongoing</p> */}
          </div>
        </div>
      </div>

      {/* CONTENT */}
      <div className="container">
        <div className="project-detail-content">
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
                    alt="Thumbnail"
                    className={`thumbnail ${
                      index === activeIndex ? "active-thumbnail" : ""
                    }`}
                    onClick={() => setActiveIndex(index)}
                  />
                ))}
              </div>
            </div>

          </div>

          {/* SIDEBAR */}
          <div className="project-sidebar">
            <div className="enquiry-box">
              <h3>Enquire About This Project</h3>

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
      </div>

      {/* POPUP VIEW */}
      {popupOpen && (
        <div className="popup-overlay">
          <div className="popup-content">
            <button className="close-btn" onClick={() => setPopupOpen(false)}>
              ✖
            </button>

            <button className="nav-btn left" onClick={prevImage}>
              ❮
            </button>

            <img
              src={allImages[activeIndex]}
              alt="Large View"
              className="popup-image"
            />

            <button className="nav-btn right" onClick={nextImage}>
              ❯
            </button>
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
