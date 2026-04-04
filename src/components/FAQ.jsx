import React, { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';
import './FAQ.css';

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const faqs = [
    { 
      question: 'We already have HubSpot and Notion. What would Puetto change?', 
      answer: 'Having tools and having them work well are different things. The most common situation we walk into: HubSpot is live, the data is stale, the automations are missing or broken, and a pipeline report takes 30 minutes to pull manually. Puetto rebuilds the structure, wires the automations, and maintains it weekly so it stays accurate.' 
    },
    { 
      question: 'Can we start with just one ops pillar?', 
      answer: 'Yes. Revenue Operations is the most common starting point. People Operations is the most common second add-on, usually when a founder sees how much time hiring coordination takes. You pay for what you need right now, not a bundle.' 
    },
    { 
      question: 'What does Managed Operations involve every week?', 
      answer: 'Revenue: CRM hygiene, lead routing review, broken automation fixes, pipeline report. People: ATS updates, interview coordination, payslip distribution, onboarding steps. Product: sprint report, analytics checks, feedback triage. One point of contact. One monthly summary. Nothing lands on your team.' 
    },
    { 
      question: 'How is this different from a freelancer or build agency?', 
      answer: 'A freelancer delivers a project and exits. You own a system nobody knows how to maintain. Puetto built it, monitors it, fixes it before it fails, and expands it as your business changes. We own the output ongoing.' 
    },
    { 
      question: 'What if we want to bring ops in-house later?', 
      answer: 'Everything we build is documented as we build it. When you hire an ops person, they receive a complete operating manual from day one. Most clients find they do not need to. But the transition is always clean.' 
    }
  ];

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="faq-section fade-in">
      <div className="section-container">
        <div className="faq-layout">
          <div className="faq-header">
            <span className="section-eyebrow">COMMON QUESTIONS</span>
            <h3>Straight answers to what founders ask us.</h3>
          </div>
          <div className="faq-list">
            {faqs.map((faq, index) => (
              <div className={`faq-item ${openIndex === index ? 'open' : ''}`} key={index}>
                <div className="faq-question" onClick={() => toggleFAQ(index)}>
                  <span>{faq.question}</span>
                  {openIndex === index ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
                </div>
                <div className="faq-answer">
                  <p>{faq.answer}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export default FAQ;
