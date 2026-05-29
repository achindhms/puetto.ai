import { useState, useMemo, useEffect, useRef } from 'react';
import { Helmet } from 'react-helmet-async';
import { ArrowRight, Video, Users, Coins } from 'lucide-react';
import './WebinarROICalculator.css';

const money = new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 });
const money2 = new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 });
const compact = new Intl.NumberFormat('en-US', { notation: 'compact', maximumFractionDigits: 1 });
const count = new Intl.NumberFormat('en-US', { maximumFractionDigits: 0 });

const SECTIONS = [
  {
    title: 'Attendance & conversion', icon: Video,
    sliders: [
      { key: 'perMonth', label: 'Webinars per month', hint: 'How many webinars you run each month', fmt: 'count', min: 1, max: 30, step: 1, def: 2 },
      { key: 'registrants', label: 'Registrants per webinar', hint: 'Average sign-ups per webinar', fmt: 'count', min: 10, max: 5000, step: 10, def: 250 },
      { key: 'showRate', label: 'Attendance rate', hint: 'Share of registrants who show up live', fmt: 'pct', min: 0, max: 100, step: 1, def: 40 },
    ],
  },
  {
    title: 'Pipeline & value', icon: Users,
    sliders: [
      { key: 'mqlRate', label: 'Attendee-to-lead rate', hint: 'Attendees that become qualified leads', fmt: 'pct', min: 0, max: 100, step: 1, def: 25 },
      { key: 'winRate', label: 'Lead-to-deal win rate', hint: 'Qualified leads that close as customers', fmt: 'pct', min: 0, max: 100, step: 1, def: 12 },
      { key: 'dealSize', label: 'Average deal size', hint: 'Average annual contract value per deal', fmt: 'money', min: 500, max: 200000, step: 500, def: 12000 },
    ],
  },
  {
    title: 'Costs', icon: Coins,
    sliders: [
      { key: 'platformCost', label: 'Webinar software (monthly)', hint: 'Your webinar platform subscription', fmt: 'money', min: 0, max: 5000, step: 50, def: 300 },
      { key: 'promoCost', label: 'Promotion per webinar', hint: 'Ads, email, content spend per webinar', fmt: 'money', min: 0, max: 50000, step: 250, def: 1500 },
      { key: 'teamHours', label: 'Team hours per webinar', hint: 'Total people-hours to produce each webinar', fmt: 'hours', min: 0, max: 200, step: 1, def: 20 },
      { key: 'hourlyCost', label: 'Blended hourly cost', hint: 'Average fully-loaded cost per team hour', fmt: 'money', min: 0, max: 500, step: 5, def: 60 },
    ],
  },
];

const ALL = SECTIONS.flatMap((s) => s.sliders);

function Donut({ frac, roi }) {
  const r = 78, sw = 22;
  const c = 2 * Math.PI * r;
  const len = c * Math.max(0, Math.min(1, frac));
  return (
    <div className="wroi__donutwrap">
      <svg className="wroi__donut" viewBox="0 0 190 190" role="img" aria-label="Cost versus revenue">
        <circle cx="95" cy="95" r={r} fill="none" stroke="var(--wroi-track)" strokeWidth={sw} />
        <circle cx="95" cy="95" r={r} fill="none" strokeWidth={sw} strokeLinecap="round"
          stroke="url(#wroiGrad)" strokeDasharray={`${len} ${c - len}`}
          strokeDashoffset={c * 0.25} transform="rotate(-90 95 95)" />
        <defs>
          <linearGradient id="wroiGrad" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#FF8A3D" /><stop offset="38%" stopColor="#FF4D6D" />
            <stop offset="70%" stopColor="#B14DFF" /><stop offset="100%" stopColor="#3D7BFF" />
          </linearGradient>
        </defs>
      </svg>
      <div className="wroi__donutcenter">
        <div className="wroi__donutlabel">Return on investment</div>
        <div className="wroi__donutnum">{roi === null ? '—' : `${count.format(Math.round(roi))}%`}</div>
      </div>
    </div>
  );
}

