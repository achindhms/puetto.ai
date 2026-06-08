import { useEffect, useRef, useMemo } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { ArrowRight } from 'lucide-react';
import {
  US_STATES, US_FEDERAL, INDIA, UAE,
  TAX_YEAR_US, TAX_YEAR_IN, slugForRegion, regionForSlug,
} from './payrollData';
import { computeUS, computeIndia, computeUAE } from './payrollCompute';
import { STATE_NOTES, RECENT_BY_TYPE, INDIA_ARTICLE, UAE_ARTICLE } from './payrollArticles';
import './PayrollGuide.css';

const CCY = { USD: '$', INR: '\u20B9', AED: 'AED ' };
const fmt = (n, ccy) => {
  const sym = CCY[ccy] || '';
  const v = Math.round(Math.abs(n)).toLocaleString(ccy === 'INR' ? 'en-IN' : 'en-US');
  return `${n < 0 ? '-' : ''}${sym}${v}`;
};
const pct = (r) => `${(r * 100).toFixed(2).replace(/\.00$/, '')}%`;

// describe the bottom and top of a progressive bracket table in words
const describeBrackets = (brackets) => {
  const real = brackets.filter(([, r]) => r > 0);
  if (!real.length) return '';
  const lowRate = pct(real[0][1]);
  const topRate = pct(real[real.length - 1][1]);
  const firstCeil = brackets[0][0];
  const lowText = firstCeil ? `The lowest band charges ${lowRate} on the first ${fmt(firstCeil, 'USD')} of taxable income.` : `The lowest band charges ${lowRate}.`;
  return `${lowText} From there the rate steps up through the bands until the top rate of ${topRate} applies to the highest incomes. There are ${brackets.length} bands in total.`;
};

// counts used in the comparison section (derived from real data, not invented)
const ALL = Object.values(US_STATES);
const N_NONE = ALL.filter((s) => s.type === 'none').length;
const N_FLAT = ALL.filter((s) => s.type === 'flat').length;
const N_PROG = ALL.filter((s) => s.type === 'progressive').length;

