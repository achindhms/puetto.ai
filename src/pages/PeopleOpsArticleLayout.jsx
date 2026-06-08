import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { ArrowRight, Clock, User } from 'lucide-react';
import './peopleops.css';

/* ---------------------------------------------------------------------------
   Single source of truth for the People Ops cluster.
   The pillar and every spoke interlink from this registry. Flip `built` to
   true when a spoke page ships and it auto-appears in the hub + sibling blocks.
--------------------------------------------------------------------------- */
export const PILLAR = {
  path: '/people-ops',
  title: 'Fractional People Operations',
  blurb: 'Senior People Ops and HR support, on a fractional basis, for startups and lean teams.',
};

export const CLUSTER = [
  {
    path: '/people-ops/what-is-fractional-hr',
    title: 'What Is Fractional HR?',
    blurb: 'A plain definition of fractional HR, how it works, and when it beats a full-time hire.',
    built: true,
  },
  {
    path: '/people-ops/hr-for-startups',
    title: 'HR for Startups',
    blurb: 'When to start HR, what to set up first, and how to run it without a full-time team.',
    built: true,
  },
  {
    path: '/people-ops/people-operations-vs-hr',
    title: 'People Operations vs HR',
    blurb: 'What changed, what stayed the same, and which one your company actually needs.',
    built: true,
  },
  {
    path: '/people-ops/outsourcing-hr-pros-and-cons',
    title: 'Pros and Cons of Outsourcing HR',
    blurb: 'An honest look at where outsourced HR helps and where it falls short.',
    built: true,
  },
  {
    path: '/people-ops/fractional-head-of-hr',
    title: 'Fractional Head of HR and CHRO',
    blurb: 'Senior People leadership on a part-time basis, without a full-time exec salary.',
    built: false,
  },
  {
    path: '/people-ops/what-hr-functions-to-outsource',
    title: 'What HR Functions Can You Outsource?',
    blurb: 'A breakdown of which People Ops tasks make sense to hand off, and which to keep.',
    built: false,
  },
  {
    path: '/people-ops/employee-onboarding-for-startups',
    title: 'Employee Onboarding for Startups',
    blurb: 'A simple onboarding flow new hires remember, built to scale with the team.',
    built: false,
  },
  {
    path: '/people-ops/employee-retention-strategies',
    title: 'Employee Retention Strategies',
    blurb: 'Practical ways to keep your best people and cut avoidable turnover.',
    built: false,
  },
];

/* Calculators to surface in the related block. Confirm paths match the repo. */
export const RELATED_TOOLS = [
  { path: '/calculators', title: 'Free People Ops calculators' },
  { path: '/people-ops/employee-turnover-cost-calculator', title: 'Employee turnover cost calculator' },
];

const SITE = 'https://www.puetto.com';

