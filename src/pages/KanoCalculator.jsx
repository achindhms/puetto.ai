import { useState, useMemo, useEffect, useRef } from 'react';
import { Helmet } from 'react-helmet-async';
import { ArrowRight, Plus, Trash2, Download, Lightbulb, AlertTriangle, Zap } from 'lucide-react';
import './KanoCalculator.css';

// Kano survey answers (functional & dysfunctional both use this scale)
const ANSWERS = [
  { v: 'like', label: 'I like it' },
  { v: 'expect', label: 'I expect it' },
  { v: 'neutral', label: 'I am neutral' },
  { v: 'tolerate', label: 'I can tolerate it' },
  { v: 'dislike', label: 'I dislike it' },
];

// Standard Kano evaluation table. Rows = functional answer, Cols = dysfunctional answer.
// Categories: A=Attractive, P=Performance, M=Must-Be, I=Indifferent, R=Reverse, Q=Questionable
const TABLE = {
  like:     { like: 'Q', expect: 'A', neutral: 'A', tolerate: 'A', dislike: 'P' },
  expect:   { like: 'R', expect: 'I', neutral: 'I', tolerate: 'I', dislike: 'M' },
  neutral:  { like: 'R', expect: 'I', neutral: 'I', tolerate: 'I', dislike: 'M' },
  tolerate: { like: 'R', expect: 'I', neutral: 'I', tolerate: 'I', dislike: 'M' },
  dislike:  { like: 'R', expect: 'R', neutral: 'R', tolerate: 'R', dislike: 'Q' },
};

const CAT = {
  A: { key: 'Attractive', short: 'Attractive', expectedSat: 0.7 },
  P: { key: 'Performance', short: 'Performance', expectedSat: 0.5 },
  M: { key: 'Must-Be', short: 'Must-Be', expectedSat: 0.35 },
  I: { key: 'Indifferent', short: 'Indifferent', expectedSat: 0.1 },
  R: { key: 'Reverse', short: 'Reverse', expectedSat: 0 },
  Q: { key: 'Questionable', short: 'Questionable', expectedSat: 0.3 },
};
const CAT_ORDER = ['Must-Be', 'Performance', 'Attractive', 'Indifferent', 'Reverse'];

let idSeq = 100;
const newId = () => `k${++idSeq}`;

const categorize = (fn, dys) => CAT[TABLE[fn][dys]].key;

const seed = () => ([
  { id: newId(), name: 'Dark Mode', desc: 'Toggle between light and dark themes', fn: 'like', dys: 'neutral', impl: 30, sat: 15 },
  { id: newId(), name: 'Search Performance', desc: 'Faster search results', fn: 'like', dys: 'dislike', impl: 50, sat: 50 },
  { id: newId(), name: 'User Authentication', desc: 'Basic login and security', fn: 'expect', dys: 'dislike', impl: 80, sat: 60 },
]);

