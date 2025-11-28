import React, { useEffect, useState } from "react";
import axios from "axios";
import "./Media.css";
import FooterJB from '../components/FooterJB';
const LatestMedia = () => {
  const [media, setMedia] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:6001/product/gethomeimage")
      .then((res) => setMedia(res.data.data || []))
      .catch((err) => console.log(err));
  }, []);

  return (
    <div className="media-page">
      <h1 className="media-title">Latest Media Uploads</h1>

      <div className="media-full-grid">
        {media.map((item) => (
          <div key={item._id} className="media-full-card">

            {item.mediaType === "image" ? (
              <img className="media-full-img" src={item.image} alt="" />
            ) : (
              <video
                className="media-full-video"
                controls     // ⭐ Play only when user clicks
                preload="none"
              >
                <source src={item.image} type="video/mp4" />
              </video>
            )}

          </div>
        ))}
      </div>
       <FooterJB />
    </div>
  );
};

export default LatestMedia;