export default function WebinarROICalculator() {
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
    const webinarsYr = v.perMonth * 12;
    const attendeesPer = v.registrants * (v.showRate / 100);
    const attendeesYr = attendeesPer * webinarsYr;
    const leadsYr = attendeesYr * (v.mqlRate / 100);
    const dealsYr = leadsYr * (v.winRate / 100);
    const revenue = dealsYr * v.dealSize;

    const platformYr = v.platformCost * 12;
    const promoYr = v.promoCost * webinarsYr;
    const laborYr = v.teamHours * v.hourlyCost * webinarsYr;
    const cost = platformYr + promoYr + laborYr;

    const netProfit = revenue - cost;
    const roi = cost > 0 ? (netProfit / cost) * 100 : null;
    const costPerAttendee = attendeesYr > 0 ? cost / attendeesYr : null;
    const costPerLead = leadsYr > 0 ? cost / leadsYr : null;
    const revPerWebinar = webinarsYr > 0 ? revenue / webinarsYr : 0;
    const margin = revenue > 0 ? (netProfit / revenue) * 100 : null;
    const total = cost + Math.max(revenue, 0);

    return {
      webinarsYr, attendeesYr: Math.round(attendeesYr), leadsYr: Math.round(leadsYr),
      dealsYr: Math.round(dealsYr), revenue: Math.round(revenue), cost: Math.round(cost),
      netProfit: Math.round(netProfit), roi, margin,
      costPerAttendee: costPerAttendee === null ? null : Math.round(costPerAttendee),
      costPerLead: costPerLead === null ? null : Math.round(costPerLead),
      revPerWebinar: Math.round(revPerWebinar),
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

  const neg = (n) => (n < 0 ? ' wroi__neg' : '');

  return (
    <div className="wroi" ref={rootRef}>
      <Helmet>
        <title>Webinar ROI Calculator | Pipeline, Cost Per Lead & Payback | Puetto</title>
        <meta name="description" content="Free webinar ROI calculator. Model the revenue, pipeline, cost per lead and ROI of your webinar program from attendance, conversion and cost inputs." />
        <meta name="keywords" content="webinar ROI calculator, webinar marketing ROI, cost per webinar lead, webinar pipeline calculator, B2B webinar revenue, demand gen ROI" />
        <link rel="canonical" href="https://www.puetto.com/webinar-roi-calculator" />
        <meta property="og:type" content="website" />
        <meta property="og:title" content="Webinar ROI Calculator | Puetto" />
        <meta property="og:description" content="Model the revenue, pipeline, cost per lead and ROI of your webinar program in seconds." />
        <meta property="og:url" content="https://www.puetto.com/webinar-roi-calculator" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Webinar ROI Calculator | Puetto" />
        <meta name="twitter:description" content="Model the revenue, pipeline, cost per lead and ROI of your webinar program in seconds." />
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org", "@type": "WebApplication", "name": "Webinar ROI Calculator",
            "applicationCategory": "BusinessApplication", "operatingSystem": "Web",
            "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD" },
            "description": "Model the revenue, pipeline, cost per lead and ROI of your webinar program.",
            "url": "https://puetto.ai/webinar-roi-calculator", "publisher": { "@type": "Organization", "name": "Puetto" }
          })}
        </script>
      </Helmet>

      <header className="wroi__hero">
        <div className="wroi__badge">WEBINAR ROI CALCULATOR</div>
        <h1 className="wroi__title">What are your webinars <span className="wroi__grad">really worth</span>?</h1>
        <p className="wroi__intro">Model the full economics of your webinar program, from attendance to closed revenue. See pipeline, cost per lead, ROI and net profit update live as you adjust the inputs.</p>
      </header>

      <div className="wroi__shell">
        <div className="wroi__inputs">
          {SECTIONS.map((sec) => {
            const Icon = sec.icon;
            return (
              <div className="wroi__group" key={sec.title}>
                <div className="wroi__grouphead"><Icon size={18} /> <span>{sec.title}</span></div>
                {sec.sliders.map((s) => (
                  <div className="wroi__row" key={s.key}>
                    <div className="wroi__rowhead">
                      <div className="wroi__rowtext">
                        <div className="wroi__rowlabel">{s.label}</div>
                        <div className="wroi__rowhint">{s.hint}</div>
                      </div>
                      <div className="wroi__rowval">{fmtVal(s)}</div>
                    </div>
                    <input type="range" min={s.min} max={s.max} step={s.step} value={values[s.key]}
                      onChange={handleChange(s.key)} className="wroi__range"
                      style={{ '--pct': `${((values[s.key] - s.min) / (s.max - s.min)) * 100}%` }}
                      aria-label={s.label} />
                  </div>
                ))}
              </div>
            );
          })}
        </div>

        <div className="wroi__summary">
          <Donut frac={r.frac} roi={r.roi} />

          <div className="wroi__bigstat">
            <div className="wroi__bigstat-label">Net profit per year</div>
            <div className={`wroi__bigstat-num wroi__grad${neg(r.netProfit)}`}>{money.format(r.netProfit)}</div>
          </div>

          <div className="wroi__grid2">
            <div className="wroi__cell"><div className="wroi__cell-label">Annual revenue</div><div className="wroi__cell-val">{money.format(r.revenue)}</div></div>
            <div className="wroi__cell"><div className="wroi__cell-label">Annual cost</div><div className="wroi__cell-val">{money.format(r.cost)}</div></div>
            <div className="wroi__cell"><div className="wroi__cell-label">Cost / lead</div><div className="wroi__cell-val">{r.costPerLead === null ? '—' : money.format(r.costPerLead)}</div></div>
            <div className="wroi__cell"><div className="wroi__cell-label">Cost / attendee</div><div className="wroi__cell-val">{r.costPerAttendee === null ? '—' : money.format(r.costPerAttendee)}</div></div>
            <div className="wroi__cell"><div className="wroi__cell-label">Profit margin</div><div className={`wroi__cell-val${r.margin !== null && r.margin < 0 ? ' wroi__neg' : ''}`}>{r.margin === null ? '—' : `${count.format(Math.round(r.margin))}%`}</div></div>
            <div className="wroi__cell"><div className="wroi__cell-label">Revenue / webinar</div><div className="wroi__cell-val">{money.format(r.revPerWebinar)}</div></div>
          </div>

          <a className="wroi__btn wroi__btn--block" href="/contact">Book a Free Ops Audit <ArrowRight size={16} /></a>
        </div>
      </div>

      <div className="wroi__funnelstrip">
        <div className="wroi__fcell"><div className="wroi__fnum">{count.format(r.webinarsYr)}</div><div className="wroi__flabel">Webinars / yr</div></div>
        <div className="wroi__farrow"><ArrowRight size={16} /></div>
        <div className="wroi__fcell"><div className="wroi__fnum">{count.format(r.attendeesYr)}</div><div className="wroi__flabel">Attendees</div></div>
        <div className="wroi__farrow"><ArrowRight size={16} /></div>
        <div className="wroi__fcell"><div className="wroi__fnum">{count.format(r.leadsYr)}</div><div className="wroi__flabel">Leads</div></div>
        <div className="wroi__farrow"><ArrowRight size={16} /></div>
        <div className="wroi__fcell roi__fcell--win"><div className="wroi__fnum">{count.format(r.dealsYr)}</div><div className="wroi__flabel">Deals won</div></div>
      </div>

      <section className="wroi__content">
        <h2 className="wroi__h2">How the webinar ROI calculation works</h2>
        <p className="wroi__p">The calculator models your webinar program end to end. It multiplies your webinars per month by twelve to get annual volume, applies your attendance rate to registrants to find live attendees, then converts attendees into qualified leads and leads into closed deals. Multiplying deals by your average deal size gives annual revenue. On the cost side it sums your platform subscription, promotion spend per webinar, and the fully-loaded labour cost of the team hours each webinar takes. Revenue minus cost is net profit, and net profit divided by cost is ROI.</p>

        <h2 className="wroi__h2">Why cost per lead and cost per attendee matter</h2>
        <p className="wroi__p">Top-line ROI hides a lot. Two programs with the same ROI can have very different efficiency once you look at cost per attendee and cost per lead. These unit economics tell you whether your spend is buying reach cheaply, whether your funnel converts attention into pipeline, and where the leverage is. A program with a low cost per attendee but a high cost per lead has a conversion problem, not a reach problem, and the fix is different. Tracking both numbers over time is how you turn webinars from a content cost centre into a predictable pipeline channel.</p>

        <h2 className="wroi__h2">The webinar ROI formula</h2>
        <p className="wroi__p">The formula is the same return-on-investment logic applied to a webinar funnel. ROI = (Annual revenue − Annual cost) ÷ Annual cost × 100. Annual revenue is webinars × attendees × lead rate × win rate × deal size. Annual cost is platform cost + promotion per webinar × webinars + team hours × hourly cost × webinars. Because every variable compounds, small improvements at the top of the funnel or in conversion rates move the result far more than trimming costs.</p>

        <h2 className="wroi__h2">What strong webinar benchmarks look like</h2>
        <p className="wroi__p">Benchmarks vary widely, but useful reference points are attendance rates between thirty and fifty percent of registrants, attendee-to-lead rates in the double digits for well-targeted sessions, and win rates that reflect the higher intent of people who gave you an hour of their time. If your numbers fall short, the calculator makes it easy to see which stage is dragging the program down and how much a realistic improvement would be worth.</p>

        <h2 className="wroi__h2">Turning webinars into a repeatable pipeline engine</h2>
        <p className="wroi__p">A good ROI projection only matters if the operations behind it are reliable. That means registration and follow-up automations, clean handoff of leads into the CRM, attribution that connects webinar attendance to closed revenue, and reporting that surfaces cost per lead without a manual spreadsheet. Puetto configures the tools, builds the automations, and runs the day-to-day ops that make a webinar program perform, faster than a hire and more accountable than an agency.</p>

        <div className="wroi__cta">
          <h2 className="wroi__h2">Want help making your webinars pay?</h2>
          <p className="wroi__p">Book a free ops audit and we'll show you where your webinar funnel is leaking pipeline and what it would take to close the gap.</p>
          <a className="wroi__btn" href="/contact">Book a Free Ops Audit <ArrowRight size={18} /></a>
        </div>
      </section>
    </div>
  );
}
