import { Link } from 'react-router-dom';
import AbmArticleLayout from './AbmArticleLayout';

export default function AbmStrategyFramework() {
  return (
    <AbmArticleLayout
      slug="/abm-ops/abm-strategy-framework"
      title="How to Build an ABM Strategy"
      description="A step-by-step ABM strategy framework: define your ICP, select target accounts, build a scoring rubric, design plays, and orchestrate across marketing and sales."
      keywords="ABM strategy, account based marketing strategy, ABM framework, ICP definition, target account selection, ABM plays"
      readingTime="9 min"
    >
      <p>An account-based marketing strategy is only as good as its foundations. Most ABM programs that stall do so because the early decisions, who to target and why, were never made rigorously. This framework walks through the five steps that turn ABM from an idea into an operating plan. If you are still deciding whether ABM is right for you, start with <Link to="/abm-ops/what-is-abm">what account-based marketing is</Link>.</p>

      <h2>Step 1: Define your ideal customer profile</h2>
      <p>The ICP is the spine of the whole strategy. It describes the firmographic, technographic, and behavioral characteristics of accounts most likely to become high-value, long-retaining customers. The most reliable way to build it is to analyze your existing closed-won data: which industries, company sizes, tech stacks, and triggers correlate with your best accounts? Resist the temptation to define the ICP aspirationally; ground it in evidence.</p>

      <h2>Step 2: Build a scoring rubric and select accounts</h2>
      <p>Turn the ICP into a repeatable scoring rubric, points for each firmographic, technographic, and intent criterion, so account selection is objective rather than political. A common approach is a 100-point rubric that any account can be scored against, producing a ranked target list with clear tiers (A, B, C). Tiering matters because it tells you how much effort each account warrants and what conversion value to assign downstream, which feeds directly into <Link to="/abm-ops/abm-metrics-roi">how you measure ROI</Link>.</p>

      <div className="abm__callout">
        <p><strong>Tip:</strong> Keep the initial list small enough to actually execute against. A focused list of accounts you genuinely engage beats a sprawling list you only nominally target.</p>
      </div>

      <h2>Step 3: Map the buying committee</h2>
      <p>B2B purchases are made by committees, not individuals. For each tier of account, identify the roles that influence the decision, economic buyer, champion, technical evaluator, end users, and plan how you will reach each. This is where ABM diverges sharply from lead-based marketing, which tends to treat a single form-fill as the unit of progress.</p>

      <h2>Step 4: Design the plays</h2>
      <p>A play is a coordinated sequence of touches designed to move an account from unaware to engaged to in-pipeline. Plays combine channels, targeted ads, personalized outbound, content, events, so the account experiences a coherent narrative rather than disconnected campaigns. Different tiers get different plays: one-to-one accounts may warrant bespoke content, while programmatic tiers run lighter, scaled plays.</p>

      <h2>Step 5: Orchestrate across marketing and sales</h2>
      <p>Orchestration is where strategy meets operations. Marketing and sales must work from the same account list, see the same engagement signals, and hand off without dropping context. That requires the operational layer, the connected tools and clean data, described in <Link to="/abm-ops">the ABM Ops guide</Link>. Without it, even a perfect strategy degrades into uncoordinated activity. The mechanics of that layer are covered in <Link to="/abm-ops/abm-tech-stack">the ABM tech stack</Link> and <Link to="/abm-ops/abm-signal-data-crm">signal data and CRM for ABM</Link>.</p>

      <p>Once the strategy is live, the discipline is to revisit it: re-score accounts as you learn, retire accounts that show no fit, and feed closed-won data back into the ICP so the whole system gets sharper over time.</p>
    </AbmArticleLayout>
  );
}
