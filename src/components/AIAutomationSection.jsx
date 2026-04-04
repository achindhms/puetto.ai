import React from 'react';
import { ArrowRight, ChevronRight, Workflow, Bot, BarChart4, BellRing, FileText, Send, ShieldCheck, Zap } from 'lucide-react';
import './AIAutomationSection.css';

const AIAutomationSection = () => {
  return (
    <section className="ai-automation-dark">
      <div className="section-container">
        
        {/* Main Header */}
        <div className="ai-dark-header">
          <span className="wwd-eyebrow">AI AND AUTOMATION</span>
          <h2 className="ai-dark-title">AI is in every workflow we build.<br /><span className="text-gradient">Not on the brochure.</span></h2>
          <p className="ai-dark-subtitle">
            Every Puetto engagement uses automation and AI where it replaces real manual work. Not as a demo. Not as a differentiator on a slide. As the actual mechanism of delivery.
          </p>
        </div>

        {/* Top 3-Card Grid */}
        <div className="ai-persona-grid">
           {/* Card 1: Workflow Automation */}
           <div className="persona-card dark-glass">
              <div className="persona-info">
                <div className="persona-icon-box icon-blue-bg"><Workflow size={20} className="icon-blue" /></div>
                <h3>Workflow automation</h3>
                <p>Manual steps your team repeats every week get rebuilt as automated sequences in n8n. Lead form enrichment via Clay, scoring in HubSpot, and Slack routing—built once, monitored permanently.</p>
              </div>
              <div className="persona-mockup">
                 <div className="ui-mockup-frame">
                    <div className="ui-mockup-header">Automation: n8n Workflow</div>
                    <div className="ui-mockup-body">
                       <div className="ui-row"><span>Trigger</span> <span className="ui-pill">Form Submit</span></div>
                       <div className="ui-row"><span>Step 2</span> <span className="ui-pill blue">Clay Enrich</span></div>
                       <div className="ui-row"><span>Step 3</span> <span className="ui-pill lime">HubSpot Route</span></div>
                    </div>
                 </div>
              </div>
           </div>

           {/* Card 2: Custom AI Agents */}
           <div className="persona-card dark-glass">
              <div className="persona-info">
                <div className="persona-icon-box icon-purple-bg"><Bot size={20} className="icon-purple" /></div>
                <h3>Custom AI agents</h3>
                <p>We build agents using Claude API and GPT-4 for tasks that need judgment. From drafting offer letters to screening applicants, we remove the manual loops from your day.</p>
              </div>
              <div className="persona-mockup">
                 <div className="ui-mockup-frame">
                    <div className="ui-mockup-header">AI Agent Processing</div>
                    <div className="ui-mockup-body">
                       <div className="avatar-group">
                          <div className="avatar">G</div>
                          <div className="avatar">C</div>
                          <div className="avatar">L</div>
                       </div>
                       <div className="ai-pulse-bar">
                          <div className="pulse-fill"></div>
                       </div>
                       <div className="ai-status">Generating Offer Letter...</div>
                    </div>
                 </div>
              </div>
           </div>

           {/* Card 3: Automated Reporting */}
           <div className="persona-card dark-glass">
              <div className="persona-info">
                <div className="persona-icon-box icon-lime-bg"><BarChart4 size={20} className="icon-lime" /></div>
                <h3>Automated reporting</h3>
                <p>Weekly pipeline reports. Sprint summaries. Monthly hiring digests. Wired to generate on schedule and land in the right inbox, sent without a person ever assembling them by hand again.</p>
              </div>
              <div className="persona-mockup">
                 <div className="ui-mockup-frame report-mock">
                    <div className="report-card">
                       <div className="report-icon"><BarChart4 size={14} /></div>
                       <div className="report-text">
                          <div className="report-label">Weekly Pipeline</div>
                          <div className="report-status">Generated</div>
                       </div>
                    </div>
                    <div className="report-delivery">
                       <FileText size={14} className="icon-lime" /> Delivered to Inbox
                    </div>
                 </div>
              </div>
           </div>
        </div>

        {/* Bottom Feature Showcase: Analytics */}
        <div className="ai-showcase-container dark-glass">
           <div className="showcase-content">
              <h2 className="showcase-title">Analytics that fire alerts, not just show dashboards</h2>
              <p className="showcase-desc">
                We instrument Mixpanel, Amplitude, or PostHog from scratch or audit what is already running. Connect product data to CRM so sales knows which users are disengaging before support does. Set anomaly detection so the team hears about a retention drop on Monday, not in the board deck.
              </p>
              
              <div className="showcase-tags">
                <div className="s-tag"><div className="tag-circle"><ShieldCheck size={14} /></div> Instrument Mixpanel</div>
                <div className="s-tag"><div className="tag-circle"><Zap size={14} /></div> CRM Integration</div>
                <div className="s-tag"><div className="tag-circle"><BellRing size={14} /></div> Anomaly Detection</div>
              </div>

              <button className="ai-showcase-cta">
                Book an audit <ArrowRight size={18} />
              </button>
           </div>

           <div className="showcase-visual">
              <div className="ai-analytics-mockup">
                <div className="mockup-header-row">
                  <div className="title-group">
                    <span className="m-title">Product Retention</span>
                    <span className="m-subtitle">Live Anomaly Detection</span>
                  </div>
                  <div className="live-dot-container"><div className="live-dot"></div> Live Monitoring</div>
                </div>

                <div className="mockup-chart-area">
                  <svg className="analytics-svg" viewBox="0 0 400 160">
                    <path 
                      className="chart-line-bg" 
                      d="M0 120 Q 50 110, 100 130 T 200 90 T 300 110 T 400 60" 
                      fill="none" 
                      stroke="rgba(255,255,255,0.1)" 
                      strokeWidth="2" 
                    />
                    <path 
                      className="chart-line-active" 
                      d="M0 120 Q 50 110, 100 130 T 200 90 T 300 110" 
                      fill="none" 
                      stroke="#a3e635" 
                      strokeWidth="3" 
                    />
                    {/* Anomaly Detection UI */}
                    <circle cx="300" cy="110" r="4" fill="#f87171" className="anomaly-dot" />
                    <circle cx="300" cy="110" r="10" fill="none" stroke="#f87171" strokeWidth="2" className="anomaly-ping" />
                  </svg>
                  
                  <div className="anomaly-alert-tooltip">
                    <div className="alert-header">ANOMALY DETECTED</div>
                    <div className="alert-body">Retention drop: -12.4%</div>
                    <div className="alert-footer">Firing Slack Alert...</div>
                  </div>
                </div>

                <div className="mockup-footer-tags">
                   <div className="m-pill">Mixpanel</div>
                   <div className="m-pill">PostHog</div>
                   <div className="m-pill">Amplitude</div>
                </div>
              </div>
              <div className="showcase-glow"></div>
           </div>
        </div>

      </div>
    </section>
  );
};

export default AIAutomationSection;
