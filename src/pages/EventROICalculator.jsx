import { useState, useMemo, useEffect, useRef } from 'react';
import { Helmet } from 'react-helmet-async';
import { ArrowRight, Wallet, TrendingUp, Megaphone } from 'lucide-react';
import './EventROICalculator.css';

const money = new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 });
const compact = new Intl.NumberFormat('en-US', { notation: 'compact', maximumFractionDigits: 1 });
const count = new Intl.NumberFormat('en-US', { maximumFractionDigits: 0 });

const SECTIONS = [
  {
    title: 'Event cost', icon: Wallet,
    sliders: [
      { key: 'venue', label: 'Venue, production & AV', hint: 'Space, staging, audio-visual', fmt: 'money', min: 0, max: 1000000, step: 5000, def: 150000 },
      { key: 'marketing', label: 'Marketing & promotion', hint: 'Ads, email, content to drive attendance', fmt: 'money', min: 0, max: 500000, step: 2500, def: 60000 },
      { key: 'staffTech', label: 'Staff, travel & tech', hint: 'Team time, travel, event platform', fmt: 'money', min: 0, max: 500000, step: 2500, def: 90000 },
    ],
  },
  {
    title: 'Pipeline & revenue', icon: TrendingUp,
    sliders: [
      { key: 'directRevenue', label: 'Direct revenue at event', hint: 'Deals closed at or within 30 days', fmt: 'money', min: 0, max: 2000000, step: 5000, def: 120000 },
      { key: 'leads', label: 'Qualified leads generated', hint: 'Sales-qualified leads from the event', fmt: 'count', min: 0, max: 2000, step: 10, def: 80 },
      { key: 'dealValue', label: 'Average deal value', hint: 'Average contract value per deal', fmt: 'money', min: 1000, max: 500000, step: 1000, def: 35000 },
      { key: 'closeRate', label: 'Expected close rate', hint: 'Leads that become customers', fmt: 'pct', min: 0, max: 100, step: 1, def: 20 },
    ],
  },
  {
    title: 'Brand, content & media', icon: Megaphone,
    sliders: [
      { key: 'brandLift', label: 'Brand lift value', hint: 'Estimated media-equivalent value of awareness gain', fmt: 'money', min: 0, max: 1000000, step: 5000, def: 80000 },
      { key: 'contentValue', label: 'Content value', hint: 'Assets produced × equivalent production cost', fmt: 'money', min: 0, max: 500000, step: 2500, def: 50000 },
      { key: 'earnedMedia', label: 'Earned media value', hint: 'Press & social reach at equivalent ad rates', fmt: 'money', min: 0, max: 1000000, step: 5000, def: 100000 },
    ],
  },
];

const ALL = SECTIONS.flatMap((s) => s.sliders);

function Donut({ frac, roi }) {
  const r = 78, sw = 22;
  const c = 2 * Math.PI * r;
  const len = c * Math.max(0, Math.min(1, frac));
  return (
    <div className="eroi__donutwrap">
      <svg className="eroi__donut" viewBox="0 0 190 190" role="img" aria-label="Cost versus total value">
        <circle cx="95" cy="95" r={r} fill="none" stroke="var(--eroi-track)" strokeWidth={sw} />
        <circle cx="95" cy="95" r={r} fill="none" strokeWidth={sw} strokeLinecap="round"
          stroke="url(#eroiGrad)" strokeDasharray={`${len} ${c - len}`}
          strokeDashoffset={c * 0.25} transform="rotate(-90 95 95)" />
        <defs>
          <linearGradient id="eroiGrad" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#FF8A3D" /><stop offset="38%" stopColor="#FF4D6D" />
            <stop offset="70%" stopColor="#B14DFF" /><stop offset="100%" stopColor="#3D7BFF" />
          </linearGradient>
        </defs>
      </svg>
      <div className="eroi__donutcenter">
        <div className="eroi__donutlabel">Return on investment</div>
        <div className="eroi__donutnum">{roi === null ? '—' : `${count.format(Math.round(roi))}%`}</div>
      </div>
    </div>
  );
}

