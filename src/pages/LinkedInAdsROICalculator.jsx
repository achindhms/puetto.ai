import { useState, useMemo, useEffect, useRef } from 'react';
import { Helmet } from 'react-helmet-async';
import { ArrowRight, DollarSign, Filter, Clock } from 'lucide-react';
import './LinkedInAdsROICalculator.css';

const money = new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 });
const compact = new Intl.NumberFormat('en-US', { notation: 'compact', maximumFractionDigits: 1 });
const count = new Intl.NumberFormat('en-US', { maximumFractionDigits: 0 });

const SECTIONS = [
  {
    title: 'Spend & lead generation', icon: DollarSign,
    sliders: [
      { key: 'spend', label: 'Monthly LinkedIn ad spend', hint: 'Average monthly spend for one cohort', fmt: 'money', min: 1000, max: 200000, step: 1000, def: 15000 },
      { key: 'cpl', label: 'Cost per lead', hint: 'LinkedIn CPL is typically $150–$300', fmt: 'money', min: 20, max: 1000, step: 10, def: 200 },
      { key: 'acv', label: 'Average contract value', hint: 'Annual revenue per closed customer', fmt: 'money', min: 5000, max: 1000000, step: 5000, def: 50000 },
    ],
  },
  {
    title: 'Funnel conversion', icon: Filter,
    sliders: [
      { key: 'leadToSql', label: 'Lead → SQL rate', hint: 'Leads that become sales-qualified', fmt: 'pct', min: 0, max: 100, step: 1, def: 20 },
      { key: 'sqlToOpp', label: 'SQL → opportunity rate', hint: 'SQLs that become real opportunities', fmt: 'pct', min: 0, max: 100, step: 1, def: 50 },
      { key: 'oppToWin', label: 'Opportunity → win rate', hint: 'Opportunities that close as revenue', fmt: 'pct', min: 0, max: 100, step: 1, def: 25 },
    ],
  },
  {
    title: 'Cohort realization curve', icon: Clock,
    sliders: [
      { key: 'r90', label: 'Pipeline realized by 90 days', hint: 'Share of full-cohort pipeline landed at 90d', fmt: 'pct', min: 0, max: 100, step: 1, def: 20 },
      { key: 'r180', label: 'Pipeline realized by 180 days', hint: 'Share landed at 180d (the real indicator)', fmt: 'pct', min: 0, max: 100, step: 1, def: 55 },
      { key: 'r365', label: 'Pipeline realized by 365 days', hint: 'Share landed at 365d (full realization)', fmt: 'pct', min: 0, max: 100, step: 1, def: 100 },
    ],
  },
];

const ALL = SECTIONS.flatMap((s) => s.sliders);

function roasTone(v) {
  if (v >= 5) return 'good';
  if (v >= 2) return 'ok';
  return 'low';
}

