import React, { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { Instagram, Twitter, Facebook, Linkedin, ArrowLeft } from 'lucide-react';
import './BlogPost.css';

const postData = {
  1: {
    title: 'The Rise of AI-Driven GTM Operations in 2026',
    date: 'April 4, 2026',
    readTime: '6 Min Read',
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=1200',
    description: 'Explore how AI is transforming Go-to-Market operations, from automated lead enrichment to predictive pipeline management.',
    content: (
      <>
        <h2>The shift from manual to intelligent operations</h2>
        <p>
          For years, GTM operations have been synonymous with manual data entry, spreadsheet juggling, and reactive troubleshooting. HubSpot and Salesforce were systems of record, but they often became graveyards for stale data. In 2026, the paradigm has shifted. AI is no longer a "nice-to-have" feature; it is the core engine of the modern growth stack.
        </p>
        
        <h2>Rise of self-healing CRMs</h2>
        <p>
          One of the most persistent challenges in GTM ops is data hygiene. AI-driven agents now monitor CRM health in real-time. They don't just alert you when a lead is missing a LinkedIn profile; they proactively enrich the record using tools like Clay and Apollo, verify the data, and update the owner—all while your team sleeps. We call this the "99% Field Accuracy" standard.
        </p>

        <blockquote>
          "The best GTM system is the one your sales team never has to think about. It just works, providing the right context at the right moment."
        </blockquote>

        <h2>Predictive Pipeline Management</h2>
        <p>
          Beyond simple automation, AI is now performing deep analysis on deal velocity and win probabilities. By instrumenting product data from Mixpanel or PostHog directly into the CRM, operations teams can identify "at-risk" deals based on product usage drops before the sales rep even notices a change in sentiment.
        </p>

        <h3>3 Key benefits of an AI-first GTM approach:</h3>
        <ul>
          <li><strong>Zero Latency:</strong> Leads are enriched and routed in seconds, not hours.</li>
          <li><strong>Proactive Retention:</strong> Anomaly detection alerts support teams to churn risks immediately.</li>
          <li><strong>Scalable Personalization:</strong> AI agents draft personalized outreach based on real-time intent data.</li>
        </ul>

        <h2>Looking Ahead: The Unified Ops Team</h2>
        <p>
          As the barriers between Revenue, Product, and People Ops continue to dissolve, the underlying infrastructure must be unified. Puetto was built on this premise—that a single, automated core can power every growth pillar of a modern B2B company.
        </p>
      </>
    )
  }
};

const BlogPost = () => {
  const { id } = useParams();
  const post = postData[id] || postData[1]; // Fallback to post 1 for demo

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <article className="blog-post-root">
      <Helmet>
        <title>{post.title} | PUETTO</title>
        <meta name="description" content={post.description} />
        <meta property="og:title" content={post.title} />
        <meta property="og:description" content={post.description} />
        <meta property="og:image" content={post.image} />
        <meta name="twitter:card" content="summary_large_image" />
      <link rel="canonical" href={`https://www.puetto.com/blog/${id}`} />
      </Helmet>

      <div className="section-container">
        <div className="blog-post-header">
          <Link to="/blog" className="back-to-blog">
            <ArrowLeft size={16} /> Back to Insights
          </Link>
          
          <div className="header-flex">
            <h1 className="post-detail-title">{post.title}</h1>
            <div className="post-social-shares">
               <a href="#" aria-label="Instagram"><Instagram size={20} /></a>
               <a href="#" aria-label="X"><Twitter size={20} /></a>
               <a href="#" aria-label="Facebook"><Facebook size={20} /></a>
               <a href="#" aria-label="LinkedIn"><Linkedin size={20} /></a>
            </div>
          </div>

          <div className="post-meta-strip">
            <span className="post-date">{post.date}</span>
            <span className="meta-sep">•</span>
            <span className="post-read-time">{post.readTime}</span>
          </div>
        </div>

        <div className="post-featured-image">
          <img src={post.image} alt={post.title} />
        </div>

        <div className="post-main-content">
          <div className="content-inner">
            {post.content}
          </div>
        </div>

        <footer className="post-detail-footer">
          <div className="post-tags">
            <span className="tag">#GTMOps</span>
            <span className="tag">#AIAutomation</span>
            <span className="tag">#ModernStack</span>
          </div>
        </footer>
      </div>
    </article>
  );
};

export default BlogPost;
