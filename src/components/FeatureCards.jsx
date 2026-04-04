import React from 'react';
import './FeatureCards.css';

const FeatureCards = () => {
  return (
    <section className="feature-cards-section section-container fade-in">
      <div className="section-header">
        <h2 className="section-title">How Planar helps</h2>
        <p className="section-subtitle">Get work flowing with less friction</p>
      </div>

      <div className="feature-grid">
        <div className="feature-col">
          <div className="feature-image-card gray-bg">
            <div className="mockup-card sales-mockup fade-up">
              <h3 className="mockup-header">Sales volume</h3>
              <p className="mockup-subheader">Q4</p>
              
              <div className="mockup-list">
                <div className="mockup-row">
                  <span>Oct</span>
                  <span>478</span>
                </div>
                <div className="mockup-row active">
                  <span>Nov</span>
                  <span>664</span>
                </div>
                <div className="mockup-row">
                  <span>Dec</span>
                  <span>297</span>
                </div>
              </div>
            </div>
          </div>
          <div className="feature-text">
            <h4>Smart Ordering</h4>
            <p>Monitor stock levels in real time, get low-stock alerts, and keep every product or part accounted for without extra spreadsheets.</p>
          </div>
        </div>

        <div className="feature-col">
          <div className="feature-image-card photo-bg">
            {/* The photo of a person typing */}
          </div>
          <div className="feature-text">
            <h4>AI Analysis</h4>
            <p>Generate clean, professional invoices in seconds and get paid faster with built-in payment options.</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeatureCards;
