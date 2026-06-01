import React from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import AbmArticleLayout from './AbmArticleLayout';

const FAQ = [
  {
    q: 'What is a good account score threshold for the target list?',
    a: 'There is no universal number, but a common approach is to set the cutoff where score correlates with historical win rate in your own data — often somewhere in the 60–70 range on a 100-point scale. Accounts above the cutoff make the list; accounts below it are nurtured or excluded. Validate the threshold against closed-won outcomes rather than picking it arbitrarily.',
  },
  {
    q: 'How often should accounts be re-scored?',
    a: 'Fit changes slowly and can be re-checked when an account\u2019s firmographics or tech stack shift. Intent and engagement change weekly, so the composite score should refresh on a short cadence \u2014 many teams re-score at least monthly, and continuously where tooling allows.',
  },
  {
    q: 'Should the rubric be the same for every product line?',
    a: 'Not necessarily. If you sell distinct products to distinct markets, each may warrant its own fit criteria and weights. Keep separate rubrics rather than stretching one to cover everything, the same way you would keep separate ICPs.',
  },
  {
    q: 'Can you build an account scoring rubric without intent data?',
    a: 'Yes. Start with fit and engagement, which you already have in your CRM, and add an intent source later. A fit-plus-engagement rubric is a perfectly good first version and far better than no scoring at all.',
  },
];

