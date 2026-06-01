import React from 'react';
import { Link } from 'react-router-dom';
import AbmArticleLayout from './AbmArticleLayout';

export default function TargetAccountListSize() {
  return (
    <AbmArticleLayout
      slug="/abm-ops/target-account-list-size"
      title="How Big Should Your Target Account List Be?"
      description="How to size your ABM target account list — account-count ranges per tier, an infographic, why a focused list beats a sprawling one, and how to work backward from your team's real capacity."
      keywords="target account list size, how many target accounts, ABM account list, account count per tier, ABM list size, target account selection"
      readingTime="7 min"
    >
      <p>
        Your ABM target account list should be sized to what your team can genuinely
        execute against, not to how big you wish it were. As a directional starting
        point, many programs run a few dozen accounts at the 1:1 tier, a hundred or so
        at 1:few, and a few hundred up to around a thousand at 1:many — but the right
        numbers come from your capacity, not a template. A focused list you actually
        engage will always beat a sprawling one you only nominally target.
      </p>

      <p>
        Over-sizing the list is one of the most common ways ABM quietly degrades into
        ordinary lead generation. It is worth noting how common focused lists are in
        practice:{' '}
        <a href="https://foundryco.com/blog/blog-top-30-account-based-marketing-and-intent-data-statistics-to-know/" target="_blank" rel="noopener noreferrer">
          industry survey data
        </a>{' '}
        suggests a majority of practitioners target a thousand accounts or fewer. This
        article shows how to size the list deliberately. It builds on the{' '}
        <Link to="/abm-ops/account-scoring-model">account scoring model</Link> and{' '}
        <Link to="/abm-ops/abm-account-tiering">account tiering</Link>, both part of
        Step 2 of the{' '}
        <Link to="/abm-ops/abm-strategy-framework">ABM strategy framework</Link>.
      </p>

      <h2>Directional ranges by tier</h2>

      <figure style={{ margin: '1.75rem 0' }}>
        <svg viewBox="0 0 640 220" xmlns="http://www.w3.org/2000/svg" style={{ width: '100%', height: 'auto', border: '1px solid var(--abm-line)', borderRadius: '12px', background: '#fff' }} role="img" aria-label="Account count by tier: Tier 1 one-to-one roughly 10 to 25; Tier 2 one-to-few roughly 50 to 150; Tier 3 one-to-many roughly 200 to 1000.">
          <g fontFamily="inherit">
            <text x="20" y="36" fontSize="13" fontWeight="700" fill="#0a0a0a">Tier 1 · 1:1</text>
            <rect x="160" y="22" width="40" height="22" rx="5" fill="#FF8A3D" />
            <text x="212" y="38" fontSize="12" fill="#6b7280">~10–25 accounts · bespoke, AE-owned</text>

            <text x="20" y="100" fontSize="13" fontWeight="700" fill="#0a0a0a">Tier 2 · 1:few</text>
            <rect x="160" y="86" width="150" height="22" rx="5" fill="#B14DFF" />
            <text x="322" y="102" fontSize="12" fill="#6b7280">~50–150 accounts · SDR pods, clustered</text>

            <text x="20" y="164" fontSize="13" fontWeight="700" fill="#0a0a0a">Tier 3 · 1:many</text>
            <rect x="160" y="150" width="440" height="22" rx="5" fill="#3D7BFF" />
            <text x="160" y="196" fontSize="12" fill="#6b7280">~200–1000 accounts · demand gen, programmatic</text>
          </g>
        </svg>
        <figcaption style={{ fontSize: '0.85rem', color: 'var(--abm-muted)', marginTop: '0.5rem' }}>
          Bar width is illustrative of relative account count, not effort. Adjust every range to your capacity.
        </figcaption>
      </figure>

      <h2>Work backward from capacity</h2>
      <p>
        The single best sizing method is to start from execution capacity, not market
        size. Ask: how many accounts can each account executive run a genuinely bespoke
        1:1 program for at once? For most teams that number is small — often in the low
        tens per rep. Multiply by your number of reps and you have a defensible Tier 1
        ceiling. Then size the lower tiers using the rough five-to-ten-times step
        between tiers, again checking each against the capacity of the team that will
        run it (SDR pods for 1:few, demand gen for 1:many).
      </p>

      <h2>What pushes the numbers up or down</h2>
      <ul>
        <li><strong>Deal size.</strong> Larger ACVs justify smaller, more intensive lists — a handful of seven-figure accounts can be a complete program.</li>
        <li><strong>Team size and seniority.</strong> More reps, or more senior ones, support a larger 1:1 tier.</li>
        <li><strong>Sales-cycle length.</strong> Long, complex cycles mean each account consumes more attention for longer, capping how many you can run at once.</li>
        <li><strong>TAM.</strong> A narrow ICP in a small market may simply not contain a thousand qualifying accounts — and that is fine.</li>
      </ul>

      <div className="abm__callout">
        <strong>Size it against the math.</strong> Before you commit to a list size,
        sanity-check whether it can actually hit your pipeline target. Our{' '}
        <Link to="/abm-roi-calculator">ABM ROI calculator</Link> lets you work backward
        from account count, conversion rate, and average deal value to the pipeline a
        list of that size should produce — a fast reality check on whether your list is
        too small to hit target or too big to execute.
      </div>

      <h2>Quality over quantity</h2>
      <p>
        The temptation is always to add "just a few more" accounts. Resist it. Every
        account you add dilutes the attention available to the rest. A list of fifty
        accounts you engage deeply will out-produce a list of five hundred you touch
        occasionally. The accounts on the list should all clear your scoring threshold —
        if you are adding accounts that score below your cutoff to pad the number, the
        cutoff (or the ambition) is the problem. This is the same discipline that keeps
        the ICP from drifting too broad, one of the{' '}
        <Link to="/abm-ops/common-icp-mistakes">common ICP mistakes</Link>.
      </p>

      <h2>Start small and expand</h2>
      <p>
        It is far easier to add accounts to a list that is working than to rescue a
        program drowning in too many. Start with a list small enough that every account
        genuinely gets the treatment its tier promises, prove the motion works, then
        expand as capacity grows. The list is not fixed — re-score and re-tier on a
        regular cadence, retire accounts that show no fit or engagement, and add new
        qualifying accounts as they emerge, the same re-scoring loop described in the{' '}
        <Link to="/abm-ops/account-scoring-model">scoring model</Link>.
      </p>

      <p>
        Sized well, the target account list becomes the shared object that marketing
        and sales orchestrate around — and the denominator for{' '}
        <Link to="/abm-ops/abm-metrics-roi">how you measure ROI</Link>. Sized badly, it
        is the first thing that breaks. When in doubt, go smaller.
      </p>
    </AbmArticleLayout>
  );
}
