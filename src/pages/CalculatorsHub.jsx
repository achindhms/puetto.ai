import { useState, useMemo, useEffect, useRef } from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { ArrowRight, Search } from 'lucide-react';
import './CalculatorsHub.css';

const TOOLS = [
  { path: '/abm-roi-calculator', title: 'ABM ROI Calculator', desc: 'Model the revenue, ROI and payback of an account-based marketing program from your funnel.', tag: 'Marketing', accent: 'a' },
  { path: '/webinar-roi-calculator', title: 'Webinar ROI Calculator', desc: 'See the revenue, pipeline, cost per lead and ROI of your webinar program in seconds.', tag: 'Marketing', accent: 'b' },
  { path: '/event-roi-calculator', title: 'Event Marketing ROI Calculator', desc: 'Prove total event value across revenue, pipeline, brand lift, content and earned media.', tag: 'Marketing', accent: 'c' },
  { path: '/thought-leadership-roi-calculator', title: 'Thought Leadership ROI Calculator', desc: 'Model the reach, pipeline and revenue of a LinkedIn personal branding program.', tag: 'Marketing', accent: 'd' },
  { path: '/linkedin-ads-roas-calculator', title: 'LinkedIn Ads ROI Calculator', desc: 'See your true cohort-based ROAS at 90, 180 and 365 days for long B2B SaaS sales cycles.', tag: 'Paid', accent: 'a' },
  { path: '/retention-calculator', title: 'Retention Calculator', desc: 'Compute NRR, GRR and logo retention, and model cohort retention curves and heatmaps.', tag: 'SaaS metrics', accent: 'b' },
  { path: '/rice-calculator', title: 'RICE Prioritization', desc: 'Score and rank your roadmap by Reach, Impact, Confidence and Effort, and spot quick wins.', tag: 'Product', accent: 'c' },
  { path: '/kano-calculator', title: 'Kano Model Analysis', desc: 'Categorize features into Must-Be, Performance and Attractive, and prioritize what delights.', tag: 'Product', accent: 'd' },
];

function MiniCalcIcon({ accent }) {
  return (
    <svg className={`chub__icon chub__icon--${accent}`} viewBox="0 0 64 64" width="64" height="64" aria-hidden="true">
      <rect x="14" y="8" width="36" height="48" rx="6" fill="none" stroke="currentColor" strokeWidth="2.5" />
      <rect x="20" y="14" width="24" height="9" rx="2" fill="none" stroke="currentColor" strokeWidth="2.5" />
      <g fill="currentColor">
        <rect x="20" y="30" width="6" height="6" rx="1.5" /><rect x="29" y="30" width="6" height="6" rx="1.5" /><rect x="38" y="30" width="6" height="6" rx="1.5" />
        <rect x="20" y="39" width="6" height="6" rx="1.5" /><rect x="29" y="39" width="6" height="6" rx="1.5" /><rect x="38" y="39" width="6" height="6" rx="1.5" />
      </g>
      <path d="M50 6l1.5 3.5L55 11l-3.5 1.5L50 16l-1.5-3.5L45 11l3.5-1.5z" fill="currentColor" />
    </svg>
  );
}

export default function CalculatorsHub() {
  const rootRef = useRef(null);
  const [q, setQ] = useState('');

  useEffect(() => {
    const nav = document.querySelector('header, nav, .navbar, [class*="navbar"], [class*="Navbar"]');
    if (nav && rootRef.current) {
      const h = nav.getBoundingClientRect().height;
      if (h > 0 && h < 200) rootRef.current.style.paddingTop = `${h + 56}px`;
    }
  }, []);

  const filtered = useMemo(() => {
    const s = q.trim().toLowerCase();
    if (!s) return TOOLS;
    return TOOLS.filter((t) => (t.title + ' ' + t.desc + ' ' + t.tag).toLowerCase().includes(s));
  }, [q]);

  return (
    <div className="chub" ref={rootRef}>
      <Helmet>
        <title>Free B2B Marketing & SaaS Calculators | Puetto</title>
        <meta name="description" content="Free interactive calculators from Puetto: ABM, webinar, event and LinkedIn Ads ROI, SaaS retention (NRR/GRR), RICE prioritization and Kano analysis. Model your numbers in seconds." />
        <meta name="keywords" content="marketing ROI calculators, SaaS calculators, ABM ROI, webinar ROI, retention calculator, RICE, Kano model, B2B GTM tools" />
        <link rel="canonical" href="https://www.puetto.com/calculators" />
        <meta property="og:type" content="website" />
        <meta property="og:title" content="Free B2B Marketing & SaaS Calculators | Puetto" />
        <meta property="og:description" content="Interactive ROI, retention and prioritization calculators for B2B marketing and SaaS teams." />
        <meta property="og:url" content="https://www.puetto.com/calculators" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Free B2B Marketing & SaaS Calculators | Puetto" />
        <meta name="twitter:description" content="Interactive ROI, retention and prioritization calculators for B2B marketing and SaaS teams." />
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org", "@type": "CollectionPage",
            "name": "Calculators", "url": "https://www.puetto.com/calculators",
            "description": "Free interactive calculators for B2B marketing and SaaS teams.",
            "hasPart": TOOLS.map((t) => ({
              "@type": "WebApplication", "name": t.title,
              "applicationCategory": "BusinessApplication",
              "url": `https://www.puetto.com${t.path}`
            })),
            "publisher": { "@type": "Organization", "name": "Puetto", "url": "https://www.puetto.com" }
          })}
        </script>
      </Helmet>

      <header className="chub__hero">
        <h1 className="chub__title">Calculators</h1>
        <p className="chub__intro">Want to model your marketing ROI, prove what an event delivered, or pressure-test your SaaS retention? Explore Puetto's <span className="chub__grad">free interactive calculators</span> below.</p>
      </header>

      <div className="chub__body">
        <div className="chub__bar">
          <h2 className="chub__h2">Browse all calculators</h2>
          <div className="chub__search">
            <Search size={18} />
            <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search calculators" aria-label="Search calculators" />
          </div>
        </div>

        {filtered.length === 0 ? (
          <p className="chub__noresult">No calculators match "{q}". Try a different term.</p>
        ) : (
          <div className="chub__grid">
            {filtered.map((t) => (
              <Link className="chub__card" to={t.path} key={t.path}>
                <div className={`chub__cardtop chub__cardtop--${t.accent}`}>
                  <div className="chub__cardtag">{t.tag}</div>
                  <h3 className="chub__cardtitle">{t.title}</h3>
                  <MiniCalcIcon accent={t.accent} />
                </div>
                <div className="chub__cardbody">
                  <p className="chub__carddesc">{t.desc}</p>
                  <span className="chub__cardcta">Calculate now <ArrowRight size={16} /></span>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>

      <section className="chub__cta">
        <h2 className="chub__cta-title">Numbers look good? Let's hit them.</h2>
        <p className="chub__cta-text">A projection is only worth what your operations can deliver. Puetto configures your tools, builds your automations, and runs the day-to-day ops, faster than a hire and more accountable than an agency.</p>
        <a className="chub__btn" href="/contact">Book a Free Ops Audit <ArrowRight size={18} /></a>
      </section>
    </div>
  );
}
