import { Link } from 'react-router-dom';
import AbmArticleLayout from './AbmArticleLayout';

export default function WhatIsAbm() {
  return (
    <AbmArticleLayout
      slug="/abm-ops/what-is-abm"
      title="What Is Account-Based Marketing?"
      description="A clear definition of account-based marketing (ABM): how it works, how it differs from traditional demand generation, the types of ABM, and when it makes sense for your team."
      keywords="what is account based marketing, ABM definition, account based marketing explained, ABM vs lead gen, types of ABM"
      readingTime="7 min"
    >
      <p>Account-based marketing, or ABM, is a B2B go-to-market approach that concentrates marketing and sales resources on a defined set of high-value target accounts, treating each account as a market of one rather than chasing a broad pool of leads. Instead of casting a wide net and filtering afterward, ABM starts by deciding exactly which companies are worth winning and then orchestrates a coordinated, personalized effort to win them.</p>

      <h2>How ABM flips the traditional funnel</h2>
      <p>Traditional demand generation runs top-down: attract a large audience, capture leads, qualify them, and hope enough convert. ABM runs the funnel in reverse. You begin with a finite list of accounts that match your ideal customer profile, then build awareness, engagement, and relationships within precisely those accounts. Because the targeting is deliberate from the start, conversion rates at every stage tend to be higher and deals tend to be larger.</p>
      <p>This inversion has a practical consequence: the work shifts from <em>volume</em> to <em>precision</em>. Success is measured by progress within named accounts, not by raw lead counts. If you want the full comparison, we cover it in depth in <Link to="/abm-ops/abm-vs-demand-gen">ABM vs demand gen</Link>.</p>

      <h2>The three types of ABM</h2>
      <p>ABM is usually described in three tiers, distinguished by how many accounts you target and how personalized each engagement is.</p>
      <ul>
        <li><strong>One-to-one (strategic) ABM</strong> targets a handful of the highest-value accounts with deeply customized programs, often bespoke content and dedicated account teams.</li>
        <li><strong>One-to-few (ABM lite)</strong> groups a few dozen accounts with similar needs and runs lightly personalized plays against each cluster.</li>
        <li><strong>One-to-many (programmatic) ABM</strong> uses technology to deliver ABM-style targeting and personalization across hundreds or thousands of accounts at once.</li>
      </ul>
      <p>Most mature programs run a blend, reserving one-to-one effort for the biggest opportunities while programmatic ABM covers the wider target list.</p>

      <h2>What makes ABM work operationally</h2>
      <p>The strategy is the easy part to describe and the hard part to execute. A target account list is only valuable if the operations behind it function: clean signal data reaching your ad platforms, a CRM that tracks account-level engagement, and coordinated plays across marketing and sales. That operational layer is what we call <Link to="/abm-ops">ABM Ops</Link>, and it is the difference between a program that delivers pipeline and one that quietly gets cut. The foundation is covered in <Link to="/abm-ops/abm-signal-data-crm">signal data and CRM for ABM</Link>.</p>

      <div className="abm__callout">
        <p><strong>Quick test:</strong> If your team can name the specific companies it wants to win this quarter, and your average deal is large enough that winning a handful would move the number, ABM is likely a fit.</p>
      </div>

      <h2>When ABM makes sense</h2>
      <p>ABM is not a universal upgrade over demand gen. It shines when average contract values are high, the total addressable market is a finite and identifiable set of accounts, and purchases involve multiple stakeholders over a longer sales cycle. In those conditions, concentrating resources pays off. For high-volume, low-ACV products, broad demand generation often remains more efficient. Once you have decided ABM fits, the next step is <Link to="/abm-ops/abm-strategy-framework">building the strategy</Link>, defining your ICP, selecting accounts, and designing the plays.</p>
    </AbmArticleLayout>
  );
}
