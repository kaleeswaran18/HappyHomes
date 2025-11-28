import React, { useEffect, useState } from "react";
import axios from "axios";
import "./GallerySection.css";

const GallerySection = () => {
  const [galleryItems, setGalleryItems] = useState([]);

  // ✅ Fetch gallery images from backend
  const fetchGalleryImages = async () => {
    try {
      const res = await axios.get("http://localhost:6001/product/gethomeimage");

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

  return (
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

      {/* Gallery Grid */}
      <div className="gallery-grid">
        {galleryItems.length === 0 ? (
          <p className="loading">Loading...</p>
        ) : (
          galleryItems.map((item, index) => (
            <div className="gallery-item" key={index}>
              {/* ✔ Show Image */}
              {item.type === "image" && (
                <img src={item.img} alt={item.title} loading="lazy" />
              )}

              {/* ✔ Show Video */}
              {item.type === "video" && (
                <video src={item.img} controls className="video-thumb" />
              )}

              <div className="overlay">
                <div className="title">{item.title}</div>
              </div>
            </div>
          ))
        )}
      </div>
    </section>
  );
};

export default GallerySection;
