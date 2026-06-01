import { useEffect, useRef } from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { ArrowRight, ArrowLeft } from 'lucide-react';
import './abm.css';

// Shared registry of the cluster so every page can interlink consistently.
export const PILLAR = { path: '/abm-ops', title: 'ABM Ops', label: 'ABM Ops hub' };
export const CLUSTER = [
  { path: '/abm-ops/what-is-abm', title: 'What Is Account-Based Marketing?', blurb: 'The definition, how ABM differs from traditional demand gen, and when it makes sense.' },
  { path: '/abm-ops/abm-tech-stack', title: 'The ABM Tech Stack Explained', blurb: 'The tools that run an account-based motion and how they fit together.' },
  { path: '/abm-ops/abm-signal-data-crm', title: 'Signal Data & CRM for ABM', blurb: 'Why clean signal data and a connected CRM are the foundation of ABM ops.' },
  { path: '/abm-ops/abm-metrics-roi', title: 'ABM Metrics & ROI That Matter', blurb: 'The metrics that prove ABM is working, and the ones that mislead.' },
  { path: '/abm-ops/abm-vs-demand-gen', title: 'ABM vs Demand Gen', blurb: 'How the two approaches differ, and why most teams need both.' },
  { path: '/abm-ops/strategy-account-selection', title: 'Strategy & Account Selection', blurb: 'Defining your ICP, scoring and tiering accounts, and mapping the buying committee.' },
];

export function AbmAuthorLine() {
  return <div className="abm__byline">By the Puetto team · Updated {new Date().getFullYear()}</div>;
}

// A reusable interlink block: related siblings + back-to-pillar.
export function AbmRelated({ currentPath }) {
  const siblings = CLUSTER.filter((c) => c.path !== currentPath).slice(0, 3);
  return (
    <aside className="abm__related">
      <div className="abm__related-title">Continue reading</div>
      <div className="abm__related-grid">
        {siblings.map((s) => (
          <Link className="abm__related-card" to={s.path} key={s.path}>
            <span className="abm__related-cardtitle">{s.title}</span>
            <span className="abm__related-cardblurb">{s.blurb}</span>
            <span className="abm__related-cta">Read <ArrowRight size={14} /></span>
          </Link>
        ))}
      </div>
      <Link className="abm__backpillar" to={PILLAR.path}><ArrowLeft size={15} /> Back to the {PILLAR.label}</Link>
    </aside>
  );
}

export function AbmCTA({ heading = "Want ABM ops that actually run?", text = "Book a free ops audit and we'll show you where your account-based motion is leaking pipeline and what it would take to fix it." }) {
  return (
    <div className="abm__cta">
      <h2 className="abm__h2">{heading}</h2>
      <p className="abm__p">{text}</p>
      <a className="abm__btn" href="/contact">Book a Free Ops Audit <ArrowRight size={18} /></a>
    </div>
  );
}

// Article wrapper: handles navbar clearance, meta tags, breadcrumb, and Article schema.
export default function AbmArticleLayout({
  slug, title, description, keywords, datePublished = '2026-01-15',
  readingTime = '8 min', children,
}) {
  const rootRef = useRef(null);
  const url = `https://www.puetto.com${slug}`;

  useEffect(() => {
    const nav = document.querySelector('header, nav, .navbar, [class*="navbar"], [class*="Navbar"]');
    if (nav && rootRef.current) {
      const h = nav.getBoundingClientRect().height;
      if (h > 0 && h < 200) rootRef.current.style.paddingTop = `${h + 48}px`;
    }
  }, []);

  return (
    <div className="abm abm--article" ref={rootRef}>
      <Helmet>
        <title>{title} | Puetto</title>
        <meta name="description" content={description} />
        {keywords && <meta name="keywords" content={keywords} />}
        <link rel="canonical" href={url} />
        <meta property="og:type" content="article" />
        <meta property="og:title" content={`${title} | Puetto`} />
        <meta property="og:description" content={description} />
        <meta property="og:url" content={url} />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={`${title} | Puetto`} />
        <meta name="twitter:description" content={description} />
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org", "@type": "Article",
            "headline": title, "description": description, "url": url,
            "datePublished": datePublished, "dateModified": datePublished,
            "author": { "@type": "Organization", "name": "Puetto" },
            "publisher": { "@type": "Organization", "name": "Puetto", "url": "https://www.puetto.com" },
            "isPartOf": { "@type": "WebPage", "name": "ABM Ops", "url": "https://www.puetto.com/abm-ops" },
            "mainEntityOfPage": url
          })}
        </script>
      </Helmet>

      <nav className="abm__crumb" aria-label="Breadcrumb">
        <Link to="/abm-ops">ABM Ops</Link>
        <span>/</span>
        <span className="abm__crumb-current">{title}</span>
      </nav>

      <article className="abm__article-body">
        <h1 className="abm__article-title">{title}</h1>
        <AbmAuthorLine />
        <div className="abm__readtime">{readingTime} read</div>
        {children}
      </article>

      <AbmRelated currentPath={slug} />
      <AbmCTA />
    </div>
  );
}
