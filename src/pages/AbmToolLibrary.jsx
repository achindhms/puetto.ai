import { useEffect, useRef } from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { ArrowRight, ArrowLeft } from 'lucide-react';
import './abm.css';
import { CATEGORIES, getToolsInCategory } from './abmToolsData';

export default function AbmToolLibrary() {
  const rootRef = useRef(null);
  const url = 'https://www.puetto.com/abm-ops/tools';
  const title = 'The ABM Tool Library';
  const description =
    'An editorial directory of the tools that make up a modern ABM tech stack — email automation, LinkedIn automation, lead sourcing, intent data, and ABM platforms — with factual reviews, pros, cons, and alternatives.';

  useEffect(() => {
    const nav = document.querySelector('header, nav, .navbar, [class*="navbar"], [class*="Navbar"]');
    if (nav && rootRef.current) {
      const h = nav.getBoundingClientRect().height;
      if (h > 0 && h < 200) rootRef.current.style.paddingTop = `${h + 48}px`;
    }
  }, []);

  return (
    <div className="abm abm--pillar" ref={rootRef}>
      <Helmet>
        <title>{title} | Puetto</title>
        <meta name="description" content={description} />
        <meta name="keywords" content="ABM tools, ABM tech stack, account based marketing software, ABM tool directory, email automation tools, LinkedIn automation, intent data, ABM platforms" />
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
            '@type': 'CollectionPage',
            name: title,
            description,
            url,
            isPartOf: { '@type': 'WebPage', name: 'ABM Ops', url: 'https://www.puetto.com/abm-ops' },
          })}
        </script>
      </Helmet>

      <header className="abm__hero">
        <div className="abm__hero-inner">
          <div className="abm__eyebrow">ABM Ops · Tool Library</div>
          <h1 className="abm__hero-title">
            The <span className="abm__grad">ABM tool</span> library
          </h1>
          <p className="abm__hero-intro">
            An editorial directory of the tools that make up a modern ABM tech stack.
            Factual reviews — what each tool does, what it is best for, pros, cons, and
            alternatives — organized by the job it does in your stack.
          </p>
          <div className="abm__hero-actions">
            <Link className="abm__btn abm__btn--ghost" to="/abm-ops/abm-tech-stack">
              <ArrowLeft size={16} /> The ABM tech stack explained
            </Link>
          </div>
        </div>
      </header>

      <section className="abm__section">
        <p className="abm__lead">
          A tech stack is a means to an end: the categories below map to the jobs an
          account-based program actually needs done, from sourcing target accounts to
          reaching their buying committees. Reviews are Puetto's own editorial
          assessment; each links out to G2, Capterra, and community sources so you can
          check the first-hand record yourself.
        </p>

        <div className="abm__pillargrid">
          {CATEGORIES.map((c, i) => {
            const count = getToolsInCategory(c.slug).length;
            return (
              <Link className="abm__pillarcard" to={`/abm-ops/tools/${c.slug}`} key={c.slug}>
                <span className="abm__pillarcard-num">{String(i + 1).padStart(2, '0')}</span>
                <span className="abm__pillarcard-title">{c.name}</span>
                <span className="abm__pillarcard-blurb">{c.tagline}</span>
                <span className="abm__pillarcard-cta">
                  {count > 0 ? `${count} tool${count > 1 ? 's' : ''}` : 'Coming soon'} <ArrowRight size={15} />
                </span>
              </Link>
            );
          })}
        </div>
      </section>

      <div className="abm__cta">
        <h2 className="abm__h2">Not sure which tools your stack actually needs?</h2>
        <p className="abm__p">
          The right stack follows from your strategy, not the other way around. Book a
          free ops audit and we'll map the tools to the jobs your account-based motion
          needs done.
        </p>
        <a className="abm__btn" href="/contact">Book a Free Ops Audit <ArrowRight size={18} /></a>
      </div>
    </div>
  );
}
