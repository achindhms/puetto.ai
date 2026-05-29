import { useState, useMemo, useEffect, useRef } from 'react';
import { Helmet } from 'react-helmet-async';
import { ArrowRight } from 'lucide-react';
import './ROICalculator.css';

const SLIDERS = [
  { key: 'acv', label: 'Annual contract value', prefix: '$', min: 1000, max: 500000, step: 1000, def: 25000 },
  { key: 'accounts', label: 'Number of target accounts', prefix: '', min: 10, max: 5000, step: 10, def: 200 },
  { key: 'mql', label: 'MQL rate on target accounts', suffix: '%', min: 0, max: 100, step: 1, def: 40 },
  { key: 'sql', label: 'SQL conversion rate', suffix: '%', min: 0, max: 100, step: 1, def: 50 },
  { key: 'opp', label: 'Opportunity rate', suffix: '%', min: 0, max: 100, step: 1, def: 40 },
  { key: 'won', label: 'Closed / won rate', suffix: '%', min: 0, max: 100, step: 1, def: 25 },
  { key: 'spend', label: 'Program spend (annual)', prefix: '$', min: 0, max: 2000000, step: 5000, def: 120000 },
];

const money = new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 });
const count = new Intl.NumberFormat('en-US', { maximumFractionDigits: 0 });

function Donut({ spend, gain }) {
  const total = spend + gain;
  const gainFrac = total > 0 ? gain / total : 0;
  const r = 70;
  const c = 2 * Math.PI * r;
  const gainLen = c * gainFrac;
  return (
    <svg className="roi__donut" viewBox="0 0 180 180" width="180" height="180" role="img" aria-label="Spend versus investment gain">
      <circle cx="90" cy="90" r={r} fill="none" stroke="#ece9ff" strokeWidth="26" />
      <circle
        cx="90" cy="90" r={r} fill="none" strokeWidth="26" strokeLinecap="butt"
        stroke="url(#roiGrad)"
        strokeDasharray={`${gainLen} ${c - gainLen}`}
        strokeDashoffset={c * 0.25}
        transform="rotate(-90 90 90)"
        style={{ transition: 'stroke-dasharray 0.4s ease' }}
      />
      <defs>
        <linearGradient id="roiGrad" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#f59e0b" />
          <stop offset="40%" stopColor="#f43f5e" />
          <stop offset="70%" stopColor="#a855f7" />
          <stop offset="100%" stopColor="#3b82f6" />
        </linearGradient>
      </defs>
    </svg>
  );
}

