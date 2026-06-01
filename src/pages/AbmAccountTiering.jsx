import React from 'react';
import { Link } from 'react-router-dom';
import AbmArticleLayout from './AbmArticleLayout';

export default function AbmAccountTiering() {
  return (
    <AbmArticleLayout
      slug="/abm-ops/abm-account-tiering"
      title="ABM Account Tiering: 1:1, 1:Few, and 1:Many Explained"
      description="How to structure ABM tiers — 1:1, 1:few, and 1:many — with account counts, an infographic, the resource trade-offs, the plays each tier warrants, and how accounts move between tiers."
      keywords="ABM account tiering, 1:1 1:few 1:many, ABM tiers, tier 1 tier 2 tier 3, account tiering strategy, ABM resource allocation"
      readingTime="8 min"
    >
      <p>
        ABM account tiering matches investment to opportunity by sorting your target
        list into three levels: <strong>1:1</strong> (a handful of must-win accounts
        with fully bespoke programs), <strong>1:few</strong> (clusters of similar
        accounts with semi-customized plays), and <strong>1:many</strong> (a broad set
        run with scaled, lightly personalized programs). You cannot do 1:1
        personalization for a thousand accounts, and you should not run 1:many on your
        top ten — tiering is how you allocate finite effort rationally.
      </p>

      <p>
        Tiering takes the ranked output of your{' '}
        <Link to="/abm-ops/account-scoring-model">account scoring model</Link> and cuts
        it into bands, each with its own plays, owners, and service levels. It is the
        second half of Step 2 in the{' '}
        <Link to="/abm-ops/abm-strategy-framework">ABM strategy framework</Link>. This
        article covers how to size each tier, the trade-offs, and how accounts move.
      </p>

      <h2>The tiering pyramid</h2>
      <p>
        Effort per account rises as you move up; account count rises as you move down.
        The numbers below are directional starting points — size them to your team's
        real capacity:
      </p>

      <figure style={{ margin: '1.75rem 0' }}>
        <svg viewBox="0 0 640 360" xmlns="http://www.w3.org/2000/svg" style={{ width: '100%', height: 'auto', border: '1px solid var(--abm-line)', borderRadius: '12px', background: '#fff' }} role="img" aria-label="ABM tiering pyramid: Tier 1 one-to-one (10 to 25 accounts, bespoke); Tier 2 one-to-few (50 to 150 accounts, clustered); Tier 3 one-to-many (200 to 1000 accounts, programmatic).">
          <defs>
            <linearGradient id="tierGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#FF8A3D" />
              <stop offset="50%" stopColor="#B14DFF" />
              <stop offset="100%" stopColor="#3D7BFF" />
            </linearGradient>
          </defs>
          <g fontFamily="inherit">
            {/* Tier 1 */}
            <polygon points="270,30 370,30 400,118 240,118" fill="#FF8A3D" opacity="0.92" />
            <text x="320" y="68" textAnchor="middle" fontSize="15" fontWeight="700" fill="#fff">Tier 1 · 1:1</text>
            <text x="320" y="90" textAnchor="middle" fontSize="12" fill="#fff">~10–25 accounts · bespoke</text>
            {/* Tier 2 */}
            <polygon points="240,124 400,124 440,212 200,212" fill="#B14DFF" opacity="0.92" />
            <text x="320" y="162" textAnchor="middle" fontSize="15" fontWeight="700" fill="#fff">Tier 2 · 1:few</text>
            <text x="320" y="184" textAnchor="middle" fontSize="12" fill="#fff">~50–150 accounts · clustered by vertical</text>
            {/* Tier 3 */}
            <polygon points="200,218 440,218 490,318 150,318" fill="#3D7BFF" opacity="0.92" />
            <text x="320" y="258" textAnchor="middle" fontSize="15" fontWeight="700" fill="#fff">Tier 3 · 1:many</text>
            <text x="320" y="280" textAnchor="middle" fontSize="12" fill="#fff">~200–1000 accounts · programmatic, scaled</text>
            {/* side labels */}
            <text x="70" y="74" textAnchor="middle" fontSize="11.5" fontWeight="700" fill="#6b7280">EFFORT</text>
            <text x="70" y="90" textAnchor="middle" fontSize="11.5" fontWeight="700" fill="#6b7280">per account</text>
            <path d="M70 110 L 70 300" stroke="#cbd5e1" strokeWidth="2" markerEnd="" />
            <path d="M62 120 L 70 104 L 78 120" fill="none" stroke="#cbd5e1" strokeWidth="2" />
            <text x="70" y="318" textAnchor="middle" fontSize="10.5" fill="#9ca3af">low</text>
          </g>
        </svg>
        <figcaption style={{ fontSize: '0.85rem', color: 'var(--abm-muted)', marginTop: '0.5rem' }}>
          A rough rule of thumb: each tier down is ~5–10× the size of the one above, with inversely proportional effort per account.
        </figcaption>
      </figure>

      <h2>The three tiers</h2>
      <h3>Tier 1 — 1:1 (one-to-one)</h3>
      <p>
        The most resource-intensive tier, reserved for a small number of the
        highest-value, must-win accounts — typically on the order of a few dozen at
        most, often fewer. Every tactic is customized to the specific account: bespoke
        landing pages, executive-to-executive outreach, account-specific content,
        custom events, and direct mail. These are usually large enterprise deals owned
        jointly by a named account executive and the ABM team.
      </p>
      <h3>Tier 2 — 1:few (one-to-few)</h3>
      <p>
        Accounts grouped into clusters that share an industry, use case, or buying
        trigger. Personalization happens at the cluster level rather than per account:
        vertical landing pages and webinars, industry case studies, segment-specific
        ad campaigns, and SDR sequences by vertical. Tier 2 extends relevance without
        replicating Tier 1 intensity across every account. The risk is treating it
        superficially — if the clusters are just segmentation relabeled as ABM, the
        tier loses its point. The distinction is whether clusters have shared account
        plans and coordinated outreach.
      </p>
      <h3>Tier 3 — 1:many (one-to-many / programmatic)</h3>
      <p>
        The largest tier, run at scale with light personalization (company name,
        industry). Tactics are automation-heavy: programmatic display, retargeting,
        nurture sequences, content syndication, and broad LinkedIn campaigns. Scale
        does not mean dilution — accounts are still predefined and targeted, just
        addressed programmatically rather than individually.
      </p>

      <div className="abm__callout">
        <strong>The resource principle:</strong> a useful rule of thumb is that each
        tier down is roughly five-to-ten times the size of the one above, with
        inversely proportional effort per account. If a Tier 1 account gets hours of
        attention a month, a Tier 2 account gets a fraction of that, and a Tier 3
        account a fraction again. Treat the specific counts as directional and size
        them to your team's actual capacity.
      </div>

      <h2>Why committee complexity drives the tier</h2>
      <p>
        Tier assignment flows from the score, but two factors dominate: the account's
        total opportunity value and the complexity of its buying committee. This is
        where tiering meets a hard reality of modern B2B — buying groups have grown
        large.{' '}
        <a href="https://www.gartner.com/en/sales/insights/b2b-buying-journey" target="_blank" rel="noopener noreferrer">
          Gartner's research on the B2B buying journey
        </a>{' '}
        puts the typical buying group in the range of six to ten people (and sometimes
        well more), and finds that buyers spend only around 17% of their total buying
        time with potential suppliers. The more stakeholders involved, the more a
        multi-threaded 1:1 motion is justified; simpler procurement can be served
        through cluster or programmatic approaches. Mapping that committee is its own
        discipline — see{' '}
        <Link to="/abm-ops/map-buying-committee">how to map the B2B buying committee</Link>.
      </p>

      <h2>How to size your tiers</h2>
      <p>
        Tier sizing is constrained by capacity, not ambition. Work backward from what
        your team can genuinely execute: how many accounts can your AEs run truly
        bespoke programs for? That number — not a target you wish were larger — is your
        Tier 1. The broader question of total list size across all tiers is covered in{' '}
        <Link to="/abm-ops/target-account-list-size">
          how big your target account list should be
        </Link>. A focused list you actually engage beats a sprawling one you only
        nominally target.
      </p>

      <h2>Tiers are not permanent</h2>
      <p>
        Accounts should move between tiers as signals change. An intent spike or a
        leadership change can promote a Tier 3 account to Tier 2; sustained
        non-engagement can demote it. Build a regular re-tiering cadence into your
        operating rhythm rather than treating the initial assignment as fixed. This is
        the same re-scoring loop that keeps the{' '}
        <Link to="/abm-ops/account-scoring-model">scoring model</Link> honest, and it
        depends on knowing where to focus first —{' '}
        <Link to="/abm-ops/fit-vs-intent">fit vs. intent</Link> shows how to read those
        signals.
      </p>

      <div className="abm__callout">
        <strong>A note on the evolving model.</strong> Some practitioners now argue the
        1:1 / 1:few / 1:many framing — which sorts accounts by engagement ratio —
        skips the prior question of which accounts belong in each tier at all. That
        question is answered upstream, by a validated ICP and scoring model, not by the
        tiering layer itself. Tiering governs <em>how</em> you engage; the ICP governs{' '}
        <em>whom</em>.
      </div>

      <h2>Where this leads</h2>
      <p>
        Once accounts are tiered, each tier gets its own plays and the program moves
        into execution and orchestration — Steps 4 and 5 of the{' '}
        <Link to="/abm-ops/abm-strategy-framework">strategy framework</Link>. Tiering
        also feeds measurement directly: different tiers carry different conversion
        values and ROI expectations. You can model the expected return of a tier with
        our <Link to="/abm-roi-calculator">ABM ROI calculator</Link>, and the metrics
        that prove it out are covered in{' '}
        <Link to="/abm-ops/abm-metrics-roi">ABM metrics and ROI</Link>.
      </p>
    </AbmArticleLayout>
  );
}
