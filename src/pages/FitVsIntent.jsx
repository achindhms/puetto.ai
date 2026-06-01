import React from 'react';
import { Link } from 'react-router-dom';
import AbmArticleLayout from './AbmArticleLayout';

export default function FitVsIntent() {
  return (
    <AbmArticleLayout
      slug="/abm-ops/fit-vs-intent"
      title="Fit vs. Intent: Should We, and Is Now the Moment?"
      description="The difference between fit and intent in account scoring — should we sell to this account, versus is now the moment — with a quadrant matrix and how to weight them to prioritize the right accounts."
      keywords="fit vs intent, account fit, buyer intent, fit and intent scoring, ABM prioritization, intent data, ideal customer profile fit"
      readingTime="7 min"
    >
      <p>
        Fit and intent answer two different questions about a target account. Fit asks{' '}
        <strong>"should we sell to this account at all?"</strong> — how closely it
        matches your ICP. Intent asks <strong>"is now the moment?"</strong> — whether
        the account is actively researching your category and showing signs of being
        in-market. Strong account prioritization keeps the two separate and combines
        them deliberately, because an account can be a perfect fit and completely
        dormant, or red-hot and a terrible fit.
      </p>

      <p>
        Conflating them into one number is among the most common scoring mistakes: you
        lose the ability to tell why an account is ranked highly, and therefore what to
        do about it. This article draws the distinction and shows how to act on each
        combination. It expands the intent and fit inputs of the{' '}
        <Link to="/abm-ops/account-scoring-model">account scoring model</Link>.
      </p>

      <h2>What each one measures</h2>
      <p>
        <strong>Fit</strong> is built from the stable attributes of an account:
        firmographics (industry, size, geography, business model) and technographics
        (the tools it runs). It is slow-moving and predictive of long-term value — the
        underlying criteria are detailed in{' '}
        <Link to="/abm-ops/icp-firmographic-technographic-behavioral">
          firmographic, technographic, and behavioral criteria explained
        </Link>.{' '}
        <strong>Intent</strong> is built from behavioral signals that suggest an
        account is in-market now: surges in third-party research, relevant hiring,
        trigger events, and first-party engagement. It is fast-moving and predictive of
        timing. Intent data comes from providers such as Bombora, G2 Buyer Intent,
        6sense, and Demandbase.
      </p>

      <div className="abm__callout">
        <strong>The core idea:</strong> fit is about <em>whether</em>; intent is about{' '}
        <em>when</em>. Both are necessary. Fit without intent gives you a great list
        with no sense of urgency; intent without fit chases activity that will not
        convert.
      </div>

      <h2>The four quadrants</h2>
      <p>
        Scoring fit and intent independently produces a simple 2×2 that maps directly
        to action:
      </p>

      <figure style={{ margin: '1.75rem 0' }}>
        <svg viewBox="0 0 520 440" xmlns="http://www.w3.org/2000/svg" style={{ width: '100%', height: 'auto', border: '1px solid var(--abm-line)', borderRadius: '12px', background: '#fff' }} role="img" aria-label="Fit versus intent quadrant matrix. High fit high intent: pursue now. High fit low intent: nurture. Low fit high intent: usually decline. Low fit low intent: ignore.">
          <g fontFamily="inherit">
            {/* quadrants */}
            <rect x="120" y="40" width="170" height="160" rx="8" fill="#f0fdf4" stroke="#e8e8ec" />
            <rect x="294" y="40" width="170" height="160" rx="8" fill="#eef6ff" stroke="#e8e8ec" />
            <rect x="120" y="204" width="170" height="160" rx="8" fill="#fef7ed" stroke="#e8e8ec" />
            <rect x="294" y="204" width="170" height="160" rx="8" fill="#f9fafb" stroke="#e8e8ec" />

            {/* top-right: high fit high intent */}
            <text x="379" y="105" textAnchor="middle" fontSize="14" fontWeight="700" fill="#0a0a0a">Pursue now</text>
            <text x="379" y="126" textAnchor="middle" fontSize="11" fill="#6b7280">High fit · high intent</text>
            <text x="379" y="146" textAnchor="middle" fontSize="11" fill="#6b7280">→ Tier 1 / Tier 2 play</text>

            {/* top-left: high fit low intent */}
            <text x="205" y="105" textAnchor="middle" fontSize="14" fontWeight="700" fill="#0a0a0a">Nurture</text>
            <text x="205" y="126" textAnchor="middle" fontSize="11" fill="#6b7280">High fit · low intent</text>
            <text x="205" y="146" textAnchor="middle" fontSize="11" fill="#6b7280">→ keep warm, watch</text>

            {/* bottom-right: low fit high intent */}
            <text x="379" y="269" textAnchor="middle" fontSize="14" fontWeight="700" fill="#0a0a0a">Usually decline</text>
            <text x="379" y="290" textAnchor="middle" fontSize="11" fill="#6b7280">Low fit · high intent</text>
            <text x="379" y="310" textAnchor="middle" fontSize="11" fill="#6b7280">→ tempting trap</text>

            {/* bottom-left: low fit low intent */}
            <text x="205" y="269" textAnchor="middle" fontSize="14" fontWeight="700" fill="#0a0a0a">Ignore</text>
            <text x="205" y="290" textAnchor="middle" fontSize="11" fill="#6b7280">Low fit · low intent</text>
            <text x="205" y="310" textAnchor="middle" fontSize="11" fill="#6b7280">→ not your market</text>

            {/* axes labels */}
            <text x="292" y="24" textAnchor="middle" fontSize="11.5" fontWeight="700" fill="#6b7280">INTENT  (low ← → high)</text>
            <text x="92" y="206" textAnchor="middle" fontSize="11.5" fontWeight="700" fill="#6b7280" transform="rotate(-90 92 206)">FIT  (low ← → high)</text>
          </g>
        </svg>
        <figcaption style={{ fontSize: '0.85rem', color: 'var(--abm-muted)', marginTop: '0.5rem' }}>
          Scoring fit and intent separately keeps the four actions distinct — a single blended score hides them.
        </figcaption>
      </figure>

      <ul>
        <li><strong>High fit / high intent — pursue now.</strong> Your priority-one accounts. Route to sales immediately with a 1:1 or 1:few play.</li>
        <li><strong>High fit / low intent — nurture.</strong> Great accounts not in-market yet. Keep them warm and watch for an intent spike that promotes them.</li>
        <li><strong>Low fit / high intent — usually decline.</strong> Activity feels like opportunity, but a poor-fit account rarely becomes a good customer.</li>
        <li><strong>Low fit / low intent — ignore.</strong> Not your market. Spend nothing.</li>
      </ul>

      <h2>How to weight them</h2>
      <p>
        Because fit predicts value and intent predicts timing, most B2B teams weight
        fit somewhat more heavily in the overall score — but the right split depends on
        your sales motion. A high-velocity, transactional motion may lean harder on
        intent; a complex enterprise motion with long cycles leans on fit, because the
        wrong logo wastes a year. The reliable approach is to back-test both weightings
        against your closed-won data and let the evidence decide, the same way you
        validated the profile in{' '}
        <Link to="/abm-ops/validate-icp-closed-won-data">
          validating your ICP using closed-won data
        </Link>.
      </p>

      <h2>How this feeds tiering</h2>
      <p>
        The fit/intent quadrant interacts with tiering: a high-fit / high-intent
        account with a large, complex buying committee is a natural Tier 1 (1:1)
        target, while a cluster of high-fit / moderate-intent accounts in one vertical
        is a natural Tier 2 (1:few) play. How those bands are sized and resourced is
        covered in <Link to="/abm-ops/abm-account-tiering">ABM account tiering</Link>,
        and the 2×2 maps cleanly onto the point bands in{' '}
        <Link to="/abm-ops/account-scoring-rubric">the 100-point scoring rubric</Link>.
      </p>

      <p>
        Keep both scores live. Fit changes slowly — re-check when an account's
        firmographics or stack shift — while intent changes weekly, so refresh it on a
        short cadence. The combination, refreshed and acted on, is what keeps your
        target list pointed at the right accounts at the right time, feeding the rest
        of the{' '}
        <Link to="/abm-ops/abm-strategy-framework">ABM strategy framework</Link>.
      </p>
    </AbmArticleLayout>
  );
}
