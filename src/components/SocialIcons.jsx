import React from "react";
import {
  FaFacebookF,
  FaInstagram,
  FaTwitter,
  FaLinkedinIn,
  FaPinterestP,
  FaYoutube,
} from "react-icons/fa";
import "./SocialIcons.css";

const socialLinks = [
  {
    name: "Facebook",
    icon: <FaFacebookF />,
    url: "https://www.facebook.com/jkjayabharathhomes/",
    color: "#1877F2",
  },
  {
    name: "Instagram",
    icon: <FaInstagram />,
    url: "https://www.instagram.com/jayabharathhomes/",
    color: "#E1306C",
  },
  {
    name: "Twitter",
    icon: <FaTwitter />,
    url: "https://x.com/jb_jayabharath",
    color: "#1DA1F2",
  },
  {
    name: "LinkedIn",
    icon: <FaLinkedinIn />,
    url: "https://www.linkedin.com/company/jayabharath-homes/",
    color: "#0077B5",
  },
  {
    name: "Pinterest",
    icon: <FaPinterestP />,
    url: "https://in.pinterest.com/jayabharathhomes/",
    color: "#E60023",
  },
  {
    name: "YouTube",
    icon: <FaYoutube />,
    url: "https://www.youtube.com/@jayabharathhomesbestbuilders",
    color: "#FF0000",
  },
];

const SocialIcons = () => {
  return (
    <section className="social-section">
      <div className="social-wrapper">
        {socialLinks.map((item, index) => (
          <a
            key={index}
            href={item.url}
            className="social-icon"
            target="_blank"
            rel="noopener noreferrer"
            aria-label={item.name}
            style={{ "--brand-color": item.color }}
          >
            {item.icon}
          </a>
        ))}
      </div>
    </section>
  );
};

export default SocialIcons;
