// src/components/Sidebar.jsx
import React from 'react';
import { NavLink } from 'react-router-dom';
import './Sidebar.css';

const NavItem = ({ to, label }) => (
  <NavLink className={({ isActive }) => `admin-link ${isActive ? 'active' : ''}`} to={to}>{label}</NavLink>
);

const Sidebar = () => {
  return (
    <aside className="admin-sidebar">
      <div className="admin-brand">
        <span>Happy Homes CMS</span>
      </div>

      <div className="nav-group">
        <div className="nav-group-title">Overview</div>
        <NavItem to="/admin" label="Dashboard" />
        <NavItem to="/admin/home" label="Home Content" />
        <NavItem to="/admin/categorytab" label="categorytab" />
        
      </div>

      <div className="nav-group">
        <div className="nav-group-title">Content</div>
        <NavItem to="/admin/projects" label="Projects" />
      <NavItem to="/admin/completed" label="ProjectsHouse" />
        <NavItem to="/admin/testimonials" label="Testimonials" />
        <NavItem to="/admin/blog" label="Media" />
        <NavItem to="/admin/careers" label="Careers" />
      </div>

      <div className="nav-group">
        <div className="nav-group-title">Pages</div>
        <NavItem to="/admin/leadership" label="Leadership Team" />
        <NavItem to="/admin/founder" label="Founder Page" />
        <NavItem to="/admin/services" label="Services" />
      
        <NavItem to="/admin/contact" label="Contact Info" />
<NavItem to="/admin/counterupdate" label="counterupdate" />
        
      </div>

      <div className="nav-group">
        <div className="nav-group-title">Site</div>
        <NavItem to="/admin/navigation" label="counter" />
        <NavItem to="/admin/seo" label="SEO & Metadata" />
      </div>
    </aside>
  );
};

export default Sidebar;
