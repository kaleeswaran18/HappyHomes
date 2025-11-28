import React, { useState } from 'react';
import './EnquiryForm.css';

const EnquiryForm = ({ title = "Let's Build Your Home — Together", subtitle = "2, 3, 4 & 5 BHK Villas and Apartments!", onClose, projectId = null }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    mobile: '',
    project: projectId || '',
    bhk: '',
    message: ''
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [submitError, setSubmitError] = useState('');

  const projects = [
    { value: '', label: 'Select a Project (Optional)' },
    { value: 'happy-elite-city', label: 'Happy Elite City' },
    { value: 'happy-green-valley', label: 'Happy Green Valley' },
    { value: 'happy-signature-residency', label: 'Happy Signature Residency' },
    { value: 'happy-elite', label: 'Happy Elite Villas' },
    { value: 'happy-twin-towers', label: 'Happy Twin Towers' },
    { value: 'happy-gardens', label: 'Happy Gardens' },
    { value: 'happy-flora', label: 'Happy Flora' },
    { value: 'happy-river-view', label: 'Happy River View' },
    { value: 'happy-heights', label: 'Happy Heights' },
    { value: 'other', label: 'Other' }
  ];

  const bhkOptions = [
    { value: '', label: 'Select BHK' },
    { value: '1', label: '1 BHK' },
    { value: '2', label: '2 BHK' },
    { value: '3', label: '3 BHK' },
    { value: '4', label: '4 BHK' },
    { value: '5', label: '5 BHK' }
  ];

  const validateForm = () => {
    const newErrors = {};

    // Name validation
    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    } else if (formData.name.trim().length < 2) {
      newErrors.name = 'Name must be at least 2 characters';
    }

    // Email validation
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    // Mobile validation
    if (!formData.mobile.trim()) {
      newErrors.mobile = 'Mobile number is required';
    } else if (!/^[0-9]{10}$/.test(formData.mobile.replace(/\s+/g, ''))) {
      newErrors.mobile = 'Please enter a valid 10-digit mobile number';
    }

    // Message validation
    if (!formData.message.trim()) {
      newErrors.message = 'Message is required';
    } else if (formData.message.trim().length < 10) {
      newErrors.message = 'Message must be at least 10 characters';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
    
    // Clear error for this field when user starts typing
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: ''
      });
    }
    setSubmitError('');
  };

  const formatMobileNumber = (value) => {
    // Remove all non-digits
    const digits = value.replace(/\D/g, '');
    // Limit to 10 digits
    return digits.slice(0, 10);
  };

  const handleMobileChange = (e) => {
    const formatted = formatMobileNumber(e.target.value);
    setFormData({
      ...formData,
      mobile: formatted
    });
    
    if (errors.mobile) {
      setErrors({
        ...errors,
        mobile: ''
      });
    }
    setSubmitError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);
    setSubmitError('');
    
    try {
      // Simulate API call
      const submissionData = {
        ...formData,
        mobile: formData.mobile.replace(/\s+/g, ''),
        timestamp: new Date().toISOString()
      };

      // Store in localStorage for demo purposes
      const submissions = JSON.parse(localStorage.getItem('enquirySubmissions') || '[]');
      submissions.push(submissionData);
      localStorage.setItem('enquirySubmissions', JSON.stringify(submissions));

      // Simulate network delay
      await new Promise(resolve => setTimeout(resolve, 1500));

      // Log to console for debugging
      console.log('Form submitted:', submissionData);

      setIsSubmitting(false);
      setIsSubmitted(true);
      
      // Reset form after success
      setTimeout(() => {
        if (onClose) onClose();
        setIsSubmitted(false);
        setFormData({ 
          name: '', 
          email: '', 
          mobile: '', 
          project: projectId || '', 
          bhk: '', 
          message: '' 
        });
        setErrors({});
      }, 3000);
    } catch (error) {
      setIsSubmitting(false);
      setSubmitError('Something went wrong. Please try again later.');
      console.error('Form submission error:', error);
    }
  };

  return (
    <div className="enquiry-form-overlay" onClick={onClose}>
      <div className="enquiry-form-container" onClick={(e) => e.stopPropagation()}>
        {onClose && (
          <button className="close-btn" onClick={onClose} aria-label="Close">×</button>
        )}
        <div className="enquiry-form-header">
          <h2>{title}</h2>
          {subtitle && <p>{subtitle}</p>}
        </div>
        {isSubmitted ? (
          <div className="success-message">
            <div className="success-icon">✓</div>
            <h3>Thank You!</h3>
            <p>We've received your enquiry. Our team will contact you soon.</p>
            <p className="success-note">We typically respond within 24 hours.</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="enquiry-form" noValidate>
            <div className="form-group">
              <label htmlFor="name">Name *</label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className={errors.name ? 'error' : ''}
                placeholder="Enter your full name"
                required
              />
              {errors.name && <span className="error-message">{errors.name}</span>}
            </div>

            <div className="form-group">
              <label htmlFor="email">Email *</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className={errors.email ? 'error' : ''}
                placeholder="your.email@example.com"
                required
              />
              {errors.email && <span className="error-message">{errors.email}</span>}
            </div>

            <div className="form-group">
              <label htmlFor="mobile">Mobile Number *</label>
              <input
                type="tel"
                id="mobile"
                name="mobile"
                value={formData.mobile}
                onChange={handleMobileChange}
                className={errors.mobile ? 'error' : ''}
                placeholder="10-digit mobile number"
                maxLength="10"
                required
              />
              {errors.mobile && <span className="error-message">{errors.mobile}</span>}
            </div>

            <div className="form-row">
              <div className="form-group">
                <label htmlFor="project">Project (Optional)</label>
                <select
                  id="project"
                  name="project"
                  value={formData.project}
                  onChange={handleChange}
                >
                  {projects.map(project => (
                    <option key={project.value} value={project.value}>
                      {project.label}
                    </option>
                  ))}
                </select>
              </div>

              <div className="form-group">
                <label htmlFor="bhk">BHK Preference (Optional)</label>
                <select
                  id="bhk"
                  name="bhk"
                  value={formData.bhk}
                  onChange={handleChange}
                >
                  {bhkOptions.map(option => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="message">Message *</label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                className={errors.message ? 'error' : ''}
                placeholder="Tell us about your requirements..."
                rows="4"
                required
              />
              {errors.message && <span className="error-message">{errors.message}</span>}
            </div>

            {submitError && (
              <div className="submit-error">
                <span>⚠️</span> {submitError}
              </div>
            )}

            <div className="privacy-note">
              <span>🔒</span> We respect your privacy. Your details are safe with us.
            </div>

            <button type="submit" className="submit-btn" disabled={isSubmitting}>
              {isSubmitting ? (
                <>
                  <span className="spinner"></span>
                  Submitting...
                </>
              ) : (
                'Submit Enquiry'
              )}
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

export default EnquiryForm;
