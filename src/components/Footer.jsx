import React from 'react';
import { ArrowRight, Facebook, Linkedin, Twitter } from 'lucide-react';
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

          <div className="footer-nav-column minimalist-links">
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