export default function KanoCalculator() {
  const rootRef = useRef(null);
  const [items, setItems] = useState(seed);

  useEffect(() => {
    const nav = document.querySelector('header, nav, .navbar, [class*="navbar"], [class*="Navbar"]');
    if (nav && rootRef.current) {
      const h = nav.getBoundingClientRect().height;
      if (h > 0 && h < 200) rootRef.current.style.paddingTop = `${h + 56}px`;
    }
  }, []);

  const update = (id, field, val) => setItems((p) => p.map((it) => it.id === id ? { ...it, [field]: val } : it));
  const remove = (id) => setItems((p) => p.filter((it) => it.id !== id));
  const add = () => setItems((p) => [...p, { id: newId(), name: 'New feature', desc: '', fn: 'like', dys: 'dislike', impl: 0, sat: 0 }]);
  const clearAll = () => setItems([]);
  const loadExamples = () => setItems(seed());

  const rows = useMemo(() => items.map((it) => {
    const category = categorize(it.fn, it.dys);
    const expected = Math.round(CAT[Object.keys(CAT).find((k) => CAT[k].key === category)].expectedSat * 100);
    const gap = Number(it.sat) - expected;
    // priority: attractive & under-implemented & low satisfaction => high priority
    const catWeight = category === 'Attractive' ? 1.4 : category === 'Performance' ? 1.1 : category === 'Must-Be' ? 1.2 : 0.4;
    const priority = Math.max(0, Math.round((expected - Number(it.sat)) * (1 - Number(it.impl) / 100) * catWeight * 1.6 * 10) / 10);
    return { ...it, category, expected, gap, priority };
  }).sort((a, b) => b.priority - a.priority), [items]);

  const stats = useMemo(() => {
    const n = rows.length || 1;
    const dist = CAT_ORDER.reduce((acc, c) => { acc[c] = rows.filter((r) => r.category === c).length; return acc; }, {});
    const avgImpl = Math.round(rows.reduce((a, r) => a + Number(r.impl), 0) / n);
    const avgSat = Math.round(rows.reduce((a, r) => a + Number(r.sat), 0) / n);
    const quickWins = rows.filter((r) => r.category === 'Attractive' && Number(r.impl) < 50).length;
    const mustFix = rows.filter((r) => r.category === 'Must-Be' && r.gap < 0).length;
    return { dist, avgImpl, avgSat, quickWins, mustFix, total: rows.length };
  }, [rows]);

  const exportCsv = () => {
    const head = ['Feature', 'Description', 'Category', 'Implementation %', 'Satisfaction %', 'Expected %', 'Gap', 'Priority'];
    const data = rows.map((r) => [r.name, r.desc, r.category, r.impl, r.sat, r.expected, r.gap, r.priority]);
    const csv = [head, ...data].map((row) => row.map((c) => `"${String(c).replace(/"/g, '""')}"`).join(',')).join('\n');
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url; a.download = 'kano-analysis.csv'; a.click();
    URL.revokeObjectURL(url);
  };

  const catClass = (c) => `kano__pill kano__pill--${c.toLowerCase().replace(/[^a-z]/g, '')}`;

  return (
    <div className="kano" ref={rootRef}>
      <Helmet>
        <title>Kano Model Analysis Tool | Categorize Features by Customer Satisfaction | Puetto</title>
        <meta name="description" content="Free Kano model analysis tool. Auto-categorize features into Must-Be, Performance, Attractive, Indifferent and Reverse from a two-question survey, and prioritize what delights." />
        <meta name="keywords" content="Kano model analysis, Kano calculator, customer satisfaction model, feature prioritization, must-be performance attractive, Kano survey tool, product prioritization" />
        <link rel="canonical" href="https://www.puetto.com/kano-calculator" />
        <meta property="og:type" content="website" />
        <meta property="og:title" content="Kano Model Analysis Tool | Puetto" />
        <meta property="og:description" content="Categorize features by their impact on customer satisfaction and prioritize what delights." />
        <meta property="og:url" content="https://www.puetto.com/kano-calculator" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Kano Model Analysis Tool | Puetto" />
        <meta name="twitter:description" content="Categorize features by their impact on customer satisfaction and prioritize what delights." />
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org", "@type": "WebApplication", "name": "Kano Model Analysis Tool",
            "applicationCategory": "BusinessApplication", "operatingSystem": "Web",
            "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD" },
            "description": "Categorize features into Kano types from a two-question survey and prioritize.",
            "url": "https://puetto.ai/kano-calculator", "publisher": { "@type": "Organization", "name": "Puetto" }
          })}
        </script>
      </Helmet>

      <header className="kano__hero">
        <div className="kano__badge">KANO MODEL ANALYSIS</div>
        <h1 className="kano__title">Build what <span className="kano__grad">delights</span>, not what disappoints</h1>
        <p className="kano__intro">Categorize features by their real impact on customer satisfaction, Must-Be, Performance, Attractive, Indifferent or Reverse, using the classic two-question Kano survey. Then focus effort where it moves satisfaction most.</p>
      </header>

      <div className="kano__cards">
        <div className="kano__card"><div className="kano__card-label">Satisfaction score</div><div className="kano__card-num">{stats.avgSat}%</div><div className="kano__card-sub">Avg customer happiness</div></div>
        <div className="kano__card"><div className="kano__card-label">Avg implementation</div><div className="kano__card-num">{stats.avgImpl}%</div><div className="kano__card-sub">Development progress</div></div>
        <div className="kano__card"><div className="kano__card-label">Quick wins</div><div className="kano__card-num">{stats.quickWins}</div><div className="kano__card-sub">Attractive, under-built</div></div>
        <div className="kano__card"><div className="kano__card-label">Must fix</div><div className="kano__card-num">{stats.mustFix}</div><div className="kano__card-sub">Must-Be below expected</div></div>
      </div>

      <div className="kano__toolbar">
        <span className="kano__count">{stats.total} feature{stats.total === 1 ? '' : 's'} categorized</span>
        <div className="kano__toolbtns">
          <button className="kano__ghostbtn" onClick={loadExamples}>Load examples</button>
          <button className="kano__ghostbtn" onClick={exportCsv}><Download size={15} /> Export</button>
          <button className="kano__ghostbtn kano__ghostbtn--danger" onClick={clearAll}>Clear all</button>
        </div>
      </div>

      <div className="kano__tablewrap">
        <table className="kano__table">
          <thead>
            <tr>
              <th>Feature</th>
              <th>If present (functional)</th>
              <th>If absent (dysfunctional)</th>
              <th>Category</th>
              <th>Impl.</th>
              <th>Satisfaction</th>
              <th>Priority</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {rows.map((it) => (
              <tr key={it.id}>
                <td className="kano__namecell">
                  <input className="kano__textinput kano__textinput--name" value={it.name} onChange={(e) => update(it.id, 'name', e.target.value)} />
                  <input className="kano__textinput kano__textinput--desc" value={it.desc} placeholder="Description (optional)" onChange={(e) => update(it.id, 'desc', e.target.value)} />
                </td>
                <td>
                  <select className="kano__select" value={it.fn} onChange={(e) => update(it.id, 'fn', e.target.value)}>
                    {ANSWERS.map((a) => <option key={a.v} value={a.v}>{a.label}</option>)}
                  </select>
                </td>
                <td>
                  <select className="kano__select" value={it.dys} onChange={(e) => update(it.id, 'dys', e.target.value)}>
                    {ANSWERS.map((a) => <option key={a.v} value={a.v}>{a.label}</option>)}
                  </select>
                </td>
                <td><span className={catClass(it.category)}>{it.category}</span></td>
                <td>
                  <div className="kano__metric">
                    <input type="number" min="0" max="100" className="kano__numinput" value={it.impl} onChange={(e) => update(it.id, 'impl', Number(e.target.value))} />
                    <span className="kano__pctsign">%</span>
                  </div>
                </td>
                <td>
                  <div className="kano__satcell">
                    <div className="kano__metric">
                      <input type="number" min="0" max="100" className="kano__numinput" value={it.sat} onChange={(e) => update(it.id, 'sat', Number(e.target.value))} />
                      <span className="kano__pctsign">%</span>
                    </div>
                    <div className={`kano__gap${it.gap < 0 ? ' kano__gap--neg' : it.gap > 0 ? ' kano__gap--pos' : ''}`}>
                      Exp {it.expected}% · {it.gap === 0 ? 'on track' : it.gap > 0 ? `+${it.gap}%` : `${it.gap}%`}
                    </div>
                  </div>
                </td>
                <td><span className="kano__priority">{it.priority.toFixed(1)}</span></td>
                <td><button className="kano__del" onClick={() => remove(it.id)} aria-label="Delete"><Trash2 size={16} /></button></td>
              </tr>
            ))}
            {rows.length === 0 && (
              <tr><td colSpan="8" className="kano__empty">No features yet. Add one below or load the examples.</td></tr>
            )}
          </tbody>
        </table>
        <button className="kano__addrow" onClick={add}><Plus size={16} /> Add feature</button>
      </div>

      <div className="kano__lower">
        <div className="kano__dist">
          <div className="kano__panel-title">Category distribution</div>
          {CAT_ORDER.map((c) => {
            const v = stats.dist[c] || 0;
            const pct = stats.total > 0 ? Math.round((v / stats.total) * 100) : 0;
            return (
              <div className="kano__distrow" key={c}>
                <div className="kano__disthead"><span className={catClass(c)}>{c}</span><b>{v} · {pct}%</b></div>
                <div className="kano__bartrack"><div className={`kano__barfill kano__barfill--${c.toLowerCase().replace(/[^a-z]/g, '')}`} style={{ width: `${pct}%` }} /></div>
              </div>
            );
          })}
        </div>

        <div className="kano__insights">
          <div className="kano__panel-title">Strategic insights</div>
          {stats.quickWins > 0 && (
            <div className="kano__insight kano__insight--win">
              <Zap size={18} /><div><b>{stats.quickWins} quick win{stats.quickWins === 1 ? '' : 's'} available</b><span>Attractive features that could delight users with relatively little build effort. Prioritize these for outsized satisfaction gains.</span></div>
            </div>
          )}
          {stats.mustFix > 0 && (
            <div className="kano__insight kano__insight--fix">
              <AlertTriangle size={18} /><div><b>{stats.mustFix} critical action{stats.mustFix === 1 ? '' : 's'}</b><span>Must-Be features are sitting below their expected satisfaction. These cause active dissatisfaction when weak, fix before chasing delight.</span></div>
            </div>
          )}
          <div className="kano__insight kano__insight--info">
            <Lightbulb size={18} /><div><b>Where to focus</b><span>Get Must-Be features right first, compete on Performance features, and use Attractive features to differentiate. Don't over-invest in Indifferent features, and watch for Reverse features that some users actively dislike.</span></div>
          </div>
        </div>
      </div>

      <section className="kano__content">
        <h2 className="kano__h2">What the Kano model measures</h2>
        <p className="kano__p">The Kano model maps the relationship between how well a feature is implemented and how satisfied customers are as a result. Its insight is that this relationship is not linear and differs by feature type. Some features only cause dissatisfaction when missing and are taken for granted when present. Others scale satisfaction in proportion to how good they are. And a few delight customers out of all proportion to the effort involved. Treating all features the same is how teams pour resources into work that never moves the needle.</p>

        <h2 className="kano__h2">The five Kano categories</h2>
        <p className="kano__p">Must-Be features are basic expectations; their absence causes anger but their presence earns no praise, like a hotel room having a working lock. Performance features satisfy in proportion to how well they are done, the more the better, like battery life. Attractive features delight when present but are not missed when absent, the source of competitive differentiation. Indifferent features move satisfaction either way very little and are candidates for cutting. Reverse features actively reduce satisfaction for some users, meaning more is worse. Knowing a feature's type tells you how much to invest and what to expect in return.</p>

        <h2 className="kano__h2">How the two-question survey works</h2>
        <p className="kano__p">Each feature is evaluated with a pair of questions. The functional question asks how the customer feels if the feature is present; the dysfunctional question asks how they feel if it is absent. Each is answered on a five-point scale from like to dislike. The pair of answers is then read against the standard Kano evaluation table, which maps every combination to a category. This tool runs that mapping automatically, so changing either answer instantly re-categorizes the feature, letting you see how perception shifts the strategy.</p>

        <h2 className="kano__h2">Turning categories into priorities</h2>
        <p className="kano__p">Categorization is the start, not the end. The priority score in this tool weights the gap between expected and actual satisfaction, how much of the feature is already built, and the category itself, so it surfaces the under-implemented Attractive features that represent quick wins and the weak Must-Be features that represent risk. The principle is simple: secure the basics, compete on performance, and spend your remaining innovation budget on a small number of delighters rather than spreading it thin.</p>

        <h2 className="kano__h2">From insight to a working roadmap</h2>
        <p className="kano__p">A Kano analysis is only valuable if it changes what gets built and when. That means the categorization lives where the product team can see it, satisfaction data flows in from real customers rather than guesses, and the output connects to your prioritization and delivery process. Puetto configures the tools, builds the automations, and runs the day-to-day ops that keep customer insight connected to the roadmap, faster than a hire and more accountable than an agency.</p>

        <div className="kano__cta">
          <h2 className="kano__h2">Want to build what your customers love?</h2>
          <p className="kano__p">Book a free ops audit and we'll show you how to wire customer insight into prioritization and delivery.</p>
          <a className="kano__btn" href="/contact">Book a Free Ops Audit <ArrowRight size={18} /></a>
        </div>
      </section>
    </div>
  );
}
