import React from 'react';
import { ArrowRight, Zap, CheckCircle2, MoreHorizontal } from 'lucide-react';
import './Hero.css';

const Hero = () => {
  return (
    <section className="hero section-container fade-in">
      <div className="hero-split">
        <div className="hero-content">
          <div className="hero-badge fade-up">
            <span className="badge-icon">⚡</span>
            AI GTM OPS PARTNER
          </div>
          
          <h1 className="hero-title">
            Your ops <br /> 
            is costing you <br />
            <span className="text-gradient">more than you think.</span>
          </h1>
          
          <p className="hero-subtitle">
            Puetto configures your tools, builds your automations, and runs the day-to-day ops every month. Faster than a hire. More accountable than an agency. And we stay.
          </p>
          
          <div className="hero-buttons">
          <a 
  href="https://cal.com/puetto/hq" 
  target="_blank" 
  rel="noopener noreferrer" 
  className="btn-primary"
>
  Book a Free Ops Audit <ArrowRight size={18} />
</a>
            <a href="#services" className="btn-secondary">
              See what we build <ArrowRight size={18} />
            </a>
          </div>
        </div>

        <div className="hero-visual-col slide-left">
          <div className="visual-background">
            <div className="visual-grid"></div>
          </div>
          
          <div className="floating-ui-container">
            {/* Main Card - Revenue Ops */}
            <div className="ui-card main-card">
              <div className="ui-card-header">
                <div className="ui-chip"><span className="chip-dot"></span> Revenue Ops</div>
                <div className="ui-logo">
                  <div className="logo-shape"></div>
                </div>
              </div>
              <div className="ui-card-body">
                <h3 className="ui-value" style={{ fontSize: '1.7rem', lineHeight: '1.2' }}>
                  Architecting <br /> Revenue Infrastructure
                </h3>
                <div className="ui-footer-info">
                  <span className="ui-subtext">99% CRM Field Accuracy.</span>
                </div>
              </div>
            </div>

            {/* Float Card 1 - Product Ops */}
            <div className="ui-card float-card-1">
              <div className="fc-icon-wrap bg-blue"><CheckCircle2 size={16} color="white" /></div>
              <div className="fc-content">
                <p className="fc-title">Product Ops</p>
                <p className="fc-subtitle">Engineering</p>
                <p className="fc-value" style={{ fontSize: '0.8rem', color: '#111', marginTop: '2px', whiteSpace: 'nowrap' }}>Product Infrastructure</p>
              </div>
              <MoreHorizontal size={16} className="fc-more" />
            </div>

            {/* Float Card 2 - People Ops */}
            <div className="ui-card float-card-2">
              <div className="fc-icon-wrap bg-orange"><Zap size={16} color="white" fill="white" /></div>
              <div className="fc-content">
                <p className="fc-title">People Ops</p>
                <p className="fc-subtitle">Operating</p>
                <p className="fc-value" style={{ fontSize: '0.8rem', color: '#111', marginTop: '2px' }}>People Infrastructure</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="hero-bottom-strip fade-up" style={{ animationDelay: '0.2s' }}>
        <div className="trusted-row">
          <p className="trusted-text">Trusted by companies worldwide to run better ops</p>
          <div className="trusted-marquee-wrapper">
            <div className="trusted-marquee-track">
              <img src="https://d1.awsstatic.com/onedam/marketing-channels/website/aws/en_US/solution-case-studies/approved/images/in-case-study_simplismart_logo.a035efb080a961cd692d8375055cb915d42d2d2a.png" alt="SimpliSmart" className="t-logo-img" />
              <img src="https://cashfreelogo.cashfree.com/website/landings/homepage/cashfreeLogo.png" alt="Cashfree" className="t-logo-img" />
              <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/5f/Coursera_logo_%282020%29.svg/3840px-Coursera_logo_%282020%29.svg.png" alt="Coursera" className="t-logo-img" />
              <img src="https://upload.wikimedia.org/wikipedia/en/thumb/5/5f/Inovalon_logo.svg/1280px-Inovalon_logo.svg.png" alt="Inovalon" className="t-logo-img" />
              <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/08/Cisco_logo_blue_2016.svg/1280px-Cisco_logo_blue_2016.svg.png" alt="Cisco" className="t-logo-img" />
              {/* Duplicate for seamless loop */}
              <img src="https://d1.awsstatic.com/onedam/marketing-channels/website/aws/en_US/solution-case-studies/approved/images/in-case-study_simplismart_logo.a035efb080a961cd692d8375055cb915d42d2d2a.png" alt="SimpliSmart" className="t-logo-img" />
              <img src="https://cashfreelogo.cashfree.com/website/landings/homepage/cashfreeLogo.png" alt="Cashfree" className="t-logo-img" />
              <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/5f/Coursera_logo_%282020%29.svg/3840px-Coursera_logo_%282020%29.svg.png" alt="Coursera" className="t-logo-img" />
              <img src="https://upload.wikimedia.org/wikipedia/en/thumb/5/5f/Inovalon_logo.svg/1280px-Inovalon_logo.svg.png" alt="Inovalon" className="t-logo-img" />
              <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/08/Cisco_logo_blue_2016.svg/1280px-Cisco_logo_blue_2016.svg.png" alt="Cisco" className="t-logo-img" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
