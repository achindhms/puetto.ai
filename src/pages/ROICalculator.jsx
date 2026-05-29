import { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { ArrowRight } from 'lucide-react';
import './ROICalculator.css';

const FIELDS = [
  { key: 'acv', label: 'Annual contract value', hint: 'Average revenue per closed deal, per year', prefix: '$', isPercent: false },
  { key: 'accounts', label: 'Number of target accounts', hint: 'Accounts in your ABM program', prefix: null, isPercent: false },
  { key: 'mql', label: 'MQL rate on target accounts', hint: 'Share of accounts that become marketing-qualified', suffix: '%', isPercent: true },
  { key: 'sql', label: 'SQL conversion rate', hint: 'MQLs that progress to sales-qualified', suffix: '%', isPercent: true },
  { key: 'opp', label: 'Opportunity rate', hint: 'SQLs that become real opportunities', suffix: '%', isPercent: true },
  { key: 'won', label: 'Closed / won rate', hint: 'Opportunities that close as revenue', suffix: '%', isPercent: true },
  { key: 'spend', label: 'Program spend (annual)', hint: 'Total you invest in the ABM program per year', prefix: '$', isPercent: false },
];

const num = (v) => {
  const n = parseFloat(v);
  return Number.isNaN(n) ? 0 : n;
};

const money = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
  maximumFractionDigits: 0,
});

const count = new Intl.NumberFormat('en-US', { maximumFractionDigits: 0 });

