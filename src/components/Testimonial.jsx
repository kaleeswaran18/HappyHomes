import React, { useState, useMemo, useEffect } from "react";
import "./Testimonial.css";
import axios from "axios";

const Testimonials = () => {
  const [testimonials, setTestimonials] = useState([]);
  const [visibleCount, setVisibleCount] = useState(4);
  const itemsPerPage = 4;

  // Fetch Testimonials
  const fetchTestimonials = async () => {
    try {
      const res = await axios.get("http://localhost:6001/product/getTestimonials");

      if (res.data?.data) {
        const formatted = res.data.data.map((item) => ({
          id: item._id,
          name: item.name,
          rating: Number(item.rating),
          review: item.text,
          image: item.image,
          day: item.day,
          location: item.location,
          project: item.project,
        }));

        setTestimonials(formatted);
      }
    } catch (err) {
      console.error("Failed to load testimonials:", err);
    }
  };

  useEffect(() => {
    fetchTestimonials();
  }, []);

  // ⭐ Calculate Average Rating
  const averageRating = useMemo(() => {
    if (testimonials.length === 0) return 0;
    const total = testimonials.reduce((sum, t) => sum + t.rating, 0);
    return (total / testimonials.length).toFixed(1);
  }, [testimonials]);

  // ⭐ Render Stars
  const renderStars = (rating) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const halfStar = rating % 1 !== 0;

    for (let i = 0; i < fullStars; i++) {
      stars.push(<span key={`full-${i}`} className="star full">★</span>);
    }
    if (halfStar) stars.push(<span key="half" className="star half">★</span>);
    while (stars.length < 5) {
      stars.push(<span key={`empty-${stars.length}`} className="star empty">★</span>);
    }
    return stars;
  };

  // ⭐ View More / View Less
  const handleViewMore = () => {
    if (visibleCount >= testimonials.length) {
      setVisibleCount(itemsPerPage);
    } else {
      setVisibleCount((prev) => prev + itemsPerPage);
    }
  };

  return (
    <div className="testimonials-section">
      <h2 className="heading">Our Happy Customers</h2>

      {/* ⭐ Average Rating */}
      <div className="rating-summary">
        <h3>{averageRating} / 5</h3>
        <div className="stars">{renderStars(averageRating)}</div>
        <p>Based on {testimonials.length} reviews</p>
      </div>

      {/* ⭐ Testimonials Grid */}
      <div className="testimonial-grid">
        {testimonials.slice(0, visibleCount).map((t) => (
          <div key={t.id} className="testimonial-card">
            <div className="testimonial-header">
              <img src={t.image} alt={t.name} className="testimonial-img" />
              <div>
                <h4>{t.name}</h4>
                <p className="testimonial-date">{t.day}</p>
              </div>
            </div>

            <div className="stars">{renderStars(t.rating)}</div>

            <p className="testimonial-text">“{t.review}”</p>

            <p className="small-info">
              <b>Location:</b> {t.location} <br />
              <b>Project:</b> {t.project}
            </p>
          </div>
        ))}
      </div>

      {/* View More Button */}
      <button onClick={handleViewMore} className="view-more-btn">
        {visibleCount >= testimonials.length ? "View Less" : "View More"}
      </button>
    </div>
  );
};

export default Testimonials;
