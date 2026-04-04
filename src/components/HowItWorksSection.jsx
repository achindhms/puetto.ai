import React, { useEffect, useRef, useState } from 'react';
import './HowItWorksSection.css';

const HowItWorksSection = () => {
  const [scrollProgress, setScrollProgress] = useState(0);
  const sectionRef = useRef(null);
  const pathRef = useRef(null);
  const [totalLength, setTotalLength] = useState(0);

  const steps = [
    {
      id: '01',
      phase: 'Free Ops Audit',
      desc: '60 minutes on a call. We map your tools, find where team time is going, and show you the three fixes with the highest payback. Written audit delivered within five working days.',
      side: 'left',
      percent: 0.05, // Earlier trigger
      pointY: 150
    },
    {
      id: '02',
      phase: 'Setup and Build',
      desc: 'CRM configured. Automation workflows built and live. HRIS set up. Analytics instrumented. First automation running by end of week one. Full build complete by week six.',
      side: 'right',
      percent: 0.35,
      pointY: 450
    },
    {
      id: '03',
      phase: 'Managed Operations',
      desc: 'We run the execution layer. Weekly CRM hygiene. Lead processing. Recruitment coordination. Sprint reporting. Automation monitoring. One monthly report. Nothing falls on your team.',
      side: 'left',
      percent: 0.65,
      pointY: 750
    },
    {
      id: '04',
      phase: 'Expand',
      desc: 'Most clients start with one ops pillar and add a second or third once the time savings are visible. We identify the next area and scope the expansion.',
      side: 'right',
      percent: 0.9,
      pointY: 1050
    }
  ];

  useEffect(() => {
    if (pathRef.current) {
      setTotalLength(pathRef.current.getTotalLength());
    }

    const handleScroll = () => {
      if (!sectionRef.current) return;
      const rect = sectionRef.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      const sectionHeight = rect.height;
      const startPoint = windowHeight * 0.7;
      const endPoint = -sectionHeight * 0.3;
      const progress = (startPoint - rect.top) / (startPoint - endPoint);
      setScrollProgress(Math.min(Math.max(progress, 0), 1));
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const getPointAtProgress = (progress) => {
    if (!pathRef.current || totalLength === 0) return { x: 500, y: 0 };
    const point = pathRef.current.getPointAtLength(progress * totalLength);
    return { x: point.x, y: point.y };
  };

  const travelNode = getPointAtProgress(scrollProgress);

  return (
    <section id="how" className="how-it-works-dark" ref={sectionRef}>
      <div className="section-container">
        
        <div className="how-header">
          <span className="process-eyebrow">HOW IT WORKS</span>
          <h2 className="how-title">
            Audit on day one. <br /> 
            <span className="text-gradient">Ops live in 30 days.</span>
          </h2>
          <p className="how-subtitle">We do not hand you a report and disappear. We build it, then we run it.</p>
        </div>

        <div className="journey-container">
          
          <div className="svg-path-wrapper">
             <svg className="journey-svg" viewBox="0 0 1000 1200" preserveAspectRatio="none">
               <defs>
                 <linearGradient id="sunset-gradient" x1="0%" y1="0%" x2="0%" y2="100%">
                   <stop offset="0%" stopColor="#f59e0b" /> {/* Matching ring chart orange */}
                   <stop offset="50%" stopColor="#ef4444" /> {/* Matching ring chart red/pink */}
                   <stop offset="100%" stopColor="#3b82f6" /> {/* Matching ring chart blue */}
                 </linearGradient>
               </defs>
               {/* Squared Dotted Journey Path - Precise termination at final anchor */}
               <path 
                 className="journey-line-bg" 
                 d="M152,150 L848,150 L848,450 L152,450 L152,750 L848,750 L848,1050" 
                 fill="none" 
                 strokeWidth="1.5" 
               />
               <path 
                 ref={pathRef}
                 className="journey-line-active" 
                 d="M152,150 L848,150 L848,450 L152,450 L152,750 L848,750 L848,1050" 
                 fill="none" 
                 strokeWidth="2"
                 stroke="url(#sunset-gradient)"
                 strokeDasharray={totalLength}
                 strokeDashoffset={totalLength - (scrollProgress * totalLength)}
                 style={{ transition: 'stroke-dashoffset 0.1s linear' }}
               />
               
               <g style={{ opacity: scrollProgress > 0 ? 1 : 0 }}>
                 <circle 
                   cx={travelNode.x} 
                   cy={travelNode.y} 
                   r="12" 
                   className="travel-node-outer"
                   fill="rgba(249, 115, 22, 0.2)"
                 />
                 <circle 
                   cx={travelNode.x} 
                   cy={travelNode.y} 
                   r="6" 
                   className="travel-node"
                   fill="#fcfcfc"
                   stroke="#f97316"
                   strokeWidth="2"
                   style={{ filter: 'drop-shadow(0 0 12px rgba(249, 115, 22, 0.8))' }}
                 />
               </g>
             </svg>
          </div>

          <div className="journey-steps">
            {steps.map((step, i) => {
              const active = scrollProgress >= step.percent;
              return (
                <div key={i} className={`journey-step ${step.side} ${active ? 'is-active' : ''}`}
                     style={{ top: `${(step.pointY / 1200) * 100}%` }}>
                  <div className="step-content glass-card">
                    <div className="step-number-bg">0{i + 1}</div>
                    <div className="step-glow-indicator"></div>
                    <div className="step-node-point"></div>
                    <div className="step-text-block">
                        <span className="step-phase-title">{step.phase}</span>
                        <p className="step-details-text">{step.desc}</p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

        </div>

      </div>
    </section>
  );
};

export default HowItWorksSection;
