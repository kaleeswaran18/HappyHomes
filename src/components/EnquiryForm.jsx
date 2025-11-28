import React, { useState, useEffect } from 'react';
import './EnquiryForm.css';
import axios from 'axios';

const EnquiryForm = ({
  title = "Let's Build Your Home — Together",
  subtitle = "2, 3, 4 & 5 BHK Villas and Apartments!",
  onClose,
  projectId = null
}) => {

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    mobile: '',
    project: projectId || '',
    bhk: '',
    message: ''
  });

  const [projectList, setProjectList] = useState([]);
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [submitError, setSubmitError] = useState('');

  // Load project list
  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const res = await axios.get("http://localhost:6001/product/getAlprojectsSchema");

        const list = res.data.data.map((p) => ({
          id: p._id,
          name: p.name
        }));

        setProjectList([{ id: "", name: "Select a Project (Optional)" }, ...list]);

      } catch (err) {
        console.error("Project Fetch Error:", err);
      }
    };

    fetchProjects();
  }, []);

  // Validation
  const validateForm = () => {
    const newErrors = {};

    if (!formData.name.trim()) newErrors.name = "Name is required";
    if (!formData.email.trim()) newErrors.email = "Email is required";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email))
      newErrors.email = "Enter a valid email";

    if (!formData.mobile.trim()) newErrors.mobile = "Mobile number is required";
    else if (!/^[0-9]{10}$/.test(formData.mobile))
      newErrors.mobile = "Enter valid 10-digit number";

    if (!formData.message.trim()) newErrors.message = "Message is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Change handlers
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    setErrors({ ...errors, [name]: "" });
    setSubmitError("");
  };

  const handleMobileChange = (e) => {
    const onlyNumbers = e.target.value.replace(/\D/g, "").slice(0, 10);
    setFormData({ ...formData, mobile: onlyNumbers });
    setErrors({ ...errors, mobile: "" });
  };

  // Submit handler
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsSubmitting(true);
    setSubmitError("");

    try {
      const payload = {
        name: formData.name,
        email: formData.email,
        mobile: formData.mobile,
        project: formData.project,
        bhk: formData.bhk,
        message: formData.message
      };

      await axios.post("http://localhost:6001/product/createform", payload);

      setIsSubmitting(false);
      setIsSubmitted(true);

      setTimeout(() => {
        onClose();
        setIsSubmitted(false);
        setFormData({
          name: '',
          email: '',
          mobile: '',
          project: projectId || '',
          bhk: '',
          message: ''
        });
      }, 2000);

    } catch (err) {
      console.error("Submit Error:", err);
      setIsSubmitting(false);
      setSubmitError("Something went wrong. Try again later.");
    }
  };

  return (
    <div className="enquiry-form-overlay" onClick={onClose}>
      
      <div className="enquiry-form-container" onClick={(e) => e.stopPropagation()}>

        {/* Inside Close Button */}
        <button className="close-btn" onClick={onClose}>×</button>

        <div className="enquiry-form-header">
          <h2>{title}</h2>
          {subtitle && <p>{subtitle}</p>}
        </div>

        {isSubmitted ? (
          <div className="success-message">
            <div className="success-icon">✓</div>
            <h3>Thank You!</h3>
            <p>Your enquiry has been submitted.</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="enquiry-form">

            <div className="form-group">
              <label>Name *</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                className={errors.name ? "error" : ""}
                onChange={handleChange}
                placeholder="Enter your name"
              />
              {errors.name && <span className="error-message">{errors.name}</span>}
            </div>

            <div className="form-group">
              <label>Email *</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                className={errors.email ? "error" : ""}
                onChange={handleChange}
                placeholder="your@email.com"
              />
              {errors.email && <span className="error-message">{errors.email}</span>}
            </div>

            <div className="form-group">
              <label>Mobile *</label>
              <input
                type="tel"
                name="mobile"
                value={formData.mobile}
                className={errors.mobile ? "error" : ""}
                onChange={handleMobileChange}
                placeholder="10-digit number"
                maxLength="10"
              />
              {errors.mobile && <span className="error-message">{errors.mobile}</span>}
            </div>

            <div className="form-group">
              <label>Project (Optional)</label>
              <select name="project" value={formData.project} onChange={handleChange}>
                {projectList.map((p) => (
                  <option key={p.id} value={p.name}>{p.name}</option>
                ))}
              </select>
            </div>

            <div className="form-group">
              <label>BHK (Optional)</label>
              <select name="bhk" value={formData.bhk} onChange={handleChange}>
                <option value="">Select BHK</option>
                <option value="1">1 BHK</option>
                <option value="2">2 BHK</option>
                <option value="3">3 BHK</option>
                <option value="4">4 BHK</option>
                <option value="5">5 BHK</option>
              </select>
            </div>

            <div className="form-group full">
              <label>Message *</label>
              <textarea
                name="message"
                value={formData.message}
                className={errors.message ? "error" : ""}
                onChange={handleChange}
                placeholder="Tell us your requirements..."
              ></textarea>
              {errors.message && <span className="error-message">{errors.message}</span>}
            </div>

            {submitError && <div style={{ color: "red" }}>{submitError}</div>}

            <button type="submit" className="submit-btn" disabled={isSubmitting}>
              {isSubmitting ? "Submitting..." : "Submit Enquiry"}
            </button>

          </form>
        )}
      </div>
    </div>
  );
};

export default EnquiryForm;