export default function EventROICalculator() {
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
    const totalCost = v.venue + v.marketing + v.staffTech;
    const pipelineValue = v.leads * v.dealValue * (v.closeRate / 100);
    const totalValue = v.directRevenue + pipelineValue + v.brandLift + v.contentValue + v.earnedMedia;
    const net = totalValue - totalCost;
    const roi = totalCost > 0 ? (net / totalCost) * 100 : null;
    const costPerLead = v.leads > 0 ? totalCost / v.leads : null;
    const total = totalCost + Math.max(totalValue, 0);
    return {
      totalCost: Math.round(totalCost), pipelineValue: Math.round(pipelineValue),
      totalValue: Math.round(totalValue), net: Math.round(net), roi,
      directRevenue: v.directRevenue, brandLift: v.brandLift,
      contentValue: v.contentValue, earnedMedia: v.earnedMedia,
      costPerLead: costPerLead === null ? null : Math.round(costPerLead),
      frac: total > 0 ? Math.max(totalValue, 0) / total : 0,
    };
  }, [values]);

  const fmtVal = (s) => {
    const val = values[s.key];
    if (s.fmt === 'money') return val >= 1000 ? '$' + compact.format(val) : money.format(val);
    if (s.fmt === 'pct') return `${val}%`;
    return count.format(val);
  };

  const neg = (n) => (n < 0 ? ' eroi__neg' : '');

  return (
    <div className="eroi" ref={rootRef}>
      <Helmet>
        <title>Event Marketing ROI Calculator | Pipeline, Brand Lift & Earned Media | Puetto</title>
        <meta name="description" content="Free event marketing ROI calculator. Model total event value across direct revenue, pipeline, brand lift, content and earned media, then see ROI and cost per lead instantly." />
        <meta name="keywords" content="event marketing ROI calculator, event ROI formula, event marketing attribution, cost per lead event, trade show ROI, conference ROI, earned media value" />
        <link rel="canonical" href="https://puetto.com/event-roi-calculator" />
        <meta property="og:type" content="website" />
        <meta property="og:title" content="Event Marketing ROI Calculator | Puetto" />
        <meta property="og:description" content="Model the full ROI of an event across revenue, pipeline, brand lift, content and earned media in seconds." />
        <meta property="og:url" content="https://puetto.com/event-roi-calculator" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Event Marketing ROI Calculator | Puetto" />
        <meta name="twitter:description" content="Model the full ROI of an event across revenue, pipeline, brand lift, content and earned media in seconds." />
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org", "@type": "WebApplication", "name": "Event Marketing ROI Calculator",
            "applicationCategory": "BusinessApplication", "operatingSystem": "Web",
            "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD" },
            "description": "Model the full ROI of an event across direct revenue, pipeline, brand lift, content and earned media.",
            "url": "https://puetto.ai/event-roi-calculator", "publisher": { "@type": "Organization", "name": "Puetto" }
          })}
        </script>
      </Helmet>

      <header className="eroi__hero">
        <div className="eroi__badge">EVENT MARKETING ROI CALCULATOR</div>
        <h1 className="eroi__title">Prove what your event <span className="eroi__grad">actually delivered</span></h1>
        <p className="eroi__intro">Most ROI models only count direct revenue and undervalue the event. This one captures the full picture, pipeline, brand lift, content and earned media, so you can defend the budget with a complete, honest number.</p>
      </header>

      <div className="eroi__shell">
        <div className="eroi__inputs">
          {SECTIONS.map((sec) => {
            const Icon = sec.icon;
            return (
              <div className="eroi__group" key={sec.title}>
                <div className="eroi__grouphead"><Icon size={18} /> <span>{sec.title}</span></div>
                {sec.sliders.map((s) => (
                  <div className="eroi__row" key={s.key}>
                    <div className="eroi__rowhead">
                      <div className="eroi__rowtext">
                        <div className="eroi__rowlabel">{s.label}</div>
                        <div className="eroi__rowhint">{s.hint}</div>
                      </div>
                      <div className="eroi__rowval">{fmtVal(s)}</div>
                    </div>
                    <input type="range" min={s.min} max={s.max} step={s.step} value={values[s.key]}
                      onChange={handleChange(s.key)} className="eroi__range"
                      style={{ '--pct': `${((values[s.key] - s.min) / (s.max - s.min)) * 100}%` }}
                      aria-label={s.label} />
                  </div>
                ))}
              </div>
            );
          })}
        </div>

        <div className="eroi__summary">
          <Donut frac={r.frac} roi={r.roi} />

          <div className="eroi__bigstat">
            <div className="eroi__bigstat-label">Net value generated</div>
            <div className={`eroi__bigstat-num eroi__grad${neg(r.net)}`}>{money.format(r.net)}</div>
          </div>

          <div className="eroi__grid2">
            <div className="eroi__cell"><div className="eroi__cell-label">Total value</div><div className="eroi__cell-val">{money.format(r.totalValue)}</div></div>
            <div className="eroi__cell"><div className="eroi__cell-label">Total cost</div><div className="eroi__cell-val">{money.format(r.totalCost)}</div></div>
            <div className="eroi__cell"><div className="eroi__cell-label">Pipeline value</div><div className="eroi__cell-val">{money.format(r.pipelineValue)}</div></div>
            <div className="eroi__cell"><div className="eroi__cell-label">Cost / lead</div><div className="eroi__cell-val">{r.costPerLead === null ? '—' : money.format(r.costPerLead)}</div></div>
          </div>

          <a className="eroi__btn eroi__btn--block" href="/contact">Book a Free Ops Audit <ArrowRight size={16} /></a>
        </div>
      </div>

      <div className="eroi__breakdown">
        <div className="eroi__bdtitle">Total value breakdown</div>
        <div className="eroi__bars">
          {[
            { label: 'Direct revenue', val: r.directRevenue },
            { label: 'Pipeline value', val: r.pipelineValue },
            { label: 'Brand lift', val: r.brandLift },
            { label: 'Content value', val: r.contentValue },
            { label: 'Earned media', val: r.earnedMedia },
          ].map((b) => {
            const pct = r.totalValue > 0 ? (b.val / r.totalValue) * 100 : 0;
            return (
              <div className="eroi__bar" key={b.label}>
                <div className="eroi__barhead"><span>{b.label}</span><b>{money.format(b.val)}</b></div>
                <div className="eroi__bartrack"><div className="eroi__barfill" style={{ width: `${pct}%` }} /></div>
              </div>
            );
          })}
        </div>
      </div>

      <section className="eroi__content">
        <h2 className="eroi__h2">How event marketing ROI is calculated</h2>
        <p className="eroi__p">The formula is the standard return-on-investment ratio applied to an event: ROI = (Total value generated − Total event cost) ÷ Total event cost × 100. A result of one hundred percent means you doubled your investment. The part most teams get wrong is total value. Counting only direct revenue consistently undervalues the event, while counting everything without discipline overstates it and erodes credibility with finance. A defensible number sits in between.</p>

        <h2 className="eroi__h2">The five components of total event value</h2>
        <p className="eroi__p">A complete measure of event value spans five dimensions. Direct revenue is the deals closed during or shortly after the event. Pipeline value is qualified leads multiplied by average deal value and an expected close rate. Brand lift is the media-equivalent value of measurable awareness or consideration gains. Content value is the production-cost equivalent of assets created at the event and reused across channels. Earned media value is press and social reach priced at equivalent advertising rates. Research suggests a large share of event value comes from these longer-term, downstream effects rather than immediate sales, which is exactly why omitting them understates performance.</p>

        <h2 className="eroi__h2">Why cost per lead and attribution matter</h2>
        <p className="eroi__p">Top-line ROI hides efficiency. Cost per qualified lead tells you whether your spend is buying pipeline cheaply, and tracking it against other channels is how events earn their place in the mix. None of it holds up without attribution, the process of connecting event activity to specific outcomes. For most B2B programs a position-based multi-touch model, which credits the event for creating the opportunity while still tracking follow-up, is the most practical and defensible approach. Set it up in your CRM with event-specific campaign tags before the event opens, not after.</p>

        <h2 className="eroi__h2">ROI profiles differ by event type</h2>
        <p className="eroi__p">Different formats generate return through different mechanisms and on different timelines. Trade shows tend to deliver lead volume and partnerships over a sixty-to-one-hundred-eighty-day window. Conferences drive thought leadership and pipeline acceleration on existing deals within thirty to ninety days. Product launches generate earned media and immediate conversion in the first thirty days. Customer events build retention and referral equity that shows up over much longer horizons. Knowing your format's typical profile keeps expectations realistic and your measurement framework honest.</p>

        <h2 className="eroi__h2">Make measurement a system, not a scramble</h2>
        <p className="eroi__p">The brands that keep winning event budget are not the ones running the most spectacular events; they are the ones who can prove what their events delivered. That means defining value components before the brief, wiring attribution before the first registration, and using tooling that captures the data automatically so the numbers are waiting when the lights go down. Puetto configures the tools, builds the automations, and runs the day-to-day ops that turn events into a measurable growth channel, faster than a hire and more accountable than an agency.</p>

        <div className="eroi__cta">
          <h2 className="eroi__h2">Want help proving your event ROI?</h2>
          <p className="eroi__p">Book a free ops audit and we'll show you how to wire attribution and reporting so every event proves its value automatically.</p>
          <a className="eroi__btn" href="/contact">Book a Free Ops Audit <ArrowRight size={18} /></a>
        </div>
      </section>
    </div>
  );
}