export default function LinkedInAdsROICalculator() {
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
    const leads = v.spend / v.cpl;
    const sqls = leads * (v.leadToSql / 100);
    const opps = sqls * (v.sqlToOpp / 100);
    const wins = opps * (v.oppToWin / 100);
    const fullPipeline = opps * v.acv;       // pipeline value of opportunities
    const fullRevenue = wins * v.acv;        // revenue from closed-won

    const roas = (frac) => v.spend > 0 ? (fullRevenue * (frac / 100)) / v.spend : 0;
    const roas30 = roas(2);                  // illustrative: ~2% realized at 30d
    const roas90 = roas(v.r90);
    const roas180 = roas(v.r180);
    const roas365 = roas(v.r365);

    const pipelinePerDollar = v.spend > 0 ? fullPipeline / v.spend : 0;
    const costPerDollar = fullPipeline > 0 ? v.spend / fullPipeline : null;
    const costPerSql = sqls > 0 ? v.spend / sqls : null;
    const total = v.spend + Math.max(fullRevenue, 0);

    return {
      leads: Math.round(leads), sqls: Math.round(sqls), opps: Math.round(opps), wins: Math.round(wins),
      fullPipeline: Math.round(fullPipeline), fullRevenue: Math.round(fullRevenue),
      roas30, roas90, roas180, roas365, pipelinePerDollar,
      costPerDollar, costPerSql: costPerSql === null ? null : Math.round(costPerSql),
      frac: total > 0 ? Math.max(fullRevenue, 0) / total : 0, spend: v.spend,
    };
  }, [values]);

  const fmtVal = (s) => {
    const val = values[s.key];
    if (s.fmt === 'money') return val >= 1000 ? '$' + compact.format(val) : money.format(val);
    if (s.fmt === 'pct') return `${val}%`;
    return count.format(val);
  };

  const windows = [
    { label: '30 days', sub: 'Form fills only', v: r.roas30 },
    { label: '90 days', sub: 'Early SQLs', v: r.roas90 },
    { label: '180 days', sub: 'The real indicator', v: r.roas180, hl: true },
    { label: '365 days', sub: 'Full realization', v: r.roas365 },
  ];

  return (
    <div className="lroi" ref={rootRef}>
      <Helmet>
        <title>LinkedIn Ads ROI Calculator | Cohort-Based ROAS for B2B SaaS | Puetto</title>
        <meta name="description" content="Free LinkedIn Ads ROI calculator using cohort-based ROAS. See true return at 90, 180 and 365 days, cost per pipeline dollar and cost per SQL for long B2B SaaS sales cycles." />
        <meta name="keywords" content="LinkedIn Ads ROI calculator, cohort ROAS, LinkedIn ROAS B2B SaaS, cost per pipeline dollar, cost per SQL, LinkedIn ads pipeline calculator" />
        <link rel="canonical" href="https://www.puetto.com/linkedin-ads-roas-calculator" />
        <meta property="og:type" content="website" />
        <meta property="og:title" content="LinkedIn Ads ROI Calculator | Puetto" />
        <meta property="og:description" content="See your true LinkedIn Ads ROAS at 90, 180 and 365 days, not the misleading 30-day number." />
        <meta property="og:url" content="https://www.puetto.com/linkedin-ads-roas-calculator" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="LinkedIn Ads ROI Calculator | Puetto" />
        <meta name="twitter:description" content="See your true LinkedIn Ads ROAS at 90, 180 and 365 days, not the misleading 30-day number." />
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org", "@type": "WebApplication", "name": "LinkedIn Ads ROI Calculator",
            "applicationCategory": "BusinessApplication", "operatingSystem": "Web",
            "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD" },
            "description": "Cohort-based LinkedIn Ads ROAS calculator for B2B SaaS with 90/180/365-day windows.",
            "url": "https://puetto.ai/linkedin-ads-roas-calculator", "publisher": { "@type": "Organization", "name": "Puetto" }
          })}
        </script>
      </Helmet>

      <header className="lroi__hero">
        <div className="lroi__badge">LINKEDIN ADS ROI CALCULATOR</div>
        <h1 className="lroi__title">Your LinkedIn Ads ROI is <span className="lroi__grad">better than it looks</span></h1>
        <p className="lroi__intro">Standard 30-day ROAS makes every B2B SaaS LinkedIn program look unprofitable, because revenue lands months after spend. This calculator measures ROAS the right way, across 90, 180 and 365-day cohorts.</p>
      </header>

      <div className="lroi__shell">
        <div className="lroi__inputs">
          {SECTIONS.map((sec) => {
            const Icon = sec.icon;
            return (
              <div className="lroi__group" key={sec.title}>
                <div className="lroi__grouphead"><Icon size={18} /> <span>{sec.title}</span></div>
                {sec.sliders.map((s) => (
                  <div className="lroi__row" key={s.key}>
                    <div className="lroi__rowhead">
                      <div className="lroi__rowtext">
                        <div className="lroi__rowlabel">{s.label}</div>
                        <div className="lroi__rowhint">{s.hint}</div>
                      </div>
                      <div className="lroi__rowval">{fmtVal(s)}</div>
                    </div>
                    <input type="range" min={s.min} max={s.max} step={s.step} value={values[s.key]}
                      onChange={handleChange(s.key)} className="lroi__range"
                      style={{ '--pct': `${((values[s.key] - s.min) / (s.max - s.min)) * 100}%` }}
                      aria-label={s.label} />
                  </div>
                ))}
              </div>
            );
          })}
        </div>

        <div className="lroi__summary">
          <div className="lroi__cohort">
            <div className="lroi__cohort-title">Cohort-based ROAS</div>
            <div className="lroi__windows">
              {windows.map((w) => (
                <div className={`lroi__win lroi__win--${roasTone(w.v)}${w.hl ? ' lroi__win--hl' : ''}`} key={w.label}>
                  <div className="lroi__win-val">{w.v.toFixed(1)}x</div>
                  <div className="lroi__win-label">{w.label}</div>
                  <div className="lroi__win-sub">{w.sub}</div>
                </div>
              ))}
            </div>
          </div>

          <div className="lroi__grid2">
            <div className="lroi__cell"><div className="lroi__cell-label">Full-cohort revenue</div><div className="lroi__cell-val">{money.format(r.fullRevenue)}</div></div>
            <div className="lroi__cell"><div className="lroi__cell-label">Pipeline value</div><div className="lroi__cell-val">{money.format(r.fullPipeline)}</div></div>
            <div className="lroi__cell"><div className="lroi__cell-label">Pipeline / $1 spend</div><div className="lroi__cell-val">{r.pipelinePerDollar.toFixed(1)}x</div></div>
            <div className="lroi__cell"><div className="lroi__cell-label">Cost / SQL</div><div className="lroi__cell-val">{r.costPerSql === null ? '—' : money.format(r.costPerSql)}</div></div>
          </div>

          <a className="lroi__btn lroi__btn--block" href="/contact">Book a Free Ops Audit <ArrowRight size={16} /></a>
        </div>
      </div>

      <div className="lroi__funnelstrip">
        <div className="lroi__fcell"><div className="lroi__fnum">{count.format(r.leads)}</div><div className="lroi__flabel">Leads</div></div>
        <div className="lroi__farrow"><ArrowRight size={16} /></div>
        <div className="lroi__fcell"><div className="lroi__fnum">{count.format(r.sqls)}</div><div className="lroi__flabel">SQLs</div></div>
        <div className="lroi__farrow"><ArrowRight size={16} /></div>
        <div className="lroi__fcell"><div className="lroi__fnum">{count.format(r.opps)}</div><div className="lroi__flabel">Opportunities</div></div>
        <div className="lroi__farrow"><ArrowRight size={16} /></div>
        <div className="lroi__fcell lroi__fcell--win"><div className="lroi__fnum">{count.format(r.wins)}</div><div className="lroi__flabel">Closed / won</div></div>
      </div>

      <section className="lroi__content">
        <h2 className="lroi__h2">Why standard ROAS fails for LinkedIn Ads</h2>
        <p className="lroi__p">The standard ROAS formula assumes revenue appears within thirty days of spend. In B2B SaaS that almost never happens. The form fill lands in week one, the SQL in month two, the opportunity in month four, and the revenue in months six to twelve. Industry data puts the average time from first LinkedIn impression to closed revenue at roughly two hundred and eighty days. Measured on a thirty-day window, even a program that ultimately returns five to ten times its spend will look like it is losing money. The calculation is not wrong; the timeframe is.</p>

        <h2 className="lroi__h2">The cohort-based ROAS framework</h2>
        <p className="lroi__p">The fix is to group leads by the month they were generated and measure the revenue that cohort produces at ninety, one hundred and eighty, and three hundred and sixty-five days. At thirty days you see form fills only and ROAS looks terrible, which is normal. By ninety days early SQLs appear and the trend becomes visible. One hundred and eighty days is the real indicator of program health, where a healthy program shows two to five times return. By three hundred and sixty-five days a strong program reaches five to ten times. Reading any single early window in isolation is how teams talk themselves out of a channel that works.</p>

        <h2 className="lroi__h2">The formulas that matter</h2>
        <p className="lroi__p">Three metrics tell the real story. Cost per pipeline dollar is ad spend divided by pipeline value attributed to LinkedIn, with a healthy target around ten to twenty cents on the dollar. Pipeline-to-spend ratio inverts that and should reach five to ten times by one hundred and eighty days. True cost per SQL is spend divided by SQLs, and what counts as good depends on deal size, since a fifty-thousand-dollar contract can comfortably absorb a far higher cost per SQL than a small one.</p>

        <h2 className="lroi__h2">Why LinkedIn looks worse than Google, and usually isn't</h2>
        <p className="lroi__p">LinkedIn carries a higher cost per lead than Google, often double, but the leads tend to carry three to five times the contract value. When you compare the two channels on cost per pipeline dollar rather than cost per lead, LinkedIn frequently matches or beats Google. The mistake that drives underinvestment is the metric mismatch: judging a high-intent, high-value channel by a top-of-funnel cost metric instead of by the pipeline and revenue it eventually produces.</p>

        <h2 className="lroi__h2">Measuring it properly requires connected data</h2>
        <p className="lroi__p">None of this works without infrastructure. You need conversion data flowing back to LinkedIn, a CRM tracking deal stages and revenue, and a way to connect ad spend to pipeline outcomes without rebuilding a spreadsheet every month. Puetto configures the tools, builds the automations, and runs the reporting that ties LinkedIn spend to closed revenue on a cohort basis, faster than a hire and more accountable than an agency.</p>

        <div className="lroi__cta">
          <h2 className="lroi__h2">Want your true LinkedIn ROI?</h2>
          <p className="lroi__p">Book a free ops audit and we'll show you how to wire cohort-based reporting so you can prove LinkedIn ROAS to your CFO.</p>
          <a className="lroi__btn" href="/contact">Book a Free Ops Audit <ArrowRight size={18} /></a>
        </div>
      </section>
    </div>
  );
}
