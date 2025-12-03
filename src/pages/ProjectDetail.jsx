import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import EnquiryForm from "../components/EnquiryForm";
import "./ProjectDetail.css";
import FooterJB from "../components/FooterJB";
import axios from "axios";

import {
  MdCameraswitch,
  MdSecurity,
} from "react-icons/md";

import {
  GiBatteryPack,
  GiStreetLight,
  GiKitchenKnives,
  GiWaterDrop,
  GiKidSlide
} from "react-icons/gi";

import {
  FaRoad,
  FaDumbbell,
  FaBuilding,
  FaStamp,
  FaTree
} from "react-icons/fa";

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

      {/* POPUP SLIDER (NO ARROWS — ONLY THUMBNAILS) */}
      {popupOpen && (
        <div className="popup-overlay" onClick={() => setPopupOpen(false)}>
          <div className="popup-content" onClick={(e) => e.stopPropagation()}>
            <img
              src={allImages[activeIndex]}
              alt="Large View"
              className="popup-image"
            />

            {/* POPUP THUMBNAILS */}
            <div className="popup-thumbnails">
              {allImages.map((img, index) => (
                <img
                  key={index}
                  src={img}
                  className={`popup-thumb ${
                    activeIndex === index ? "active-popup-thumb" : ""
                  }`}
                  onClick={() => setActiveIndex(index)}
                  alt="Popup Thumbnail"
                />
              ))}
            </div>
          </div>
        </div>
      )}

      {/* CATEGORY TABS */}
      <div className="category-tabs">
        {[
          "Elevation",
          "Floor Plan",
          "Isometric View",
          "Interior",
          "Project View",
          "Video",
          "Site Progress",
        ].map((tab, index) => (
          <button
            key={index}
            className={`tab-btn ${project.activeTab === tab ? "active-tab" : ""}`}
            onClick={() => setProject((prev) => ({ ...prev, activeTab: tab }))}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* CATEGORY CONTENT */}
      <div className="category-content">
        {project.activeTab !== "Video" && (
          <div className="category-image-grid">
            {project.files
              .filter((file) => file.category === project.activeTab)
              .map((file, index) => (
                <img key={index} src={file.url} alt={project.activeTab} />
              ))}
          </div>
        )}

        {project.activeTab === "Video" && (
          <div className="video-section">
            <video controls width="100%">
              <source src={project.video} type="video/mp4" />
            </video>
          </div>
        )}
      </div>

      {/* AMENITIES SECTION */}
      <div className="amenities-section">
        <h2 className="amenities-title">Amenities</h2>

        <div className="amenities-grid">
          <div className="amenity-item"><MdCameraswitch size={50} color="#002060" /><p>CCTV</p></div>
          <div className="amenity-item"><GiBatteryPack size={50} color="#002060" /><p>Inverter</p></div>
          <div className="amenity-item"><GiStreetLight size={50} color="#002060" /><p>Street Light</p></div>
          <div className="amenity-item"><MdSecurity size={50} color="#002060" /><p>Security</p></div>
          <div className="amenity-item"><GiKitchenKnives size={50} color="#002060" /><p>Modular Kitchen</p></div>
          <div className="amenity-item"><FaRoad size={50} color="#002060" /><p>Cement Road</p></div>
          <div className="amenity-item"><FaDumbbell size={50} color="#002060" /><p>Gymnasium</p></div>
          <div className="amenity-item"><FaBuilding size={50} color="#002060" /><p>Multi Purpose Hall</p></div>
          <div className="amenity-item"><GiWaterDrop size={50} color="#002060" /><p>RO Water</p></div>
          <div className="amenity-item"><FaTree size={50} color="#002060" /><p>Avenue Tree</p></div>
          <div className="amenity-item"><FaStamp size={50} color="#002060" /><p>DTCP Approved</p></div>
          <div className="amenity-item"><GiKidSlide size={50} color="#002060" /><p>Kids Play Area</p></div>
        </div>
      </div>

      <FooterJB />
    </div>
  );
};

export default ProjectDetail;
