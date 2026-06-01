import { useEffect, useRef } from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { ArrowRight, ArrowLeft } from 'lucide-react';
import './abm.css';

// Single source of truth for the Strategy & Account Selection pillar.
// Cluster 1 (ICP) is live. Clusters 2 & 3 are scaffolded — flip `live: true`
// and fill `path` as each spoke ships, and the card becomes a real link.
export const STRATEGY_CLUSTERS = [
  {
    key: 'icp',
    name: 'ICP Definition & Validation',
    summary:
      'A sharp, evidence-based ideal customer profile is the spine of the whole strategy. Define it from closed-won data, keep it distinct from your personas, and validate it before you spend against it.',
    spokes: [
      { path: '/abm-ops/how-to-build-b2b-icp', title: 'How to Build a B2B Ideal Customer Profile', blurb: 'A data-backed, step-by-step framework grounded in closed-won analysis — not aspiration.', live: true },
      { path: '/abm-ops/icp-vs-buyer-persona', title: 'ICP vs. Buyer Persona', blurb: 'Company-level vs. person-level: the difference, and why B2B teams need both.', live: true },
      { path: '/abm-ops/validate-icp-closed-won-data', title: 'Validate Your ICP With Closed-Won Data', blurb: 'CRM cohorts, back-testing, and win/loss reviews that turn a hypothesis into evidence.', live: true },
      { path: '/abm-ops/icp-firmographic-technographic-behavioral', title: 'Firmographic, Technographic & Behavioral Criteria', blurb: 'The three layers of ICP criteria, their data sources, and how to combine fit and intent.', live: true },
      { path: '/abm-ops/common-icp-mistakes', title: 'Common ICP Mistakes', blurb: 'Too broad, aspirational, stale — the recurring errors that quietly break ABM, and the fixes.', live: true },
    ],
  },
  {
    key: 'scoring',
    name: 'Account Scoring & Tiering',
    summary:
      'Turn the ICP into an objective, points-based scoring rubric and a tiered target list — so account selection is repeatable and evidence-led, not political.',
    spokes: [
      { path: '/abm-ops/account-scoring-model', title: 'How to Build an Account Scoring Model', blurb: 'Fit + intent + engagement as weighted inputs, and how to turn them into a single score.', live: true },
      { path: '/abm-ops/abm-account-tiering', title: 'ABM Account Tiering: 1:1, 1:Few, 1:Many', blurb: 'How to size each tier, the resource trade-offs, and which plays each tier warrants.', live: true },
      { path: '/abm-ops/fit-vs-intent', title: 'Fit vs. Intent: Should We, and Is Now the Moment?', blurb: 'How to weight fit against readiness so you prioritise the right accounts at the right time.', live: true },
      { path: '/abm-ops/target-account-list-size', title: 'How Big Should Your Target Account List Be?', blurb: 'Account-count ranges per tier and why a focused list beats a sprawling one.', live: true },
      { path: '/abm-ops/account-scoring-rubric', title: 'The 100-Point Account Scoring Rubric', blurb: 'A worked rubric you can adapt, with a downloadable template.', live: true },
    ],
  },
  {
    key: 'committee',
    name: 'Buying Committee & Account Mapping',
    summary:
      'B2B purchases are made by committees, not individuals. Map the roles that influence each deal and plan coverage before gaps become deal risk.',
    spokes: [
      { path: '/abm-ops/map-buying-committee', title: 'How to Map the B2B Buying Committee', blurb: 'A practical method for documenting who decides, who influences, and where coverage is thin.', live: true },
      { path: '/abm-ops/buying-committee-roles', title: 'The Buying Committee Roles That Drive Deals', blurb: 'Champion, economic buyer, technical evaluator, end user, procurement — and how to reach each.', live: true },
      { path: '/abm-ops/champion-vs-economic-buyer', title: 'Champion vs. Economic Buyer', blurb: 'Who to prioritise and when, and why single-threaded deals stall.', live: true },
      { path: '/abm-ops/buying-committee-map-template', title: 'Buying Committee Mapping Template', blurb: 'The four-question minimum map and how to operationalise it in your CRM.', live: true },
      { path: '/abm-ops/multi-threading', title: 'Multi-Threading the Buying Group', blurb: 'Engaging the whole committee with role-specific message tracks, not one persona.', live: true },
    ],
  },
];

