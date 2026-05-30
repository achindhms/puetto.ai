import { Link } from 'react-router-dom';
import AbmArticleLayout from './AbmArticleLayout';

export default function AbmMetricsRoi() {
  return (
    <AbmArticleLayout
      slug="/abm-ops/abm-metrics-roi"
      title="ABM Metrics & ROI That Matter"
      description="The metrics that prove account-based marketing is working, account engagement, pipeline, win rate, and ROI, and the vanity metrics that mislead. Plus how to model ABM ROI."
      keywords="ABM metrics, account based marketing ROI, ABM KPIs, account engagement, pipeline velocity, ABM measurement, marketing ROI"
      readingTime="8 min"
    >
      <p>The fastest way to lose budget for an account-based program is to be unable to prove it worked. The fastest way to grow that budget is to prove it clearly. ABM measurement is different from lead-based measurement because the unit of success is the account, not the lead, and because value often shows up over a longer horizon. This guide covers the metrics that matter and the ones that mislead. To model your own numbers as you read, use the <Link to="/abm-roi-calculator">ABM ROI calculator</Link>.</p>

      <h2>The vanity metrics to ignore</h2>
      <p>Impressions, clicks, raw lead counts, and cost per lead are easy to measure and almost useless for ABM. They reward volume, which is precisely what an account-based approach is trying to move away from. A campaign can generate thousands of clicks and zero pipeline within your target accounts. Judging ABM by these numbers is judging it by the wrong scoreboard, the same mistake covered in <Link to="/abm-ops/abm-vs-demand-gen">ABM vs demand gen</Link>.</p>

      <h2>The metrics that matter</h2>
      <ul>
        <li><strong>Account engagement</strong>, how much of your target list is actively engaging, and how deeply. This is the leading indicator that the program is working.</li>
        <li><strong>Pipeline created in target accounts</strong>, the dollar value of opportunities sourced or influenced within your named accounts.</li>
        <li><strong>Win rate on target accounts</strong>, which is typically higher than non-ABM deals because of the relationship-building involved.</li>
        <li><strong>Deal size and sales-cycle velocity</strong>, ABM often increases the former and, once relationships are built, accelerates the latter.</li>
        <li><strong>Net revenue and ROI</strong>, the bottom line: revenue generated against program cost.</li>
      </ul>

      <h2>Calculating ABM ROI</h2>
      <p>At its simplest, ABM ROI is the net return divided by program spend. The honest version walks the funnel: target accounts times your conversion rates at each stage gives closed deals, multiplied by average contract value to get revenue, minus program cost to get net return. Because every stage compounds, small improvements in conversion or signal quality, see <Link to="/abm-ops/abm-signal-data-crm">signal data and CRM</Link>, move the result far more than trimming costs.</p>

      <div className="abm__callout">
        <p><strong>Tie spend to revenue:</strong> The single most persuasive thing you can show a CFO is closed revenue attributed to the account program against what it cost. That requires the offline-conversion and CRM wiring described in the <Link to="/abm-ops/abm-tech-stack">tech stack guide</Link>.</p>
      </div>

      <h2>The measurement window problem</h2>
      <p>ABM, like most B2B motions, has a lag between spend and revenue. Measured too early, even a strong program looks unprofitable. The fix is to measure cohorts over time, looking at pipeline and revenue at 90, 180, and 365 days rather than judging a single short window. This is the same logic that makes long-cycle paid channels look better when measured correctly.</p>

      <h2>From metrics to operating discipline</h2>
      <p>Metrics only create value if they are visible and acted on. That means dashboards the whole team sees, attribution that connects activity to revenue, and a cadence of reviewing and adjusting. Building that reporting layer, without a monthly spreadsheet rebuild, is a core part of <Link to="/abm-ops">ABM Ops</Link>. The strategy tells you what to do; the metrics tell you whether it is working; the operations make both repeatable.</p>
    </AbmArticleLayout>
  );
}
