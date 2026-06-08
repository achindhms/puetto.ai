import { useState, useEffect, useRef, useMemo } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { ArrowRight, AlertTriangle } from 'lucide-react';
import RelatedLinks from './RelatedLinks';
import {
  US_STATES, INDIA, UAE, PERIODS, REGION_GROUPS,
  TAX_YEAR_US, TAX_YEAR_IN, slugForRegion, regionForSlug,
} from './payrollData';
import { computeUS, computeIndia, computeUAE } from './payrollCompute';
import './PayrollCalculator.css';

const CCY = { USD: '$', INR: '\u20B9', AED: 'AED ' };
const fmt = (n, ccy) => {
  const sym = CCY[ccy] || '';
  const v = Math.round(Math.abs(n)).toLocaleString(ccy === 'INR' ? 'en-IN' : 'en-US');
  return `${n < 0 ? '-' : ''}${sym}${v}`;
};

export default function PayrollCalculator() {
  const rootRef = useRef(null);
  const { region: slug } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const nav = document.querySelector('header, nav, .navbar, [class*="navbar"], [class*="Navbar"]');
    if (nav && rootRef.current) {
      const h = nav.getBoundingClientRect().height;
      if (h > 0 && h < 200) rootRef.current.style.paddingTop = `${h + 48}px`;
    }
  }, []);

  const region = regionForSlug(slug);
  const isUS = region.startsWith('us-');
  const stateAbbr = isUS ? region.replace('us-', '').toUpperCase() : null;
  const st = isUS ? US_STATES[stateAbbr] : null;

  // shared inputs
  const [amount, setAmount] = useState(isUS ? 80000 : region === 'india' ? 1500000 : 240000);
  const [freq, setFreq] = useState('annual'); // annual | monthly
  const [period, setPeriod] = useState('annual'); // result display period
  // US
  const [filing, setFiling] = useState('single');
  const [pretax, setPretax] = useState(0);
  // India
  const [regime, setRegime] = useState('new');
  const [basicPctIN, setBasicPctIN] = useState(50);
  // UAE
  const [status, setStatus] = useState('expat');

  const annualGross = freq === 'monthly' ? amount * 12 : amount;

  const result = useMemo(() => {
    if (isUS) return computeUS(annualGross, stateAbbr, filing, pretax);
    if (region === 'india') return computeIndia(annualGross, regime, basicPctIN / 100);
    return computeUAE(annualGross, status);
  }, [isUS, region, annualGross, stateAbbr, filing, pretax, regime, basicPctIN, status]);

  const div = PERIODS.find((p) => p.id === period)?.divisor || 1;
  const ccy = result.currency;
  const takeHomePct = annualGross > 0 ? (result.net / annualGross) * 100 : 0;
  const effRate = annualGross > 0 ? (result.totalTax / annualGross) * 100 : 0;
  const maxLine = Math.max(...result.lines.map((l) => l.amount), 1);

  const onRegionChange = (e) => navigate(`/payroll-calculator/${slugForRegion(e.target.value)}`);

  // --- SEO copy, dynamic per region ---
  const regionName = isUS ? st.name : region === 'india' ? 'India' : 'United Arab Emirates';
  const yr = isUS ? TAX_YEAR_US : region === 'india' ? `FY ${TAX_YEAR_IN}` : '2025';
  const title = isUS
    ? `${regionName} Payroll Calculator ${yr}`
    : region === 'india'
    ? `India Salary & Payroll Calculator (${yr})`
    : `UAE Payroll Calculator ${yr}`;
  const path = `/payroll-calculator/${slugForRegion(region)}`;
  const description = isUS
    ? `Free ${regionName} payroll calculator. Estimate federal tax, ${regionName} state tax, Social Security and Medicare, and your take-home pay for ${yr}.`
    : region === 'india'
    ? `Free India payroll calculator for ${yr}. Compare the new and old tax regimes, EPF, cess and professional tax, and see your in-hand salary.`
    : `Free UAE payroll calculator. UAE has no personal income tax — estimate net salary, pension for nationals, and end-of-service gratuity.`;

  const faqs = useMemo(() => {
    if (isUS) return [
      { q: `How much tax is taken out of a paycheck in ${regionName}?`, a: `In ${regionName}, payroll deductions are federal income tax, Social Security (6.2%), Medicare (1.45%), and ${st.type === 'none' ? 'no state income tax' : `${regionName} state income tax`}. The exact amount depends on your salary, filing status and any pre-tax deductions.` },
      { q: `Does ${regionName} have a state income tax?`, a: st.type === 'none' ? `No. ${regionName} does not tax wage income.` : st.type === 'flat' ? `Yes. ${regionName} uses a flat rate of ${(st.rate * 100).toFixed(2)}%.` : `Yes. ${regionName} uses a progressive income tax with rates rising across income bands.` },
      { q: 'What is take-home pay?', a: 'Take-home (net) pay is your gross salary minus all taxes and deductions. This tool estimates it annually and per pay period.' },
    ];
    if (region === 'india') return [
      { q: 'Which is better, the new or old tax regime?', a: 'The new regime has lower rates but removes most deductions. The old regime is often better if you claim large deductions like 80C, HRA and home loan interest. Toggle both here to compare.' },
      { q: 'Is salary up to 12 lakh tax free under the new regime?', a: `For FY ${TAX_YEAR_IN}, a Section 87A rebate makes income tax nil where taxable income is at or below ₹12,00,000 under the new regime (after the ₹75,000 standard deduction).` },
      { q: 'Does this include EPF and professional tax?', a: 'Yes. It estimates the 12% employee EPF on basic and a typical professional tax. Professional tax is set by each state, so verify your state amount.' },
    ];
    return [
      { q: 'Is salary taxed in the UAE?', a: 'No. The UAE has no personal income tax on salaries for residents or expatriates.' },
      { q: 'What is end-of-service gratuity?', a: 'Expatriate employees accrue a gratuity payment at the end of service: roughly 21 days of basic pay per year for the first five years, then 30 days per year, capped at two years pay. This tool shows the yearly accrual.' },
      { q: 'Do UAE nationals pay anything?', a: 'UAE and GCC nationals contribute to pension (employee 5%, employer 12.5% under the GPSSA baseline). Expats do not.' },
    ];
  }, [isUS, region, regionName, st]);

  const webAppLd = {
    '@context': 'https://schema.org', '@type': 'WebApplication',
    name: `${title} | Puetto`, description,
    url: `https://www.puetto.com${path}`,
    applicationCategory: 'FinanceApplication', operatingSystem: 'Any',
    offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
  };
  const faqLd = {
    '@context': 'https://schema.org', '@type': 'FAQPage',
    mainEntity: faqs.map((f) => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a } })),
  };

  return (
    <div className="pay" ref={rootRef}>
      <Helmet>
        <title>{title} | Puetto</title>
        <meta name="description" content={description} />
        <meta name="keywords" content={`payroll calculator, ${regionName.toLowerCase()} payroll calculator, take home pay calculator, salary calculator, net pay`} />
        <link rel="canonical" href={`https://www.puetto.com${path}`} />
        <meta property="og:type" content="website" />
        <meta property="og:title" content={`${title} | Puetto`} />
        <meta property="og:description" content={description} />
        <meta property="og:url" content={`https://www.puetto.com${path}`} />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={`${title} | Puetto`} />
        <meta name="twitter:description" content={description} />
        <script type="application/ld+json">{JSON.stringify(webAppLd)}</script>
        <script type="application/ld+json">{JSON.stringify(faqLd)}</script>
      </Helmet>

      <header className="pay__hero">
        <div className="pay__eyebrow">FREE CALCULATOR</div>
        <h1 className="pay__title">{regionName} Payroll <span className="pay__grad">Calculator</span></h1>
        <p className="pay__intro">Estimate take-home pay and the taxes coming out of each paycheck. {yr}.</p>
      </header>

      <div className="pay__banner">
        <AlertTriangle size={16} />
        <span>Estimates only, for guidance. Tax rates change — verify against the {isUS ? (<a href={st.extra.verify} target="_blank" rel="noopener noreferrer">official source</a>) : region === 'india' ? (<a href="https://incometaxindia.gov.in/" target="_blank" rel="noopener noreferrer">Income Tax Department</a>) : (<a href="https://www.mohre.gov.ae/" target="_blank" rel="noopener noreferrer">MOHRE</a>)} before relying on a figure. Not tax advice.</span>
      </div>

      <div className="pay__grid">
        <section className="pay__inputs">
          <label className="pay__field">
            <span>Region</span>
            <select className="pay__select" value={region} onChange={onRegionChange}>
              {REGION_GROUPS.map((g) => (
                <optgroup key={g.label} label={g.label}>
                  {g.options.map((o) => <option key={o.id} value={o.id}>{o.label}</option>)}
                </optgroup>
              ))}
            </select>
          </label>

          <label className="pay__field">
            <span>Gross salary</span>
            <div className="pay__amount">
              <input className="pay__num" type="number" min="0" step="1000" value={amount}
                     onChange={(e) => setAmount(Math.max(0, +e.target.value))} />
              <select className="pay__select pay__select--sm" value={freq} onChange={(e) => setFreq(e.target.value)}>
                <option value="annual">per year</option>
                <option value="monthly">per month</option>
              </select>
            </div>
          </label>

          {isUS && (
            <>
              <label className="pay__field">
                <span>Filing status</span>
                <select className="pay__select" value={filing} onChange={(e) => setFiling(e.target.value)}>
                  <option value="single">Single</option>
                  <option value="married">Married filing jointly</option>
                  <option value="head">Head of household</option>
                </select>
              </label>
              <label className="pay__field">
                <span>Pre-tax deductions / year (401k, HSA)</span>
                <input className="pay__num" type="number" min="0" step="500" value={pretax}
                       onChange={(e) => setPretax(Math.max(0, +e.target.value))} />
              </label>
            </>
          )}

          {region === 'india' && (
            <>
              <div className="pay__field">
                <span>Tax regime</span>
                <div className="pay__toggle">
                  <button className={regime === 'new' ? 'on' : ''} onClick={() => setRegime('new')}>New</button>
                  <button className={regime === 'old' ? 'on' : ''} onClick={() => setRegime('old')}>Old</button>
                </div>
              </div>
              <label className="pay__field">
                <span>Basic pay as % of CTC: {basicPctIN}%</span>
                <input type="range" min="30" max="60" value={basicPctIN}
                       onChange={(e) => setBasicPctIN(+e.target.value)} />
              </label>
            </>
          )}

          {region === 'uae' && (
            <div className="pay__field">
              <span>Employee type</span>
              <div className="pay__toggle">
                <button className={status === 'expat' ? 'on' : ''} onClick={() => setStatus('expat')}>Expat</button>
                <button className={status === 'national' ? 'on' : ''} onClick={() => setStatus('national')}>UAE / GCC national</button>
              </div>
            </div>
          )}
        </section>

        <section className="pay__results">
          <div className="pay__period-tabs">
            {PERIODS.map((p) => (
              <button key={p.id} className={period === p.id ? 'on' : ''} onClick={() => setPeriod(p.id)}>{p.label}</button>
            ))}
          </div>

          <div className="pay__headline">
            <span className="pay__headline-label">Take-home pay</span>
            <span className="pay__headline-stat">{fmt(result.net / div, ccy)}</span>
            <span className="pay__headline-sub">per {PERIODS.find((p) => p.id === period).label.toLowerCase()} &nbsp;•&nbsp; {takeHomePct.toFixed(1)}% of gross</span>
          </div>

          <div className="pay__stats">
            <div className="pay__stat"><span>Gross</span><b>{fmt(annualGross / div, ccy)}</b></div>
            <div className="pay__stat"><span>Total deductions</span><b>{fmt((annualGross - result.net) / div, ccy)}</b></div>
            <div className="pay__stat"><span>Effective tax rate</span><b>{effRate.toFixed(1)}%</b></div>
          </div>

          <div className="pay__breakdown">
            {result.lines.map((l) => (
              <div className="pay__bd-row" key={l.key}>
                <div className="pay__bd-head"><span>{l.label}</span><b>{fmt(l.amount / div, ccy)}</b></div>
                <div className="pay__bd-bar"><i style={{ width: `${(l.amount / maxLine) * 100}%` }} /></div>
              </div>
            ))}
            {result.pretax > 0 && (
              <div className="pay__bd-row"><div className="pay__bd-head"><span>Pre-tax deductions</span><b>{fmt(result.pretax / div, ccy)}</b></div></div>
            )}
          </div>

          {result.info && (
            <div className="pay__info">{result.info.label}: <b>{fmt(result.info.amount, ccy)}</b> / year</div>
          )}
        </section>
      </div>

      <section className="pay__content">
        <h2>How the {regionName} payroll calculator works</h2>
        {isUS ? (
          <p>This tool estimates your annual take-home pay in {regionName} for {yr}. It applies federal income tax using the {filing === 'single' ? 'single' : filing === 'married' ? 'married filing jointly' : 'head of household'} brackets after the standard deduction, then Social Security at 6.2% up to the wage base and Medicare at 1.45%. {st.type === 'none' ? `${regionName} levies no state income tax, so your state line is zero.` : st.type === 'flat' ? `${regionName} applies a flat state income tax of ${(st.rate * 100).toFixed(2)}%.` : `${regionName} applies a progressive state income tax across several bands.`} {st.note ? st.note : ''}</p>
        ) : region === 'india' ? (
          <p>This tool estimates in-hand salary for {yr}. It applies the {regime} regime slabs after the standard deduction ({regime === 'new' ? '₹75,000' : '₹50,000'}), the Section 87A rebate, any surcharge, and a 4% health and education cess. It also subtracts the 12% employee EPF on basic pay and a typical professional tax. Switch between the new and old regime to see which leaves more in hand for your salary.</p>
        ) : (
          <p>The UAE does not tax salary income, so for most employees gross pay equals net pay. This tool shows that clearly, and for expatriates it estimates the end-of-service gratuity you accrue each year. UAE and GCC nationals contribute to the GPSSA pension at 5% (employee), which the tool deducts when you select that option.</p>
        )}
        <p>Change your salary, {isUS ? 'filing status and pre-tax deductions' : region === 'india' ? 'regime and basic-pay split' : 'employee type'} above and every figure updates instantly. Switch the result tabs to view the numbers by year, month, fortnight or week.</p>

        <h2>Frequently asked questions</h2>
        <div className="pay__faq">
          {faqs.map((f, i) => (
            <details key={i} className="pay__faq-item"><summary>{f.q}</summary><p>{f.a}</p></details>
          ))}
        </div>

        <div className="pay__cta">
          <p>Running payroll, comp bands or people-ops reporting at scale? Puetto builds the systems behind them.</p>
          <a className="pay__btn" href="/contact">Talk to Puetto <ArrowRight size={18} /></a>
        </div>

        <RelatedLinks currentPath={path} featured={['/employee-turnover-cost-calculator', '/people-ops', '/calculators']} />
      </section>
    </div>
  );
}
