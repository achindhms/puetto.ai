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
        <p>For years, GTM operations have been synonymous with manual data entry, spreadsheet juggling, and reactive troubleshooting. HubSpot and Salesforce were systems of record, but they often became graveyards for stale data. In 2026, the paradigm has shifted. AI is no longer a "nice-to-have" feature; it is the core engine of the modern growth stack.</p>
        <h2>Rise of self-healing CRMs</h2>
        <p>One of the most persistent challenges in GTM ops is data hygiene. AI-driven agents now monitor CRM health in real-time. They don't just alert you when a lead is missing a LinkedIn profile; they proactively enrich the record using tools like Clay and Apollo, verify the data, and update the owner — all while your team sleeps. We call this the "99% Field Accuracy" standard.</p>
        <blockquote>"The best GTM system is the one your sales team never has to think about. It just works, providing the right context at the right moment."</blockquote>
        <h2>Predictive Pipeline Management</h2>
        <p>Beyond simple automation, AI is now performing deep analysis on deal velocity and win probabilities. By instrumenting Mixpanel or PostHog directly into the CRM, operations teams can identify "at-risk" deals based on product usage drops before the sales rep even notices a change in sentiment.</p>
        <h3>3 Key benefits of an AI-first GTM approach:</h3>
        <ul>
          <li><strong>Zero Latency:</strong> Leads are enriched and routed in seconds, not hours.</li>
          <li><strong>Proactive Retention:</strong> Anomaly detection alerts support teams to churn risks immediately.</li>
          <li><strong>Scalable Personalization:</strong> AI agents draft personalized outreach based on real-time intent data.</li>
        </ul>
        <h2>Looking Ahead: The Unified Ops Team</h2>
        <p>As the barriers between Revenue, Product, and People Ops continue to dissolve, the underlying infrastructure must be unified. Puetto was built on this premise — that a single, automated core can power every growth pillar of a modern B2B company.</p>
      </>
    )
  },
  2: {
    title: 'Real-Time Analytics for Smarter Engineering',
    date: 'April 2, 2026',
    readTime: '4 Min Read',
    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=1200',
    description: 'Learn how instrumenting Mixpanel and PostHog connects product data directly to your sales and support teams for smarter decisions.',
    content: (
      <>
        <h2>Why product data is your most underused GTM asset</h2>
        <p>Most B2B companies collect enormous amounts of product usage data but rarely connect it to their revenue teams. Sales reps make calls without knowing whether a prospect has logged in this week. Support teams respond to tickets without knowing the customer's feature adoption level. This disconnect is costing companies deals and causing preventable churn.</p>
        <h2>Instrumenting Mixpanel and PostHog the right way</h2>
        <p>The first step is choosing an instrumentation strategy that serves both your engineering and go-to-market teams. PostHog is ideal for companies that want full control over their data with self-hosting options, while Mixpanel excels at funnel analysis and cohort tracking at scale. The key is not which tool you pick — it's ensuring the events you track map directly to business outcomes.</p>
        <blockquote>"Instrumentation is not an engineering task. It's a business strategy that engineering executes."</blockquote>
        <h2>Connecting product signals to your CRM</h2>
        <p>Once you have clean event data flowing, the next step is piping it into your CRM. Using tools like Segment or a direct API integration, you can push key product signals — feature activation, session frequency, drop-off points — directly into HubSpot or Salesforce contact records. This gives your sales team live context on every account.</p>
        <h3>High-value events to track and sync:</h3>
        <ul>
          <li><strong>Feature Activation:</strong> When a user completes a key workflow for the first time.</li>
          <li><strong>Usage Decline:</strong> When session frequency drops more than 30% week-over-week.</li>
          <li><strong>Expansion Signals:</strong> When a user hits a plan limit or explores upgrade pages.</li>
          <li><strong>Collaboration Events:</strong> When a user invites teammates, signaling deeper adoption.</li>
        </ul>
        <h2>The result: a revenue team that acts on facts</h2>
        <p>When product analytics are connected to your GTM stack, your entire revenue team operates with the same real-time intelligence. Sales knows who to call and why. Support knows who is at risk before they file a ticket. And leadership gets a single, accurate view of customer health across the entire lifecycle.</p>
      </>
    )
  },
  3: {
    title: 'Building a Scalable Lead Routing System That Actually Works',
    date: 'March 28, 2026',
    readTime: '5 Min Read',
    image: 'https://images.unsplash.com/photo-1504868584819-f8e8b4b6d7e3?auto=format&fit=crop&q=80&w=1200',
    description: 'How to architect a lead routing system using automation and CRM logic that scales with your team without breaking down.',
    content: (
      <>
        <h2>The lead routing problem nobody talks about</h2>
        <p>Most revenue teams have a lead routing problem. Leads sit unassigned for hours, get sent to the wrong rep, or fall through the cracks entirely during territory changes and team restructures. The result is slower response times, lower conversion rates, and frustrated sales reps. The good news is that with the right architecture, lead routing can be fully automated and highly reliable.</p>
        <h2>The anatomy of a good routing system</h2>
        <p>A scalable lead routing system has three core components: a classification layer that scores and segments incoming leads, an assignment layer that maps leads to the right owner based on territory, vertical, or round-robin rules, and a fallback layer that ensures no lead goes unassigned if the primary owner is unavailable.</p>
        <blockquote>"A lead routed in under 5 minutes is 21x more likely to convert than one contacted after an hour. Speed is a competitive advantage."</blockquote>
        <h2>Building it in HubSpot or Salesforce</h2>
        <p>Both HubSpot and Salesforce offer native routing capabilities, but they require careful setup to scale. In HubSpot, workflows combined with lead scoring properties can handle most mid-market routing needs. For enterprise-scale operations, Salesforce's Assignment Rules paired with custom Apex triggers give you the flexibility to handle complex territory hierarchies and multi-product scenarios.</p>
        <h3>Routing logic to implement from day one:</h3>
        <ul>
          <li><strong>Firmographic Routing:</strong> Route by company size, industry, and geography.</li>
          <li><strong>Intent-Based Routing:</strong> Prioritize leads that visited pricing or demo pages.</li>
          <li><strong>Account-Based Routing:</strong> Match inbound leads to existing account owners automatically.</li>
          <li><strong>Fallback Rules:</strong> Auto-assign to a team queue if the primary rep is on leave.</li>
        </ul>
        <h2>Maintaining the system over time</h2>
        <p>Lead routing systems degrade over time as teams grow and territories change. Build a quarterly audit into your RevOps calendar to review assignment accuracy, check for unrouted leads, and update rules to reflect your current team structure. A routing system that worked six months ago may be silently failing today.</p>
      </>
    )
  },
  4: {
    title: 'Automating the Operating Manual',
    date: 'March 20, 2026',
    readTime: '5 Min Read',
    image: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&q=80&w=1200',
    description: 'How to remove the manual loops from hiring, onboarding, and day-to-day people infrastructure using modern automation tools.',
    content: (
      <>
        <h2>People ops is still running on spreadsheets</h2>
        <p>Despite the explosion of HR tech, most people operations teams are still managing critical workflows in spreadsheets and email threads. Offer letter tracking, onboarding task lists, equipment provisioning, and performance review scheduling are often handled manually — creating bottlenecks, inconsistencies, and a poor experience for new hires and managers alike.</p>
        <h2>The three loops to automate first</h2>
        <p>Not all people ops workflows are created equal. The highest-leverage loops to automate are the ones that happen most frequently and have the most downstream impact. At Puetto, we've found that hiring coordination, new hire onboarding, and offboarding are the three workflows that deliver the fastest ROI when automated properly.</p>
        <blockquote>"The onboarding experience a new hire has in their first two weeks sets the tone for their entire tenure. Automation ensures that experience is consistent and exceptional every time."</blockquote>
        <h2>Automating hiring coordination</h2>
        <p>Modern ATS platforms like Greenhouse and Lever offer robust workflow automation, but most teams only use a fraction of their capabilities. By setting up automated stage-move notifications, interview scheduling triggers, and feedback collection reminders, you can cut recruiter coordination time by up to 60% while improving the candidate experience significantly.</p>
        <h3>Key onboarding automations to implement:</h3>
        <ul>
          <li><strong>Day 0 Setup:</strong> Auto-provision accounts for Slack, email, and key tools the moment an offer is accepted.</li>
          <li><strong>First Week Checklist:</strong> Auto-assign onboarding tasks in your project management tool with deadlines.</li>
          <li><strong>Manager Nudges:</strong> Send automated reminders to managers for 30-60-90 day check-ins.</li>
          <li><strong>Feedback Collection:</strong> Trigger new hire surveys at key milestones automatically.</li>
        </ul>
        <h2>Building a people ops system that scales</h2>
        <p>The goal of automating people operations is not to remove the human element — it's to ensure your people team spends their time on high-judgment work like culture building and talent development, rather than administrative loops. When the operating manual runs itself, your people team becomes a strategic asset instead of a processing center.</p>
      </>
    )
  }
};

const BlogPost = () => {
  const { id } = useParams();
  const post = postData[id] || postData[1];

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
