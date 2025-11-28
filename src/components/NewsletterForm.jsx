import React, { useState } from 'react';
import './NewsletterForm.css';

const NewsletterForm = () => {
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    // Email validation
    if (!email.trim()) {
      setError('Email is required');
      return;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError('Please enter a valid email address');
      return;
    }

    setIsSubmitting(true);

    try {
      // Store in localStorage
      const subscribers = JSON.parse(localStorage.getItem('newsletterSubscribers') || '[]');
      if (!subscribers.includes(email)) {
        subscribers.push(email);
        localStorage.setItem('newsletterSubscribers', JSON.stringify(subscribers));
      }

      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));

      setIsSubmitting(false);
      setIsSubmitted(true);
      setEmail('');

      // Reset success message after 3 seconds
      setTimeout(() => {
        setIsSubmitted(false);
      }, 3000);
    } catch (err) {
      setIsSubmitting(false);
      setError('Something went wrong. Please try again.');
    }
  };

  return (
    <div className="newsletter-form">
      <h3>Subscribe to Our Newsletter</h3>
      <p>Get the latest updates on new projects and offers</p>
      {isSubmitted ? (
        <div className="newsletter-success">
          <span>✓</span> Thank you for subscribing!
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="newsletter-form-inner">
          <div className="newsletter-input-group">
            <input
              type="email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                setError('');
              }}
              placeholder="Enter your email"
              className={error ? 'error' : ''}
              required
            />
            <button type="submit" disabled={isSubmitting}>
              {isSubmitting ? '...' : 'Subscribe'}
            </button>
          </div>
          {error && <span className="newsletter-error">{error}</span>}
        </form>
      )}
    </div>
  );
};

export default NewsletterForm;