export default function ROICalculator() {
  const rootRef = useRef(null);
  const [values, setValues] = useState(
    Object.fromEntries(SLIDERS.map((s) => [s.key, s.def]))
  );

  useEffect(() => {
    const nav = document.querySelector('header, nav, .navbar, [class*="navbar"], [class*="Navbar"]');
    if (nav && rootRef.current) {
      const h = nav.getBoundingClientRect().height;
      if (h > 0 && h < 200) {
        rootRef.current.style.paddingTop = `${h + 48}px`;
      }
    }
  }, []);

  const handleChange = (key) => (e) => {
    setValues((prev) => ({ ...prev, [key]: Number(e.target.value) }));
  };

  const r = useMemo(() => {
    const { acv, accounts, mql, sql, opp, won, spend } = values;
    const mqlC = accounts * (mql / 100);
    const sqlC = mqlC * (sql / 100);
    const oppC = sqlC * (opp / 100);
    const wonC = oppC * (won / 100);
    const revenue = wonC * acv;
    const netReturn = revenue - spend;
    const roi = spend > 0 ? (netReturn / spend) * 100 : null;
    const paybackMonths = revenue > 0 ? (spend / revenue) * 12 : null;
    return {
      mql: Math.round(mqlC), sql: Math.round(sqlC), opp: Math.round(oppC),
      won: Math.round(wonC), revenue: Math.round(revenue), spend: Math.round(spend),
      gain: Math.round(Math.max(revenue, 0)), netReturn: Math.round(netReturn), roi, paybackMonths,
    };
  }, [values]);

  const fmtVal = (s) => {
    if (s.prefix === '$') return money.format(values[s.key]);
    if (s.suffix === '%') return `${values[s.key]}%`;
    return count.format(values[s.key]);
  };

  return (
    <div className="roi" ref={rootRef}>
      <Helmet>
        <title>ABM ROI Calculator | Account-Based Marketing Revenue & Payback | Puetto</title>
        <meta name="description" content="Free ABM ROI calculator. Model the revenue, ROI and payback period of an account-based marketing program from your contract value, target accounts and funnel conversion rates." />
        <meta name="keywords" content="ABM ROI calculator, account based marketing ROI, ABM revenue calculator, marketing payback period, B2B pipeline calculator, GTM ops" />
        <link rel="canonical" href="https://puetto.ai/roi-calculator" />
        <meta property="og:type" content="website" />
        <meta property="og:title" content="ABM ROI Calculator | Puetto" />
        <meta property="og:description" content="Model the revenue, ROI and payback period of an account-based marketing program in seconds." />
        <meta property="og:url" content="https://puetto.ai/roi-calculator" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="ABM ROI Calculator | Puetto" />
        <meta name="twitter:description" content="Model the revenue, ROI and payback period of an account-based marketing program in seconds." />
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org", "@type": "WebApplication",
            "name": "ABM ROI Calculator", "applicationCategory": "BusinessApplication",
            "operatingSystem": "Web", "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD" },
            "description": "Model the revenue, ROI and payback period of an account-based marketing program.",
            "url": "https://puetto.ai/roi-calculator", "publisher": { "@type": "Organization", "name": "Puetto" }
          })}
        </script>
      </Helmet>

      <header className="roi__hero">
        <span className="roi__badge">ABM ROI CALCULATOR</span>
        <h1 className="roi__title">
          See the <span className="roi__gradient">real ROI</span> of an account-based approach
        </h1>
        <p className="roi__intro">
          Move the sliders to model your funnel, from target accounts down to closed
          revenue. The calculator updates revenue, ROI and payback period live.
        </p>
      </header>

      <div className="roi__layout">
        <div className="roi__card">
          <div className="roi__sliders">
            {SLIDERS.map((s) => (
              <div className="roi__slider" key={s.key}>
                <div className="roi__slider-top">
                  <span className="roi__slider-label">{s.label}</span>
                  <span className="roi__slider-value">{fmtVal(s)}</span>
                </div>
                <input
                  type="range" min={s.min} max={s.max} step={s.step}
                  value={values[s.key]} onChange={handleChange(s.key)}
                  className="roi__range"
                  style={{ '--pct': `${((values[s.key] - s.min) / (s.max - s.min)) * 100}%` }}
                />
              </div>
            ))}
          </div>

          <div className="roi__readout">
            <Donut spend={r.spend} gain={r.gain} />
            <div className="roi__readout-stats">
              <div className="roi__readout-row">
                <span className="roi__dot roi__dot--ghost" /> Program spend
                <span className="roi__readout-num">{money.format(r.spend)}</span>
              </div>
              <div className="roi__readout-row">
                <span className="roi__dot roi__dot--grad" /> Projected revenue
                <span className="roi__readout-num">{money.format(r.revenue)}</span>
              </div>
              <div className="roi__readout-row roi__readout-row--strong">
                ROI
                <span className="roi__readout-num">{r.roi === null ? '—' : `${count.format(Math.round(r.roi))}%`}</span>
              </div>
              <div className="roi__readout-row roi__readout-row--strong">
                Payback
                <span className="roi__readout-num">
                  {r.paybackMonths === null ? '—' : r.paybackMonths < 12 ? `${r.paybackMonths.toFixed(1)} mo` : `${(r.paybackMonths / 12).toFixed(1)} yr`}
                </span>
              </div>
            </div>
          </div>

          <div className="roi__funnel">
            <div className="roi__fstat"><span>MQLs</span><strong>{count.format(r.mql)}</strong></div>
            <div className="roi__fstat"><span>SQLs</span><strong>{count.format(r.sql)}</strong></div>
            <div className="roi__fstat"><span>Opportunities</span><strong>{count.format(r.opp)}</strong></div>
            <div className="roi__fstat"><span>Closed / won</span><strong>{count.format(r.won)}</strong></div>
          </div>
        </div>

        <aside className="roi__aside">
          <div className="roi__promo">
            <h2 className="roi__promo-title">Run ops the way you want</h2>
            <p className="roi__promo-text">Puetto configures your tools, builds your automations, and runs the day-to-day ops. Faster than a hire, more accountable than an agency.</p>
            <a className="roi__button roi__button--full" href="/contact">Book a Free Ops Audit <ArrowRight size={16} /></a>
          </div>
        </aside>
      </div>

      <section className="roi__content">
        <h2>How the ABM ROI calculation works</h2>
        <p>The calculator models a standard B2B funnel. It starts with your target account list and applies each conversion rate in sequence: accounts become marketing qualified leads, MQLs convert to sales qualified leads, SQLs turn into opportunities, and a share of those opportunities close as revenue. Multiplying the closed-won deals by your average annual contract value gives projected revenue. Subtracting your program spend produces net return, and dividing spend by revenue gives the payback period.</p>

        <h2>The ABM ROI formula</h2>
        <p>The core formula is straightforward. ROI equals net return divided by program spend, expressed as a percentage: ROI = (Projected revenue − Program spend) ÷ Program spend × 100. Payback period answers a different question, namely how long the revenue takes to cover the spend: Payback = Program spend ÷ Projected revenue × 12 months. Together they tell you both how efficient the program is and how quickly it pays for itself.</p>

        <h2>Why account-based marketing changes the math</h2>
        <p>Traditional demand generation spreads budget across a wide audience and accepts low conversion at the top. An account-based approach inverts that. By focusing resources on a defined set of high-fit accounts, conversion rates at every stage tend to rise, deal sizes are larger, and sales cycles are more predictable. The result is a funnel where fewer inputs produce more revenue, which is why ABM programs often show stronger ROI and faster payback than broad-based campaigns.</p>

        <h2>What good ABM funnel benchmarks look like</h2>
        <p>Benchmarks vary by industry and deal size, but ABM programs typically see MQL rates on target accounts well above blended marketing averages, SQL conversion in the double digits, and closed-won rates that reflect the higher intent of pre-qualified accounts. Use your own historical data where you have it. If you are early and lack reliable numbers, model conservative rates first, then see how sensitive your projected revenue is to small improvements at each stage.</p>

        <h2>Turning the projection into an operating system</h2>
        <p>A strong projection is only useful if the underlying operations can deliver it. That means a clean CRM, automations that move accounts through the funnel without manual handoffs, and reporting that ties spend to closed revenue. Puetto configures the tools, builds the automations, and runs the day-to-day ops that make an account-based motion actually hit its numbers, faster than a hire and more accountable than an agency.</p>

        <div className="roi__cta">
          <h2>Want help hitting these numbers?</h2>
          <p>Book a free ops audit and we'll show you where your funnel is leaking revenue and what it would take to close the gap.</p>
          <a className="roi__button roi__button--cta" href="/contact">Book a Free Ops Audit <ArrowRight size={18} /></a>
        </div>
      </section>
    </div>
  );
}
