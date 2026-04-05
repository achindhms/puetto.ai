import React, { useState, useEffect, useRef } from 'react';
import './WhatWeDo.css';
import { ArrowRight, CheckCircle2, ChevronRight, Paperclip } from 'lucide-react';

const sections = [
  {
    id: '01',
    label: 'Revenue Ops',
    title: 'Revenue Operations',
    tagline: 'Precision architecture. Proactive CRM management.',
    deliverables: [
      'Master CRM Architecture: HubSpot / Pipedrive / Close',
      'Managed Lead Management: Automated routing & scoring',
      'Strategic Revenue Dashboards: Live Board-ready reporting',
      'Ongoing CRM Hygiene: We run your data cleanup every week',
      'Pipeline Optimization: Monthly strategic audit & tuning'
    ],
    results: [
      'Total CRM ownership: No in-house admin needed',
      'Clean data at scale: 99% CRM field accuracy',
      'Sales velocity hike: Zero manual routing friction'
    ],
    tools: 'HubSpot · Pipedrive · Close · Apollo · Clay · n8n · Mixpanel · Segment',
    mockup: {
        fileName: 'revenue_pipeline_audit',
        insights: 'Architecture approved',
        bg: 'revenue-bg'
    }
  },
  {
    id: '02',
    label: 'People Ops',
    title: 'People Operations',
    tagline: 'A unified hiring engine and managed HR back-office.',
    deliverables: [
      'Engineered Recruitment Flows: Job post to offer letter',
      'Managed Onboarding: Access, hardware, and 30/60/90 flows',
      'Unified Employee Records: HRIS setup and management',
      'Managed Payroll & Compliance: Deel / Rippling / Remote',
      'Strategic HR Admin: We handle the paperwork, you lead the team'
    ],
    results: [
      'Onboarding automated: From 10 hours to 10 minutes',
      'Zero HR bottlenecks: Founder removed from admin ops',
      'Audit-ready People Ops: Strategic compliance managed'
    ],
    tools: 'Rippling · Deel · Keka · Darwinbox · Greenhouse · Lever · BambooHR · Notion',
    mockup: {
        fileName: 'onboarding_automation_v2',
        insights: 'Compliance verified',
        bg: 'people-bg'
    }
  },
  {
    id: '03',
    label: 'Product Ops',
    title: 'Product Operations',
    tagline: 'Velocity as a service. Data-driven product management.',
    deliverables: [
      'Agile Infrastructure: Linear / Jira setup & automation',
      'Managed Feedback Loop: Feedback to ticket auto-triaged',
      'Product Analytics Strategy: Events, funnels, and retention',
      'Managed Weekly Cadence: Automated sprint & status reports',
      'Productivity Ops: Bottleneck detection and workflow tuning'
    ],
    results: [
      'Clean Product Cadence: Zero manual status assembly',
      'Data-led Roadmaps: Instrumentation managed by experts',
      'Engineering Focus: Admin overhead removed from devs'
    ],
    tools: 'Linear · Jira · Notion · Amplitude · PostHog · Mixpanel · Typeform · Intercom',
    mockup: {
        fileName: 'product_roadmap_sync',
        insights: 'Velocity tracked',
        bg: 'product-bg'
    }
  }
];

const WhatWeDo = () => {
  const [activeTab, setActiveTab] = useState(0);
  const containerRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current) return;
      const { top, height } = containerRef.current.getBoundingClientRect();
      const viewportHeight = window.innerHeight;
      
      // Calculate scroll progress through the 300vh container
      // 0 = top of section, 1 = bottom of section
      const scrollOffset = -top;
      const totalScrollableHeight = height - viewportHeight;
      const progress = Math.min(Math.max(scrollOffset / totalScrollableHeight, 0), 1);
      
      // Map progress (0-1) to 3 equal sections
      let index = 0;
      if (progress > 0.33 && progress <= 0.66) index = 1;
      else if (progress > 0.66) index = 2;
      
      setActiveTab(index);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (idx) => {
    const targetScroll = containerRef.current.offsetTop + (idx * window.innerHeight);
    window.scrollTo({ top: targetScroll, behavior: 'smooth' });
  };

  return (
    <section className="wwd-scroll-container" ref={containerRef}>
      <div className="wwd-sticky-frame">
        <div className="section-container">
          
          <div className="wwd-header fade-in">
            <span className="wwd-eyebrow">WHAT WE DO</span>
            <h2 className="wwd-main-title">
              Revenue, People, Product ops.<br/>
              <span className="text-gradient">Built with AI. Run by us every month.</span>
            </h2>
          </div>

          <div className="wwd-tabs-nav">
            {sections.map((s, idx) => (
              <div 
                key={s.id} 
                className={`wwd-tab-item ${activeTab === idx ? 'active' : ''}`}
                onClick={() => scrollToSection(idx)}
              >
                {s.label}
              </div>
            ))}
            <div 
              className="wwd-tab-indicator" 
              style={{ 
                width: `${100 / sections.length}%`,
                transform: `translateX(${activeTab * 100}%)`
              }}
            ></div>
          </div>

          <div className="wwd-main-card">
            {sections.map((s, idx) => (
              <div 
                key={s.id} 
                className={`wwd-slide-content ${activeTab === idx ? 'active' : 'inactive'}`}
              >
                <div className="wwd-split-layout">
                  <div className="wwd-info-side">
                    <div className="wwd-title-group">
                      <h3 className="slide-title">{s.title}</h3>
                      <p className="slide-tagline">{s.tagline}</p>
                    </div>

                    <div className="wwd-lists-grid">
                      <div className="wwd-list-col">
                        <span className="col-label">WHAT WE DELIVER</span>
                        <ul className="wwd-bullet-list">
                          {s.deliverables.slice(0, 3).map((item, i) => (
                            <li key={i}><CheckCircle2 size={14} className="icon-green" /> {item}</li>
                          ))}
                        </ul>
                      </div>
                      <div className="wwd-list-col">
                        <span className="col-label">RESULTS WE DRIVE</span>
                        <ul className="wwd-bullet-list results">
                          {s.results.map((item, i) => (
                            <li key={i}><ChevronRight size={14} className="icon-blue" /> {item}</li>
                          ))}
                        </ul>
                      </div>
                    </div>


                    <div className="wwd-card-footer">
                       <a 
  href="https://cal.com/puetto/hq" 
  target="_blank" 
  rel="noopener noreferrer" 
  className="pro-audit-btn"
>
  Book an audit <ArrowRight size={16} />
</a>
                    </div>
                  </div>

                  <div className={`wwd-graphic-side ${s.mockup.bg}`}>
                    <div className="premium-mockup-container">
                      <div className="file-attachment-card">
                        <div className="file-info">
                          <Paperclip size={20} className="file-icon" />
                          <span className="file-name">{s.mockup.fileName}</span>
                        </div>
                        <span className="file-ext">zip</span>
                      </div>
                      
                      <div className="insights-result-card">
                        <div className="insights-header">
                            <h4>File analysed</h4>
                            <p>Found {s.mockup.insights}</p>
                        </div>
                        <button className="review-btn">Review</button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhatWeDo;
