import React, { useState } from 'react';
import './Integrations.css';

const Integrations = () => {
  const [activeTab, setActiveTab] = useState('All');
  
  const integrations = [
    {
      id: 'kira',
      name: 'Kira',
      description: 'Intelligent cash flow monitoring for modern businesses. Kira connects directly to your bank to surface liquidity trends and upcoming obligations.',
      iconColor: '#71C950', // green
      letter: 'K',
      categories: ['Marketing', 'Finance']
    },
    {
      id: 'quantasync',
      name: 'QuantaSync',
      description: 'A no-code data pipeline for syncing apps, warehouses, and reporting tools. QuantaSync makes your metrics always-on and always accurate.',
      iconColor: '#3F1AD4', // blue
      letter: 'Q',
      categories: ['Collaboration', 'Finance']
    },
    {
      id: 'tallywave',
      name: 'Tallywave',
      description: 'A lightweight BI tool that lets you build live dashboards without a single line of SQL. Tallywave turns your data into decisions.',
      iconColor: '#00E5C4', // cyan
      letter: 'tw', // wait, looking at the image it's 'sw' or something. Let's use 'sw'. No, 'tw'.
      categories: ['Marketing']
    }
  ];

  return (
    <section className="integrations-section section-container fade-in">
      <div className="integrations-layout">
        <aside className="integrations-sidebar">
          <ul className="integrations-nav">
            {['All', 'Marketing', 'Collaboration', 'Finance'].map(tab => (
              <li 
                key={tab} 
                className={activeTab === tab ? 'active' : ''}
                onClick={() => setActiveTab(tab)}
              >
                {tab}
              </li>
            ))}
          </ul>
        </aside>

        <div className="integrations-list">
          {integrations.filter(integ => activeTab === 'All' || integ.categories.includes(activeTab)).map(integ => (
            <div className="integration-card" key={integ.id}>
              <div className="integration-icon" style={{ backgroundColor: integ.iconColor }}>
                {/* Just using a pseudo-logo letter for now */}
                {integ.letter}
              </div>
              <div className="integration-content">
                <h4>{integ.name}</h4>
                <p>{integ.description}</p>
              </div>
              <div className="integration-footer">
                <div className="integration-tags">
                  {integ.categories.map(cat => (
                    <span key={cat} className="integration-tag">{cat}</span>
                  ))}
                </div>
                <button className="btn-buy-now btn-integration">See Integration</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Integrations;
