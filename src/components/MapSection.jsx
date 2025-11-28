import React from "react";
import "./MapSection.css";

const MapSection = () => {
  return (
    <section className="map-section">
      <div className="map-container">
        {/* <iframe
          title="Happy Homes Pvt Ltd"
          src="https://maps.google.com/maps?q=Jayabharath%20Homes%20Pvt%20Ltd&t=m&z=14&output=embed&iwloc=near"
          loading="lazy"
          allowFullScreen
          aria-label="Happy Homes Pvt Ltd"
        ></iframe> */}
       <iframe 
       title="Happy Homes Pvt Ltd"
       src="https://www.google.com/maps/embed?pb=!1m17!1m12!1m3!1d3930.6763122528328!2d78.11717507479197!3d9.877499990221725!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m2!1m1!2zOcKwNTInMzkuMCJOIDc4wrAwNycxMS4xIkU!5e0!3m2!1sen!2sin!4v1763357265411!5m2!1sen!2sin"
       allowfullscreen="" loading="lazy"
       aria-label="Happy Homes Pvt Ltd"
        ></iframe>
      </div>
    </section>
  );
};

export default MapSection;
