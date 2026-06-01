import React from 'react';
import { Link } from 'react-router-dom';
import AbmArticleLayout from './AbmArticleLayout';

export default function IcpCriteriaExplained() {
  return (
    <AbmArticleLayout
      slug="/abm-ops/icp-firmographic-technographic-behavioral"
      title="Firmographic, Technographic & Behavioral ICP Criteria Explained"
      description="The three layers of ideal-customer-profile criteria — firmographic, technographic, and behavioral/intent — with examples, the data sources for each, and how to weight them."
      keywords="firmographic criteria, technographic data, behavioral intent data, ICP criteria, ideal customer profile attributes, fit vs intent"
      readingTime="8 min"
    >
      <p>
        A predictive ideal customer profile is built from three layers of criteria:{' '}
        <strong>firmographic</strong> (who the company is), <strong>technographic</strong>{' '}
        (what it runs), and <strong>behavioral / intent</strong> (what it is doing
        right now). Firmographics and technographics establish <em>fit</em> — should
        we sell to this company at all? Behavioral signals establish <em>readiness</em>{' '}
        — is now the moment? Covering all three is what turns a profile from a static
        description into something that actually predicts which accounts will convert.
      </p>

      <p>
        Most weak ICPs use only the first layer, because firmographics are the easiest
        to source. The result is a profile that tells you which companies look right
        but nothing about which are in-market — so the target list is technically
        correct and practically inert. This article breaks down each layer, the data
        sources, and how they combine. It is the detail behind Step 1 of the{' '}
        <Link to="/abm-ops/abm-strategy-framework">ABM strategy framework</Link>; for
        the end-to-end build, see{' '}
        <Link to="/abm-ops/how-to-build-b2b-icp">how to build a B2B ICP</Link>.
      </p>

      <h2>Layer 1: Firmographic criteria</h2>
      <p>
        Firmographics are the stable, structural attributes of a company — the B2B
        equivalent of demographics. They are the backbone of every target list because
        they are reliable, widely available, and easy to filter on.
      </p>
      <ul>
        <li><strong>Industry / vertical</strong> — often the single strongest fit signal; many ICPs are vertical-specific by necessity.</li>
        <li><strong>Company size</strong> — employee headcount and/or annual revenue, usually expressed as a band (e.g. 200–1,000 employees).</li>
        <li><strong>Geography</strong> — regions you can sell, support, and contract in (data residency and language matter here).</li>
        <li><strong>Business model</strong> — B2B vs. B2C, SaaS vs. services, transactional vs. enterprise.</li>
        <li><strong>Growth stage / funding</strong> — bootstrapped vs. venture-backed, recent raises, headcount growth rate.</li>
      </ul>
      <p>
        <strong>Example:</strong> a workforce-management platform might set
        firmographic criteria of "hospitality or retail, 500–5,000 employees, multi-site
        operations, North America." Sources include ZoomInfo, Cognism, Apollo,
        Clearbit/HubSpot Breeze, and Crunchbase or PitchBook for funding and growth data.
      </p>

      <h2>Layer 2: Technographic criteria</h2>
      <p>
        Technographics describe the technology a company already uses — its CRM, cloud
        provider, marketing stack, security tooling, and any category-relevant systems.
        For software vendors this layer is frequently <em>more</em> predictive than
        firmographics, because it reveals integration fit and displacement opportunity
        directly.
      </p>
      <p>
        <strong>Example:</strong> an app that extends Salesforce should treat "runs
        Salesforce" as a near-mandatory criterion — a 5,000-person company on a
        competing CRM is a worse fit than a 500-person company on Salesforce, even
        though firmographics favor the former. Likewise, a data-integration tool might
        target companies running Snowflake; a Shopify app targets Shopify Plus
        merchants. Technographic data comes from HG Insights, BuiltWith, Enlyft,
        Datanyze, and Wappalyzer, and increasingly from enrichment platforms that bundle
        it alongside firmographics.
      </p>

      <div className="abm__callout">
        <strong>Fit, not readiness.</strong> Firmographics and technographics together
        answer "should we sell to this company?" — they describe a good match in the
        abstract. They say nothing about timing. That is the job of the third layer.
      </div>

      <h2>Layer 3: Behavioral / intent criteria</h2>
      <p>
        Behavioral signals capture what a company is doing that suggests it is
        in-market <em>now</em>. This is the layer that separates a good-fit account
        from a good-fit account worth contacting this week.
      </p>
      <ul>
        <li><strong>Research / intent surges</strong> — spikes in third-party research on your category (Bombora, G2 Buyer Intent, 6sense, Demandbase, TrustRadius).</li>
        <li><strong>Engagement</strong> — website visits, content downloads, event attendance, email and ad interaction (your CRM and marketing automation).</li>
        <li><strong>Hiring signals</strong> — job postings that imply a relevant initiative (e.g. "hiring a Head of RevOps" for an ops tool).</li>
        <li><strong>Trigger events</strong> — funding rounds, leadership changes, M&amp;A, expansion, regulatory shifts, or a public tech migration.</li>
      </ul>
      <p>
        <strong>Example:</strong> a security vendor sees an ICP-fit financial-services
        firm post three SOC-analyst roles and spike on "SIEM replacement" intent topics
        in the same month — fit was already established; this behavior says <em>now</em>.
        That account jumps the queue.
      </p>

      <h2>How the three layers combine: fit + intent</h2>
      <p>
        The three layers feed a simple, powerful model used across mature ABM programs:
        score <strong>fit</strong> (firmographic + technographic) and{' '}
        <strong>intent</strong> (behavioral) separately, then combine them. The
        distinction is worth internalizing: fit answers "should we?" and intent answers
        "is now the moment?" A high-fit / high-intent account is a priority-one target;
        a high-fit / low-intent account is a nurture; a low-fit / high-intent account is
        a tempting distraction that often should be declined. How to weight these inputs
        and convert them into a ranked, tiered list is the subject of Step 2 of the{' '}
        <Link to="/abm-ops/abm-strategy-framework">ABM strategy framework</Link>.
      </p>

      <div className="abm__callout">
        <strong>Don't over-engineer the first version.</strong> Start with three or
        four firmographic criteria, one or two technographic ones, and a single intent
        source. A tight, three-layer ICP you can actually source data for beats an
        elaborate one you can't populate — and avoids the{' '}
        <Link to="/abm-ops/common-icp-mistakes">common ICP mistakes</Link> of
        over-breadth and stale criteria.
      </div>

      <h2>Where this fits</h2>
      <p>
        These criteria are the attributes you defined when you built the profile (
        <Link to="/abm-ops/how-to-build-b2b-icp">how to build a B2B ICP</Link>) and
        confirmed during{' '}
        <Link to="/abm-ops/validate-icp-closed-won-data">validation</Link>. Once
        weighted into a scoring rubric, they produce the target account list that drives
        the rest of the program — and, downstream,{' '}
        <Link to="/abm-ops/abm-metrics-roi">how you measure ROI</Link>.
      </p>
    </AbmArticleLayout>
  );
}
