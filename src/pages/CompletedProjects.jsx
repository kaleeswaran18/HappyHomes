import React from 'react';
import ProjectCard from '../components/ProjectCard';
import './CompletedProjects.css';
import headerBg from '../asset/MediaBG.jpeg'
import buildingImage from '../asset/buildingImage.jpg';
        

const CompletedProjects = () => {
  const completedProjects = [
    {
      id: 1,
      name: 'Happy Elite City',
      location: 'Oomachikulam, Madurai',
      description: 'Ultra-luxury apartments with premium amenities and skylounge.',
      bhk: '1, 2, 3 BHK',
      type: 'Apartments',
      status: 'Completed',
      image: buildingImage,
    },
    {
      id: 2,
      name: 'Happy Green Valley',
      location: 'Avaniyapuram, Madurai',
      description: 'Premium villas in a lush gated community.',
      bhk: '3, 4, 5 BHK',
      type: 'Villas',
      status: 'Completed',
      image: buildingImage,
    },
    {
      id: 3,
      name: 'Signature Residency',
      location: 'Saravanampatti, Coimbatore',
      description: 'Gated community villas with premium elevations.',
      bhk: '3, 4 BHK',
      type: 'Villas',
      status: 'Completed',
      image: buildingImage,
    },
  ];

  return (
    <div className="completed-projects-page">
         <div className="services-header" style={{ backgroundImage: `url(${headerBg})` }}>
              <div className="services-header-overlay"></div>
             <div className="services-header-left">
          <h1>Completed Projects</h1>
          <p>Our Successfully Delivered Projects</p>
        </div>
      </div>

      <div className="container">
        <section className="projects-content">
          <div className="intro-text">
            <p>
              Over the years, Happy Homes has successfully completed numerous projects, 
              delivering homes that exceed expectations. Each completed project stands as a 
              testament to our commitment to quality, timely delivery, and customer satisfaction.
            </p>
          </div>

          <div className="projects-grid">
            {completedProjects.map(project => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </div>
        </section>
      </div>
    </div>
  );
};

export default CompletedProjects;


