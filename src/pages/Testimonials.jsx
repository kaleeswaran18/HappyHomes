import React, { useEffect, useState } from "react";
import "./Testimonials.css";
import axios from "axios";
import headerBg from "../asset/MediaBG.jpeg";

const Testimonials = () => {
  const [testimonials, setTestimonials] = useState([]);

  useEffect(() => {
    const fetchTestimonials = async () => {
      try {
        const res = await axios.get("http://localhost:6001/product/getTestimonials");
        setTestimonials(res.data?.data || []);
      } catch (err) {
        console.error("Error fetching testimonials:", err);
      }
    };

    fetchTestimonials();
  }, []);

  return (
    <div className="testimonials-page">
      <div
        className="services-header"
        style={{ backgroundImage: `url(${headerBg})` }}
      >
        <div className="services-header-overlay"></div>
        <div className="services-header-left">
          <h1>Testimonials</h1>
          <p>What Our Customers Say About Us</p>
        </div>
      </div>

      <div className="container">
        <section className="testimonials-content">
          <div className="testimonials-intro">
            <h2>Happy Homeowners</h2>
            <p>
              Our customers are our biggest advocates. Here's what they say about their
              journey with Happy Homes.
            </p>
          </div>

          <div className="testimonials-grid">
            {testimonials.map((item) => (
              <div key={item._id} className="testimonial-card">
                
                <div className="testimonial-img-box">
                  <img src={item.image} alt={item.name} />
                </div>

                <div className="testimonial-rating">
                  {[...Array(Number(item.rating))].map((_, i) => (
                    <span key={i} className="star">⭐</span>
                  ))}
                </div>

                <p className="testimonial-text">"{item.text}"</p>

                <div className="testimonial-author">
                  <h4>{item.name}</h4>
                  <p>{item.project}, {item.location}</p>
                  <span className="testimonial-day">{item.day}</span>
                </div>

              </div>
            ))}
          </div>

          <div className="testimonials-stats">
            <div className="stat-item">
              <div className="stat-number">5000+</div>
              <div className="stat-label">Happy Customers</div>
            </div>
            <div className="stat-item">
              <div className="stat-number">4.8/5</div>
              <div className="stat-label">Average Rating</div>
            </div>
            <div className="stat-item">
              <div className="stat-number">98%</div>
              <div className="stat-label">Satisfaction Rate</div>
            </div>
          </div>

        </section>
      </div>
    </div>
  );
};

export default Testimonials;
