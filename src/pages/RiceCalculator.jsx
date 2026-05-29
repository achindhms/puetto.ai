import { useState, useMemo, useEffect, useRef } from 'react';
import { Helmet } from 'react-helmet-async';
import { ArrowRight, Plus, Trash2, Download, Table2, LayoutGrid } from 'lucide-react';
import './RiceCalculator.css';

const count = new Intl.NumberFormat('en-US', { maximumFractionDigits: 0 });

const IMPACT = [
  { label: 'Minimal (0.25x)', value: 0.25 },
  { label: 'Low (0.5x)', value: 0.5 },
  { label: 'Medium (1x)', value: 1 },
  { label: 'High (2x)', value: 2 },
  { label: 'Massive (3x)', value: 3 },
];
const STATUSES = ['Idea', 'Evaluating', 'Planned', 'In progress', 'Shipped'];

let idSeq = 100;
const newId = () => `r${++idSeq}`;

const seed = () => ([
  { id: newId(), name: 'Dark Mode Support', desc: 'Add dark mode toggle to all screens', reach: 75000, impact: 2, confidence: 90, effort: 3, status: 'Evaluating' },
  { id: newId(), name: 'Onboarding Wizard', desc: 'Guided setup for new users', reach: 5000, impact: 3, confidence: 80, effort: 5, status: 'Planned' },
  { id: newId(), name: 'API Rate Limiting', desc: 'Implement rate limiting to prevent abuse', reach: 100000, impact: 1, confidence: 100, effort: 2, status: 'Evaluating' },
  { id: newId(), name: 'Mobile Push Notifications', desc: 'Send timely notifications to mobile users', reach: 30000, impact: 2, confidence: 70, effort: 4, status: 'Idea' },
  { id: newId(), name: 'CSV Export Feature', desc: 'Allow users to export data as CSV', reach: 8000, impact: 1, confidence: 95, effort: 1, status: 'Planned' },
]);

const rice = (it) => {
  const eff = Number(it.effort) || 0;
  if (eff <= 0) return 0;
  return Math.round((Number(it.reach) * Number(it.impact) * (Number(it.confidence) / 100)) / eff);
};

