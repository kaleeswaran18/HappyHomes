import { useParams } from "react-router-dom";
import axios from "axios";
import React, { useEffect, useState } from "react";
import "./OngoingProjects.css";  // ⭐ Reuse same design styles
import { useNavigate } from "react-router-dom";
import FooterJB from '../components/FooterJB';
import headerBg from "../asset/Ongoingimagebg.jpg";
const Viewspecificvisit = () => {
  const { id } = useParams();
  const [projects, setProjects] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(`http://localhost:6001/product/ViewProject/${id}`)
      .then((res) => setProjects(res.data.data || []))
      .catch((err) => console.log(err));
  }, [id]);

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
          <h1 className="visit-title">Project Details</h1>

          <div className="projects-grid">
            {projects.map((item) => (
              <div className="project-card" key={item._id}>
                
                <div className="project-img-box">
                  <img src={item.image} alt={item.name} />
                </div>

                <div className="project-card-body">
                  <h3>{item.name}</h3>

                  <p className="desc">
                    {item.description
                      ? item.description
                      : "No description available."}
                  </p>

                  <div className="project-info">
                    <p>
                      <strong>BHK:</strong> {item.bhk}
                    </p>
                    <p>
                      <strong>Location:</strong> {item.location}
                    </p>
                    <p>
                      <strong>Project Place:</strong> {item.projectPlace}
                    </p>
                  </div>
<button
                    className="project-btn"
                    onClick={() => navigate(`/project/${item._id}`)}  // ⭐ ID sent
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

export default Viewspecificvisit;