export default function PeopleOpsArticleLayout({
  slug,
  title,
  description,
  keywords,
  readingTime = '7 min',
  datePublished = '2026-06-08',
  dateModified = '2026-06-08',
  faqs = [],
  children,
}) {
  const rootRef = useRef(null);
  useEffect(() => {
    const nav = document.querySelector('header, nav, .navbar, [class*="navbar"], [class*="Navbar"]');
    if (nav && rootRef.current) {
      const h = nav.getBoundingClientRect().height;
      if (h > 0 && h < 200) rootRef.current.style.paddingTop = `${h + 48}px`;
    }
  }, []);

  const url = `${SITE}${slug}`;

  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: title,
    description,
    url,
    datePublished,
    dateModified,
    author: { '@type': 'Organization', name: 'Puetto' },
    publisher: { '@type': 'Organization', name: 'Puetto', url: SITE },
    isPartOf: { '@type': 'WebPage', name: PILLAR.title, url: `${SITE}${PILLAR.path}` },
    mainEntityOfPage: url,
  };

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: SITE },
      { '@type': 'ListItem', position: 2, name: 'People Ops', item: `${SITE}${PILLAR.path}` },
      { '@type': 'ListItem', position: 3, name: title, item: url },
    ],
  };

  const faqSchema = faqs.length
    ? {
        '@context': 'https://schema.org',
        '@type': 'FAQPage',
        mainEntity: faqs.map((f) => ({
          '@type': 'Question',
          name: f.q,
          acceptedAnswer: { '@type': 'Answer', text: f.a },
        })),
      }
    : null;

  const siblings = CLUSTER.filter((c) => c.path !== slug && c.built).slice(0, 3);

  return (
    <div className="pops" ref={rootRef}>
      <Helmet>
        <title>{title} | Puetto</title>
        <meta name="description" content={description} />
        <meta name="keywords" content={keywords} />
        <link rel="canonical" href={url} />
        <meta property="og:type" content="article" />
        <meta property="og:title" content={`${title} | Puetto`} />
        <meta property="og:description" content={description} />
        <meta property="og:url" content={url} />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={`${title} | Puetto`} />
        <meta name="twitter:description" content={description} />
        <script type="application/ld+json">{JSON.stringify(articleSchema)}</script>
        <script type="application/ld+json">{JSON.stringify(breadcrumbSchema)}</script>
        {faqSchema && <script type="application/ld+json">{JSON.stringify(faqSchema)}</script>}
      </Helmet>

      <article className="pops__wrap">
        <nav className="pops__crumb" aria-label="Breadcrumb">
          <Link to="/">Home</Link><span>/</span>
          <Link to={PILLAR.path}>People Ops</Link><span>/</span>
          {title}
        </nav>

        <header>
          <p className="pops__eyebrow">People Ops</p>
          <h1>{title}</h1>
          <div className="pops__meta">
            <span><User size={15} /> Puetto</span>
            <span><Clock size={15} /> {readingTime} read</span>
            <span>Updated {new Date(dateModified).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</span>
          </div>
        </header>

        {children}

        {faqs.length > 0 && (
          <section className="pops__faq" aria-label="Frequently asked questions">
            <h2>Frequently asked questions</h2>
            {faqs.map((f, i) => (
              <div className="pops__faq-item" key={i}>
                <h3>{f.q}</h3>
                <p>{f.a}</p>
              </div>
            ))}
          </section>
        )}

        {siblings.length > 0 && (
          <section className="pops__continue" aria-label="Continue reading">
            <h2>Continue reading</h2>
            <div className="pops__grid">
              {siblings.map((s) => (
                <Link className="pops__card" to={s.path} key={s.path}>
                  <h3>{s.title}</h3>
                  <p>{s.blurb}</p>
                </Link>
              ))}
            </div>
          </section>
        )}

        <RelatedLinks currentPath={slug} />

        <section className="pops__cta">
          <h2>Need People Ops help without a full-time hire?</h2>
          <p>Puetto runs fractional People Ops and HR for startups and lean teams. Get the senior support you need for the hours you actually need it.</p>
          <Link className="pops__btn" to="/contact">Book a free People Ops audit <ArrowRight size={18} /></Link>
        </section>
      </article>
    </div>
  );
}

/* Shared related-links block. Renders cluster guides + calculators, excludes self. */
export function RelatedLinks({ currentPath }) {
  const guides = [{ ...PILLAR, built: true }, ...CLUSTER].filter(
    (g) => g.built && g.path !== currentPath
  ).slice(0, 5);

  return (
    <section className="pops__related" aria-label="Related resources">
      <h2>Related resources</h2>
      <div className="pops__related-cols">
        <div>
          <h3>People Ops guides</h3>
          <ul>
            {guides.map((g) => (
              <li key={g.path}><Link to={g.path}>{g.title}</Link></li>
            ))}
          </ul>
        </div>
        <div>
          <h3>Tools</h3>
          <ul>
            {RELATED_TOOLS.map((t) => (
              <li key={t.path}><Link to={t.path}>{t.title}</Link></li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
