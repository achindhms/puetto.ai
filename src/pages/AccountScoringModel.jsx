import React from 'react';
import { Link } from 'react-router-dom';
import AbmArticleLayout from './AbmArticleLayout';

export default function AccountScoringModel() {
  return (
    <AbmArticleLayout
      slug="/abm-ops/account-scoring-model"
      title="How to Build an Account Scoring Model (Fit + Intent + Engagement)"
      description="Turn your ICP into an objective account scoring model using three weighted inputs — fit, intent, and engagement — with a worked example, an infographic, weighting guidance, and the tools to operationalize it."
      keywords="account scoring model, ABM account scoring, fit intent engagement, account scoring rubric, predictive scoring, account prioritization"
      readingTime="9 min"
    >
      <p>
        An account scoring model turns your ideal customer profile into a single,
        objective number that ranks every target account — so selection is repeatable
        and evidence-led rather than political. The model used across mature
        account-based programs combines three weighted inputs: <strong>fit</strong>{' '}
        (how well an account matches your ICP), <strong>intent</strong> (whether it is
        researching your category now), and <strong>engagement</strong> (how it is
        interacting with you). Score each, weight them, and combine into one
        prioritization score.
      </p>

      <p>
        The discipline matters because the alternative is a list of "dream accounts"
        someone picked in a meeting — which is wishful thinking, not ABM. A scoring
        model forces every account onto the same ruler, and the payoff is real:
        organizations with a strongly defined ICP have been found to win at materially
        higher rates than those targeting broadly (a widely cited figure compiled in{' '}
        <a href="https://foundryco.com/blog/blog-top-30-account-based-marketing-and-intent-data-statistics-to-know/" target="_blank" rel="noopener noreferrer">
          Foundry's ABM statistics roundup
        </a>{' '}
        puts the win-rate uplift around 68%). This article shows how to build the
        model. It assumes you already have a validated profile; if not, start with{' '}
        <Link to="/abm-ops/how-to-build-b2b-icp">how to build a B2B ICP</Link>. Scoring
        is Step 2 of the broader{' '}
        <Link to="/abm-ops/abm-strategy-framework">ABM strategy framework</Link>.
      </p>

      <h2>The model at a glance</h2>
      <p>
        Three inputs flow into one weighted score, which sorts the account list into
        tiers and triggers a play:
      </p>

      <figure style={{ margin: '1.75rem 0' }}>
        <svg viewBox="0 0 720 320" xmlns="http://www.w3.org/2000/svg" style={{ width: '100%', height: 'auto', border: '1px solid var(--abm-line)', borderRadius: '12px', background: '#fff' }} role="img" aria-label="Account scoring flow: fit, intent, and engagement combine into a weighted score that maps to tiers and plays.">
          <defs>
            <linearGradient id="asmGrad" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="#FF8A3D" />
              <stop offset="38%" stopColor="#FF4D6D" />
              <stop offset="68%" stopColor="#B14DFF" />
              <stop offset="100%" stopColor="#3D7BFF" />
            </linearGradient>
          </defs>
          <g fontFamily="inherit">
            <rect x="24" y="40" width="170" height="58" rx="10" fill="#f7f7f8" stroke="#e8e8ec" />
            <text x="109" y="65" textAnchor="middle" fontSize="15" fontWeight="700" fill="#0a0a0a">Fit</text>
            <text x="109" y="84" textAnchor="middle" fontSize="11.5" fill="#6b7280">Firmo + technographic · 50%</text>

            <rect x="24" y="131" width="170" height="58" rx="10" fill="#f7f7f8" stroke="#e8e8ec" />
            <text x="109" y="156" textAnchor="middle" fontSize="15" fontWeight="700" fill="#0a0a0a">Intent</text>
            <text x="109" y="175" textAnchor="middle" fontSize="11.5" fill="#6b7280">Research + triggers · 30%</text>

            <rect x="24" y="222" width="170" height="58" rx="10" fill="#f7f7f8" stroke="#e8e8ec" />
            <text x="109" y="247" textAnchor="middle" fontSize="15" fontWeight="700" fill="#0a0a0a">Engagement</text>
            <text x="109" y="266" textAnchor="middle" fontSize="11.5" fill="#6b7280">First-party activity · 20%</text>

            <path d="M194 69 C 250 69, 250 150, 300 150" fill="none" stroke="#cbd5e1" strokeWidth="2" />
            <path d="M194 160 L 300 158" fill="none" stroke="#cbd5e1" strokeWidth="2" />
            <path d="M194 251 C 250 251, 250 170, 300 170" fill="none" stroke="#cbd5e1" strokeWidth="2" />

            <circle cx="372" cy="160" r="62" fill="none" stroke="url(#asmGrad)" strokeWidth="6" />
            <text x="372" y="150" textAnchor="middle" fontSize="13" fill="#6b7280">Composite</text>
            <text x="372" y="180" textAnchor="middle" fontSize="26" fontWeight="700" fill="#0a0a0a">/100</text>

            <path d="M434 160 L 486 160" fill="none" stroke="#cbd5e1" strokeWidth="2" />

            <rect x="492" y="58" width="204" height="48" rx="10" fill="#fff" stroke="#e8e8ec" />
            <text x="504" y="80" fontSize="13" fontWeight="700" fill="#0a0a0a">Tier 1 · 1:1</text>
            <text x="504" y="97" fontSize="11" fill="#6b7280">Bespoke, must-win</text>

            <rect x="492" y="136" width="204" height="48" rx="10" fill="#fff" stroke="#e8e8ec" />
            <text x="504" y="158" fontSize="13" fontWeight="700" fill="#0a0a0a">Tier 2 · 1:few</text>
            <text x="504" y="175" fontSize="11" fill="#6b7280">Clustered by vertical</text>

            <rect x="492" y="214" width="204" height="48" rx="10" fill="#fff" stroke="#e8e8ec" />
            <text x="504" y="236" fontSize="13" fontWeight="700" fill="#0a0a0a">Tier 3 · 1:many</text>
            <text x="504" y="253" fontSize="11" fill="#6b7280">Programmatic, scaled</text>
          </g>
        </svg>
        <figcaption style={{ fontSize: '0.85rem', color: 'var(--abm-muted)', marginTop: '0.5rem' }}>
          Fit, intent, and engagement combine into one weighted score that maps to a tier and a play.
        </figcaption>
      </figure>

      <h2>The three inputs</h2>
      <h3>1. Fit — "should we sell to this account?"</h3>
      <p>
        Fit measures how closely an account matches your ICP across firmographic and
        technographic criteria: industry, size, geography, business model, and tech
        stack. It is the most stable input and usually the heaviest weighted, because
        a poor-fit account rarely becomes a good customer no matter how engaged it
        looks. The criteria behind fit are broken down in{' '}
        <Link to="/abm-ops/icp-firmographic-technographic-behavioral">
          firmographic, technographic, and behavioral criteria explained
        </Link>.
      </p>
      <h3>2. Intent — "is now the moment?"</h3>
      <p>
        Intent measures whether an account is actively in-market: third-party research
        surges on your category, relevant hiring, trigger events. Fit answers whether
        you <em>should</em> pursue an account; intent answers whether <em>now</em> is
        the time. Intent data comes from providers such as Bombora, G2 Buyer Intent,
        6sense, and Demandbase. The fit-versus-intent distinction is important enough
        to warrant its own treatment — see{' '}
        <Link to="/abm-ops/fit-vs-intent">fit vs. intent</Link>.
      </p>
      <h3>3. Engagement — "are they responding to us?"</h3>
      <p>
        Engagement measures first-party interaction: website visits, content
        downloads, email and ad response, event attendance, meetings booked. It is the
        signal that an account is moving from aware to interested, and it lives in your
        CRM and marketing automation (HubSpot, Salesforce, Marketo).
      </p>

      <div className="abm__callout">
        <strong>Keep fit and readiness separate.</strong> A common mistake is folding
        intent into fit and producing one muddy number. Score them independently so
        you can tell a high-fit / low-intent account (nurture) from a high-fit /
        high-intent account (pursue now) — the actions are completely different.
      </div>

      <h2>Weighting the inputs</h2>
      <p>
        There is no universal split, but a defensible starting point for many B2B teams
        is to weight fit most heavily, then intent, then engagement — for example
        roughly 50% fit, 30% intent, 20% engagement — and then tune against your own
        closed-won data. The principle: weight the input that best predicts revenue in{' '}
        <em>your</em> pipeline. If your back-test shows intent surges precede your wins
        more reliably than firmographic fit, raise the intent weight. Treat the
        weights as hypotheses you validate, exactly as you validated the ICP in{' '}
        <Link to="/abm-ops/validate-icp-closed-won-data">
          validating your ICP using closed-won data
        </Link>.
      </p>

      <h2>A worked example</h2>
      <p>
        Suppose a B2B SaaS company scores each input out of 100, then applies the
        50/30/20 weights:
      </p>
      <ul>
        <li><strong>Account A</strong> — Fit 90, Intent 70, Engagement 40 → (0.5×90)+(0.3×70)+(0.2×40) = 45 + 21 + 8 = <strong>74</strong></li>
        <li><strong>Account B</strong> — Fit 50, Intent 95, Engagement 80 → (0.5×50)+(0.3×95)+(0.2×80) = 25 + 28.5 + 16 = <strong>69.5</strong></li>
      </ul>
      <p>
        The model surfaces both as priorities but tells a different story about{' '}
        <em>why</em>: Account A is a strong-fit account worth a considered 1:1 approach,
        while Account B is hot but a weaker fit — pursue it, but watch that the fit gap
        does not become a retention problem later. That nuance is exactly what a single
        muddy number would hide.
      </p>

      <h2>From score to action — and to ROI</h2>
      <p>
        A score is only useful if each band maps to a clear action — a play, an owner,
        and a service level. This is where scoring connects to tiering: the ranked list
        is cut into tiers (1:1, 1:few, 1:many) that govern how much effort each account
        warrants. That mechanism is covered in{' '}
        <Link to="/abm-ops/abm-account-tiering">ABM account tiering</Link>, and the
        question of how many accounts belong in the list at all is covered in{' '}
        <Link to="/abm-ops/target-account-list-size">
          how big your target account list should be
        </Link>. If sales cannot explain why an account scored "hot," adoption
        collapses — so keep the model explainable, not a black box.
      </p>

      <div className="abm__callout">
        <strong>Put numbers on it.</strong> Once accounts are scored and tiered, you
        can model the pipeline a tier is likely to produce. Our{' '}
        <Link to="/abm-roi-calculator">ABM ROI calculator</Link> lets you plug in
        account counts, conversion rates, and deal values to estimate return before you
        commit the spend.
      </div>

      <h2>Tools</h2>
      <p>
        You can build a first model in a spreadsheet from CRM exports plus an intent
        feed, and many teams should. As volume grows, native CRM scoring (HubSpot,
        Salesforce) handles fit and engagement, while predictive and intent platforms
        (6sense, Demandbase, MadKudu) model propensity and surface intent at scale.
        Enrichment providers (ZoomInfo, Clearbit, Cognism) keep the firmographic and
        technographic inputs current. As always, an explainable model in a spreadsheet
        beats an opaque one in an expensive platform.
      </p>

      <div className="abm__callout">
        <strong>Want the points laid out?</strong> For a concrete, adaptable rubric
        with a per-criterion point breakdown, see{' '}
        <Link to="/abm-ops/account-scoring-rubric">the 100-point account scoring rubric</Link>.
      </div>

      <h2>Keep it live</h2>
      <p>
        Re-score accounts on a regular cadence as intent and engagement shift, and feed
        every new closed-won and churned account back into the weights so the model
        sharpens over time. A scoring model is a living system, not a one-time
        spreadsheet — the same maintenance discipline that keeps the{' '}
        <Link to="/abm-ops/abm-strategy-framework">overall strategy</Link> sharp, and
        that ultimately feeds{' '}
        <Link to="/abm-ops/abm-metrics-roi">how you measure ROI</Link>.
      </p>
    </AbmArticleLayout>
  );
}
