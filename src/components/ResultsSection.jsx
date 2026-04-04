import React from 'react';
import { Quote } from 'lucide-react';
import './ResultsSection.css';

const ResultsSection = () => {
  return (
    <section className="results-section section-container fade-in">
      <div className="section-header text-center">
        <span className="section-eyebrow">RESULTS</span>
        <h2 className="section-title">Numbers from real client work.</h2>
      </div>

      <div className="results-metrics">
        <div className="res-metric-box">
          <h3>14 hrs</h3>
          <p>Saved per week from three automations in first engagement</p>
        </div>
        <div className="res-metric-box">
          <h3>Day 5</h3>
          <p>First live automation in every new engagement, without exception</p>
        </div>
        <div className="res-metric-box">
          <h3>30+</h3>
          <p>Pre-built workflow templates across all three ops pillars</p>
        </div>
        <div className="res-metric-box">
          <h3>55%</h3>
          <p>Of Ops Audit clients move to Managed Ops within 30 days</p>
        </div>
      </div>

    </section>
  );
};

export default ResultsSection;
