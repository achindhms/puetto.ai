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
          <span className="footer-logo-name">puetto</span>
        </div>
        <p className="footer-topbar-tagline">Product, Revenue &amp; People Ops</p>
      </div>

      {/* Middle grid */}
      <div className="footer-mid">

        {/* Contact */}
        <div className="footer-contact">
          <div className="footer-contact-group">
            <p>Puetto Inc.</p>
            <p>123 Ops Lane,</p>
            <p>Bengaluru, India</p>
          </div>
          <div className="footer-contact-group">
            <p><a href="mailto:hello@puetto.com">hello@puetto.com</a></p>
            <p><a href="tel:+919900000000">+91 99 0000 0000</a></p>
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

        {/* Products */}
        <div className="footer-col">
          <h4 className="footer-col-heading">Products</h4>
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
          <a href="#" aria-label="LinkedIn"><Linkedin size={16} /></a>
          <a href="#" aria-label="Facebook"><Facebook size={16} /></a>
          <a href="#" aria-label="Instagram"><Instagram size={16} /></a>
          <a href="#" aria-label="Twitter"><Twitter size={16} /></a>
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
