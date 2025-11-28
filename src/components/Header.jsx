// import React, { useState } from 'react';
// import { Link } from 'react-router-dom';
// import './Header.css';

// const Header = () => {
//   const [isMenuOpen, setIsMenuOpen] = useState(false);
//   const [openDropdown, setOpenDropdown] = useState(null);

//   const toggleMenu = () => {
//     setIsMenuOpen(prev => !prev);
//     setOpenDropdown(null);
//   };

//   const handleDropdownToggle = key => {
//     setOpenDropdown(prev => (prev === key ? null : key));
//   };

//   const closeMenu = () => {
//     setIsMenuOpen(false);
//     setOpenDropdown(null);
//   };

//   const dropdownProps = key => ({
//     onMouseEnter: () => setOpenDropdown(key),
//     onMouseLeave: () => setOpenDropdown(null)
//   });

//   return (
//     <header className={`site-header ${isMenuOpen ? 'menu-open' : ''}`}>
//       {/* <div className="top-strip">
//         <div className="container top-strip-content">
//           <span className="top-strip-badge">Customer Service</span>
//           <div className="top-strip-links">
//             <a href="tel:+919876543210" className="top-link">Call Now</a>
//             <span className="top-divider">|</span>
//             <a href="mailto:hello@happyhomes.com" className="top-link">Mail Us</a>
//           </div>
//         </div>
//       </div> */}

//       <div className="nav-wrapper">
//         <div className="container nav-container">
//           <div className="brand">
//             <Link to="/" onClick={closeMenu} className="brand-name">Happy Homes</Link>
//             <span className="brand-tagline">Builders in Madurai</span>
//           </div>

//           <button
//             className="menu-toggle"
//             onClick={toggleMenu}
//             aria-label="Toggle navigation menu"
//             aria-expanded={isMenuOpen}
//           >
//             <span />
//             <span />
//             <span />
//           </button>

//           <nav className={`nav ${isMenuOpen ? 'nav-open' : ''}`} aria-label="Main navigation">
//             <ul className="nav-list">
//               <li className="nav-item">
//                 <Link to="/" onClick={closeMenu}>Home</Link>
//               </li>

//               <li
//                 className={`nav-item dropdown ${openDropdown === 'about' ? 'open' : ''}`}
//                 {...dropdownProps('about')}
//               >
//                 <button
//                   className="dropdown-trigger"
//                   onClick={() => handleDropdownToggle('about')}
//                   aria-expanded={openDropdown === 'about'}
//                 >
//                   About Us <span className="arrow">▼</span>
//                 </button>
//                 <ul className={`dropdown-menu ${openDropdown === 'about' ? 'show' : ''}`}>
//                   <li><Link to="/founder" onClick={closeMenu}>Founder and MD</Link></li>
//                   <li><Link to="/leadership" onClick={closeMenu}>Leadership Team</Link></li>
//                   <li><Link to="/completed-projects" onClick={closeMenu}>Completed Projects</Link></li>
//                   <li><Link to="/services" onClick={closeMenu}>Our Services</Link></li>
//                   <li><Link to="/testimonials" onClick={closeMenu}>Testimonials</Link></li>
//                   <li><Link to="/blog" onClick={closeMenu}>Blog</Link></li>
//                   <li><Link to="/contact" onClick={closeMenu}>Builders in Coimbatore</Link></li>
//                 </ul>
//               </li>

//               <li
//                 className={`nav-item dropdown ${openDropdown === 'projects' ? 'open' : ''}`}
//                 {...dropdownProps('projects')}
//               >
//                 <button
//                   className="dropdown-trigger"
//                   onClick={() => handleDropdownToggle('projects')}
//                   aria-expanded={openDropdown === 'projects'}
//                 >
//                   Ongoing Projects <span className="arrow">▼</span>
//                 </button>
//                 <ul className={`dropdown-menu ${openDropdown === 'projects' ? 'show' : ''}`}>
//                   <li className="sub-dropdown">
//                     <Link to="/ongoing-projects" onClick={closeMenu}><span>Madurai</span></Link>
//                     {/* <ul className="sub-dropdown-menu">
//                       <li><Link to="/ongoing-projects?location=surya-nagar" onClick={closeMenu}>Surya Nagar</Link></li>
//                       <li><Link to="/ongoing-projects?location=oomachikulam" onClick={closeMenu}>Oomachikulam</Link></li>
//                       <li><Link to="/ongoing-projects?location=avaniyapuram" onClick={closeMenu}>Avaniyapuram</Link></li>
//                       <li><Link to="/ongoing-projects?location=thuvariman" onClick={closeMenu}>Thuvariman</Link></li>
//                     </ul> */}
//                   </li>
//                   {/* <li className="sub-dropdown">
//                     <span>Coimbatore</span>
//                     <ul className="sub-dropdown-menu">
//                       <li><Link to="/ongoing-projects?location=saravanampatti" onClick={closeMenu}>Saravanampatti</Link></li>
//                     </ul>
//                   </li> */}
//                 </ul>
//               </li>

//               <li className="nav-item">
//                 <Link to="/media" onClick={closeMenu}>Media</Link>
//               </li>
//               <li className="nav-item">
//                 <Link to="/investors" onClick={closeMenu}>Investors</Link>
//               </li>
//               <li className="nav-item">
//                 <Link to="/careers" onClick={closeMenu}>Careers</Link>
//               </li>
//               {/* <li className="nav-item">
//                 <Link to="/contact" onClick={closeMenu}>Contact</Link>
//               </li> */}
//             </ul>
//             <div className="nav-cta-group">
//               {/* <Link to="/contact" className="nav-btn outline" onClick={closeMenu}>
//                 Download Brochure
//               </Link> */}
//               <Link to="/contact" className="nav-btn solid" onClick={closeMenu}>
//                 Enquire Now
//               </Link>
//             </div>
//           </nav>
//         </div>
//       </div>
//     </header>
//   );
// };

// export default Header;


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
            </ul>

            <div className="nav-cta-group">
              <Link to="/contact" className="nav-btn solid" onClick={closeMenu}>
                Enquire Now
              </Link>
            </div>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;