export default function AccountScoringRubric() {
  return (
    <AbmArticleLayout
      slug="/abm-ops/account-scoring-rubric"
      title="The 100-Point Account Scoring Rubric (With Template)"
      description="A worked, adaptable 100-point account scoring rubric for ABM — per-criterion points across fit, intent, and engagement, an infographic, how to set the threshold, and how to turn scores into tiers."
      keywords="account scoring rubric, 100 point scoring, ABM scoring template, account scoring criteria, points based account scoring, target account rubric"
      readingTime="8 min"
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
        A 100-point account scoring rubric assigns explicit points to each criterion an
        account can match, producing a single score that any account can be ranked
        against — objectively, repeatably, and without politics. This article lays out
        a worked rubric you can adapt: how to distribute the 100 points across fit,
        intent, and engagement, how to set your cutoff, and how the score maps to tiers.
      </p>

      <p>
        The rubric is the concrete, points-based version of the{' '}
        <Link to="/abm-ops/account-scoring-model">account scoring model</Link>. Where
        that article explains the three inputs and how to weight them, this one shows
        the points on the page. It is the operational heart of Step 2 of the{' '}
        <Link to="/abm-ops/abm-strategy-framework">ABM strategy framework</Link>.
      </p>

      <h2>How the 100 points are distributed</h2>
      <p>
        A defensible default mirrors the model's weighting — roughly half the points to
        fit, a third to intent, and the rest to engagement:
      </p>

      <figure style={{ margin: '1.75rem 0' }}>
        <svg viewBox="0 0 640 120" xmlns="http://www.w3.org/2000/svg" style={{ width: '100%', height: 'auto', border: '1px solid var(--abm-line)', borderRadius: '12px', background: '#fff' }} role="img" aria-label="Point distribution: Fit 50 points, Intent 30 points, Engagement 20 points, totaling 100.">
          <g fontFamily="inherit">
            <text x="20" y="34" fontSize="12.5" fontWeight="700" fill="#6b7280">100-point split</text>
            {/* single stacked bar */}
            <rect x="20" y="48" width="300" height="34" fill="#FF8A3D" />
            <rect x="320" y="48" width="180" height="34" fill="#B14DFF" />
            <rect x="500" y="48" width="120" height="34" fill="#3D7BFF" />
            <text x="170" y="70" textAnchor="middle" fontSize="13" fontWeight="700" fill="#fff">Fit · 50</text>
            <text x="410" y="70" textAnchor="middle" fontSize="13" fontWeight="700" fill="#fff">Intent · 30</text>
            <text x="560" y="70" textAnchor="middle" fontSize="13" fontWeight="700" fill="#fff">Engage · 20</text>
            <text x="20" y="108" fontSize="11" fill="#9ca3af">Starting hypothesis — tune the split against your own closed-won data.</text>
          </g>
        </svg>
      </figure>

      <h3>Fit — up to 50 points</h3>
      <ul>
        <li><strong>Industry / vertical match</strong> — up to 15 points.</li>
        <li><strong>Company size band</strong> — up to 15 points.</li>
        <li><strong>Technographic match</strong> — up to 12 points.</li>
        <li><strong>Geography / region</strong> — up to 8 points.</li>
      </ul>
      <h3>Intent — up to 30 points</h3>
      <ul>
        <li><strong>Third-party intent surge</strong> — up to 15 points.</li>
        <li><strong>Trigger event</strong> — up to 10 points (funding, leadership change, expansion, hiring).</li>
        <li><strong>Competitive / category signal</strong> — up to 5 points.</li>
      </ul>
      <h3>Engagement — up to 20 points</h3>
      <ul>
        <li><strong>Website / content engagement</strong> — up to 8 points.</li>
        <li><strong>Email and ad response</strong> — up to 6 points.</li>
        <li><strong>Meetings or high-intent actions</strong> — up to 6 points.</li>
      </ul>

      <div className="abm__callout">
        <strong>Adapt the points to your evidence.</strong> These weights are a
        starting hypothesis, not gospel. If your{' '}
        <Link to="/abm-ops/validate-icp-closed-won-data">closed-won analysis</Link>{' '}
        shows technographic fit predicts wins better than industry, shift points toward
        it. The rubric should reflect what actually drives revenue in your pipeline.
      </div>

      <h2>Setting the threshold</h2>
      <p>
        Once every account has a score out of 100, set a cutoff for the target list.
        The reliable method is to plot score against historical win rate and place the
        threshold where the relationship strengthens — often in the 60–70 range, though
        yours may differ. Accounts above the line make the list; accounts below are
        nurtured until their score rises. Keep fit and intent visible alongside the
        composite so you never lose the <em>why</em> behind a score — the four
        combinations and their actions are covered in{' '}
        <Link to="/abm-ops/fit-vs-intent">fit vs. intent</Link>.
      </p>

      <h2>From score to tier</h2>
      <p>
        The ranked list is then cut into tiers. A common pattern: the top band becomes
        1:1, the next becomes 1:few, and the remaining qualifying accounts become
        1:many — with account counts sized to capacity, as covered in{' '}
        <Link to="/abm-ops/target-account-list-size">
          how big your target account list should be
        </Link>{' '}
        and <Link to="/abm-ops/abm-account-tiering">ABM account tiering</Link>. Each
        band maps to a play, an owner, and a service level, so the score always implies
        an action.
      </p>

      <h2>Keep it explainable</h2>
      <p>
        The most important property of a rubric is that sales can read it. If a rep
        cannot see why an account scored 72, they will not trust the list, and adoption
        collapses. Keep the criteria few, the points transparent, and the rubric
        documented where the whole revenue team can see it. An explainable rubric in a
        shared spreadsheet beats an opaque predictive model nobody trusts. For
        reference, frameworks like{' '}
        <a href="https://www.gartner.com/en/sales/insights/b2b-buying-journey" target="_blank" rel="noopener noreferrer">
          Gartner's work on the B2B buying journey
        </a>{' '}
        reinforce why scoring at the account and committee level — not the single lead —
        is what fits how buying groups actually decide.
      </p>

      <div className="abm__callout">
        <strong>Model the payoff.</strong> Once accounts are scored and tiered, plug
        the resulting list into our{' '}
        <Link to="/abm-roi-calculator">ABM ROI calculator</Link> to estimate the
        pipeline and return a list of that size and quality should generate.
      </div>

      <h2 id="faq">Frequently asked questions</h2>
      {FAQ.map((item) => (
        <div key={item.q}>
          <h3>{item.q}</h3>
          <p>{item.a}</p>
        </div>
      ))}

      <p>
        Built and tuned against your own data, the rubric makes account selection
        defensible — the foundation the rest of the{' '}
        <Link to="/abm-ops/abm-strategy-framework">ABM strategy framework</Link> stands
        on, and the input to{' '}
        <Link to="/abm-ops/abm-metrics-roi">how you measure ROI</Link>.
      </p>
    </AbmArticleLayout>
  );
}
