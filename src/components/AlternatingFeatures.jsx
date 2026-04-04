import React from 'react';
import './AlternatingFeatures.css';
import { Calendar, CreditCard, MapPin, CheckCircle, Smartphone, Activity } from 'lucide-react';

const AlternatingFeatures = () => {
  return (
    <section className="alternating-features section-container fade-in">
      {/* Row 1: Text Left, Image Right */}
      <div className="alt-row">
        <div className="alt-text">
          <h3 className="section-title">Smart budgets</h3>
          <p className="section-subtitle mb-8">Gain insight and make financial decisions with confidence.</p>
          <ul className="feature-list">
            <li>Track active and inactive suppliers</li>
            <li>Store contracts, contact details and key documents</li>
            <li>Set preferred suppliers by category</li>
          </ul>
        </div>
        <div className="alt-image">
          <div className="gradient-card gold-gradient">
            <div className="mockup-card performance-mockup slide-left">
              <h4>Performance</h4>
              <p>Revenue</p>
              <div className="bar-chart">
                <div className="bar" style={{height: '20%'}}><span>J</span></div>
                <div className="bar" style={{height: '35%'}}><span>A</span></div>
                <div className="bar" style={{height: '50%'}}><span>S</span></div>
                <div className="bar" style={{height: '30%'}}><span>O</span></div>
                <div className="bar active-bar" style={{height: '70%'}}><span>N</span></div>
                <div className="bar" style={{height: '45%'}}><span>D</span></div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Row 2: Image Left, Text Right */}
      <div className="alt-row reverse-mobile">
        <div className="alt-image">
          <div className="gradient-card green-gradient">
             <div className="mockup-card email-mockup slide-right">
                <h4 className="mb-4">Email scheduled</h4>
                <div className="mockup-field">
                  <span className="label">Template</span>
                  <span className="value">Welcome</span>
                </div>
                <div className="mockup-field">
                  <span className="label">Trigger</span>
                  <span className="value">1 day before event</span>
                </div>
             </div>
          </div>
        </div>
        <div className="alt-text">
          <h3 className="section-title">Built for coherence</h3>
          <p className="section-subtitle mb-8">Keep every product accounted for without extra spreadsheets.</p>
          <div className="tags-container">
            <div className="ui-tag"><Calendar size={16} /> Task management</div>
            <div className="ui-tag"><CreditCard size={16} /> Payments</div>
            <div className="ui-tag"><MapPin size={16} /> Locations</div>
            <div className="ui-tag"><CheckCircle size={16} /> Approvals</div>
            <div className="ui-tag"><Smartphone size={16} /> Manage anywhere</div>
            <div className="ui-tag"><Activity size={16} /> Analytics</div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AlternatingFeatures;
