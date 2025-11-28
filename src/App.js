import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';

import Header from './components/Header';
import Footer from './components/Footer';

// Public pages
import Home from './pages/Home';
import AboutUs from './pages/AboutUs';
import Founder from './pages/Founder';
import Leadership from './pages/Leadership';
import CompletedProjects from './pages/CompletedProjects';
import Services from './pages/Services';
import Testimonials from './pages/Testimonials';
import Blog from './pages/Blog';
import OngoingProjects from './pages/OngoingProjects';
import ProjectDetail from './pages/ProjectDetail';
import Media from './pages/Media';
import Careers from './pages/Careers';
import Contact from './pages/Contact';
import Viewspecificvisit from './pages/Viewspecificvisit';

// Auth
import { AuthProvider } from './auth/AuthContext';
import ProtectedRoute from './auth/ProtectedRoute';

// Admin pages
import AdminLogin from './admin/AdminLogin';
import AdminLayout from './admin/AdminLayout';
import Dashboard from './admin/Dashboard';
import Projects from './admin/Projects';
import TestimonialsAdmin from './admin/Testimonials';
import MediaAdmin from './admin/Media';
import HomeContent from './admin/pages/HomeContent';
import CompletedAdmin from './admin/pages/Completed';
import BlogAdmin from './admin/pages/BlogAdmin';
import CareersAdmin from './admin/pages/CareersAdmin';
import LeadershipAdmin from './admin/pages/LeadershipAdmin';
import FounderAdmin from './admin/pages/FounderAdmin';
import ServicesAdmin from './admin/pages/ServicesAdmin';
import InvestorsAdmin from './admin/pages/InvestorsAdmin';
import ContactAdmin from './admin/pages/ContactAdmin';
import NavigationAdmin from './admin/pages/NavigationAdmin';
import CounterupdateAdmin from './admin/pages/counterupdate';
import SeoAdmin from './admin/pages/SeoAdmin';

function App() {
  return (
    <Router>
      <AuthProvider>
        <div className="App">
          
          {/* 🌐 Public Header */}
          <Header />

          <Routes>

            {/* 🌍 PUBLIC ROUTES */}
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<AboutUs />} />
            <Route path="/founder" element={<Founder />} />
            <Route path="/leadership" element={<Leadership />} />
            <Route path="/completed-projects" element={<CompletedProjects />} />
            <Route path="/services" element={<Services />} />
            <Route path="/testimonials" element={<Testimonials />} />
            <Route path="/blog" element={<Blog />} />
            <Route path="/ongoing-projects" element={<OngoingProjects />} />
            <Route path="/project/:id" element={<ProjectDetail />} />
            <Route path="/media" element={<Media />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/careers" element={<Careers />} />
            <Route path="/Viewspecificvisit/:id" element={<Viewspecificvisit />} />

            {/* 🔑 ADMIN LOGIN PAGE */}
            <Route path="/admin/login" element={<AdminLogin />} />

            {/* 🔐 PROTECTED ADMIN ROUTES */}
            <Route element={<ProtectedRoute roles={["admin", "editor"]} />}>
              <Route path="/admin" element={<AdminLayout />}>
                
                <Route index element={<Dashboard />} />
                <Route path="projects" element={<Projects />} />
                <Route path="completed" element={<CompletedAdmin />} />
                <Route path="testimonials" element={<TestimonialsAdmin />} />
                <Route path="media" element={<MediaAdmin />} />
                <Route path="home" element={<HomeContent />} />
                <Route path="blog" element={<BlogAdmin />} />
                <Route path="careers" element={<CareersAdmin />} />
                <Route path="leadership" element={<LeadershipAdmin />} />
                <Route path="founder" element={<FounderAdmin />} />
                <Route path="services" element={<ServicesAdmin />} />
                <Route path="investors" element={<InvestorsAdmin />} />
                <Route path="contact" element={<ContactAdmin />} />
                <Route path="navigation" element={<NavigationAdmin />} />
                <Route path="counterupdate" element={<CounterupdateAdmin />} />
                <Route path="seo" element={<SeoAdmin />} />

              </Route>
            </Route>

          </Routes>

          {/* 🌐 Footer */}
          <Footer />
        </div>
      </AuthProvider>
    </Router>
  );
}

export default App;
