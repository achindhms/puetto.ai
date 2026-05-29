import { useState, useMemo, useEffect, useRef } from 'react';
import { Helmet } from 'react-helmet-async';
import { ArrowRight, DollarSign, Users, Activity } from 'lucide-react';
import './RetentionCalculator.css';

const money = new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 });
const compact = new Intl.NumberFormat('en-US', { notation: 'compact', maximumFractionDigits: 1 });
const count = new Intl.NumberFormat('en-US', { maximumFractionDigits: 0 });
const pct1 = (n) => `${n.toFixed(1)}%`;

const SECTIONS = [
  {
    title: 'Revenue movement', icon: DollarSign,
    sliders: [
      { key: 'startMrr', label: 'MRR at period start', hint: 'Recurring revenue at the beginning', fmt: 'money', min: 1000, max: 5000000, step: 1000, def: 100000 },
      { key: 'expansion', label: 'Expansion revenue', hint: 'Upsell and cross-sell in the period', fmt: 'money', min: 0, max: 1000000, step: 500, def: 12000 },
      { key: 'contraction', label: 'Contraction revenue', hint: 'Revenue lost to downgrades (enter positive)', fmt: 'money', min: 0, max: 1000000, step: 500, def: 4000 },
      { key: 'churnRev', label: 'Churned revenue', hint: 'Revenue lost to cancellations (enter positive)', fmt: 'money', min: 0, max: 1000000, step: 500, def: 8000 },
    ],
  },
  {
    title: 'Customer movement', icon: Users,
    sliders: [
      { key: 'startCust', label: 'Customers at period start', hint: 'Customer count at the beginning', fmt: 'count', min: 1, max: 100000, step: 1, def: 500 },
      { key: 'churnedCust', label: 'Customers churned', hint: 'Customers lost during the period', fmt: 'count', min: 0, max: 100000, step: 1, def: 25 },
    ],
  },
  {
    title: 'Cohort model', icon: Activity,
    sliders: [
      { key: 'monthlyRetention', label: 'Monthly logo retention', hint: 'Share of customers retained each month', fmt: 'pct', min: 50, max: 100, step: 0.5, def: 95 },
      { key: 'cohortMonths', label: 'Months to project', hint: 'How many months of the cohort curve to model', fmt: 'count', min: 6, max: 24, step: 1, def: 12 },
    ],
  },
];

const ALL = SECTIONS.flatMap((s) => s.sliders);


