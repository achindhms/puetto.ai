import React from 'react';
import { ArrowRight, CheckCircle2 } from 'lucide-react';
import './ServicesSection.css';

const ServicesSection = () => {
  const services = [
    {
      id: 'revenue',
      title: 'Revenue Operations',
      subtitle: 'Pipeline that works without manual upkeep.',
      deliverables: [
        'CRM audit, data model rebuild, pipeline restructure',
        'Lead routing, enrichment, and scoring automation via n8n',
        'AI agent: reps query their own pipeline in plain English',
        'Weekly CRM hygiene and data accuracy maintained by us',
        'Monthly pipeline performance report, auto-generated'
      ],
      results: [
        'CRM reps actively use and trust within 30 days',
        'Lead response time cut by removing manual routing steps',
        'Zero pipeline reports assembled by hand each week'
      ],
      tools: ['HubSpot', 'Pipedrive', 'Close', 'Apollo', 'Clay', 'n8n', 'Mixpanel'],
      image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=1200'
    },
    {
      id: 'people',
      title: 'People Operations',
      subtitle: "Hiring and HR that does not live in someone's inbox.",
      deliverables: [
        'HRIS configuration matched to team size and region',
        'Recruitment pipeline: job post to offer letter, fully automated',
        'Onboarding flow: access, welcome, 30/60/90 check-ins.',
        'Offboarding automation: access revocation, exit survey',
        'AI agent: drafts JDs, screens applicants, generates contracts',
        'Ongoing recruitment coordination as managed ops'
      ],
      results: [
        'New hire onboarding from 5 days to under 24 hours of ops work',
        'Founder removed from every hiring coordination loop',
        'HR admin running without a dedicated in-house hire'
      ],
      tools: ['Rippling', 'Deel', 'Keka', 'Greenhouse', 'BambooHR', 'Notion'],
      image: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&q=80&w=1200'
    },
    {
      id: 'product',
      title: 'Product Operations',
      subtitle: 'Product teams that move on a clean weekly cadence.',
      deliverables: [
        'Issue tracker setup with Slack-to-ticket automations',
        'Analytics instrumentation: events, funnels, dashboards',
        'Feedback triage: Typeform or Intercom to Linear, auto-routed',
        'Weekly PM digest generated without a PM writing it',
        'Anomaly detection: retention drop fires a Slack alert'
      ],
      results: [
        'Product decisions backed by clean data within 60 days',
        'Weekly sprint reporting with zero manual assembly',
        'User feedback routed and tagged before anyone reads it'
      ],
      tools: ['Linear', 'Jira', 'Notion', 'Amplitude', 'PostHog', 'Intercom'],
      image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=1200'
    }
  ];

  return (
    <section id="services" className="services-section section-container fade-in">
      <div className="section-header text-center">
        <span className="section-eyebrow">WHAT WE DO</span>
        <h2 className="section-title">Revenue, People, Product ops.<br />Built with AI. Run by us every month.</h2>
        <p className="section-subtitle max-w-text mx-auto mt-4">Start with one pillar. Most clients expand to two or three once the first is live and the time savings are visible.</p>
      </div>

      <div className="services-list">
        {services.map((service, index) => (
          <div className={`service-row ${index % 2 !== 0 ? 'reverse' : ''}`} key={service.id}>
            <div className="service-content-col">
              <div className="service-header">
                <h3>{service.title}</h3>
                <p className="service-subtitle">{service.subtitle}</p>
              </div>
              
              <div className="service-grid">
                <div className="service-col">
                  <h4 className="service-col-title">What we deliver</h4>
                  <ul className="service-ul deliverable-ul">
                    {service.deliverables.map((item, i) => (
                      <li key={i}><CheckCircle2 size={18} className="icon-list" /> <span>{item}</span></li>
                    ))}
                  </ul>
                </div>
                
                <div className="service-col">
                  <h4 className="service-col-title">Results we drive</h4>
                  <ul className="service-ul result-ul">
                    {service.results.map((item, i) => (
                      <li key={i}><ArrowRight size={18} className="icon-arrow" /> <span>{item}</span></li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="service-footer">
                <span className="tools-label">TOOLS</span>
                <div className="tools-list">
                  {service.tools.map((tool, i) => (
                     <span key={i} className="tool-badge">{tool}</span>
                  ))}
                </div>
              </div>
            </div>

            <div className="service-visual-col">
              <div className="visual-wrapper">
                <img src={service.image} alt={service.title} className="visual-image" />
                <div className="visual-glow"></div>
              </div>
            </div>
          </div>
        ))}
      </div>
      
      <div className="how-it-works-banner mt-4">
        <strong>How it works:</strong> Every engagement starts with Setup and Build (3–6 weeks). Most clients move to Managed Ops from month two when workflows are live and the time savings are visible.
      </div>
    </section>
  );
};

export default ServicesSection;