export default function ROICalculator() {
  const [values, setValues] = useState({
    acv: '', accounts: '', mql: '', sql: '', opp: '', won: '', spend: '',
  });
  const [results, setResults] = useState(null);

  const handleChange = (field) => (e) => {
    let val = e.target.value;
    if (field.isPercent && val !== '' && parseFloat(val) > 100) val = '100';
    setValues((prev) => ({ ...prev, [field.key]: val }));
  };

  const calculate = () => {
    const acv = num(values.acv);
    const accounts = num(values.accounts);
    const spend = num(values.spend);
    const mqlRate = Math.min(num(values.mql), 100) / 100;
    const sqlRate = Math.min(num(values.sql), 100) / 100;
    const oppRate = Math.min(num(values.opp), 100) / 100;
    const wonRate = Math.min(num(values.won), 100) / 100;

    const mql = accounts * mqlRate;
    const sql = mql * sqlRate;
    const opp = sql * oppRate;
    const won = opp * wonRate;
    const revenue = won * acv;

    const netReturn = revenue - spend;
    const roi = spend > 0 ? (netReturn / spend) * 100 : null;
    const paybackMonths = revenue > 0 ? (spend / revenue) * 12 : null;

    setResults({
      mql: Math.round(mql),
      sql: Math.round(sql),
      opp: Math.round(opp),
      won: Math.round(won),
      revenue: Math.round(revenue),
      spend: Math.round(spend),
      netReturn: Math.round(netReturn),
      roi,
      paybackMonths,
    });
  };

  return (
    <div className="roi">
      <Helmet>
        <title>ABM ROI Calculator | Account-Based Marketing Revenue & Payback | Puetto</title>
        <meta
          name="description"
          content="Free ABM ROI calculator. Model the revenue, ROI and payback period of an account-based marketing program from your contract value, target accounts and funnel conversion rates."
        />
        <meta name="keywords" content="ABM ROI calculator, account based marketing ROI, ABM revenue calculator, marketing payback period, B2B pipeline calculator, GTM ops" />
        <link rel="canonical" href="https://puetto.ai/roi-calculator" />
        <meta property="og:type" content="website" />
        <meta property="og:title" content="ABM ROI Calculator | Puetto" />
        <meta property="og:description" content="Model the revenue, ROI and payback period of an account-based marketing program in seconds." />
        <meta property="og:url" content="https://puetto.ai/roi-calculator" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="ABM ROI Calculator | Puetto" />
        <meta name="twitter:description" content="Model the revenue, ROI and payback period of an account-based marketing program in seconds." />
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebApplication",
            "name": "ABM ROI Calculator",
            "applicationCategory": "BusinessApplication",
            "operatingSystem": "Web",
            "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD" },
            "description": "Model the revenue, ROI and payback period of an account-based marketing program.",
            "url": "https://puetto.ai/roi-calculator",
            "publisher": { "@type": "Organization", "name": "Puetto" }
          })}
        </script>
      </Helmet>

      <header className="roi__hero">
        <span className="roi__badge">ABM ROI CALCULATOR</span>
        <h1 className="roi__title">
          See the <span className="roi__gradient">real ROI</span> of an account-based approach
        </h1>
        <p className="roi__intro">
          Account-based marketing concentrates spend on the accounts most likely to
          close. This calculator walks your funnel from target accounts down to closed
          revenue, then shows the return and payback period against what you invest.
          Enter your numbers below.
        </p>
      </header>

      <div className="roi__form">
        {FIELDS.map((f) => (
          <label className="roi__field" key={f.key}>
            <span className="roi__label">{f.label}</span>
            <span className="roi__hint">{f.hint}</span>
            <span className="roi__inputwrap">
              {f.prefix && <span className="roi__affix roi__affix--prefix">{f.prefix}</span>}
              <input
                type="number"
                min="0"
                max={f.isPercent ? 100 : undefined}
                step="any"
                value={values[f.key]}
                onChange={handleChange(f)}
                placeholder="0"
                className={`roi__input${f.prefix ? ' roi__input--prefixed' : ''}${f.suffix ? ' roi__input--suffixed' : ''}`}
              />
              {f.suffix && <span className="roi__affix roi__affix--suffix">{f.suffix}</span>}
            </span>
          </label>
        ))}
      </div>

      <button type="button" className="roi__button" onClick={calculate}>
        Get your results <ArrowRight size={18} />
      </button>

      {results && (
        <div className="roi__results">
          <div className="roi__funnel">
            <div className="roi__stat">
              <span className="roi__stat-label">Marketing qualified leads</span>
              <span className="roi__stat-value">{count.format(results.mql)}</span>
            </div>
            <div className="roi__stat">
              <span className="roi__stat-label">Sales qualified leads</span>
              <span className="roi__stat-value">{count.format(results.sql)}</span>
            </div>
            <div className="roi__stat">
              <span className="roi__stat-label">Opportunities</span>
              <span className="roi__stat-value">{count.format(results.opp)}</span>
            </div>
            <div className="roi__stat">
              <span className="roi__stat-label">Closed / won deals</span>
              <span className="roi__stat-value">{count.format(results.won)}</span>
            </div>
          </div>

          <div className="roi__headline">
            <span className="roi__headline-label">Projected annual revenue</span>
            <span className="roi__headline-value roi__gradient">{money.format(results.revenue)}</span>
          </div>

          <div className="roi__returns">
            <div className="roi__return">
              <span className="roi__return-label">Net return</span>
              <span className="roi__return-value">{money.format(results.netReturn)}</span>
            </div>
            <div className="roi__return">
              <span className="roi__return-label">ROI</span>
              <span className="roi__return-value">
                {results.roi === null ? '—' : `${count.format(Math.round(results.roi))}%`}
              </span>
            </div>
            <div className="roi__return">
              <span className="roi__return-label">Payback period</span>
              <span className="roi__return-value">
                {results.paybackMonths === null
                  ? '—'
                  : results.paybackMonths < 12
                    ? `${results.paybackMonths.toFixed(1)} mo`
                    : `${(results.paybackMonths / 12).toFixed(1)} yr`}
              </span>
            </div>
          </div>

          <p className="roi__disclaimer">
            Figures are directional estimates based on the rates you entered. Net return
            and ROI compare projected revenue against your stated annual program spend.
          </p>
        </div>
      )}

      <section className="roi__content">
        <h2>How the ABM ROI calculation works</h2>
        <p>
          The calculator models a standard B2B funnel. It starts with your target account
          list and applies each conversion rate in sequence: accounts become marketing
          qualified leads, MQLs convert to sales qualified leads, SQLs turn into
          opportunities, and a share of those opportunities close as revenue. Multiplying
          the closed-won deals by your average annual contract value gives projected
          revenue. Subtracting your program spend produces net return, and dividing spend
          by revenue gives the payback period.
        </p>

        <h2>Why account-based marketing changes the math</h2>
        <p>
          Traditional demand generation spreads budget across a wide audience and accepts
          low conversion at the top. An account-based approach inverts that. By focusing
          resources on a defined set of high-fit accounts, conversion rates at every stage
          tend to rise, deal sizes are larger, and sales cycles are more predictable. The
          result is a funnel where fewer inputs produce more revenue, which is why ABM
          programs often show stronger ROI and faster payback than broad-based campaigns.
        </p>

        <h2>What good ABM funnel benchmarks look like</h2>
        <p>
          Benchmarks vary by industry and deal size, but ABM programs typically see MQL
          rates on target accounts well above blended marketing averages, SQL conversion
          in the double digits, and closed-won rates that reflect the higher intent of
          pre-qualified accounts. Use your own historical data where you have it. If you
          are early and lack reliable numbers, model conservative rates first, then see how
          sensitive your projected revenue is to small improvements at each stage.
        </p>

        <h2>Turning the projection into an operating system</h2>
        <p>
          A strong projection is only useful if the underlying operations can deliver it.
          That means a clean CRM, automations that move accounts through the funnel without
          manual handoffs, and reporting that ties spend to closed revenue. Puetto configures
          the tools, builds the automations, and runs the day-to-day ops that make an
          account-based motion actually hit its numbers, faster than a hire and more
          accountable than an agency.
        </p>

        <div className="roi__cta">
          <h2>Want help hitting these numbers?</h2>
          <p>
            Book a free ops audit and we'll show you where your funnel is leaking revenue
            and what it would take to close the gap.
          </p>
          <a className="roi__button roi__button--cta" href="/contact">
            Book a Free Ops Audit <ArrowRight size={18} />
          </a>
        </div>
      </section>
    </div>
  );
}
