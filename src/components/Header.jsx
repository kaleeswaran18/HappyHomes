


import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Header.css';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState(null);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
    setOpenDropdown(null);
  };

  const handleDropdownToggle = (key) => {
    setOpenDropdown(prev => (prev === key ? null : key));
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
    setOpenDropdown(null);
  };

  return (
    <header className={`site-header ${isMenuOpen ? "menu-open" : ""}`}>
      <div className="nav-wrapper">
        <div className="container nav-container">

          {/* Brand */}
          <div className="brand">
            <Link to="/" onClick={closeMenu} className="brand-name">Happy Homes</Link>
            <span className="brand-tagline">Builders in Madurai</span>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="menu-toggle"
            onClick={toggleMenu}
            aria-label="Toggle navigation menu"
            aria-expanded={isMenuOpen}
          >
            <span />
            <span />
            <span />
          </button>

          {/* Navigation */}
          <nav className={`nav ${isMenuOpen ? "nav-open" : ""}`} aria-label="Main navigation">
            <ul className="nav-list">

              <li className="nav-item">
                <Link to="/" onClick={closeMenu}>Home</Link>
              </li>

              {/* ABOUT DROPDOWN */}
              <li className={`nav-item dropdown ${openDropdown === "about" ? "open" : ""}`}>
                <button
                  className="dropdown-trigger"
                  onClick={() => handleDropdownToggle("about")}
                >
                  About Us <span className="arrow">▼</span>
                </button>

                <ul className={`dropdown-menu ${openDropdown === "about" ? "show" : ""}`}>
                  <li><Link to="/founder" onClick={closeMenu}>Founder and MD</Link></li>
                  <li><Link to="/leadership" onClick={closeMenu}>Leadership Team</Link></li>
                  
                  <li><Link to="/services" onClick={closeMenu}>Our Services</Link></li>
                  <li><Link to="/testimonials" onClick={closeMenu}>Testimonials</Link></li>
                
                  {/* <li><Link to="/contact" onClick={closeMenu}>Builders in Coimbatore</Link></li> */}
                </ul>
              </li>

              {/* PROJECTS DROPDOWN */}
              <li className={`nav-item dropdown ${openDropdown === "projects" ? "open" : ""}`}>
                <button
                  className="dropdown-trigger"
                  onClick={() => handleDropdownToggle("projects")}
                >
                  Ongoing Projects <span className="arrow">▼</span>
                </button>

                <ul className={`dropdown-menu ${openDropdown === "projects" ? "show" : ""}`}>
                  <li className="sub-dropdown">
                    <Link to="/ongoing-projects" onClick={closeMenu}>
                      <span>Madurai</span>
                    </Link>
                  </li>
                </ul>
              </li>

              <li className="nav-item">
                <Link to="/media" onClick={closeMenu}>Media</Link>
              </li>

              <li className="nav-item">
                <Link to="/services" onClick={closeMenu}>Our Services</Link>
              </li>

              <li className="nav-item">
                <Link to="/careers" onClick={closeMenu}>Careers</Link>
              </li>
 <li className="nav-item">
                <Link to="/contact" onClick={closeMenu}>Enquire Now</Link>
              </li>
            </ul>

                     </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;
