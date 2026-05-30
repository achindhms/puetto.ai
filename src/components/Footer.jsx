import React from 'react';
import { Facebook, Linkedin, Twitter } from 'lucide-react';
import { Link } from 'react-router-dom';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer-section">
      <div className="section-container">
        {/* Footer Links & Branding - Zyforia Style */}
        <div className="footer-main-grid">
          <div className="footer-brand-column">
            <div className="footer-logo-wrap">
              <Link to="/">
                <img src="https://i.ibb.co/N2CYTcvn/Frame-1-2-removebg-preview.png" alt="Puetto Logo" className="footer-logo-img-new" />
              </Link>
            </div>
            <h3 className="footer-brand-statement">
              Product, Revenue & People Ops
            </h3>
            <div className="footer-social-links">
              <a href="#" aria-label="Facebook"><Facebook size={20} /></a>
              <a href="#" aria-label="LinkedIn"><Linkedin size={20} /></a>
              <a href="#" aria-label="Twitter"><Twitter size={20} /></a>
            </div>
            <p className="copyright-text">
              Copyright © 2026 Puetto. All Rights Reserved.
            </p>
          </div>

          {/* Calculators */}
          <div className="footer-nav-column">
            <h4 className="footer-nav-heading">Calculators</h4>
            <ul>
              <li><Link to="/calculators">All calculators</Link></li>
              <li><Link to="/abm-roi-calculator">ABM ROI</Link></li>
              <li><Link to="/webinar-roi-calculator">Webinar ROI</Link></li>
              <li><Link to="/event-roi-calculator">Event ROI</Link></li>
              <li><Link to="/linkedin-ads-roas-calculator">LinkedIn Ads ROI</Link></li>
              <li><Link to="/retention-calculator">Retention (NRR/GRR)</Link></li>
              <li><Link to="/rice-calculator">RICE prioritization</Link></li>
              <li><Link to="/kano-calculator">Kano analysis</Link></li>
            </ul>
          </div>

          {/* Resources / ABM Ops */}
          <div className="footer-nav-column">
            <h4 className="footer-nav-heading">ABM Ops</h4>
            <ul>
              <li><Link to="/abm-ops">ABM Ops hub</Link></li>
              <li><Link to="/abm-ops/account-based-marketing-guide">ABM guide</Link></li>
              <li><Link to="/abm-ops/what-is-abm">What is ABM?</Link></li>
              <li><Link to="/abm-ops/abm-strategy-framework">ABM strategy</Link></li>
              <li><Link to="/abm-ops/abm-tech-stack">ABM tech stack</Link></li>
              <li><Link to="/abm-ops/abm-metrics-roi">ABM metrics & ROI</Link></li>
            </ul>
          </div>

          {/* Company */}
          <div className="footer-nav-column">
            <h4 className="footer-nav-heading">Company</h4>
            <ul>
              <li><Link to="/blog">Blog</Link></li>
              <li><a href="#">Terms of Service</a></li>
              <li><a href="#">Privacy Policy</a></li>
            </ul>
          </div>
        </div>

        {/* Large Watermark Text */}
        <div className="footer-watermark">
          <span className="watermark-text">Puetto</span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