export default function RetentionCalculator() {
  const rootRef = useRef(null);
  const [values, setValues] = useState(Object.fromEntries(ALL.map((s) => [s.key, s.def])));

  useEffect(() => {
    const nav = document.querySelector('header, nav, .navbar, [class*="navbar"], [class*="Navbar"]');
    if (nav && rootRef.current) {
      const h = nav.getBoundingClientRect().height;
      if (h > 0 && h < 200) rootRef.current.style.paddingTop = `${h + 56}px`;
    }
  }, []);

  const handleChange = (key) => (e) => setValues((p) => ({ ...p, [key]: Number(e.target.value) }));

  const r = useMemo(() => {
    const v = values;
    const startMrr = v.startMrr;
    // NRR = (start + expansion - contraction - churn) / start
    const nrr = startMrr > 0 ? ((startMrr + v.expansion - v.contraction - v.churnRev) / startMrr) * 100 : 0;
    // GRR = (start - contraction - churn) / start  (no expansion)
    const grr = startMrr > 0 ? ((startMrr - v.contraction - v.churnRev) / startMrr) * 100 : 0;
    const logoRetention = v.startCust > 0 ? ((v.startCust - v.churnedCust) / v.startCust) * 100 : 0;
    const logoChurn = 100 - logoRetention;
    const revChurnRate = startMrr > 0 ? ((v.contraction + v.churnRev) / startMrr) * 100 : 0;
    const netNewMrr = v.expansion - v.contraction - v.churnRev;

    // Cohort retention curve from monthly retention rate
    const mr = v.monthlyRetention / 100;
    const curve = [];
    for (let m = 0; m <= v.cohortMonths; m++) curve.push(Math.pow(mr, m));

    // Heatmap: rows = cohorts (months 0..N-1 start), cols = age in months
    const cohorts = Math.min(v.cohortMonths, 12);
    const heat = [];
    for (let c = 0; c < cohorts; c++) {
      const row = [];
      const maxAge = cohorts - c; // triangular
      for (let age = 0; age < cohorts; age++) {
        row.push(age <= maxAge ? Math.pow(mr, age) : null);
      }
      heat.push(row);
    }

    return {
      nrr, grr, logoRetention, logoChurn, revChurnRate, netNewMrr,
      endMrr: startMrr + netNewMrr, curve, heat, cohorts,
    };
  }, [values]);

  const fmtVal = (s) => {
    const val = values[s.key];
    if (s.fmt === 'money') return val >= 1000 ? '$' + compact.format(val) : money.format(val);
    if (s.fmt === 'pct') return `${val}%`;
    return count.format(val);
  };

  const nrrTone = r.nrr >= 110 ? 'good' : r.nrr >= 100 ? 'ok' : 'low';
  const grrTone = r.grr >= 90 ? 'good' : r.grr >= 80 ? 'ok' : 'low';

  // retention curve polyline
  const W = 320, H = 120, pad = 4;
  const pts = r.curve.map((y, i) => {
    const x = pad + (i / (r.curve.length - 1)) * (W - pad * 2);
    const yy = H - pad - y * (H - pad * 2);
    return `${x.toFixed(1)},${yy.toFixed(1)}`;
  }).join(' ');

  return (
    <div className="rten" ref={rootRef}>
      <Helmet>
        <title>Retention Calculator | NRR, GRR & Cohort Analysis for SaaS | Puetto</title>
        <meta name="description" content="Free SaaS retention calculator. Compute net revenue retention (NRR), gross revenue retention (GRR), logo retention, and model cohort retention curves and heatmaps instantly." />
        <meta name="keywords" content="retention calculator, NRR calculator, GRR calculator, net revenue retention, gross revenue retention, SaaS cohort analysis, retention curve, churn calculator" />
        <link rel="canonical" href="https://www.puetto.com/retention-calculator" />
        <meta property="og:type" content="website" />
        <meta property="og:title" content="Retention Calculator | NRR, GRR & Cohorts | Puetto" />
        <meta property="og:description" content="Compute NRR, GRR and model cohort retention curves and heatmaps in seconds." />
        <meta property="og:url" content="https://www.puetto.com/retention-calculator" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Retention Calculator | NRR, GRR & Cohorts | Puetto" />
        <meta name="twitter:description" content="Compute NRR, GRR and model cohort retention curves and heatmaps in seconds." />
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org", "@type": "WebApplication", "name": "Retention Calculator",
            "applicationCategory": "BusinessApplication", "operatingSystem": "Web",
            "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD" },
            "description": "Compute NRR, GRR, logo retention and model cohort retention curves and heatmaps.",
            "url": "https://puetto.ai/retention-calculator", "publisher": { "@type": "Organization", "name": "Puetto" }
          })}
        </script>
      </Helmet>

      <header className="rten__hero">
        <div className="rten__badge">RETENTION CALCULATOR</div>
        <h1 className="rten__title">Diagnose your <span className="rten__grad">revenue retention</span></h1>
        <p className="rten__intro">Net and gross revenue retention are the truest signals of SaaS health. Enter your revenue and customer movement to see NRR, GRR, logo retention, and a modeled cohort curve and heatmap, live.</p>
      </header>

      <div className="rten__shell">
        <div className="rten__inputs">
          {SECTIONS.map((sec) => {
            const Icon = sec.icon;
            return (
              <div className="rten__group" key={sec.title}>
                <div className="rten__grouphead"><Icon size={18} /> <span>{sec.title}</span></div>
                {sec.sliders.map((s) => (
                  <div className="rten__row" key={s.key}>
                    <div className="rten__rowhead">
                      <div className="rten__rowtext">
                        <div className="rten__rowlabel">{s.label}</div>
                        <div className="rten__rowhint">{s.hint}</div>
                      </div>
                      <div className="rten__rowval">{fmtVal(s)}</div>
                    </div>
                    <input type="range" min={s.min} max={s.max} step={s.step} value={values[s.key]}
                      onChange={handleChange(s.key)} className="rten__range"
                      style={{ '--pct': `${((values[s.key] - s.min) / (s.max - s.min)) * 100}%` }}
                      aria-label={s.label} />
                  </div>
                ))}
              </div>
            );
          })}
        </div>

        <div className="rten__summary">
          <div className="rten__headline">
            <div className={`rten__big rten__big--${nrrTone}`}>
              <div className="rten__big-val">{pct1(r.nrr)}</div>
              <div className="rten__big-label">Net revenue retention</div>
            </div>
            <div className={`rten__big rten__big--${grrTone}`}>
              <div className="rten__big-val">{pct1(r.grr)}</div>
              <div className="rten__big-label">Gross revenue retention</div>
            </div>
          </div>

          <div className="rten__grid2">
            <div className="rten__cell"><div className="rten__cell-label">Logo retention</div><div className="rten__cell-val">{pct1(r.logoRetention)}</div></div>
            <div className="rten__cell"><div className="rten__cell-label">Logo churn</div><div className="rten__cell-val">{pct1(r.logoChurn)}</div></div>
            <div className="rten__cell"><div className="rten__cell-label">Net new MRR</div><div className={`rten__cell-val${r.netNewMrr < 0 ? ' rten__neg' : ''}`}>{money.format(r.netNewMrr)}</div></div>
            <div className="rten__cell"><div className="rten__cell-label">Ending MRR</div><div className="rten__cell-val">{money.format(r.endMrr)}</div></div>
          </div>

          <div className="rten__curve">
            <div className="rten__curve-title">Modeled retention curve</div>
            <svg viewBox={`0 0 ${W} ${H}`} className="rten__curvesvg" preserveAspectRatio="none">
              <polyline points={pts} fill="none" stroke="url(#rtenGrad)" strokeWidth="3" strokeLinejoin="round" strokeLinecap="round" />
              <defs>
                <linearGradient id="rtenGrad" x1="0" y1="0" x2="1" y2="0">
                  <stop offset="0%" stopColor="#FF8A3D" /><stop offset="40%" stopColor="#FF4D6D" />
                  <stop offset="70%" stopColor="#B14DFF" /><stop offset="100%" stopColor="#3D7BFF" />
                </linearGradient>
              </defs>
            </svg>
            <div className="rten__curve-axis"><span>Month 0</span><span>Month {values.cohortMonths}</span></div>
          </div>

          <a className="rten__btn rten__btn--block" href="/contact">Book a Free Ops Audit <ArrowRight size={16} /></a>
        </div>
      </div>

      <div className="rten__heatwrap">
        <div className="rten__heat-title">Cohort retention heatmap</div>
        <div className="rten__heat-sub">Each row is a cohort; each column is months since acquisition. Colour shows the share of the cohort still retained.</div>
        <div className="rten__heat" style={{ gridTemplateColumns: `90px repeat(${r.cohorts}, 1fr)` }}>
          <div className="rten__hcell rten__hcell--corner">Cohort</div>
          {Array.from({ length: r.cohorts }).map((_, age) => (
            <div className="rten__hcell rten__hcell--head" key={`h${age}`}>M{age}</div>
          ))}
          {r.heat.map((row, c) => (
            <FragmentRow key={`r${c}`} c={c} row={row} cohorts={r.cohorts} />
          ))}
        </div>
      </div>

      <section className="rten__content">
        <h2 className="rten__h2">What NRR and GRR actually measure</h2>
        <p className="rten__p">Net revenue retention measures how recurring revenue from your existing customers changes over a period, including expansion. The formula is starting MRR plus expansion minus contraction minus churn, divided by starting MRR. Gross revenue retention strips out expansion to show how much revenue you keep before any upsell, calculated as starting MRR minus contraction minus churn, divided by starting MRR. GRR can never exceed one hundred percent; NRR can, and the best SaaS businesses run well above it because expansion outpaces losses.</p>

        <h2 className="rten__h2">Why retention beats acquisition</h2>
        <p className="rten__p">Growth driven purely by new logos is fragile. If your NRR is below one hundred percent, you are filling a leaking bucket and every new customer is partly replacing one you lost. When NRR is above one hundred percent, your existing base grows on its own even with zero new sales, which compounds dramatically over time. That is why investors weight NRR so heavily; it is the clearest read on whether the product delivers durable value and whether growth is efficient or merely expensive.</p>

        <h2 className="rten__h2">Reading the cohort curve and heatmap</h2>
        <p className="rten__p">A single retention number hides the shape of churn. The cohort curve shows how a group of customers acquired together decays month over month, and a healthy curve flattens rather than sliding to zero, indicating a stable core that sticks. The heatmap extends this across multiple cohorts so you can see whether newer cohorts retain better than older ones, which tells you whether onboarding and product changes are working. Diagonal patterns reveal period-wide events; vertical patterns reveal age-related drop-off.</p>

        <h2 className="rten__h2">What good benchmarks look like</h2>
        <p className="rten__p">Benchmarks vary by segment, but useful reference points for B2B SaaS are gross revenue retention above ninety percent and net revenue retention above one hundred and ten percent for strong product-led or expansion-friendly models. Lower-touch SMB products tend to see higher churn and lower NRR; enterprise products with seat-based or usage-based expansion tend to see the highest NRR. Compare yourself to your own trend first, then to peers in your segment.</p>

        <h2 className="rten__h2">Turning retention into an operating discipline</h2>
        <p className="rten__p">Measuring retention is the easy part; acting on it requires the operations to back it up. That means clean revenue and lifecycle data in your CRM, automated alerts when accounts contract or go quiet, and reporting that surfaces NRR and cohort health without a monthly spreadsheet rebuild. Puetto configures the tools, builds the automations, and runs the day-to-day ops that turn retention from a quarterly surprise into a managed metric, faster than a hire and more accountable than an agency.</p>

        <div className="rten__cta">
          <h2 className="rten__h2">Want to fix your retention leaks?</h2>
          <p className="rten__p">Book a free ops audit and we'll show you where revenue is leaking from your base and what it would take to lift NRR.</p>
          <a className="rten__btn" href="/contact">Book a Free Ops Audit <ArrowRight size={18} /></a>
        </div>
      </section>
    </div>
  );
}

function FragmentRow({ c, row, cohorts }) {
  return (
    <>
      <div className="rten__hcell rten__hcell--rowlabel">C{c + 1}</div>
      {row.map((val, age) => (
        <div
          className="rten__hcell"
          key={`c${c}a${age}`}
          style={{ background: val === null ? 'transparent' : heatColorInline(val) }}
          title={val === null ? '' : `${(val * 100).toFixed(0)}%`}
        >
          {val === null ? '' : `${Math.round(val * 100)}`}
        </div>
      ))}
    </>
  );
}

function heatColorInline(v) {
  const clamped = Math.max(0, Math.min(1, v));
  const stops = [[255,138,61],[255,77,109],[177,77,255],[61,123,255]];
  const pos = clamped * (stops.length - 1);
  const i = Math.floor(pos), f = pos - i;
  const a = stops[i], b = stops[Math.min(i+1, stops.length-1)];
  const ch = (k) => Math.round(a[k] + (b[k]-a[k])*f);
  const alpha = 0.16 + clamped * 0.8;
  return `rgba(${ch(0)},${ch(1)},${ch(2)},${alpha})`;
}