export default function PayrollGuide() {
  const rootRef = useRef(null);
  const { region: slug } = useParams();
  useEffect(() => {
    const nav = document.querySelector('header, nav, .navbar, [class*="navbar"], [class*="Navbar"]');
    if (nav && rootRef.current) {
      const h = nav.getBoundingClientRect().height;
      if (h > 0 && h < 200) rootRef.current.style.paddingTop = `${h + 48}px`;
    }
  }, []);

  const region = regionForSlug(slug);
  const isUS = region.startsWith('us-');
  const isIndia = region === 'india';
  const stateAbbr = isUS ? region.replace('us-', '').toUpperCase() : null;
  const st = isUS ? US_STATES[stateAbbr] : null;

  const regionName = isUS ? st.name : isIndia ? 'India' : 'United Arab Emirates';
  const yr = isUS ? TAX_YEAR_US : isIndia ? `FY ${TAX_YEAR_IN}` : '2025';
  const calcPath = `/payroll-calculator/${slugForRegion(region)}`;
  const path = `${calcPath}/guide`;

  // ---- live worked examples ----
  const examples = useMemo(() => {
    if (isUS) {
      return [60000, 100000].map((g) => ({ gross: g, r: computeUS(g, stateAbbr, 'single', 0) }));
    }
    if (isIndia) {
      return [1200000, 2400000].map((g) => ({
        gross: g, rNew: computeIndia(g, 'new', 0.5), rOld: computeIndia(g, 'old', 0.5),
      }));
    }
    return [180000, 360000].map((g) => ({ gross: g, r: computeUAE(g, 'expat') }));
  }, [isUS, isIndia, stateAbbr]);

  const title = `${regionName} Payroll Guide ${yr}: Taxes, Take-Home Pay and Deductions`;
  const description = isUS
    ? `A plain-English guide to payroll in ${regionName} for ${yr}. Federal tax, ${regionName} state tax, Social Security, Medicare, worked examples and how ${regionName} compares.`
    : isIndia
    ? `A plain-English guide to salary and payroll in India for ${yr}. New vs old regime, EPF, cess, professional tax, worked examples and recent changes.`
    : `A plain-English guide to payroll in the UAE. No income tax on salary, end-of-service gratuity, pension for nationals and worked examples.`;

  const notes = isUS ? (STATE_NOTES[stateAbbr] || []) : [];

  const faqs = useMemo(() => {
    if (isUS) return [
      { q: `How much of my paycheck goes to taxes in ${regionName}?`, a: `It depends on your salary and filing status, but every worker pays federal income tax, Social Security at 6.2 percent up to the wage base, and Medicare at 1.45 percent. ${st.type === 'none' ? `${regionName} adds no state income tax.` : st.type === 'flat' ? `${regionName} adds a flat state tax of ${pct(st.rate)}.` : `${regionName} adds a progressive state income tax.`} The calculator linked below shows the exact split for your number.` },
      { q: `Does ${regionName} tax my income?`, a: st.type === 'none' ? `No. ${regionName} does not tax earned wages.` : st.type === 'flat' ? `Yes. ${regionName} applies a single flat rate of ${pct(st.rate)} to taxable income.` : `Yes. ${regionName} uses a progressive system, so higher portions of income are taxed at higher rates.` },
      { q: `What is the difference between marginal and effective tax rate?`, a: `Your marginal rate is the rate on your last dollar earned. Your effective rate is the total tax divided by total income, which is always lower in a progressive system. The calculator reports your effective rate.` },
      { q: `Are bonuses taxed differently in ${regionName}?`, a: `Bonuses are usually withheld at a flat supplemental federal rate at the time of payment, but they are taxed as ordinary income when you file. The withholding and the final tax can differ, so a year-end reconciliation is normal.` },
    ];
    if (isIndia) return [
      { q: 'Which regime should I choose, new or old?', a: 'Choose the new regime if you claim few deductions, since the rates are lower. Choose the old regime if you claim large deductions like 80C, HRA and home loan interest. The calculator lets you toggle both for your salary.' },
      { q: 'Is income up to twelve lakh tax free?', a: `Under the new regime for ${`FY ${TAX_YEAR_IN}`}, a Section 87A rebate makes income tax nil where taxable income is at or below twelve lakh, after the standard deduction.` },
      { q: 'How is EPF calculated?', a: 'Most employees contribute twelve percent of basic pay to EPF, and the employer contributes a matching amount. It reduces take-home pay but builds retirement savings.' },
      { q: 'What is professional tax?', a: 'Professional tax is a small tax on employment set by individual states. The amount is capped and varies by state, so confirm the figure for where you work.' },
    ];
    return [
      { q: 'Is salary taxed in the UAE?', a: 'No. There is no personal income tax on salary in the UAE for residents or expatriates.' },
      { q: 'How is end-of-service gratuity calculated?', a: 'For expatriates it is based on basic salary and length of service: roughly twenty-one days of basic pay per year for the first five years, then thirty days per year, capped at two years of pay.' },
      { q: 'Do UAE nationals pay anything from salary?', a: 'UAE and GCC nationals contribute to a pension scheme. The employee pays five percent and the employer pays more. Expatriates do not contribute.' },
      { q: 'Does corporate tax affect my salary?', a: 'No. The federal corporate tax applies to business profits, not to individual salary income.' },
    ];
  }, [isUS, isIndia, regionName, st]);

  const articleLd = {
    '@context': 'https://schema.org', '@type': 'Article',
    headline: title, description,
    url: `https://www.puetto.com${path}`,
    datePublished: '2026-06-08', dateModified: '2026-06-08',
    author: { '@type': 'Organization', name: 'Puetto' },
    publisher: { '@type': 'Organization', name: 'Puetto', url: 'https://www.puetto.com' },
    mainEntityOfPage: `https://www.puetto.com${path}`,
  };
  const faqLd = {
    '@context': 'https://schema.org', '@type': 'FAQPage',
    mainEntity: faqs.map((f) => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a } })),
  };

  return (
    <div className="pg" ref={rootRef}>
      <Helmet>
        <title>{`${title} | Puetto`}</title>
        <meta name="description" content={description} />
        <meta name="keywords" content={`${regionName.toLowerCase()} payroll, ${regionName.toLowerCase()} income tax, take home pay, salary tax ${regionName.toLowerCase()}, payroll guide`} />
        <link rel="canonical" href={`https://www.puetto.com${path}`} />
        <meta property="og:type" content="article" />
        <meta property="og:title" content={`${title} | Puetto`} />
        <meta property="og:description" content={description} />
        <meta property="og:url" content={`https://www.puetto.com${path}`} />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={`${title} | Puetto`} />
        <meta name="twitter:description" content={description} />
        <script type="application/ld+json">{JSON.stringify(articleLd)}</script>
        <script type="application/ld+json">{JSON.stringify(faqLd)}</script>
      </Helmet>

      <article className="pg__wrap">
        <div className="pg__eyebrow">PAYROLL GUIDE • {yr}</div>
        <h1 className="pg__title">{regionName} Payroll <span className="pg__grad">Guide</span></h1>

        <div className="pg__lead">
          {isUS && (
            st.type === 'none'
              ? <p>If you earn a salary in {regionName}, the good news is short: there is no state income tax on your wages. That does not mean your paycheck arrives untouched. Federal income tax, Social Security and Medicare still come out before you see a cent. This guide walks through what you actually pay in {regionName} for {yr}, with worked examples and how the state stacks up against the rest of the country.</p>
              : st.type === 'flat'
              ? <p>Payroll in {regionName} is simpler than in many states because the state income tax is a single flat rate of {pct(st.rate)}. On top of that sit the federal taxes everyone pays. This guide breaks down each line that comes out of a {regionName} paycheck for {yr}, shows worked examples, and explains how the flat rate compares with the rest of the country.</p>
              : <p>Payroll in {regionName} combines federal taxes with a progressive state income tax, so higher slices of income are taxed at higher rates. This guide explains each deduction that comes out of a {regionName} paycheck for {yr}, walks through worked examples at two salary levels, and shows how {regionName} compares with other states.</p>
          )}
          {isIndia && <p>{INDIA_ARTICLE.intro} This guide covers both regimes for {yr}, the deductions that hit your salary, two worked examples, and the recent changes worth knowing.</p>}
          {region === 'uae' && <p>{UAE_ARTICLE.intro} This guide explains what you keep, how gratuity builds up over time, and what UAE and GCC nationals contribute, with worked examples.</p>}
        </div>

        <p className="pg__calc-link">
          Want the numbers for your own salary? Use the <Link to={calcPath}>{regionName} payroll calculator</Link> and come back for the detail.
        </p>

        {/* ---- US sections ---- */}
        {isUS && <>
          <h2>The federal taxes that come out everywhere</h2>
          <p>Three federal deductions apply in every state, including {regionName}. The first is federal income tax. It runs on brackets, so the rate climbs as income rises, and it is charged on your income after the standard deduction. For {yr} the standard deduction is {fmt(US_FEDERAL.standardDeduction.single, 'USD')} for a single filer and {fmt(US_FEDERAL.standardDeduction.married, 'USD')} for a married couple filing jointly. The brackets start at 10 percent and rise in steps to 37 percent at the top.</p>
          <p>The second is Social Security, withheld at 6.2 percent of wages up to an annual wage base of {fmt(US_FEDERAL.fica.socialSecurity.wageBase, 'USD')}. Earnings above that cap are not subject to Social Security tax. The third is Medicare, withheld at 1.45 percent of all wages with no cap, plus an extra 0.9 percent on wages above {fmt(US_FEDERAL.fica.medicare.addlThreshold.single, 'USD')} for a single filer. Together these payroll taxes fund retirement and health programmes and are separate from income tax.</p>

          <h2>State income tax in {regionName}</h2>
          {st.type === 'none' && <>
            <p>{regionName} is one of {N_NONE} states with no tax on wage income. For a salaried worker this is the simplest possible state position. Whatever your income, the state line on your payslip is zero, and your only deductions are the three federal ones above.</p>
            <p>It is worth being clear about what no income tax does not mean. States still need revenue, so they raise it elsewhere. That usually shows up as higher sales tax, higher property tax, or specific levies tied to the local economy. So while {regionName} leaves your paycheck alone, your total tax burden depends on what you spend and what you own, not just what you earn.</p>
          </>}
          {st.type === 'flat' && <>
            <p>{regionName} taxes income at a single flat rate of {pct(st.rate)}. Flat means the same rate applies to the first dollar and the last, so there are no brackets to track. This makes the maths easy: multiply your taxable income by {pct(st.rate)} and that is your state income tax, before any state-specific adjustments.</p>
            <p>A flat rate is simple, but it lands differently depending on income. Lower earners pay the same rate as higher earners, which critics say is less progressive than a banded system. Supporters point to the simplicity and predictability. Either way, for a {regionName} worker the state tax is straightforward to estimate.</p>
          </>}
          {st.type === 'progressive' && <>
            <p>{regionName} uses a progressive income tax. Income is split into bands, and each band is taxed at its own rate, rising as income grows. Only the income that falls inside a band is taxed at that band's rate, which is why your top rate is not the rate you pay on your whole salary.</p>
            <p>The practical effect is that two numbers matter. Your marginal rate is the rate on your next dollar, which sets how much of a raise or bonus you keep. Your effective rate is your total state tax divided by your income, which is what actually leaves your paycheck across the year. The effective rate is always lower than the marginal rate in a banded system like {regionName}'s.</p>
            <p>{describeBrackets(st.brackets)} Because only the income inside each band is taxed at that band's rate, a worker who moves into a higher band does not suddenly pay more on their whole salary. Only the portion above the threshold is taxed at the higher rate.</p>
          </>}

          <h2>Local taxes and other deductions</h2>
          {notes.length > 0
            ? <p>{notes.join(' ')} On top of any local tax, pre-tax deductions such as a 401(k) contribution or health savings account lower the income that gets taxed, so they reduce both your federal and state bill while moving money into savings or benefits.</p>
            : <p>Beyond state and federal tax, the other common deductions are voluntary. Pre-tax contributions to a 401(k) or a health savings account lower your taxable income, so they cut your tax bill while moving money into retirement or medical savings. Health insurance premiums and similar benefits are often deducted pre-tax as well.</p>}

          <h2>How withholding works on each paycheck</h2>
          <p>Tax does not arrive as one bill at the end of the year. Your employer withholds an estimate from every paycheck and sends it to the tax authorities on your behalf. How much they withhold is driven by the W-4 form you fill in when you start a job, where you note your filing status and any adjustments. Get the W-4 right and your withholding lands close to your real bill, so your refund or amount owed at tax time is small.</p>
          <p>This is why the figure on a single payslip can look different from a simple annual calculation. Withholding uses tables and assumptions that smooth tax across the year, and one-off payments like bonuses are often withheld at a flat supplemental rate. The annual return is where it all reconciles. The calculator below estimates the annual position, which is the number that matters for planning, then breaks it down per pay period so you can sense-check a payslip.</p>

          <h2>A worked example</h2>
          <p>Numbers make this concrete. Here is the estimated take-home for a single filer in {regionName} at two salary levels for {yr}, with no pre-tax deductions. These figures come straight from the same engine that powers the calculator.</p>
          <div className="pg__table">
            <div className="pg__trow pg__trow--head"><span>Line</span><b>{fmt(examples[0].gross, 'USD')}/yr</b><b>{fmt(examples[1].gross, 'USD')}/yr</b></div>
            {examples[0].r.lines.map((l, i) => (
              <div className="pg__trow" key={l.key}><span>{l.label}</span><b>{fmt(l.amount, 'USD')}</b><b>{fmt(examples[1].r.lines[i].amount, 'USD')}</b></div>
            ))}
            <div className="pg__trow pg__trow--net"><span>Take-home pay</span><b>{fmt(examples[0].r.net, 'USD')}</b><b>{fmt(examples[1].r.net, 'USD')}</b></div>
          </div>
          <p>At {fmt(examples[0].gross, 'USD')} the worker keeps about {((examples[0].r.net / examples[0].gross) * 100).toFixed(0)} percent of gross pay, and at {fmt(examples[1].gross, 'USD')} about {((examples[1].r.net / examples[1].gross) * 100).toFixed(0)} percent. The higher earner keeps a smaller share because more of their income sits in higher federal brackets{st.type === 'progressive' ? ' and higher state bands' : ''}.</p>

          <h2>How {regionName} compares</h2>
          <p>Across the country, {N_NONE} states levy no tax on wage income, {N_FLAT} use a single flat rate, and {N_PROG} use progressive brackets. {st.type === 'none' ? `${regionName} sits in the first group, which is the most favourable for take-home pay on wages, though the trade-off is usually higher sales or property taxes.` : st.type === 'flat' ? `${regionName} sits in the flat-rate group at ${pct(st.rate)}, which keeps state tax predictable regardless of income.` : `${regionName} sits in the progressive group, where the burden rises with income and high earners pay a larger share than they would in a flat or no-tax state.`} Where someone lands depends as much on their salary and spending as on the headline rate, so comparing states only by their top rate can mislead.</p>

          <h2>Major provisions at a glance</h2>
          <ul className="pg__list">
            <li>Federal income tax on a graduated scale from 10 percent to 37 percent, charged after the standard deduction.</li>
            <li>Social Security at 6.2 percent of wages up to the annual wage base of {fmt(US_FEDERAL.fica.socialSecurity.wageBase, 'USD')}.</li>
            <li>Medicare at 1.45 percent of all wages, plus 0.9 percent on high earnings.</li>
            <li>{st.type === 'none' ? `No ${regionName} state income tax on wages.` : st.type === 'flat' ? `${regionName} flat state income tax of ${pct(st.rate)}.` : `${regionName} progressive state income tax across ${st.brackets.length} bands.`}</li>
            {notes.map((n, i) => <li key={i}>{n}</li>)}
          </ul>

          <h2>Recent changes to watch</h2>
          <p>{RECENT_BY_TYPE[st.type]} Rates and thresholds in this guide reflect the latest figures in the calculator, but tax law moves, so treat them as estimates and confirm anything you rely on with the <a href={st.extra.verify} target="_blank" rel="noopener noreferrer">{regionName} tax authority</a>.</p>
        </>}

        {/* ---- India sections ---- */}
        {isIndia && <>
          <h2>The two regimes</h2>
          <p>The new regime is the default. It uses wider, lower slabs and a standard deduction of seventy-five thousand rupees, but it removes most exemptions such as HRA and the 80C deductions. The old regime keeps those deductions and a fifty thousand rupee standard deduction, but its rates are higher and its slabs narrower. The right choice is whichever leaves more in your hand after your specific deductions.</p>
          <p>On top of income tax, both regimes add a four percent health and education cess on the tax payable. Higher incomes also attract a surcharge that steps up across income bands. And before any of this, most salaried employees contribute twelve percent of their basic pay to EPF, with the employer matching it, plus a small state-set professional tax.</p>

          <h2>CTC versus take-home</h2>
          <p>Indian salaries are usually quoted as cost to company, or CTC. That headline number is not what lands in your bank account. CTC includes the employer's EPF contribution, gratuity provisions and sometimes insurance, none of which you receive as monthly cash. Your take-home is CTC minus your own EPF contribution, minus income tax, cess and professional tax, and minus any other deductions your employer applies. This is why two jobs with the same CTC can pay different amounts in hand, depending on how the package is structured.</p>
          <p>The split between basic pay and allowances matters too. EPF is calculated on basic pay, so a higher basic means a larger forced saving and a smaller monthly cheque. Under the old regime, a higher basic can also increase your House Rent Allowance exemption. The calculator lets you set basic as a share of CTC so you can see the effect.</p>

          <h2>Deductions and the old regime</h2>
          <p>The old regime rewards specific deductions. The big ones are Section 80C, which covers EPF, life insurance, certain investments and more up to a yearly limit, and House Rent Allowance, which exempts part of your rent from tax if you live in rented accommodation. Home loan interest, health insurance premiums under 80D and the National Pension System add further relief. If you claim several of these, the old regime's higher rates can still leave you better off than the new regime's lower rates.</p>
          <p>The new regime strips most of this away in exchange for lower rates and the wider rebate. For someone who rents, has a home loan and invests through 80C, the old regime may win. For someone with few deductions, the new regime usually wins. There is no universal answer, which is the whole point of comparing both.</p>

          <h2>Surcharge and cess</h2>
          <p>Two add-ons sit on top of the base income tax. The health and education cess is a flat four percent of the tax payable and applies to everyone. The surcharge is an extra charge that only affects higher incomes, stepping up across income bands once you cross fifty lakh, then one crore, and higher. The new regime caps the top surcharge rate lower than the old regime. Both are built into the calculator's figures.</p>

          <h2>How tax reaches the government</h2>
          <p>You rarely pay income tax in one lump. Your employer deducts it from your salary every month under a system called Tax Deducted at Source, or TDS, and pays it to the government on your behalf. At the start of the year your employer estimates your annual tax from the regime and the declarations you choose, then spreads that across twelve months. If you change your declared investments partway through the year, the monthly deduction adjusts to catch up.</p>
          <p>After the year ends your employer issues Form 16, a summary of the salary paid and the tax deducted. You use it to file your return, where the final tax is reconciled against what was already deducted. If too much came out you claim a refund, and if too little you pay the difference. Choosing your regime early and declaring investments accurately keeps the monthly deduction close to the real figure, which means fewer surprises at filing time.</p>

          <h2>A worked example</h2>
          <p>Here is the estimated tax under each regime at two salary levels for {yr}, assuming basic pay is half of CTC. These figures come from the same engine that powers the calculator.</p>
          <div className="pg__table">
            <div className="pg__trow pg__trow--head"><span>Annual CTC</span><b>New regime</b><b>Old regime</b></div>
            {examples.map((e) => (
              <div className="pg__trow" key={e.gross}><span>{fmt(e.gross, 'INR')}</span><b>{fmt(e.rNew.totalTax, 'INR')} tax</b><b>{fmt(e.rOld.totalTax, 'INR')} tax</b></div>
            ))}
          </div>
          <p>At lower incomes the new regime usually wins because of the wider slabs and the rebate. As deductions grow, the old regime can pull ahead. This is exactly why the calculator lets you toggle both for your own number rather than assuming one is always better.</p>

          <h2>Major provisions at a glance</h2>
          <ul className="pg__list">{INDIA_ARTICLE.highlights.map((h, i) => <li key={i}>{h}</li>)}</ul>

          <h2>Recent changes to watch</h2>
          <p>{INDIA_ARTICLE.recent} You can confirm the current slabs, rebate and cess with the <a href="https://incometaxindia.gov.in/" target="_blank" rel="noopener noreferrer">Income Tax Department</a>.</p>
        </>}

        {/* ---- UAE sections ---- */}
        {region === 'uae' && <>
          <h2>What comes out of a UAE paycheck</h2>
          <p>For most employees in the UAE, the answer is almost nothing. There is no personal income tax on salary, so an expatriate on a given salary takes home that full salary each month. The value to understand is not a deduction at all. It is the end-of-service gratuity that builds up in the background and is paid when you leave.</p>
          <p>Gratuity is calculated from basic salary and length of service. As a guide, an expatriate accrues around twenty-one days of basic pay for each of the first five years, then thirty days per year after that, capped at two years of total pay. It is not deducted from your salary. It is an employer obligation that you receive at the end of service.</p>

          <h2>How salaries are paid and protected</h2>
          <p>Most private-sector salaries in the UAE run through the Wage Protection System, an electronic scheme that requires employers to pay wages through approved channels. This exists to make sure workers are paid in full and on time, and it gives the labour ministry a record of payments. As an employee, the main thing to know is that your salary should arrive in full through this system, with no income tax skimmed off the top.</p>
          <p>Employment contracts in the UAE now run on fixed terms under the federal labour law, and the rules on notice periods and leave salary sit alongside the gratuity entitlement. When you leave a job, your final settlement typically brings together any unpaid salary, payment for untaken leave, and your accrued gratuity. Understanding these pieces matters more than tracking a tax line, because there is no income tax line to track.</p>

          <h2>A worked example</h2>
          <div className="pg__table">
            <div className="pg__trow pg__trow--head"><span>Annual salary</span><b>Net pay</b><b>Gratuity / yr</b></div>
            {examples.map((e) => (
              <div className="pg__trow" key={e.gross}><span>{fmt(e.gross, 'AED')}</span><b>{fmt(e.r.net, 'AED')}</b><b>{fmt(e.r.info.amount, 'AED')}</b></div>
            ))}
          </div>
          <p>Net pay matches gross because there is no income tax. The gratuity figure is what you accrue per year in the first five years of service. It grows with longer service and with a higher basic salary.</p>

          <h2>Nationals and pension</h2>
          <p>The picture is different for UAE and GCC nationals, who contribute to a pension scheme. The employee pays five percent of salary and the employer pays more, so a national does see a deduction that an expatriate does not. Expatriates are not part of the pension system and instead rely on the gratuity described above.</p>

          <h2>Gratuity in more detail</h2>
          <p>The headline gratuity formula is simple, but a few details change the figure. Gratuity is based on basic salary, not total pay, so allowances for housing or transport do not count toward it. Partial years are paid pro rata once you pass the first year of service. The way you leave can also matter under the labour rules, so resignation and termination are not always treated identically. Because the calculation rests on basic pay, two employees on the same total salary can accrue different gratuity if their basic components differ, which makes the basic-to-allowance split worth checking in any offer.</p>

          <h2>Planning for retirement as an expatriate</h2>
          <p>Expatriates are not part of a state pension, so the gratuity is the main employer-funded benefit at the end of service. For a long career it is meaningful, but it is not designed to fund a full retirement on its own. This is why many expatriates treat their tax-free salary as a chance to save and invest privately, setting aside what would have gone to income tax elsewhere. Some employers in the financial free zones offer workplace savings schemes that replace the traditional gratuity with regular contributions into an invested fund, which can grow more over a long period than a fixed end-of-service payment. The right approach depends on how long you plan to stay and what you do with the money you are not paying in tax.</p>

          <h2>Major provisions at a glance</h2>
          <ul className="pg__list">{UAE_ARTICLE.highlights.map((h, i) => <li key={i}>{h}</li>)}</ul>

          <h2>Why the UAE draws expatriate workers</h2>
          <p>The absence of income tax is a large part of why the UAE attracts workers from countries with heavy payroll taxes. A salary that would lose a third or more to income tax and social contributions elsewhere arrives close to whole here. That said, the comparison is not only about tax. Cost of living, housing, schooling and the lack of a state pension for expatriates all factor into whether a UAE package is as generous as it first looks. The gratuity is a real benefit, but it is modest next to the retirement savings a taxed salary might build elsewhere, so many expatriates save the difference themselves.</p>

          <h2>Recent changes to watch</h2>
          <p>{UAE_ARTICLE.recent}</p>
        </>}

        <h2>Frequently asked questions</h2>
        <div className="pg__faq">
          {faqs.map((f, i) => (
            <details key={i} className="pg__faq-item"><summary>{f.q}</summary><p>{f.a}</p></details>
          ))}
        </div>

        <div className="pg__cta">
          <p>Estimate your own {regionName} take-home pay in seconds.</p>
          <Link className="pg__btn" to={calcPath}>Open the {regionName} payroll calculator <ArrowRight size={18} /></Link>
        </div>

        <div className="pg__related">
          <h2>Related</h2>
          <div className="pg__related-grid">
            <Link to={calcPath}>{regionName} Payroll Calculator</Link>
            <Link to="/calculators">All calculators</Link>
            <Link to="/people-ops">People Ops</Link>
          </div>
        </div>

        <p className="pg__disclaimer">This guide is for general information and is not tax advice. Tax rates and rules change. Confirm any figure with the official source before relying on it.</p>
      </article>
    </div>
  );
}
