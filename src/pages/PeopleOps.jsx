import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { ArrowRight } from 'lucide-react';
import { CLUSTER, RELATED_TOOLS } from './PeopleOpsArticleLayout';
import './peopleops.css';

const SITE = 'https://www.puetto.com';
const PATH = '/people-ops';

const FAQ = [
  {
    q: 'What is fractional People Operations?',
    a: 'Fractional People Operations is senior HR and People Ops support delivered part-time, for a fraction of a full-time salary. A fractional People Ops lead runs hiring, onboarding, policy, compliance, and culture for your company without being a full-time employee.',
  },
  {
    q: 'How is People Ops different from HR?',
    a: 'HR is the traditional function covering compliance, payroll, and employee relations. People Operations takes the same responsibilities and treats the team like a product, using data and clear systems to improve hiring, onboarding, and retention. In practice the two overlap, and most small companies need one person or partner covering both.',
  },
  {
    q: 'When should a startup get People Ops support?',
    a: 'Most startups need structured People Ops once they pass roughly ten to fifteen employees, or sooner if they are hiring fast, raising a round, or operating across multiple countries. Before that, a founder usually handles it. After that, gaps in contracts, onboarding, and compliance start to cost real money.',
  },
  {
    q: 'Is fractional People Ops cheaper than a full-time hire?',
    a: 'Yes. A full-time Head of People in the US costs well into six figures plus benefits. Fractional People Ops gives you senior experience for the hours you actually use, which is usually a few days a month for an early-stage team.',
  },
  {
    q: 'What does Puetto cover under People Ops?',
    a: 'Puetto runs the full People Ops stack on a fractional basis: HR setup and compliance, hiring and onboarding systems, contracts and policy, HRIS selection, performance and retention programs, and offboarding. You get the function without a full-time team.',
  },
];

const builtSpokes = CLUSTER.filter((c) => c.built);

