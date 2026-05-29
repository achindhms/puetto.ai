import { useState, useMemo, useEffect, useRef } from 'react';
import { Helmet } from 'react-helmet-async';
import { ArrowRight, Users, Megaphone, Filter } from 'lucide-react';
import './ThoughtLeadershipROICalculator.css';

const money = new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 });
const compact = new Intl.NumberFormat('en-US', { notation: 'compact', maximumFractionDigits: 1 });
const count = new Intl.NumberFormat('en-US', { maximumFractionDigits: 0 });

const SECTIONS = [
  {
    title: 'Program & investment', icon: Users,
    sliders: [
      { key: 'dealValue', label: 'Customer value / year', hint: 'Average annual revenue per customer', fmt: 'money', min: 1000, max: 500000, step: 1000, def: 20000 },
      { key: 'profiles', label: 'Number of profiles', hint: 'People posting under the program', fmt: 'count', min: 1, max: 50, step: 1, def: 5 },
      { key: 'hoursPerProfile', label: 'Hours per profile / week', hint: 'Time each person spends on LinkedIn weekly', fmt: 'hours', min: 1, max: 40, step: 1, def: 3 },
      { key: 'weeks', label: 'Duration (weeks)', hint: 'How long the program runs', fmt: 'count', min: 4, max: 104, step: 1, def: 26 },
      { key: 'hourlyCost', label: 'Avg cost per person / hour', hint: 'Fully-loaded hourly cost per profile', fmt: 'money', min: 10, max: 500, step: 5, def: 75 },
    ],
  },
  {
    title: 'Content & reach', icon: Megaphone,
    sliders: [
      { key: 'postsPerWeek', label: 'Posting frequency / week', hint: 'Posts per profile per week', fmt: 'count', min: 1, max: 14, step: 1, def: 3 },
      { key: 'weeklyViews', label: 'Avg weekly views per profile', hint: 'Current average views per profile per week', fmt: 'count', min: 100, max: 100000, step: 100, def: 2000 },
      { key: 'uplift', label: 'Expected uplift after optimisation', hint: 'Increase in views you expect from the program', fmt: 'pct', min: 0, max: 300, step: 5, def: 50 },
    ],
  },
  {
    title: 'Funnel conversion', icon: Filter,
    sliders: [
      { key: 'viewToReq', label: 'View → connection request rate', hint: 'Requests generated per view', fmt: 'pct', min: 0, max: 20, step: 0.1, def: 1 },
      { key: 'acceptRate', label: 'Connection acceptance rate', hint: 'Requests that get accepted', fmt: 'pct', min: 0, max: 100, step: 1, def: 35 },
      { key: 'connToConv', label: 'Connection → conversation rate', hint: 'Connections that start a conversation', fmt: 'pct', min: 0, max: 100, step: 1, def: 20 },
      { key: 'convToMeeting', label: 'Conversation → meeting rate', hint: 'Conversations that become meetings', fmt: 'pct', min: 0, max: 100, step: 1, def: 25 },
      { key: 'meetingToSql', label: 'Meeting → SQL rate', hint: 'Meetings that become sales-qualified', fmt: 'pct', min: 0, max: 100, step: 1, def: 50 },
      { key: 'sqlToCustomer', label: 'SQL → customer rate', hint: 'SQLs that close as customers', fmt: 'pct', min: 0, max: 100, step: 1, def: 25 },
    ],
  },
];

const ALL = SECTIONS.flatMap((s) => s.sliders);

