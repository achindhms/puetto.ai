import React from 'react';
import { Facebook, Linkedin, Twitter, Instagram } from 'lucide-react';
import { Link } from 'react-router-dom';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer-section">

      {/* Top bar */}
      <div className="footer-topbar">
        <div className="footer-topbar-logo">
          <Link to="/">
            <img
              src="https://i.ibb.co/N2CYTcvn/Frame-1-2-removebg-preview.png"
              alt="Puetto"
              className="footer-logo-img"
            />
          </Link>
        </div>
        <p className="footer-topbar-tagline">Product, Revenue &amp; People Ops</p>
      </div>

      {/* Middle grid */}
      <div className="footer-mid">

        {/* Contact + Offices */}
        <div className="footer-contact">
          <div className="footer-contact-group">
            <p>Puetto Inc.</p>
            <a href="mailto:ops@puetto.com">ops@puetto.com</a>
            <a href="tel:+919072012384">+91 90720 12384</a>
          </div>
          <div className="footer-offices">
            <p className="footer-office-tag">India</p>
            <p className="footer-office-name">HSR Layout, Bangalore</p>
            <p className="footer-office-tag">USA</p>
            <p className="footer-office-name">San Francisco, CA</p>
            <p className="footer-office-tag">Singapore</p>
            <p className="footer-office-name">Marina Bay, Singapore</p>
            <p className="footer-office-tag">UAE</p>
            <p className="footer-office-name">Dubai, UAE</p>
          </div>
          <div className="footer-hours">
            <div className="footer-hours-row">
              <span>Monday – Friday</span><span>9:00 – 18:00</span>
            </div>
            <div className="footer-hours-row">
              <span>Saturday – Sunday</span><span>Closed</span>
            </div>
          </div>
        </div>

        {/* Resources */}
        <div className="footer-col">
          <h4 className="footer-col-heading">Resources</h4>
          <ul>
            <li><Link to="/calculators">Calculators</Link></li>
            <li><Link to="/abm-ops">ABM Ops</Link></li>
            <li><a href="#">Revenue Ops</a></li>
            <li><a href="#">People Ops</a></li>
          </ul>
        </div>

        {/* Company */}
        <div className="footer-col">
          <h4 className="footer-col-heading">Company</h4>
          <ul>
            <li><Link to="/blog">Blog</Link></li>
            <li><a href="#">About</a></li>
            <li><a href="#">Careers</a></li>
            <li><a href="#">Contact</a></li>
          </ul>
        </div>

        {/* Legal */}
        <div className="footer-col">
          <h4 className="footer-col-heading">Legal</h4>
          <ul>
            <li><a href="#">Terms of Service</a></li>
            <li><a href="#">Privacy Policy</a></li>
            <li><a href="#">Cookie Policy</a></li>
          </ul>
        </div>

      </div>

      {/* Bottom bar */}
      <div className="footer-bottom">
        <p className="footer-copy">© 2026 Puetto. All Rights Reserved.</p>
        <div className="footer-bottom-socials">
          <a href="#" aria-label="LinkedIn"><Linkedin size={15} /></a>
          <a href="#" aria-label="Facebook"><Facebook size={15} /></a>
          <a href="#" aria-label="Instagram"><Instagram size={15} /></a>
          <a href="#" aria-label="Twitter"><Twitter size={15} /></a>
        </div>
        <div className="footer-bottom-links">
          <a href="#">Terms</a>
          <a href="#">Privacy</a>
          <a href="#">Cookies</a>
          <a href="#">Sitemap</a>
        </div>
      </div>

    </footer>
  );
};

export default Footer;
