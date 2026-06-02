import { useEffect, useRef } from 'react';
import { Helmet } from 'react-helmet-async';
import { Link, useParams, Navigate } from 'react-router-dom';
import { ArrowRight, ArrowLeft, ExternalLink, Check, X } from 'lucide-react';
import './abm.css';
import { getTool, getCategoryForTool, getAlternatives } from './abmToolsData';

export default function AbmToolReview() {
  const { toolSlug } = useParams();
  const tool = getTool(toolSlug);
  const rootRef = useRef(null);

  useEffect(() => {
    const nav = document.querySelector('header, nav, .navbar, [class*="navbar"], [class*="Navbar"]');
    if (nav && rootRef.current) {
      const h = nav.getBoundingClientRect().height;
      if (h > 0 && h < 200) rootRef.current.style.paddingTop = `${h + 48}px`;
    }
  }, [toolSlug]);

  if (!tool) return <Navigate to="/abm-ops/tools" replace />;

  const category = getCategoryForTool(tool);
  const alternatives = getAlternatives(tool);
  const url = `https://www.puetto.com/abm-ops/tools/${category.slug}/${tool.slug}`;
  const title = `${tool.name} Review: Features, Pros, Cons & Alternatives`;
  const description = `${tool.oneLiner} A factual review of ${tool.name} for ABM — what it does, what it's best for, pros and cons, pricing, and alternatives.`;

  return (
    <div className="abm abm--article" ref={rootRef}>
      <Helmet>
        <title>{title} | Puetto</title>
        <meta name="description" content={description} />
        <meta name="keywords" content={`${tool.name}, ${tool.name} review, ${tool.name} alternatives, ${tool.name} pricing, ${category.name.toLowerCase()} tools`} />
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
            '@context': 'https://schema.org',
            '@type': 'Review',
            itemReviewed: {
              '@type': 'SoftwareApplication',
              name: tool.name,
              applicationCategory: 'BusinessApplication',
              url: tool.website,
            },
            author: { '@type': 'Organization', name: 'Puetto' },
            publisher: { '@type': 'Organization', name: 'Puetto', url: 'https://www.puetto.com' },
            url,
            reviewBody: tool.whatItDoes,
          })}
        </script>
      </Helmet>

      <nav className="abm__crumb" aria-label="Breadcrumb">
        <Link to="/abm-ops/tools">ABM Tool Library</Link>
        <span>/</span>
        <Link to={`/abm-ops/tools/${category.slug}`}>{category.name}</Link>
        <span>/</span>
        <span className="abm__crumb-current">{tool.name}</span>
      </nav>

      <article className="abm__article-body">
        <h1 className="abm__article-title">{tool.name}</h1>
        <div className="abm__byline">By the Puetto team · Updated {new Date().getFullYear()}</div>
        <p className="abm__readtime" style={{ marginTop: '0.5rem' }}>
          {category.name} · <a href={tool.website} target="_blank" rel="noopener noreferrer" style={{ color: '#7a2150', fontWeight: 600 }}>
            Visit website <ExternalLink size={12} style={{ display: 'inline', verticalAlign: 'middle' }} />
          </a>
        </p>

        <p style={{ fontSize: '1.15rem', fontWeight: 500 }}>{tool.oneLiner}</p>

        <h2>What it does</h2>
        <p>{tool.whatItDoes}</p>

        <h2>Best for</h2>
        <p>{tool.bestFor}</p>

        <h2>Pros &amp; cons</h2>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, margin: '1rem 0 1.5rem' }} className="abm__proscons">
          <div className="abm__callout" style={{ borderLeftColor: '#16a34a', margin: 0 }}>
            <strong style={{ display: 'block', marginBottom: 8 }}>Pros</strong>
            <ul style={{ margin: 0, paddingLeft: '1.1rem' }}>
              {tool.pros.map((p, i) => (
                <li key={i} style={{ marginBottom: 6 }}><Check size={14} style={{ display: 'inline', verticalAlign: 'middle', color: '#16a34a', marginRight: 4 }} />{p}</li>
              ))}
            </ul>
          </div>
          <div className="abm__callout" style={{ borderLeftColor: '#dc2626', margin: 0 }}>
            <strong style={{ display: 'block', marginBottom: 8 }}>Cons</strong>
            <ul style={{ margin: 0, paddingLeft: '1.1rem' }}>
              {tool.cons.map((c, i) => (
                <li key={i} style={{ marginBottom: 6 }}><X size={14} style={{ display: 'inline', verticalAlign: 'middle', color: '#dc2626', marginRight: 4 }} />{c}</li>
              ))}
            </ul>
          </div>
        </div>

        <h2>Pricing</h2>
        <p>{tool.pricing}</p>

        <h2>What practitioners say</h2>
        <p>{tool.community}</p>
        {tool.sourceLinks && tool.sourceLinks.length > 0 && (
          <p style={{ fontSize: '0.95rem' }}>
            <strong>Sources &amp; first-hand reviews:</strong>{' '}
            {tool.sourceLinks.map((s, i) => (
              <span key={s.url}>
                <a href={s.url} target="_blank" rel="noopener noreferrer" style={{ color: '#7a2150', fontWeight: 600 }}>
                  {s.label} <ExternalLink size={11} style={{ display: 'inline', verticalAlign: 'middle' }} />
                </a>{i < tool.sourceLinks.length - 1 ? ' · ' : ''}
              </span>
            ))}
          </p>
        )}

        {alternatives.length > 0 && (
          <>
            <h2>Alternatives to {tool.name}</h2>
            <p>If {tool.name} is not the right fit, these {category.name.toLowerCase()} tools are the most common alternatives:</p>
            <div className="abm__related-grid" style={{ marginTop: '1rem' }}>
              {alternatives.map((alt) => (
                <Link className="abm__related-card" to={`/abm-ops/tools/${alt.category}/${alt.slug}`} key={alt.slug}>
                  <span className="abm__related-cardtitle">{alt.name}</span>
                  <span className="abm__related-cardblurb">{alt.oneLiner}</span>
                  <span className="abm__related-cta">Compare <ArrowRight size={14} /></span>
                </Link>
              ))}
            </div>
          </>
        )}
      </article>

      <aside className="abm__related">
        <Link className="abm__backpillar" to={`/abm-ops/tools/${category.slug}`}>
          <ArrowLeft size={15} /> Back to {category.name} tools
        </Link>
      </aside>

      <div className="abm__cta">
        <h2 className="abm__h2">Building your ABM stack?</h2>
        <p className="abm__p">
          Tools should follow strategy, not lead it. Book a free ops audit and we'll
          help you choose the stack that fits your account-based motion — and skip the
          tools you don't need.
        </p>
        <a className="abm__btn" href="/contact">Book a Free Ops Audit <ArrowRight size={18} /></a>
      </div>
    </div>
  );
}
