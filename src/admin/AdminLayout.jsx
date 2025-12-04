import React from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import './theme.css';
import Sidebar from './components/Sidebar';
import Topbar from './components/Topbar';

const titles = {
  '/admin': 'Dashboard',
  '/admin/projects': 'Projects',
  '/admin/completed': 'ProjectHouse',
  '/admin/testimonials': 'Testimonials',
  
  '/admin/home': 'Home Content',
  '/admin/blog': 'Blog',
  '/admin/careers': 'Careers',
  '/admin/leadership': 'Leadership Team',
  '/admin/founder': 'Founder Page',
  '/admin/services': 'Services',
  '/admin/investors': 'Investors',
  '/admin/enquireForm': 'EnquireForm',
  '/admin/contact': 'Contact Info',
  '/admin/categorytab':"categorytab",
  '/admin/counterupdate': 'counterupdate',
  '/admin/seo': 'SEO & Metadata',
  '/admin/enquiryCustomer':'/admin/enquiryCustomer'
};

const AdminLayout = () => {
  const { pathname } = useLocation();
  const title = titles[pathname] || 'Admin';
  return (
    <div className="admin-shell" style={{ display: 'grid', gridTemplateColumns: '240px 1fr' }}>
      <Sidebar />
      <div>
        <Topbar title={title} />
        <div style={{ padding: 18 }}>
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default AdminLayout;