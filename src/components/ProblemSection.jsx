import React, { useState, useEffect, useRef } from 'react';
import { ArrowRight } from 'lucide-react';
import './ProblemSection.css';

const ProblemSection = () => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef(null);

  const [animationDirection, setAnimationDirection] = useState('down');

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        if (entry.isIntersecting) {
          // If top of element is below viewport 0, it's entering from the bottom (scrolling down)
          const direction = entry.boundingClientRect.top > 0 ? 'down' : 'up';
          setAnimationDirection(direction);
          setIsVisible(true);
        } else {
          setIsVisible(false);
        }
      },
      { threshold: 0.1 }
    );
    
    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }
    
    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  return (
    <div className={`problem-section-wrapper light-theme ${isVisible ? 'charts-visible' : ''} direction-${animationDirection}`} ref={sectionRef}>
      <section id="problem" className="problem-section section-container fade-in">
        <div className="problem-header text-center">
          <div className="problem-eyebrow">
            <span className="star-icon">✻</span> THE PROBLEM
          </div>
          <h2 className="problem-title">
            You have the tools. Someone is<br />
            <span className="text-gradient">still doing the work by hand.</span>
          </h2>
          <p className="problem-subtitle">
            HubSpot is live. Rippling is configured. Linear exists. Nothing talks to anything else.<br/>Every handoff between tools is a manual task someone on your team is absorbing without anyone realising it.
          </p>
        </div>

        <div className="problem-cards-container">
          {/* Top Row: 2 Large Cards */}
          <div className="problem-grid-top">
            
            {/* Card 1: Line Chart Mockup */}
            <div className="p-card large-card">
              <div className="p-card-content">
                <h3>CRM data nobody trusts</h3>
                <p>Reps are keeping their own spreadsheets. Forecasts are unreliable and pipeline data is outdated manually.</p>
                <a href="#services" className="p-card-link">Learn More <ArrowRight size={14} /></a>
              </div>
              <div className="p-card-visual p-visual-line">
                <div className="chart-y-axis">
                  <span>100</span><span>80</span><span>60</span><span>40</span><span>20</span><span>0</span>
                </div>
                <div className="chart-canvas">
                  <div className="chart-grid-lines">
                    <div className="c-line"></div><div className="c-line"></div><div className="c-line"></div>
                    <div className="c-line"></div><div className="c-line"></div><div className="c-line"></div>
                  </div>
                  
                  <div className="chart-svg-wrap">
                    <svg viewBox="0 0 400 200" preserveAspectRatio="none">
                      {/* Animated Blue Lines - Connecting to Pills */}
                      <path className="animated-line-3" d="M0,130 C120,130 140,55 220,55 L400,55" fill="none" stroke="#4a76ff" strokeWidth="3"/>
                      <path className="animated-line-2" d="M0,150 C100,150 150,110 200,97 C250,84 300,97 400,97" fill="none" stroke="#4a76ff" strokeWidth="2.5"/>
                      <path className="animated-line-1" d="M0,180 C100,180 150,160 200,139 C250,118 300,139 400,139" fill="none" stroke="#4a76ff" strokeWidth="2.5"/>
                    </svg>
                  </div>
                  
                  {/* Floating labels mimicking the UI */}
                  <div className="chart-point animated-tooltip">
                    <div className="point-dot"></div>
                    <div className="point-tooltip">12 Broken automations</div>
                    <div className="point-line"></div>
                  </div>

                  <div className="chart-pills">
                    <div className="c-pill pill-show-1">Data Sync</div>
                    <div className="c-pill pill-show-2">Reporting</div>
                    <div className="c-pill pill-show-3">Routing</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Card 2: Ring Chart Mockup */}
            <div className="p-card large-card">
              <div className="p-card-content">
                <h3>Ops work on the founder's plate</h3>
                <p>Instead of building the company, leadership is stuck routing feedback and fixing broken zaps manually.</p>
                <a href="#services" className="p-card-link">Learn More <ArrowRight size={14} /></a>
              </div>
              <div className="p-card-visual p-visual-ring">
                <div className="ring-container">
                  <svg viewBox="0 0 200 200" className="donut-svg">
                    <defs>
                      <linearGradient id="g1" x1="0%" y1="100%" x2="100%" y2="0%">
                        <stop offset="0%" stopColor="#f59e0b" />
                        <stop offset="50%" stopColor="#ef4444" />
                        <stop offset="100%" stopColor="#3b82f6" />
                      </linearGradient>
                    </defs>
                    <path className="animated-ring" d="M 30,150 A 80 80 0 1 1 170,150" fill="none" stroke="url(#g1)" strokeWidth="12" strokeLinecap="round"/>
                  </svg>
                  <div className="ring-center-text">
                    <h4>14.5h</h4>
                    <p>Total hours leaked</p>
                  </div>
                </div>
                
                <div className="ring-legend">
                  <div className="legend-item">
                    <span className="l-dot" style={{backgroundColor: '#f59e0b'}}></span>
                    <div>
                      <strong>Hiring</strong>
                      <p>94% manual</p>
                    </div>
                  </div>
                  <div className="legend-item">
                    <span className="l-dot" style={{backgroundColor: '#10b981'}}></span>
                    <div>
                      <strong>Reporting</strong>
                      <p>89% manual</p>
                    </div>
                  </div>
                  <div className="legend-item">
                    <span className="l-dot" style={{backgroundColor: '#ef4444'}}></span>
                    <div>
                      <strong>Routing</strong>
                      <p>92% manual</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

          </div>

          {/* Bottom Row: 3 Small Cards */}
          <div className="problem-grid-bottom">
            <div className="p-card small-card">
              <div className="p-card-content">
                <h3>Manual onboarding</h3>
                <p>Every new hire needs a week of founder time to onboard instead of an automated IT and HRIS provisioning sequence.</p>
                <a href="#services" className="p-card-link">Learn More <ArrowRight size={14} /></a>
              </div>
            </div>

            <div className="p-card small-card">
              <div className="p-card-content">
                <h3>Scattered feedback</h3>
                <p>Product feedback arriving in four different places, routed by hand instead of an AI classifier pushing to Linear.</p>
                <a href="#services" className="p-card-link">Learn More <ArrowRight size={14} /></a>
              </div>
            </div>

            <div className="p-card small-card">
              <div className="p-card-content">
                <h3>Silently broken automations</h3>
                <p>Workflows built months ago, two of them silently failing without alerting the team, costing leads every day.</p>
                <a href="#services" className="p-card-link">Learn More <ArrowRight size={14} /></a>
              </div>
            </div>
          </div>

        </div>
      </section>
    </div>
  );
};

export default ProblemSection;
