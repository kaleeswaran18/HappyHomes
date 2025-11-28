import React from "react";
import { Link } from "react-router-dom";
import "./ProjectCard.css";

const ProjectCard = ({ project }) => {
  return (
    <div className="project-card">
      <div className="project-image">
        <img src={project.image} alt={project.name} />
        <div className="project-badge">{project.status}</div>
      </div>

      <div className="project-content">
        <h3>{project.name}</h3>
        <p className="project-location">{project.location}</p>

        <p className="project-description">{project.description}</p>

        <div className="project-features">
          {project.bhk && <span className="feature">{project.bhk} BHK</span>}
          {project.type && <span className="feature">{project.type}</span>}
        </div>

        <div className="project-actions">
          <Link to={`/project/${project._id}`} className="btn-primary">
            View All House
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ProjectCard;
