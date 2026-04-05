import { Link } from 'react-router-dom';
import './BlogPage.css';
import { ArrowUpRight, Clock } from 'lucide-react';

const blogPosts = [
  {
    id: 1,
    category: 'REVENUE OPS',
    title: 'Architecting Revenue Infrastructure for Scale',
    excerpt: 'How we achieve 99% CRM field accuracy and build automated lead routing that actually works.',
    readTime: '6 Min Read',
    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=800'
  },
  {
    id: 2,
    category: 'PRODUCT OPS',
    title: 'Real-Time Analytics for Smarter Engineering',
    excerpt: 'Instrumenting Mixpanel and PostHog to connect product data directly to your sales and support teams.',
    readTime: '4 Min Read',
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=800'
  }, 
  {
    id: 3,
    category: 'PRODUCT OPS',
    title: 'Real-Time Analytics for Smarter Engineering',
    excerpt: 'Instrumenting Mixpanel and PostHog to connect product data directly to your sales and support teams.',
    readTime: '4 Min Read',
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=800'
  },
  {
    id: 4,
    category: 'PEOPLE OPS',
    title: 'Automating the Operating Manual',
    excerpt: 'How we remove the manual loops from hiring, onboarding, and day-to-day people infrastructure.',
    readTime: '5 Min Read',
    image: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&q=80&w=800'
  }
];

const BlogPage = () => {
  return (
    <div className="blog-page-root">
      <section className="blog-header-section">
        <div className="section-container">
          <div className="blog-header-content">
            <div className="blog-badge">
              <span className="badge-icon">☀️</span>
              BLOG
            </div>
            <h1 className="blog-main-title">
              Stay Updated with <span className="text-gradient">GTM Insights</span>
            </h1>
            <p className="blog-subtitle">
              Stay informed with the latest GTM ops insights, strategies, and trends to boost sales performance and drive smarter growth.
            </p>
          </div>
        </div>
      </section>

      <section className="blog-grid-section">
        <div className="section-container">
          <div className="blog-posts-grid">
            {blogPosts.map((post) => (
              <Link to={`/blog/${post.id}`} className="blog-post-card" key={post.id}>
                <div className="blog-post-image-container">
                  <img src={post.image} alt={post.title} className="blog-post-image" />
                </div>
                <div className="blog-post-content">
                  <div className="blog-post-meta">
                    <span className="blog-post-category">{post.category}</span>
                  </div>
                  <h3 className="blog-post-title">{post.title}</h3>
                  <p className="blog-post-excerpt">{post.excerpt}</p>
                  <div className="blog-post-footer">
                    <div className="blog-post-read-time">
                      <Clock size={14} />
                      <span>{post.readTime}</span>
                    </div>
                    <div className="blog-post-arrow-btn">
                      <ArrowUpRight size={20} />
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default BlogPage;
