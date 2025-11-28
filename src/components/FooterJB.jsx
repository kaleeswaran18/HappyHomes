import React from "react";
import {
  FaFacebookF,
  FaTwitter,
  FaYoutube,
  FaInstagram,
  FaPinterestP,
  FaSlideshare,
} from "react-icons/fa";
import "./FooterJB.css";

const Footer = () => {
  return (
    <footer className="footer-container">
      <div className="footer-top-shape"></div>

      <div className="footer-inner">
        {/* Logo and intro */}
        <div className="footer-section logo-section">
          <a href="https://jayabharath.com">
            <img
              // src="https://jayabharath.com/wp-content/uploads/2023/11/logo-2-200x98.png"
              alt="Happy Homes"
              className="footer-logo"
            />
          </a>
          <p className="footer-intro">
            <strong>Welcome to Happy Homes!</strong> We’re among the best
            builders in Madurai and Coimbatore, known for quality and trust.
            Start your journey to the perfect home today!
          </p>
        </div>

        {/* Projects */}
        <div className="footer-section">
          <h4>Our Current Projects</h4>
          <ul>
            <li>
              <a href="https://jayabharath.com/jayabharath-elanza-apartments-in-madurai/">
                Surya Garden -1
              </a>
            </li>
            <li>
              <a href="https://jayabharath.com/jayabharath-twin-tower-best-apartments-in-madurai/">
                Surya Garden -2
              </a>
            </li>
            <li>
              <a href="https://jayabharath.com/oscar-city-umachikulam/">
                Surya Garden -3
              </a>
            </li>
            <li>
              <a href="https://jayabharath.com/jayabharath-river-city/">
                Surya Garden -4
              </a>
            </li>
            <li>
              <a href="https://jayabharath.com/jayabharath-green-city/">
                Surya Garden -5
              </a>
            </li>
            <li>
              <a href="https://jayabharath.com/builders-in-coimbatore-jayabharath-yogamudhra/">
               D-Mart
              </a>
            </li>
            {/* <li>
              <a href="https://jayabharath.com/jayabharath-elite-city/">
                Happy HomesElite City
              </a>
            </li>
            <li>
              <a href="https://jayabharath.com/flora-gated-community-villas-in-madurai/">
                Happy HomesFlora
              </a>
            </li> */}
          </ul>
        </div>

        {/* Contact Info */}
        <div className="footer-section contact-section">
          <h4>Corporate Office</h4>
          <address>
            <strong>Happy Homes Pvt Ltd</strong>
            <br />
            M.A.R Tower, NO:625-A, 1st Floor, <br />
            xxxxxxx,xxxxxxxx, <br />
            Madurai, Tamil Nadu 625020 <br />
            India
            <br />
            <a href="tel:+916385847074">📞 +91 63858 47074</a> <br />
            <a href="mailto:info@HappyHomes.com">✉️ info@HappyHomes.com</a>
          </address>

          <h4>Project Locations</h4>
          <div className="locations">
            <a href="https://jayabharath.com/">📍 Madurai</a>
            {/* <a href="https://jayabharath.com/builders-in-coimbatore-jayabharath-yogamudhra/">
              📍 Coimbatore
            </a> */}
          </div>
        </div>

        {/* Social Links */}
        <div className="footer-section social-section-JB">
          <h4>Follow Us</h4>
          <div className="social-icons">
            <a
              href="https://www.facebook.com/profile.php?id=100063624265773"
              target="_blank"
              rel="noreferrer"
              className="social-box facebook"
            >
              <FaFacebookF />
            </a>
            <a
              href="https://twitter.com/jb_jayabharath"
              target="_blank"
              rel="noreferrer"
              className="social-box twitter"
            >
              <FaTwitter />
            </a>
            <a
              href="https://www.youtube.com/channel/UCC0d0Qf8-Lejt2zS1iyrBag?view_as=subscriber"
              target="_blank"
              rel="noreferrer"
              className="social-box youtube"
            >
              <FaYoutube />
            </a>
            <a
              href="https://www.instagram.com/jayabharathhomes/?hl=en"
              target="_blank"
              rel="noreferrer"
              className="social-box instagram"
            >
              <FaInstagram />
            </a>
            <a
              href="https://pin.it/1ZctokDUw"
              target="_blank"
              rel="noreferrer"
              className="social-box pinterest"
            >
              <FaPinterestP />
            </a>
            <a
              href="https://www.slideshare.net/JayabharathHomes"
              target="_blank"
              rel="noreferrer"
              className="social-box slideshare"
            >
              <FaSlideshare />
            </a>
          </div>
        </div>
      </div>

      <div className="footer-bottom-shape"></div>
    </footer>
  );
};

export default Footer;
