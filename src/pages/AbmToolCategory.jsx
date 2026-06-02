import { useEffect, useRef } from 'react';
import { Helmet } from 'react-helmet-async';
import { Link, useParams, Navigate } from 'react-router-dom';
import { ArrowRight, ArrowLeft } from 'lucide-react';
import './abm.css';
import { getCategory, getToolsInCategory, CATEGORIES } from './abmToolsData';

export default function AbmToolCategory() {
  const { categorySlug } = useParams();
  const category = getCategory(categorySlug);
  const rootRef = useRef(null);

  useEffect(() => {
    const nav = document.querySelector('header, nav, .navbar, [class*="navbar"], [class*="Navbar"]');
    if (nav && rootRef.current) {
      const h = nav.getBoundingClientRect().height;
      if (h > 0 && h < 200) rootRef.current.style.paddingTop = `${h + 48}px`;
    }
  }, [categorySlug]);

  if (!category) return <Navigate to="/abm-ops/tools" replace />;

  const tools = getToolsInCategory(category.slug);
  const url = `https://www.puetto.com/abm-ops/tools/${category.slug}`;
  const title = `Best ${category.name} Tools for ABM`;
  const description = `${category.description} Compare the leading ${category.name.toLowerCase()} tools with factual reviews, pros, cons, and alternatives.`;

  return (
    <div className="abm abm--pillar" ref={rootRef}>
      <Helmet>
        <title>{title} | Puetto</title>
        <meta name="description" content={description} />
        <meta name="keywords" content={`${category.name.toLowerCase()} tools, best ${category.name.toLowerCase()} software, ABM ${category.name.toLowerCase()}, ${tools.map((t) => t.name).join(', ')}`} />
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
            '@type': 'ItemList',
            name: title,
            description,
            url,
            itemListElement: tools.map((t, i) => ({
              '@type': 'ListItem',
              position: i + 1,
              name: t.name,
              url: `https://www.puetto.com/abm-ops/tools/${category.slug}/${t.slug}`,
            })),
          })}
        </script>
      </Helmet>

      <nav className="abm__crumb" aria-label="Breadcrumb" style={{ maxWidth: 1100, margin: '0 auto', padding: '7rem 1.5rem 0' }}>
        <Link to="/abm-ops/tools">ABM Tool Library</Link>
        <span>/</span>
        <span className="abm__crumb-current">{category.name}</span>
      </nav>

      <section className="abm__section" style={{ paddingTop: '1.5rem' }}>
        <h1 className="abm__hero-title" style={{ fontSize: 'clamp(2rem, 4.5vw, 3rem)' }}>
          {category.name} <span className="abm__grad">tools for ABM</span>
        </h1>
        <p className="abm__lead" style={{ marginTop: '1rem' }}>{category.intro}</p>

        {tools.length === 0 ? (
          <div className="abm__callout" style={{ marginTop: '2rem' }}>
            <p>We're building out this category. In the meantime, explore the{' '}
              <Link to="/abm-ops/tools">full tool library</Link> or read{' '}
              <Link to="/abm-ops/abm-tech-stack">the ABM tech stack explained</Link>.</p>
          </div>
        ) : (
          <div className="abm__pillargrid" style={{ marginTop: '2rem' }}>
            {tools.map((t) => (
              <Link className="abm__pillarcard" to={`/abm-ops/tools/${category.slug}/${t.slug}`} key={t.slug}>
                <span className="abm__pillarcard-title">{t.name}</span>
                <span className="abm__pillarcard-blurb">{t.oneLiner}</span>
                <span className="abm__pillarcard-cta">Read review <ArrowRight size={15} /></span>
              </Link>
            ))}
          </div>
        )}
      </section>

      <aside className="abm__related">
        <div className="abm__related-title">Other categories</div>
        <div className="abm__related-grid">
          {CATEGORIES.filter((c) => c.slug !== category.slug).slice(0, 3).map((c) => (
            <Link className="abm__related-card" to={`/abm-ops/tools/${c.slug}`} key={c.slug}>
              <span className="abm__related-cardtitle">{c.name}</span>
              <span className="abm__related-cardblurb">{c.tagline}</span>
              <span className="abm__related-cta">Explore <ArrowRight size={14} /></span>
            </Link>
          ))}
        </div>
        <Link className="abm__backpillar" to="/abm-ops/tools"><ArrowLeft size={15} /> Back to the ABM tool library</Link>
      </aside>
    </div>
  );
}
