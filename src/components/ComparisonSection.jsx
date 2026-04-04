import React from 'react';
import './ComparisonSection.css';

const ComparisonSection = () => {
  const comparisons = [
    {
      alt: 'US RevOps agencies',
      offer: 'Slow. $15–25K/month. No AI in the delivery.',
      puetto: 'Puetto ships in 30 days. AI in every workflow. Fraction of the cost.'
    },
    {
      alt: 'Dev agencies (offshore)',
      offer: 'Build and exit. You own a system nobody can maintain.',
      puetto: 'Puetto builds it and stays to run it month to month.'
    },
    {
      alt: 'Upwork freelancers',
      offer: 'One tool. One project. No accountability after go-live.',
      puetto: 'Three ops pillars. One partner. We own the output ongoing.'
    },
    {
      alt: 'Hiring in-house',
      offer: '3 months to hire. 3 months to onboard. $80–120K/year.',
      puetto: 'Puetto is live in 30 days at a fraction of annual headcount cost.'
    }
  ];

  const features = [
    {
      title: 'GTM background, not dev-first',
      desc: 'We come from revenue and ops, not engineering. When we set up your CRM, we think about conversion rates and rep behaviour. That is why it gets used.'
    },
    {
      title: '30+ pre-built playbooks',
      desc: 'Every workflow built across client engagements is saved, refined, and ready. You get the version that has been tested, not the first draft.'
    },
    {
      title: 'Documented from day one',
      desc: 'Every automation, every workflow, every process has a written record as we build it. If you bring ops in-house later, your new hire gets a complete manual.'
    }
  ];

  return (
    <section className="comparison-section section-container fade-in">
      <div className="section-header text-center">
        <span className="section-eyebrow">WHY PUETTO</span>
        <h2 className="section-title">Most ops partners build it and leave.<br/>Puetto builds it and runs it.</h2>
        <p className="section-subtitle max-w-text mx-auto mt-4">
          Agencies exit after the build. Consultants advise and invoice. Freelancers finish the project. Puetto is the one that stays as the operator and owns what it builds, every month.
        </p>
      </div>

      <div className="comp-table-wrap">
        <table className="comp-table">
          <thead>
            <tr>
              <th>The alternative</th>
              <th>What they typically offer</th>
              <th>Puetto difference</th>
            </tr>
          </thead>
          <tbody>
            {comparisons.map((item, i) => (
              <tr key={i}>
                <td className="col-alt">{item.alt}</td>
                <td className="col-offer">{item.offer}</td>
                <td className="col-puetto">{item.puetto}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="comp-features">
        {features.map((ft, i) => (
          <div className="comp-ft-card" key={i}>
            <h4>{ft.title}</h4>
            <p>{ft.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default ComparisonSection;