function Donut({ frac, roi }) {
  const r = 78, sw = 22;
  const c = 2 * Math.PI * r;
  const len = c * Math.max(0, Math.min(1, frac));
  return (
    <div className="tlroi__donutwrap">
      <svg className="tlroi__donut" viewBox="0 0 190 190" role="img" aria-label="Investment versus revenue">
        <circle cx="95" cy="95" r={r} fill="none" stroke="var(--tlroi-track)" strokeWidth={sw} />
        <circle cx="95" cy="95" r={r} fill="none" strokeWidth={sw} strokeLinecap="round"
          stroke="url(#tlroiGrad)" strokeDasharray={`${len} ${c - len}`}
          strokeDashoffset={c * 0.25} transform="rotate(-90 95 95)" />
        <defs>
          <linearGradient id="tlroiGrad" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#FF8A3D" /><stop offset="38%" stopColor="#FF4D6D" />
            <stop offset="70%" stopColor="#B14DFF" /><stop offset="100%" stopColor="#3D7BFF" />
          </linearGradient>
        </defs>
      </svg>
      <div className="tlroi__donutcenter">
        <div className="tlroi__donutlabel">Return on investment</div>
        <div className="tlroi__donutnum">{roi === null ? '—' : `${count.format(Math.round(roi))}%`}</div>
      </div>
    </div>
  );
}

