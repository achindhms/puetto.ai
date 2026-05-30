import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { CLUSTER, AbmCTA } from './AbmArticleLayout';
import './abm.css';

export default function AbmOpsPillar() {
  return (
    <div className="abm abm--pillar">
      <Helmet>
        <title>ABM Ops: The Complete Guide to Account-Based Marketing Operations | Puetto</title>
        <meta name="description" content="ABM Ops is the operational engine behind account-based marketing: the strategy, tech stack, signal data, and metrics that make ABM actually deliver pipeline. The complete guide." />
        <meta name="keywords" content="ABM ops, account-based marketing operations, ABM strategy, ABM tech stack, ABM metrics, B2B marketing operations, GTM ops" />
        <link rel="canonical" href="https://www.puetto.com/abm-ops" />
        <meta property="og:type" content="website" />
        <meta property="og:title" content="ABM Ops: The Complete Guide | Puetto" />
        <meta property="og:description" content="The strategy, tech stack, signal data and metrics that make account-based marketing actually deliver pipeline." />
        <meta property="og:url" content="https://www.puetto.com/abm-ops" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="ABM Ops: The Complete Guide | Puetto" />
        <meta name="twitter:description" content="The strategy, tech stack, signal data and metrics that make account-based marketing actually deliver pipeline." />
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org", "@type": "Article",
            "headline": "ABM Ops: The Complete Guide to Account-Based Marketing Operations",
            "description": "The strategy, tech stack, signal data and metrics behind account-based marketing operations.",
            "url": "https://www.puetto.com/abm-ops",
            "author": { "@type": "Organization", "name": "Puetto" },
            "publisher": { "@type": "Organization", "name": "Puetto", "url": "https://www.puetto.com" },
            "hasPart": CLUSTER.map((c) => ({ "@type": "Article", "headline": c.title, "url": `https://www.puetto.com${c.path}` }))
          })}
        </script>
      </Helmet>

      <header className="abm__hero">
        <div className="abm__hero-inner">
          <div className="abm__eyebrow">ABM OPS</div>
          <h1 className="abm__hero-title">The operating system behind <span className="abm__grad">account-based marketing</span></h1>
          <p className="abm__hero-intro">Most ABM fails not because the strategy is wrong, but because the operations behind it never get built. ABM Ops is the engine, the strategy, tech stack, signal data, and measurement, that turns a target account list into pipeline. This is the complete guide.</p>
          <div className="abm__hero-actions">
            <a className="abm__btn" href="/contact">Book a Free Ops Audit <ArrowRight size={18} /></a>
            <Link className="abm__btn abm__btn--ghost" to="/abm-ops/what-is-abm">Start with the basics <ArrowRight size={18} /></Link>
          </div>
        </div>
      </header>

      <section className="abm__section abm__section--narrow">
        <h2 className="abm__h2">What is ABM Ops?</h2>
        <p className="abm__lead">Account-based marketing concentrates your go-to-market resources on a defined set of high-fit accounts instead of spreading them across a broad audience. <strong>ABM Ops</strong> is the operational discipline that makes that concentration actually work: defining the ideal customer profile, selecting accounts, wiring the tech stack, feeding clean signal data into the CRM, orchestrating plays across channels, and measuring the right outcomes.</p>
        <p className="abm__lead">Think of ABM as the strategy and ABM Ops as the machine that runs it. A brilliant account list is worthless if your conversion events never reach the ad platforms, your CRM is full of junk leads, or nobody can prove the program generated pipeline. This guide walks through every layer, with deeper articles on each.</p>
        <div className="abm__callout">
          <p><strong>The short version:</strong> ABM Ops is what separates account-based programs that quietly get cut in the next budget cycle from the ones that earn more investment every quarter. The difference is almost never the strategy. It is the operations.</p>
        </div>
      </section>

      <section className="abm__section">
        <h2 className="abm__h2">The ABM Ops library</h2>
        <p className="abm__lead">Six deep dives covering the full account-based motion, from first principles to proving ROI. Start anywhere, or read them in order.</p>
        <div className="abm__pillargrid">
          {CLUSTER.map((c, i) => (
            <Link className="abm__pillarcard" to={c.path} key={c.path}>
              <span className="abm__pillarcard-num">0{i + 1}</span>
              <span className="abm__pillarcard-title">{c.title}</span>
              <span className="abm__pillarcard-blurb">{c.blurb}</span>
              <span className="abm__pillarcard-cta">Read the guide <ArrowRight size={15} /></span>
            </Link>
          ))}
        </div>
      </section>

      <section className="abm__section abm__section--narrow">
        <h2 className="abm__h2">The five layers of ABM Ops</h2>
        <p className="abm__lead">Every functioning account-based program is built on the same operational layers. Skip one and the whole motion underperforms.</p>
        <div className="abm__steps">
          <div className="abm__step">
            <div className="abm__stepnum">1</div>
            <div><p className="abm__steptitle">Strategy & account selection</p><p className="abm__steptext">A sharp ICP and a defensible target account list. Without this, everything downstream optimizes toward the wrong accounts. See <Link to="/abm-ops/abm-strategy-framework">how to build an ABM strategy</Link>.</p></div>
          </div>
          <div className="abm__step">
            <div className="abm__stepnum">2</div>
            <div><p className="abm__steptitle">The tech stack</p><p className="abm__steptext">The connected tools that execute and track the motion, from your CRM to ad platforms. See <Link to="/abm-ops/abm-tech-stack">the ABM tech stack explained</Link>.</p></div>
          </div>
          <div className="abm__step">
            <div className="abm__stepnum">3</div>
            <div><p className="abm__steptitle">Signal data & CRM</p><p className="abm__steptext">Clean, ICP-qualified signal flowing into a well-structured CRM. This is the layer most teams get wrong. See <Link to="/abm-ops/abm-signal-data-crm">signal data and CRM for ABM</Link>.</p></div>
          </div>
          <div className="abm__step">
            <div className="abm__stepnum">4</div>
            <div><p className="abm__steptitle">Orchestration & plays</p><p className="abm__steptext">Coordinated plays across marketing and sales so target accounts get a consistent, multi-touch experience instead of disconnected campaigns.</p></div>
          </div>
          <div className="abm__step">
            <div className="abm__stepnum">5</div>
            <div><p className="abm__steptitle">Measurement & ROI</p><p className="abm__steptext">Metrics that prove the program created pipeline and revenue, not just impressions. See <Link to="/abm-ops/abm-metrics-roi">ABM metrics and ROI that matter</Link> and model your own numbers with the <Link to="/abm-roi-calculator">ABM ROI calculator</Link>.</p></div>
          </div>
        </div>
      </section>

      <section className="abm__section abm__section--narrow">
        <h2 className="abm__h2">Is ABM right for you?</h2>
        <p className="abm__lead">ABM is not universally better than broad demand generation; it is better for specific situations, high average contract values, a finite set of identifiable target accounts, and multi-stakeholder buying committees. Most mature teams run both. We cover the trade-offs in <Link to="/abm-ops/abm-vs-demand-gen">ABM vs demand gen</Link>, and if you are new to the discipline, start with <Link to="/abm-ops/what-is-abm">what account-based marketing actually is</Link>.</p>
      </section>

      <div className="abm__section">
        <AbmCTA heading="Want ABM ops built for you?" text="Puetto configures the tools, builds the automations, and runs the day-to-day ops that make an account-based motion perform, faster than a hire and more accountable than an agency. Book a free ops audit to see where your funnel is leaking." />
      </div>
    </div>
  );
}
