import React, { useState, useEffect, useRef } from 'react';
import { ArrowRight } from 'lucide-react';
import './NetworkSection.css';

const NetworkSection = () => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.2 }
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
    <section className={`network-section ${isVisible ? 'net-visible' : ''}`} ref={sectionRef}>
      <div className="net-background-glow"></div>
      
      <div className="section-container">
        <div className="net-header fade-in">
          <div className="net-eyebrow">
            <span className="net-star">✦</span> AI AGENCY PARTNER
          </div>
          <h2 className="net-title">
            Powering the next generation<br /><span className="text-gradient">of business ops</span>
          </h2>
          <p className="net-subtitle">
            Empowering teams with the tools, automations, and AI to scale.
          </p>
          <button className="net-cta-btn">
            Book an audit <ArrowRight size={16} />
          </button>
        </div>

        <div className="net-interactive-area flywheel-layout">
          {/* CSS Radial Flywheel Track */}
          <div className="net-globe-wrapper">
             <div className="css-globe flywheel-track">
               <div className="track-ring tr-1"></div>
               <div className="track-ring tr-2"></div>
               <div className="track-ring tr-3"></div>
               <div className="track-ring tr-4"></div>
             </div>
             <div className="globe-core-glow"></div>
          </div>

          {/* Central GTM Hub */}
          <div className="gtm-hub-center">
            <div className="gtm-hub-core">GTM</div>
            <div className="gtm-hub-pulse"></div>
            <div className="gtm-hub-pulse slow"></div>
          </div>

          {/* SVG Connection Lines overlay */}
          <svg className="net-svg-lines" viewBox="0 0 1000 600" preserveAspectRatio="xMidYMid slice">
            <defs>
              <linearGradient id="line-glow" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="rgba(163, 230, 53, 0.2)" />
                <stop offset="100%" stopColor="rgba(163, 230, 53, 1)" />
              </linearGradient>
            </defs>
            {/* Outer Flywheel Loop (Perfect Circle matching radius ~195) */}
            {/* Revenue -> People */}
            <path className="net-path path-1" d="M 500,105 A 195.5,195.5 0 0,1 668,400" />
            {/* People -> Product */}
            <path className="net-path path-2" d="M 668,400 A 195.5,195.5 0 0,1 332,400" />
            {/* Product -> Revenue */}
            <path className="net-path path-3" d="M 332,400 A 195.5,195.5 0 0,1 500,105" />

            {/* Inner Hub Connections feeding into GTM */}
            {/* Revenue to GTM */}
            <path className="net-path path-4 inner-path" d="M 500,105 L 500,260" />
            {/* People to GTM */}
            <path className="net-path path-5 inner-path" d="M 668,400 L 536,320" />
            {/* Product to GTM */}
            <path className="net-path path-6 inner-path" d="M 332,400 L 464,320" />
          </svg>

          {/* Floating Detail Cards - Triangular Layout */}
          
          {/* Top Center */}
          <div className="net-card card-revenue fw-card">
            <h3>Revenue Ops</h3>
            <p>Scale your pipeline and amplify your sales without manual data entry. We help you close deals faster.</p>
            <div className="net-card-pulse bottom"></div>
          </div>

          {/* Bottom Right */}
          <div className="net-card card-people fw-card">
            <h3>People Ops</h3>
            <p>Automatically onboard new hires across the globe. Seamless integration from offer letter to first day.</p>
            <div className="net-card-pulse left"></div>
          </div>

          {/* Bottom Left */}
          <div className="net-card card-product fw-card">
            <h3>Product Ops</h3>
            <p>Connect user feedback directly to your engineering roadmap. Streamline triage workflows instantly.</p>
            <div className="net-card-pulse right"></div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default NetworkSection;