export default function ThoughtLeadershipROICalculator() {
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
    const totalHours = v.profiles * v.hoursPerProfile * v.weeks;
    const investment = totalHours * v.hourlyCost;
    const totalPosts = v.profiles * v.postsPerWeek * v.weeks;

    // optimised weekly views per profile, summed over all profiles and weeks
    const optimisedWeeklyViews = v.weeklyViews * (1 + v.uplift / 100);
    const totalViews = optimisedWeeklyViews * v.profiles * v.weeks;

    const requests = totalViews * (v.viewToReq / 100);
    const accepted = requests * (v.acceptRate / 100);
    const conversations = accepted * (v.connToConv / 100);
    const meetings = conversations * (v.convToMeeting / 100);
    const sqls = meetings * (v.meetingToSql / 100);
    const customers = sqls * (v.sqlToCustomer / 100);
    const revenue = customers * v.dealValue;

    const net = revenue - investment;
    const roi = investment > 0 ? (net / investment) * 100 : null;
    const total = investment + Math.max(revenue, 0);

    return {
      totalHours: Math.round(totalHours), investment: Math.round(investment), totalPosts: Math.round(totalPosts),
      totalViews: Math.round(totalViews), requests: Math.round(requests), accepted: Math.round(accepted),
      conversations: Math.round(conversations), meetings: Math.round(meetings), sqls: Math.round(sqls),
      customers: Math.round(customers), revenue: Math.round(revenue), net: Math.round(net), roi,
      frac: total > 0 ? Math.max(revenue, 0) / total : 0,
    };
  }, [values]);

  const fmtVal = (s) => {
    const val = values[s.key];
    if (s.fmt === 'money') return val >= 1000 ? '$' + compact.format(val) : money.format(val);
    if (s.fmt === 'pct') return `${val}%`;
    if (s.fmt === 'hours') return `${val} h`;
    return count.format(val);
  };

  const neg = (n) => (n < 0 ? ' tlroi__neg' : '');

  const funnel = [
    { label: 'Total views', val: r.totalViews },
    { label: 'Connection requests', val: r.requests },
    { label: 'Connections accepted', val: r.accepted },
    { label: 'Conversations', val: r.conversations },
    { label: 'Meetings', val: r.meetings },
    { label: 'SQLs', val: r.sqls },
    { label: 'Customers', val: r.customers },
  ];
  const funnelMax = Math.max(...funnel.map((f) => f.val), 1);

  return (
    <div className="tlroi" ref={rootRef}>
      <Helmet>
        <title>Thought Leadership ROI Calculator | LinkedIn Personal Branding Revenue | Puetto</title>
        <meta name="description" content="Free thought leadership ROI calculator. Model the reach, connections, meetings, pipeline and revenue of a LinkedIn personal branding program from your inputs and funnel rates." />
        <meta name="keywords" content="thought leadership ROI calculator, LinkedIn ROI calculator, personal branding ROI, social selling calculator, LinkedIn lead generation, B2B influencer marketing ROI" />
        <link rel="canonical" href="https://www.puetto.com/thought-leadership-roi-calculator" />
        <meta property="og:type" content="website" />
        <meta property="og:title" content="Thought Leadership ROI Calculator | Puetto" />
        <meta property="og:description" content="Model the reach, pipeline and revenue of a LinkedIn thought leadership program in seconds." />
        <meta property="og:url" content="https://www.puetto.com/thought-leadership-roi-calculator" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Thought Leadership ROI Calculator | Puetto" />
        <meta name="twitter:description" content="Model the reach, pipeline and revenue of a LinkedIn thought leadership program in seconds." />
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org", "@type": "WebApplication", "name": "Thought Leadership ROI Calculator",
            "applicationCategory": "BusinessApplication", "operatingSystem": "Web",
            "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD" },
            "description": "Model the reach, pipeline and revenue of a LinkedIn thought leadership program.",
            "url": "https://puetto.ai/thought-leadership-roi-calculator", "publisher": { "@type": "Organization", "name": "Puetto" }
          })}
        </script>
      </Helmet>

      <header className="tlroi__hero">
        <div className="tlroi__badge">THOUGHT LEADERSHIP ROI CALCULATOR</div>
        <h1 className="tlroi__title">What is your LinkedIn presence <span className="tlroi__grad">actually worth</span>?</h1>
        <p className="tlroi__intro">Model the full economics of a thought leadership program, from profile views down to closed revenue. See reach, connections, meetings, pipeline and ROI update live as you adjust the inputs.</p>
      </header>

      <div className="tlroi__shell">
        <div className="tlroi__inputs">
          {SECTIONS.map((sec) => {
            const Icon = sec.icon;
            return (
              <div className="tlroi__group" key={sec.title}>
                <div className="tlroi__grouphead"><Icon size={18} /> <span>{sec.title}</span></div>
                {sec.sliders.map((s) => (
                  <div className="tlroi__row" key={s.key}>
                    <div className="tlroi__rowhead">
                      <div className="tlroi__rowtext">
                        <div className="tlroi__rowlabel">{s.label}</div>
                        <div className="tlroi__rowhint">{s.hint}</div>
                      </div>
                      <div className="tlroi__rowval">{fmtVal(s)}</div>
                    </div>
                    <input type="range" min={s.min} max={s.max} step={s.step} value={values[s.key]}
                      onChange={handleChange(s.key)} className="tlroi__range"
                      style={{ '--pct': `${((values[s.key] - s.min) / (s.max - s.min)) * 100}%` }}
                      aria-label={s.label} />
                  </div>
                ))}
              </div>
            );
          })}
        </div>

        <div className="tlroi__summary">
          <Donut frac={r.frac} roi={r.roi} />

          <div className="tlroi__bigstat">
            <div className="tlroi__bigstat-label">Projected annual revenue</div>
            <div className={`tlroi__bigstat-num tlroi__grad${neg(r.revenue)}`}>{money.format(r.revenue)}</div>
          </div>

          <div className="tlroi__grid2">
            <div className="tlroi__cell"><div className="tlroi__cell-label">Total investment</div><div className="tlroi__cell-val">{money.format(r.investment)}</div></div>
            <div className="tlroi__cell"><div className="tlroi__cell-label">Net return</div><div className={`tlroi__cell-val${neg(r.net)}`}>{money.format(r.net)}</div></div>
            <div className="tlroi__cell"><div className="tlroi__cell-label">Total hours</div><div className="tlroi__cell-val">{count.format(r.totalHours)}</div></div>
            <div className="tlroi__cell"><div className="tlroi__cell-label">Total posts</div><div className="tlroi__cell-val">{count.format(r.totalPosts)}</div></div>
            <div className="tlroi__cell"><div className="tlroi__cell-label">Meetings booked</div><div className="tlroi__cell-val">{count.format(r.meetings)}</div></div>
            <div className="tlroi__cell"><div className="tlroi__cell-label">Customers</div><div className="tlroi__cell-val">{count.format(r.customers)}</div></div>
          </div>

          <a className="tlroi__btn tlroi__btn--block" href="/contact">Book a Free Ops Audit <ArrowRight size={16} /></a>
        </div>
      </div>

      <div className="tlroi__breakdown">
        <div className="tlroi__bdtitle">The thought leadership funnel</div>
        <div className="tlroi__bars">
          {funnel.map((f) => {
            const pct = (f.val / funnelMax) * 100;
            return (
              <div className="tlroi__bar" key={f.label}>
                <div className="tlroi__barhead"><span>{f.label}</span><b>{count.format(f.val)}</b></div>
                <div className="tlroi__bartrack"><div className="tlroi__barfill" style={{ width: `${Math.max(pct, 1)}%` }} /></div>
              </div>
            );
          })}
        </div>
      </div>

      <section className="tlroi__content">
        <h2 className="tlroi__h2">How the thought leadership ROI calculation works</h2>
        <p className="tlroi__p">The calculator models a LinkedIn-driven program from the ground up. It first derives your totals: profiles times hours times weeks gives total hours, multiplied by hourly cost to get total investment, while profiles times posting frequency times weeks gives total posts. It then applies your expected uplift to current weekly views to estimate optimised reach across every profile and week. From that reach it walks the funnel: views become connection requests, requests are accepted, connections turn into conversations, conversations into meetings, meetings into sales-qualified leads, and SQLs into customers. Customers times average customer value gives annual revenue, and revenue against investment gives ROI.</p>

        <h2 className="tlroi__h2">Why thought leadership compounds</h2>
        <p className="tlroi__p">Paid channels stop the moment the budget does. A thought leadership program behaves differently. Each post adds to a library that keeps surfacing, each accepted connection widens the network that sees future content, and each conversation builds relationships that shorten future sales cycles. That compounding is why personal branding programs often show modest returns early and steep returns later, and why the duration and consistency inputs matter as much as the conversion rates. Small, sustained improvements in reach or acceptance ripple all the way down to revenue.</p>

        <h2 className="tlroi__h2">The metrics that actually move ROI</h2>
        <p className="tlroi__p">Not every stage of the funnel is equally worth optimising. Because the model multiplies rates in sequence, the earliest stages with the largest absolute volumes, reach and connection acceptance, usually offer the most leverage. But the highest-intent stages, meeting-to-SQL and SQL-to-customer, determine whether all that reach converts to money. Use the calculator to test where a realistic improvement is worth the most, then focus the program's effort there rather than spreading it evenly.</p>

        <h2 className="tlroi__h2">Setting realistic assumptions</h2>
        <p className="tlroi__p">Garbage in, garbage out applies here more than anywhere. Use your own historical data for view counts, acceptance rates and conversion rates wherever you have them. If you are starting fresh, model conservative numbers first, a low view-to-request rate and a modest uplift, and treat the output as a floor rather than a forecast. The value of the tool is not a single headline number; it is the ability to see how sensitive revenue is to each assumption before you commit budget and people to the program.</p>

        <h2 className="tlroi__h2">Turning thought leadership into a system</h2>
        <p className="tlroi__p">A strong projection only matters if the program runs reliably. That means a content cadence that does not depend on motivation, connection and conversation workflows that do not get dropped, and CRM tracking that ties LinkedIn activity to booked meetings and closed revenue. Puetto configures the tools, builds the automations, and runs the day-to-day ops that make a thought leadership motion perform, faster than a hire and more accountable than an agency.</p>

        <div className="tlroi__cta">
          <h2 className="tlroi__h2">Want help making thought leadership pay?</h2>
          <p className="tlroi__p">Book a free ops audit and we'll show you where your LinkedIn funnel is leaking pipeline and what it would take to close the gap.</p>
          <a className="tlroi__btn" href="/contact">Book a Free Ops Audit <ArrowRight size={18} /></a>
        </div>
      </section>
    </div>
  );
}
