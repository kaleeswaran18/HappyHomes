import React from 'react';
import './Blog.css';
import headerBg from '../asset/MediaBG.jpeg'

const Blog = () => {
  const blogPosts = [
    {
      id: 1,
      title: 'Why Choose Happy Homes for Your Dream Home',
      excerpt: 'Discover what makes Happy Homes the best builders in Madurai and why thousands of families trust us.',
      date: 'January 15, 2024',
      category: 'Real Estate'
    },
    {
      id: 2,
      title: 'Top 5 Reasons to Invest in Madurai Real Estate',
      excerpt: 'Madurai is emerging as a prime real estate destination. Learn why investing here is a smart choice.',
      date: 'January 10, 2024',
      category: 'Investment'
    },
    {
      id: 3,
      title: 'Understanding RERA and Its Benefits for Homebuyers',
      excerpt: 'Learn about RERA regulations and how they protect homebuyers in India.',
      date: 'January 5, 2024',
      category: 'Legal'
    },
    {
      id: 4,
      title: 'Villa vs Apartment: Which is Right for You?',
      excerpt: 'A comprehensive guide to help you decide between a villa and an apartment based on your lifestyle.',
      date: 'December 28, 2023',
      category: 'Lifestyle'
    },
    {
      id: 5,
      title: 'Home Loan Tips: Everything You Need to Know',
      excerpt: 'Essential tips and advice for securing the best home loan for your property purchase.',
      date: 'December 20, 2023',
      category: 'Finance'
    },
    {
      id: 6,
      title: 'Coimbatore: The Next Real Estate Hotspot',
      excerpt: 'Why Coimbatore, especially Saravanampatti, is becoming a preferred location for homebuyers.',
      date: 'December 15, 2023',
      category: 'Location'
    }
  ];

  return (
    <div className="blog-page">
         <div className="services-header" style={{ backgroundImage: `url(${headerBg})` }}>
              <div className="services-header-overlay"></div>
             <div className="services-header-left">
          <h1>Blog</h1>
          <p>Insights, Tips, and Updates from Happy Homes</p>
        </div>
      </div>

      <div className="container">
        <section className="blog-content">
          <div className="blog-intro">
            <h2>Latest Articles</h2>
            <p>
              Stay updated with the latest trends, tips, and insights in real estate. 
              Our blog covers everything from investment advice to home buying guides.
            </p>
          </div>

          <div className="blog-grid">
            {blogPosts.map(post => (
              <article key={post.id} className="blog-card">
                <div className="blog-image">
                  <img src={`https://picsum.photos/600/400?random=${post.id}`} alt={post.title} />
                </div>
                <div className="blog-content-card">
                  <div className="blog-meta">
                    <span className="blog-category">{post.category}</span>
                    <span className="blog-date">{post.date}</span>
                  </div>
                  <h3>{post.title}</h3>
                  <p className="blog-excerpt">{post.excerpt}</p>
                  <a href="/#" role="button" className="read-more">Read More →</a>
                </div>
              </article>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
};

export default Blog;