export default function PeopleOps() {
  const rootRef = useRef(null);
  useEffect(() => {
    const nav = document.querySelector('header, nav, .navbar, [class*="navbar"], [class*="Navbar"]');
    if (nav && rootRef.current) {
      const h = nav.getBoundingClientRect().height;
      if (h > 0 && h < 200) rootRef.current.style.paddingTop = `${h + 48}px`;
    }
  }, []);

  const collectionSchema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: 'Fractional People Operations (People Ops)',
    description:
      'A guide to fractional People Operations and HR: what it is, who it is for, what it covers, and how it compares to a full-time hire or an agency.',
    url: `${SITE}${PATH}`,
    datePublished: '2026-06-08',
    dateModified: '2026-06-08',
    author: { '@type': 'Organization', name: 'Puetto' },
    publisher: { '@type': 'Organization', name: 'Puetto', url: SITE },
    mainEntityOfPage: `${SITE}${PATH}`,
    hasPart: builtSpokes.map((s) => ({
      '@type': 'Article',
      headline: s.title,
      url: `${SITE}${s.path}`,
    })),
  };

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: SITE },
      { '@type': 'ListItem', position: 2, name: 'People Ops', item: `${SITE}${PATH}` },
    ],
  };

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: FAQ.map((f) => ({
      '@type': 'Question',
      name: f.q,
      acceptedAnswer: { '@type': 'Answer', text: f.a },
    })),
  };

  const orgSchema = {
    '@context': 'https://schema.org',
    '@type': 'ProfessionalService',
    name: 'Puetto',
    url: SITE,
    description: 'Fractional People Operations, Revenue Ops, and ABM Ops for startups and lean teams.',
    areaServed: ['United States', 'Singapore', 'United Arab Emirates', 'India'],
    serviceType: 'Fractional People Operations',
  };

  return (
    <div className="pops" ref={rootRef}>
      <Helmet>
        <title>Fractional People Operations (People Ops) | Puetto</title>
        <meta
          name="description"
          content="Fractional People Operations for startups and lean teams. Senior HR and People Ops support, part-time, without a full-time hire. See what it covers and how it compares."
        />
        <meta
          name="keywords"
          content="people operations, fractional people operations, fractional hr, people ops, outsourced hr, people ops vs hr, hr for startups"
        />
        <link rel="canonical" href={`${SITE}${PATH}`} />
        <meta property="og:type" content="website" />
        <meta property="og:title" content="Fractional People Operations (People Ops) | Puetto" />
        <meta
          property="og:description"
          content="Senior People Ops and HR support, on a fractional basis, for startups and lean teams."
        />
        <meta property="og:url" content={`${SITE}${PATH}`} />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Fractional People Operations (People Ops) | Puetto" />
        <meta
          name="twitter:description"
          content="Senior People Ops and HR support, on a fractional basis, for startups and lean teams."
        />
        <script type="application/ld+json">{JSON.stringify(collectionSchema)}</script>
        <script type="application/ld+json">{JSON.stringify(breadcrumbSchema)}</script>
        <script type="application/ld+json">{JSON.stringify(faqSchema)}</script>
        <script type="application/ld+json">{JSON.stringify(orgSchema)}</script>
      </Helmet>

      <div className="pops__wrap pops__wrap--wide">
        <nav className="pops__crumb" aria-label="Breadcrumb">
          <Link to="/">Home</Link><span>/</span>People Ops
        </nav>

        <header className="pops__hero">
          <p className="pops__eyebrow">People Ops</p>
          <h1>
            Fractional <span className="pops__grad">People Operations</span>
          </h1>
          <p className="pops__lead">
            Fractional People Operations is senior HR and People Ops support delivered part-time, for a
            fraction of a full-time salary. You get the function a growing team needs without the cost of a
            full-time Head of People.
          </p>
          <Link className="pops__btn" to="/contact">
            Book a free People Ops audit <ArrowRight size={18} />
          </Link>
        </header>

        <div className="pops__wrap" style={{ padding: 0 }}>
          <h2>What is People Operations?</h2>
          <p>
            People Operations is the function that runs everything related to your team: hiring, onboarding,
            contracts, payroll setup, policy, compliance, performance, and offboarding. It is the modern name
            for HR, with more focus on systems and data and less on paperwork. A good People Ops setup means a
            new hire signs a clean contract, lands in a clear onboarding flow, and knows how they will be
            reviewed, all without the founder doing it by hand.
          </p>
          <p>
            For a deeper breakdown of how the two terms differ, read{' '}
            <Link to="/people-ops/people-operations-vs-hr">People Operations vs HR</Link>.
          </p>

          <div className="pops__stats">
            <div className="pops__stat">
              <div className="n">10-15</div>
              <div className="l">Headcount where most teams need structured People Ops</div>
            </div>
            <div className="pops__stat">
              <div className="n">$160k+</div>
              <div className="l">Typical loaded cost of a full-time US Head of People</div>
            </div>
            <div className="pops__stat">
              <div className="n">A few days</div>
              <div className="l">What an early-stage team actually needs per month</div>
            </div>
          </div>
          <p style={{ fontSize: '0.85rem', color: '#6b7280' }}>
            Figures above are directional. Verify current salary benchmarks for your market before quoting them.
          </p>

          <h2>Who needs fractional People Ops?</h2>
          <p>
            Fractional People Ops fits companies that have outgrown founder-run HR but cannot justify a
            full-time People hire yet. That is most startups between roughly ten and fifty people. It also fits
            teams hiring fast, raising a round, or operating across borders, where a mistake in contracts or
            compliance gets expensive quickly.
          </p>
          <ul>
            <li>Startups past ten employees with no dedicated People person.</li>
            <li>Founders spending hours on offers, contracts, and onboarding instead of the product.</li>
            <li>Teams hiring across multiple countries who need compliant contracts.</li>
            <li>Companies raising a round who need clean People systems for due diligence.</li>
          </ul>
          <p>
            If that sounds like your stage, the{' '}
            <Link to="/people-ops/hr-for-startups">HR for startups guide</Link> walks through exactly what to
            set up and when.
          </p>

          <h2>Fractional People Ops vs full-time vs agency</h2>
          <p>
            There are three common ways to cover the People function. The right one depends on your headcount,
            your budget, and how much senior judgment you need.
          </p>
          <div className="pops__tablewrap">
            <table>
              <thead>
                <tr>
                  <th>Option</th>
                  <th>Best for</th>
                  <th>Cost</th>
                  <th>Trade-off</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td><strong>Founder-run HR</strong></td>
                  <td>Under 10 people</td>
                  <td>Founder time</td>
                  <td>Eats focus, gaps appear as you grow</td>
                </tr>
                <tr>
                  <td><strong>Fractional People Ops</strong></td>
                  <td>10 to 50 people</td>
                  <td>A few days a month</td>
                  <td>Not on-site full-time</td>
                </tr>
                <tr>
                  <td><strong>Full-time Head of People</strong></td>
                  <td>50+ people</td>
                  <td>$160k+ loaded</td>
                  <td>Heavy cost before the workload justifies it</td>
                </tr>
                <tr>
                  <td><strong>Traditional HR agency</strong></td>
                  <td>Compliance-only needs</td>
                  <td>Retainer or per-task</td>
                  <td>Often junior, transactional, less strategic</td>
                </tr>
              </tbody>
            </table>
          </div>
          <div className="pops__callout">
            <p>
              <strong>Key takeaway:</strong> fractional People Ops gives you senior, strategic support at the
              stage where a full-time hire is too expensive and founder-run HR has started to break. For the
              full case for and against handing it off, read{' '}
              <Link to="/people-ops/outsourcing-hr-pros-and-cons">the pros and cons of outsourcing HR</Link>.
            </p>
          </div>

          <h2>What Puetto covers under People Ops</h2>
          <p>
            Puetto runs the People function end to end on a fractional basis. You bring the team and the goals.
            We bring the systems, the compliance, and the senior judgment.
          </p>
          <ul>
            <li>HR setup and compliance across the markets you operate in.</li>
            <li>Hiring and onboarding systems that new hires actually remember.</li>
            <li>Contracts, policies, and an employee handbook that hold up.</li>
            <li>HRIS selection and setup, so your data lives in one place.</li>
            <li>Performance reviews and retention programs that reduce avoidable churn.</li>
            <li>Clean offboarding that protects the company and the brand.</li>
          </ul>
          <p>
            New to the model? Start with{' '}
            <Link to="/people-ops/what-is-fractional-hr">What is fractional HR?</Link> for a plain definition
            and when it makes sense.
          </p>

          <h2>People Ops guides</h2>
          <p>Work through the cluster, starting wherever fits your stage:</p>
          <div className="pops__grid">
            {builtSpokes.map((s) => (
              <Link className="pops__card" to={s.path} key={s.path}>
                <h3>{s.title}</h3>
                <p>{s.blurb}</p>
              </Link>
            ))}
          </div>

          <section className="pops__related" aria-label="Tools">
            <h2>People Ops tools</h2>
            <div className="pops__related-cols">
              <div>
                <h3>Calculators</h3>
                <ul>
                  {RELATED_TOOLS.map((t) => (
                    <li key={t.path}><Link to={t.path}>{t.title}</Link></li>
                  ))}
                </ul>
              </div>
              <div>
                <h3>Other Puetto clusters</h3>
                <ul>
                  <li><Link to="/abm-ops">ABM Ops</Link></li>
                  <li><Link to="/revenue-ops">Revenue Ops</Link></li>
                </ul>
              </div>
            </div>
          </section>

          <section className="pops__faq" aria-label="Frequently asked questions">
            <h2>Frequently asked questions</h2>
            {FAQ.map((f, i) => (
              <div className="pops__faq-item" key={i}>
                <h3>{f.q}</h3>
                <p>{f.a}</p>
              </div>
            ))}
          </section>

          <section className="pops__cta">
            <h2>Get People Ops without a full-time hire</h2>
            <p>
              Tell us your headcount and where it hurts. We will map the gaps and show you what fractional
              People Ops would cover for your team.
            </p>
            <Link className="pops__btn" to="/contact">
              Book a free People Ops audit <ArrowRight size={18} />
            </Link>
          </section>
        </div>
      </div>
    </div>
  );
}
