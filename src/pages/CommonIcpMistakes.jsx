import React from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import AbmArticleLayout from './AbmArticleLayout';

const FAQ = [
  {
    q: 'How specific should a B2B ICP be?',
    a: 'Specific enough that a meaningful share of companies are excluded. If your ICP would let in most of your total addressable market, it is too broad to guide account selection. A useful test: could two reps independently apply it to the same list and largely agree on which accounts qualify?',
  },
  {
    q: 'How often should you review your ICP?',
    a: 'On a quarterly cadence at minimum, and immediately after any major product, pricing, or market shift. Feed every new closed-won and churned account back into the analysis so the profile sharpens rather than drifts.',
  },
  {
    q: 'Can you have more than one ICP?',
    a: 'Yes, if you genuinely sell distinct products to distinct markets — but each should be a separate, validated profile, not a single vague profile stretched to cover everything. Most teams need fewer ICPs than they think.',
  },
  {
    q: 'What is the difference between an ICP being too broad and being aspirational?',
    a: 'Too broad means the criteria exclude too few companies. Aspirational means the criteria describe the customers you wish you had (big logos, dream verticals) rather than the ones your data shows you actually win and retain. A profile can be both at once.',
  },
];

export default function CommonIcpMistakes() {
  return (
    <AbmArticleLayout
      slug="/abm-ops/common-icp-mistakes"
      title="Common ICP Mistakes: Too Broad, Aspirational, Outdated"
      description="The recurring ideal-customer-profile mistakes that quietly break ABM programs — defining it too broadly, building it aspirationally, and letting it go stale — and how to fix each."
      keywords="ICP mistakes, common ICP errors, ideal customer profile too broad, aspirational ICP, outdated ICP, ICP best practices"
      readingTime="7 min"
    >
      <Helmet>
        <script type="application/ld+json">
          {JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'FAQPage',
            mainEntity: FAQ.map((item) => ({
              '@type': 'Question',
              name: item.q,
              acceptedAnswer: { '@type': 'Answer', text: item.a },
            })),
          })}
        </script>
      </Helmet>

      <p>
        Most ideal customer profiles fail in one of three ways: they are defined too
        broadly, they are built aspirationally instead of from evidence, or they are
        allowed to go stale. Each mistake is quiet — the ICP still exists, still looks
        reasonable on a slide — but each steadily points the entire program at the
        wrong accounts. Knowing the failure modes is the fastest way to build a profile
        that holds up.
      </p>

      <p>
        These traps come up so consistently that the standard remedy is always the
        same: ground the profile in data and keep it current. This article catalogs the
        mistakes and the fix for each. For the underlying method, see{' '}
        <Link to="/abm-ops/how-to-build-b2b-icp">how to build a B2B ICP</Link> and{' '}
        <Link to="/abm-ops/validate-icp-closed-won-data">
          how to validate it using closed-won data
        </Link>.
      </p>

      <h2>Mistake 1: Too broad</h2>
      <p>
        The most common error is an ICP that excludes almost no one. "B2B companies in
        North America that need better marketing" is not a profile — it is the market.
        An over-broad ICP defeats the entire purpose of account-based marketing, which
        is concentration: pointing finite effort at the accounts most likely to pay
        off. When the list is everyone, reps fall back on personal preference and the
        program degrades into ordinary lead generation with an ABM label.
      </p>
      <p>
        <strong>The fix:</strong> narrow until the criteria genuinely disqualify a
        large share of companies. Add specificity on vertical, size band, and at least
        one technographic or trigger criterion. A focused list you can actually engage
        beats a sprawling one you only nominally target — the same discipline that
        governs target-list size in the{' '}
        <Link to="/abm-ops/abm-strategy-framework">ABM strategy framework</Link>.
      </p>

      <h2>Mistake 2: Aspirational, not evidence-based</h2>
      <p>
        The second trap is defining the ICP around the customers you <em>wish</em> you
        had — marquee logos, glamorous verticals, enterprise deals — rather than the
        ones your data shows you win and keep. Aspiration feels motivating and is
        almost always wrong: the dream accounts often have longer cycles, lower win
        rates, and worse retention than the unglamorous segment quietly driving your
        revenue.
      </p>
      <p>
        <strong>The fix:</strong> build from closed-won analysis. Pull the accounts you
        have actually won and retained profitably and abstract their shared traits, as
        described in{' '}
        <Link to="/abm-ops/validate-icp-closed-won-data">
          validating your ICP using closed-won data
        </Link>. If the evidence contradicts the aspiration, trust the evidence — or at
        minimum run the aspirational segment as a separate, explicitly experimental
        tier rather than letting it dominate the core profile.
      </p>

      <div className="abm__callout">
        <strong>A telling symptom:</strong> if your ICP was written in a leadership
        offsite and never checked against the CRM, it is probably aspirational. The
        antidote is a back-test against historical deals.
      </div>

      <h2>Mistake 3: Outdated and stale</h2>
      <p>
        An ICP set once and never revisited slowly diverges from reality. Products
        evolve, markets shift, new competitors reshape a segment, and the profile that
        was sharp 18 months ago now quietly mis-targets. Stale technographic criteria
        are especially insidious — "targets companies running [legacy tool]" can become
        actively misleading as the market migrates.
      </p>
      <p>
        <strong>The fix:</strong> treat the ICP as a living model on a quarterly review
        cadence, with every new closed-won and churned account fed back in. Owned
        jointly by marketing, sales, and RevOps, the profile should get sharper over
        time rather than ossifying.
      </p>

      <h2>Mistake 4: Confusing the ICP with a persona</h2>
      <p>
        A subtler error: writing a profile that describes a <em>person</em> (a job
        title and a set of pains) when it should describe a <em>company</em>. This
        corrupts account selection because you end up filtering on the wrong unit. Keep
        the two distinct — the difference, and why you need both, is covered in{' '}
        <Link to="/abm-ops/icp-vs-buyer-persona">ICP vs. buyer persona</Link>.
      </p>

      <h2>Mistake 5: Ignoring intent and timing</h2>
      <p>
        Finally, many ICPs capture only fit (who the company is) and omit behavioral
        signals (whether it is in-market now). The result is a list of well-matched
        accounts with no sense of priority. Add at least one intent or trigger source
        so the profile distinguishes good-fit-now from good-fit-someday — the three-layer
        approach in{' '}
        <Link to="/abm-ops/icp-firmographic-technographic-behavioral">
          firmographic, technographic, and behavioral criteria explained
        </Link>.
      </p>

      <h2 id="faq">Frequently asked questions</h2>
      {FAQ.map((item) => (
        <div key={item.q}>
          <h3>{item.q}</h3>
          <p>{item.a}</p>
        </div>
      ))}

      <p>
        Avoid these five and the profile that results is narrow, evidence-based,
        current, company-level, and timing-aware — exactly the foundation the rest of
        the{' '}
        <Link to="/abm-ops/abm-strategy-framework">ABM strategy framework</Link> is
        built on.
      </p>
    </AbmArticleLayout>
  );
}