export default function StrategyLibrary() {
  const rootRef = useRef(null);
  const url = 'https://www.puetto.com/abm-ops/strategy-account-selection';
  const title = 'Strategy & Account Selection — The Library';
  const description =
    'A focused library on ABM strategy and account selection: defining and validating your ICP, scoring and tiering accounts, and mapping the B2B buying committee.';

  useEffect(() => {
    const nav = document.querySelector('header, nav, .navbar, [class*="navbar"], [class*="Navbar"]');
    if (nav && rootRef.current) {
      const h = nav.getBoundingClientRect().height;
      if (h > 0 && h < 200) rootRef.current.style.paddingTop = `${h + 48}px`;
    }
  }, []);

  const liveSpokes = STRATEGY_CLUSTERS.flatMap((c) => c.spokes.filter((s) => s.live));

  return (
    <div className="abm abm--pillar" ref={rootRef}>
      <Helmet>
        <title>{title} | Puetto</title>
        <meta name="description" content={description} />
        <meta
          name="keywords"
          content="ABM strategy, account selection, ideal customer profile, account scoring, account tiering, buying committee, B2B targeting"
        />
        <link rel="canonical" href={url} />
        <meta property="og:type" content="website" />
        <meta property="og:title" content={`${title} | Puetto`} />
        <meta property="og:description" content={description} />
        <meta property="og:url" content={url} />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={`${title} | Puetto`} />
        <meta name="twitter:description" content={description} />
        <script type="application/ld+json">
          {JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'Article',
            headline: title,
            description,
            url,
            isPartOf: { '@type': 'WebPage', name: 'ABM Ops', url: 'https://www.puetto.com/abm-ops' },
            hasPart: liveSpokes.map((s) => ({
              '@type': 'Article',
              headline: s.title,
              url: `https://www.puetto.com${s.path}`,
            })),
          })}
        </script>
      </Helmet>

      <header className="abm__hero">
        <div className="abm__hero-inner">
          <div className="abm__eyebrow">ABM Ops · Pillar</div>
          <h1 className="abm__hero-title">
            <span className="abm__grad">Strategy</span> &amp; account selection
          </h1>
          <p className="abm__hero-intro">
            A sharp ICP and a defensible target account list. Without these, everything
            downstream optimises toward the wrong accounts. This library covers the
            three foundations: defining your ICP, scoring and tiering accounts, and
            mapping the buying committee.
          </p>
          <div className="abm__hero-actions">
            <Link className="abm__btn" to="/abm-ops/how-to-build-b2b-icp">
              Start with the ICP framework <ArrowRight size={18} />
            </Link>
            <Link className="abm__btn abm__btn--ghost" to="/abm-ops/abm-strategy-framework">
              The 5-step strategy <ArrowLeft size={16} />
            </Link>
          </div>
        </div>
      </header>

      <section className="abm__section">
        <p className="abm__lead">
          ABM strategy is only as good as its foundations. Most programs that stall do
          so because the early decisions — who to target and why — were never made
          rigorously. This library breaks those decisions into three clusters that
          build on each other, and expands{' '}
          <Link to="/abm-ops/abm-strategy-framework">the five-step ABM strategy framework</Link>.
          If you are still deciding whether ABM is right for you, start with{' '}
          <Link to="/abm-ops/what-is-abm">what account-based marketing is</Link>.
        </p>

        {STRATEGY_CLUSTERS.map((cluster, ci) => (
          <div key={cluster.key} id={cluster.key} style={{ marginTop: ci === 0 ? '2.5rem' : '3.5rem' }}>
            <div className="abm__eyebrow" style={{ marginBottom: '0.5rem' }}>
              Cluster {ci + 1}
            </div>
            <h2 className="abm__h2" style={{ marginTop: 0 }}>{cluster.name}</h2>
            <p className="abm__lead" style={{ marginBottom: '0.5rem' }}>{cluster.summary}</p>

            <div className="abm__pillargrid">
              {cluster.spokes.map((s, si) => {
                const num = String(si + 1).padStart(2, '0');
                if (s.live) {
                  return (
                    <Link className="abm__pillarcard" to={s.path} key={s.path}>
                      <span className="abm__pillarcard-num">{num}</span>
                      <span className="abm__pillarcard-title">{s.title}</span>
                      <span className="abm__pillarcard-blurb">{s.blurb}</span>
                      <span className="abm__pillarcard-cta">Read the guide <ArrowRight size={15} /></span>
                    </Link>
                  );
                }
                // Not yet live: render a non-clickable card so the structure is
                // visible without shipping a dead link.
                return (
                  <div className="abm__pillarcard" key={s.path} style={{ opacity: 0.6, cursor: 'default' }} aria-disabled="true">
                    <span className="abm__pillarcard-num">{num}</span>
                    <span className="abm__pillarcard-title">{s.title}</span>
                    <span className="abm__pillarcard-blurb">{s.blurb}</span>
                    <span className="abm__pillarcard-cta" style={{ color: 'var(--abm-muted)' }}>Coming soon</span>
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </section>

      <div className="abm__cta">
        <h2 className="abm__h2">Want a target account list that actually predicts revenue?</h2>
        <p className="abm__p">
          Book a free ops audit and we'll pressure-test your ICP and account selection
          against your closed-won data — and show you where your targeting is leaking
          pipeline.
        </p>
        <a className="abm__btn" href="/contact">
          Book a Free Ops Audit <ArrowRight size={18} />
        </a>
      </div>
    </div>
  );
}
