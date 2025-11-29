import React, { useEffect, useState } from "react";
import axios from "axios";
import "./GallerySection.css";

const GallerySection = () => {
  const [galleryItems, setGalleryItems] = useState([]);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  // Fetch images
  const fetchGalleryImages = async () => {
    try {
      const res = await axios.get(
        "https://samplebuildapi-1.onrender.com/product/gethomeimage"
      );

      if (res.data?.data) {
        const formatted = res.data.data.map((item) => ({
          title: item.mediaType === "video" ? "Uploaded Video" : "Uploaded Image",
          img: item.image,
          type: item.mediaType,
        }));

        setGalleryItems(formatted);
      }
    } catch (err) {
      console.error("Failed to load gallery:", err);
    }
  };

  useEffect(() => {
    fetchGalleryImages();
  }, []);

  // Open popup
  const openPopup = (index) => {
    setCurrentIndex(index);
    setIsPopupOpen(true);
  };

  // Close popup
  const closePopup = () => setIsPopupOpen(false);

  return (
    <>
      <section className="gallery-section">
        <div className="gallery-text">
          <p>
            <a href="https://jayabharath.com/enquire-now-jayabharath-homes/">
              Happy Homes
            </a>{" "}
            is dedicated to turning your dream home into a reality. As the{" "}
            <a
              href="https://en.wikipedia.org/wiki/Villa"
              target="_blank"
              rel="noopener noreferrer"
            >
              best builders in Madurai
            </a>
            , we focus on quality and customer satisfaction...
          </p>
        </div>

        <div className="gallery-grid">
          {galleryItems.length === 0 ? (
            <p className="loading">Loading...</p>
          ) : (
            galleryItems.map((item, index) => (
              <div
                className="gallery-item"
                key={index}
                onClick={() => openPopup(index)}
              >
                {item.type === "image" && (
                  <img src={item.img} alt={item.title} loading="lazy" />
                )}

                {item.type === "video" && (
                  <video src={item.img} className="video-thumb" />
                )}

                <div className="overlay">
                  <div className="title">{item.title}</div>
                </div>
              </div>
            ))
          )}
        </div>
      </section>

      {/* ===================== POPUP / MODAL ===================== */}
      {isPopupOpen && (
        <div className="popup-overlay" onClick={closePopup}>
          <div className="popup-content" onClick={(e) => e.stopPropagation()}>

            {/* Close Button */}
            <span className="close-btn" onClick={closePopup}>
              ✕
            </span>

            {/* Show image or video */}
            {galleryItems[currentIndex].type === "image" ? (
              <img
                src={galleryItems[currentIndex].img}
                alt="preview"
                className="popup-media"
              />
            ) : (
              <video
                src={galleryItems[currentIndex].img}
                controls
                autoPlay
                className="popup-media"
              />
            )}

            {/* ================= THUMBNAIL STRIP ================= */}
            <div className="thumbnail-row">
              {galleryItems.map((item, i) => (
                <div
                  key={i}
                  className={`thumbnail ${i === currentIndex ? "active-thumb" : ""}`}
                  onClick={() => setCurrentIndex(i)}
                >
                  {item.type === "image" ? (
                    <img src={item.img} alt="thumb" />
                  ) : (
                    <video src={item.img} />
                  )}
                </div>
              ))}
            </div>

          </div>
        </div>
      )}
    </>
  );
};

export default GallerySection;