export default function RiceCalculator() {
  const rootRef = useRef(null);
  const [items, setItems] = useState(seed);
  const [view, setView] = useState('table');

  useEffect(() => {
    const nav = document.querySelector('header, nav, .navbar, [class*="navbar"], [class*="Navbar"]');
    if (nav && rootRef.current) {
      const h = nav.getBoundingClientRect().height;
      if (h > 0 && h < 200) rootRef.current.style.paddingTop = `${h + 56}px`;
    }
  }, []);

  const update = (id, field, val) => setItems((p) => p.map((it) => it.id === id ? { ...it, [field]: val } : it));
  const remove = (id) => setItems((p) => p.filter((it) => it.id !== id));
  const add = () => setItems((p) => [...p, { id: newId(), name: 'New initiative', desc: '', reach: 1000, impact: 1, confidence: 80, effort: 2, status: 'Idea' }]);

  const scored = useMemo(() => items.map((it) => ({ ...it, score: rice(it) })).sort((a, b) => b.score - a.score), [items]);

  const stats = useMemo(() => {
    if (scored.length === 0) return { avg: 0, high: 0, highPct: 0, quickWins: 0, top: null };
    const scores = scored.map((s) => s.score);
    const avg = Math.round(scores.reduce((a, b) => a + b, 0) / scores.length);
    const maxScore = Math.max(...scores, 1);
    const high = scored.filter((s) => s.score >= maxScore * 0.5).length;
    const quickWins = scored.filter((s) => s.impact >= 2 && Number(s.effort) <= 2).length;
    return { avg, high, highPct: Math.round((high / scored.length) * 100), quickWins, top: scored[0] };
  }, [scored]);

  const exportCsv = () => {
    const head = ['Initiative', 'Description', 'Reach', 'Impact', 'Confidence (%)', 'Effort (weeks)', 'RICE Score', 'Status'];
    const rows = scored.map((s) => [s.name, s.desc, s.reach, s.impact, s.confidence, s.effort, s.score, s.status]);
    const csv = [head, ...rows].map((r) => r.map((c) => `"${String(c).replace(/"/g, '""')}"`).join(',')).join('\n');
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url; a.download = 'rice-prioritization.csv'; a.click();
    URL.revokeObjectURL(url);
  };

  // matrix: x = effort (low->high), y = impact-weighted value. We'll place by effort vs score.
  const maxScore = Math.max(...scored.map((s) => s.score), 1);
  const maxEffort = Math.max(...scored.map((s) => Number(s.effort)), 1);

  return (
    <div className="rice" ref={rootRef}>
      <Helmet>
        <title>RICE Prioritization Calculator | Score & Rank Your Roadmap | Puetto</title>
        <meta name="description" content="Free RICE prioritization calculator. Score initiatives by Reach, Impact, Confidence and Effort, rank your roadmap, spot quick wins, and export to CSV." />
        <meta name="keywords" content="RICE calculator, RICE prioritization, RICE scoring, product roadmap prioritization, reach impact confidence effort, feature prioritization tool" />
        <link rel="canonical" href="https://www.puetto.com/rice-calculator" />
        <meta property="og:type" content="website" />
        <meta property="og:title" content="RICE Prioritization Calculator | Puetto" />
        <meta property="og:description" content="Score and rank your roadmap by Reach, Impact, Confidence and Effort in seconds." />
        <meta property="og:url" content="https://www.puetto.com/rice-calculator" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="RICE Prioritization Calculator | Puetto" />
        <meta name="twitter:description" content="Score and rank your roadmap by Reach, Impact, Confidence and Effort in seconds." />
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org", "@type": "WebApplication", "name": "RICE Prioritization Calculator",
            "applicationCategory": "BusinessApplication", "operatingSystem": "Web",
            "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD" },
            "description": "Score initiatives by Reach, Impact, Confidence and Effort and rank your roadmap.",
            "url": "https://puetto.ai/rice-calculator", "publisher": { "@type": "Organization", "name": "Puetto" }
          })}
        </script>
      </Helmet>

      <header className="rice__hero">
        <div className="rice__badge">RICE PRIORITIZATION</div>
        <h1 className="rice__title">Score your roadmap by <span className="rice__grad">what actually matters</span></h1>
        <p className="rice__intro">Balance Reach, Impact, Confidence and Effort to make data-driven roadmap decisions. Add your initiatives, set the inputs, and the RICE score ranks them live.</p>
      </header>

      <div className="rice__cards">
        <div className="rice__card"><div className="rice__card-label">Average RICE</div><div className="rice__card-num">{count.format(stats.avg)}</div><div className="rice__card-sub">Across {scored.length} initiatives</div></div>
        <div className="rice__card"><div className="rice__card-label">High priority</div><div className="rice__card-num">{stats.high}</div><div className="rice__card-sub">{stats.highPct}% of total</div></div>
        <div className="rice__card"><div className="rice__card-label">Quick wins</div><div className="rice__card-num">{stats.quickWins}</div><div className="rice__card-sub">High impact, low effort</div></div>
        <div className="rice__card"><div className="rice__card-label">Top item</div><div className="rice__card-num rice__card-num--sm">{stats.top ? stats.top.name : '—'}</div><div className="rice__card-sub">{stats.top ? `Score ${count.format(stats.top.score)}` : ''}</div></div>
      </div>

      <div className="rice__toolbar">
        <div className="rice__tabs">
          <button className={`rice__tab${view === 'table' ? ' rice__tab--on' : ''}`} onClick={() => setView('table')}><Table2 size={16} /> Table view <span className="rice__tabcount">{scored.length}</span></button>
          <button className={`rice__tab${view === 'matrix' ? ' rice__tab--on' : ''}`} onClick={() => setView('matrix')}><LayoutGrid size={16} /> Priority matrix</button>
        </div>
        <button className="rice__ghostbtn" onClick={exportCsv}><Download size={16} /> Export CSV</button>
      </div>

      {view === 'table' ? (
        <div className="rice__tablewrap">
          <table className="rice__table">
            <thead>
              <tr>
                <th>Initiative</th><th>Reach</th><th>Impact</th><th>Confidence</th><th>Effort (wks)</th><th>RICE</th><th>Status</th><th></th>
              </tr>
            </thead>
            <tbody>
              {scored.map((it) => (
                <tr key={it.id}>
                  <td className="rice__namecell">
                    <input className="rice__textinput rice__textinput--name" value={it.name} onChange={(e) => update(it.id, 'name', e.target.value)} />
                    <input className="rice__textinput rice__textinput--desc" value={it.desc} placeholder="Short description" onChange={(e) => update(it.id, 'desc', e.target.value)} />
                  </td>
                  <td><input type="number" min="0" className="rice__numinput" value={it.reach} onChange={(e) => update(it.id, 'reach', Number(e.target.value))} /></td>
                  <td>
                    <select className="rice__select" value={it.impact} onChange={(e) => update(it.id, 'impact', Number(e.target.value))}>
                      {IMPACT.map((o) => <option key={o.value} value={o.value}>{o.label}</option>)}
                    </select>
                  </td>
                  <td><div className="rice__pctcell"><input type="number" min="0" max="100" className="rice__numinput rice__numinput--sm" value={it.confidence} onChange={(e) => update(it.id, 'confidence', Number(e.target.value))} /><span>%</span></div></td>
                  <td><input type="number" min="0" className="rice__numinput rice__numinput--sm" value={it.effort} onChange={(e) => update(it.id, 'effort', Number(e.target.value))} /></td>
                  <td><span className="rice__score">{count.format(it.score)}</span></td>
                  <td>
                    <select className="rice__select rice__select--status" value={it.status} onChange={(e) => update(it.id, 'status', e.target.value)}>
                      {STATUSES.map((s) => <option key={s} value={s}>{s}</option>)}
                    </select>
                  </td>
                  <td><button className="rice__del" onClick={() => remove(it.id)} aria-label="Delete"><Trash2 size={16} /></button></td>
                </tr>
              ))}
            </tbody>
          </table>
          <button className="rice__addrow" onClick={add}><Plus size={16} /> Add new initiative</button>
        </div>
      ) : (
        <div className="rice__matrix">
          <div className="rice__matrix-yaxis">RICE score →</div>
          <div className="rice__matrix-plot">
            <div className="rice__quad rice__quad--tl">Big bets</div>
            <div className="rice__quad rice__quad--tr">Quick wins</div>
            <div className="rice__quad rice__quad--bl">Deprioritize</div>
            <div className="rice__quad rice__quad--br">Fill-ins</div>
            {scored.map((it) => {
              const x = (Number(it.effort) / maxEffort) * 100;
              const y = (it.score / maxScore) * 100;
              return (
                <div key={it.id} className="rice__dot" style={{ left: `${Math.min(x, 96)}%`, bottom: `${Math.min(y, 94)}%` }} title={`${it.name} — ${count.format(it.score)}`}>
                  <span className="rice__dotlabel">{it.name}</span>
                </div>
              );
            })}
          </div>
          <div className="rice__matrix-xaxis">Effort →</div>
        </div>
      )}

      <section className="rice__content">
        <h2 className="rice__h2">What the RICE score means</h2>
        <p className="rice__p">RICE is a prioritization framework that scores each initiative on four factors. Reach is how many people or accounts the work affects in a given period. Impact is how much it moves the needle for each of them, scored on a simple multiplier scale. Confidence is how sure you are of your reach and impact estimates, expressed as a percentage. Effort is the cost in person-weeks. The score is reach times impact times confidence, divided by effort, so it rewards high-value work that is cheap to ship and discounts guesses you are not sure about.</p>

        <h2 className="rice__h2">Why divide by effort</h2>
        <p className="rice__p">The genius of RICE is the denominator. Two initiatives can promise the same upside, but if one takes a week and the other takes a quarter, they are not equal investments. Dividing by effort turns the score into a measure of return per unit of work, which is exactly the lens a resource-constrained team needs. It naturally surfaces quick wins, high reach and impact at low effort, and pushes expensive long shots down the list unless their upside truly justifies the cost.</p>

        <h2 className="rice__h2">Reading the priority matrix</h2>
        <p className="rice__p">The matrix plots each initiative by effort on the horizontal axis and RICE score on the vertical. The top-left quadrant holds big bets, high value but expensive, worth doing deliberately. The top-right holds quick wins, high value and cheap, which should usually go first. The bottom-right holds fill-ins, cheap but low value, useful between bigger pieces of work. The bottom-left holds the work to deprioritize. Seeing your roadmap laid out this way makes trade-offs obvious in a way a ranked list alone does not.</p>

        <h2 className="rice__h2">Keeping the inputs honest</h2>
        <p className="rice__p">RICE is only as good as its estimates, and the confidence factor exists precisely because estimates are uncertain. Resist the temptation to inflate reach or impact to justify a pet project; the framework works because it forces those assumptions into the open where the team can challenge them. Revisit scores as you learn more, and treat the ranking as a structured starting point for discussion rather than an automated decision.</p>

        <h2 className="rice__h2">From prioritization to execution</h2>
        <p className="rice__p">A ranked roadmap only creates value if the work actually moves through delivery. That means the scoring lives somewhere the whole team can see it, status stays current, and the inputs are connected to the data that proves whether your reach and impact bets were right. Puetto configures the tools, builds the automations, and runs the day-to-day ops that keep prioritization connected to execution, faster than a hire and more accountable than an agency.</p>

        <div className="rice__cta">
          <h2 className="rice__h2">Want a roadmap you can defend?</h2>
          <p className="rice__p">Book a free ops audit and we'll show you how to wire prioritization, delivery and reporting into one system.</p>
          <a className="rice__btn" href="/contact">Book a Free Ops Audit <ArrowRight size={18} /></a>
        </div>
      </section>
    </div>
  );
}
