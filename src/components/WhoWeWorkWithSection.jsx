import React from 'react';
import './WhoWeWorkWithSection.css';

const WhoWeWorkWithSection = () => {
  const categories = [
    {
      title: 'You have the CRM. Your reps do not trust the data.',
      desc: 'Deal stages wrong. Forecast unreliable. Reps keeping their own spreadsheets. Puetto cleans, restructures, and maintains it weekly.'
    },
    {
      title: 'Hiring still takes two weeks of founder coordination.',
      desc: 'IT access requests. Manual onboarding docs. Missed 30-day check-ins. All of it gets wired and runs without you.'
    },
    {
      title: 'Your tools are not talking to each other.',
      desc: 'HubSpot, Slack, Notion, and your HRIS are three separate islands. Every handoff is manual. Puetto connects them.'
    },
    {
      title: 'You are in the Middle East and AI is the priority but the implementation is missing.',
      desc: 'The tools exist. The roadmap exists. The experienced team to configure, integrate, and run them does not. That is what Puetto does.'
    }
  ];

  return (
    <section className="who-we-work-section section-container fade-in">
      <div className="section-header">
        <span className="section-eyebrow">WHO WE WORK WITH</span>
        <h2 className="section-title">Growing fast. Ops not keeping up.<br/>That is who we work with.</h2>
      </div>

      <div className="who-grid">
        {categories.map((cat, i) => (
          <div className="who-card" key={i}>
            <h4>{cat.title}</h4>
            <p>{cat.desc}</p>
          </div>
        ))}
      </div>

      <div className="middle-east-banner mt-4">
        <strong>Middle East:</strong> Puetto actively works with funded startups and growth businesses across the UAE, Saudi Arabia, and GCC. The gap between having AI tools on the roadmap and having someone run them properly is wide. That is where we operate.
      </div>
    </section>
  );
};

export default WhoWeWorkWithSection;
