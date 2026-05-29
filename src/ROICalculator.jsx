import { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { TrendingUp } from 'lucide-react';
import './ROICalculator.css';

const FIELDS = [
  { key: 'acv', label: 'Enter your Annual Contract Value', suffix: null, step: 1000 },
  { key: 'accounts', label: 'Enter the number of target accounts', suffix: null, step: 1 },
  { key: 'mql', label: 'Enter the MQL rate on your target accounts (%)', suffix: '%', step: 0.1 },
  { key: 'sql', label: 'Enter your SQL conversion rate (%)', suffix: '%', step: 0.1 },
  { key: 'opp', label: 'Enter the opportunity rate (%)', suffix: '%', step: 0.1 },
  { key: 'won', label: 'Enter your Closed / Won rate (%)', suffix: '%', step: 0.1 },
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

export default function ROICalculator() {
  const [values, setValues] = useState({
    acv: '', accounts: '', mql: '', sql: '', opp: '', won: '',
  });
  const [results, setResults] = useState(null);

  const handleChange = (key) => (e) => {
    setValues((prev) => ({ ...prev, [key]: e.target.value }));
  };

  const calculate = () => {
    const acv = num(values.acv);
    const accounts = num(values.accounts);
    const mqlRate = num(values.mql) / 100;
    const sqlRate = num(values.sql) / 100;
    const oppRate = num(values.opp) / 100;
    const wonRate = num(values.won) / 100;

    const mql = accounts * mqlRate;
    const sql = mql * sqlRate;
    const opp = sql * oppRate;
    const won = opp * wonRate;
    const revenue = won * acv;

    setResults({
      mql: Math.round(mql),
      sql: Math.round(sql),
      opp: Math.round(opp),
      won: Math.round(won),
      revenue: Math.round(revenue),
    });
  };

  return (
    <div className="roi">
      <Helmet>
        <title>ROI of an Account Based Approach | Puetto</title>
        <meta
          name="description"
          content="Calculate the projected revenue of an account-based marketing approach using your contract value, target accounts, and funnel conversion rates."
        />
      </Helmet>

      <h1 className="roi__title">ROI of an Account Based Approach</h1>

      <div className="roi__form">
        {FIELDS.map((f) => (
          <div className="roi__field" key={f.key}>
            <input
              type="number"
              min="0"
              step={f.step}
              value={values[f.key]}
              onChange={handleChange(f.key)}
              placeholder={f.label}
              className="roi__input"
            />
            {f.suffix && <span className="roi__suffix">{f.suffix}</span>}
          </div>
        ))}
      </div>

      <button type="button" className="roi__button" onClick={calculate}>
        Get Your Results
      </button>

      {results && (
        <div className="roi__results">
          <div className="roi__cards">
            <div className="roi__card">
              <span className="roi__card-label">Marketing Qualified Leads</span>
              <span className="roi__card-value">{results.mql.toLocaleString()}</span>
            </div>
            <div className="roi__card">
              <span className="roi__card-label">Sales Qualified Leads</span>
              <span className="roi__card-value">{results.sql.toLocaleString()}</span>
            </div>
            <div className="roi__card">
              <span className="roi__card-label">Opportunities</span>
              <span className="roi__card-value">{results.opp.toLocaleString()}</span>
            </div>
            <div className="roi__card">
              <span className="roi__card-label">Closed / Won deals</span>
              <span className="roi__card-value">{results.won.toLocaleString()}</span>
            </div>
          </div>

          <div className="roi__revenue">
            <TrendingUp size={20} className="roi__revenue-icon" />
            <span className="roi__revenue-label">Projected Annual Revenue</span>
            <span className="roi__revenue-value">{money.format(results.revenue)}</span>
          </div>
        </div>
      )}
    </div>
  );
}
