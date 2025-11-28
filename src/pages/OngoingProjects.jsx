import React, { useState, useEffect } from "react";
import axios from "axios";
import headerBg from "../asset/Ongoingimagebg.jpg";
import "./OngoingProjects.css";
import { useNavigate } from "react-router-dom";
import FooterJB from '../components/FooterJB';
const OngoingProjects = () => {
  const [projects, setProjects] = useState([]);
  const navigate = useNavigate();
  

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const res = await axios.get(
          "http://localhost:6001/product/getprojectsSchema"
        );
        setProjects(res.data?.data || []);
      } catch (err) {
        console.error("Error fetching projects:", err);
      }
    };

    fetchProjects();
  }, []);

  return (
    <div className="ongoing-projects-page">
      <div
        className="services-header"
        style={{ backgroundImage: `url(${headerBg})` }}
      >
        <div className="services-header-overlay"></div>
        <div className="services-header-left">
          <h1>Ongoing Projects</h1>
          <p>Explore Our Current Developments</p>
        </div>
      </div>

      <div className="container">
        <section className="projects-content">
          <div className="projects-grid">
            {projects.map((item) => (
              <div className="project-card" key={item._id}>
                <div className="project-img-box">
                  <img src={item.image} alt={item.name} />
                </div>

                <div className="project-card-body">
                  <h3>{item.name}</h3>
                  <p className="desc">{item.description}</p>

                  <div className="project-info">
                    <p>
                      <strong>BHK:</strong> {item.bhk}
                    </p>
                    <p>
                      <strong>Location:</strong> {item.location}
                    </p>
                  </div>

                  {/* <button
                    className="project-btn"
                    onClick={() => navigate(`/project/${item._id}`)}  // ⭐ ID sent
                  >
                    View Details
                  </button> */}
                   <button
                    className="project-btn"
                    onClick={() => navigate(`/Viewspecificvisit/${item._id}`)}  // ⭐ ID sent
                  >
                    View Details
                  </button>

                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
       <FooterJB />
    </div>
  );
};

export default OngoingProjects;
