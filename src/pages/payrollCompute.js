// payrollCompute.js
// Pure functions. No React, no DOM. Easy to test.
import { US_FEDERAL, US_STATES, INDIA, UAE } from './payrollData';

// Progressive bracket tax. brackets: [[upTo|null, rate], ...]
export function bracketTax(income, brackets) {
  let tax = 0;
  let prev = 0;
  for (const [upTo, rate] of brackets) {
    const ceil = upTo == null ? Infinity : upTo;
    if (income > prev) {
      const slice = Math.min(income, ceil) - prev;
      tax += slice * rate;
      prev = ceil;
    } else break;
  }
  return tax;
}

// ---- United States ----
export function computeUS(annualGross, stateAbbr, filing = 'single', pretax = 0) {
  const F = US_FEDERAL;
  const taxableForFed = Math.max(0, annualGross - pretax - F.standardDeduction[filing]);
  const federalIncome = bracketTax(taxableForFed, F.brackets[filing]);

  const ss = Math.min(annualGross - pretax, F.fica.socialSecurity.wageBase) * F.fica.socialSecurity.rate;
  const med = (annualGross - pretax) * F.fica.medicare.rate;
  const addlBase = Math.max(0, (annualGross - pretax) - F.fica.medicare.addlThreshold[filing]);
  const addlMed = addlBase * F.fica.medicare.addlRate;

  const st = US_STATES[stateAbbr];
  let stateIncome = 0;
  let stateExtra = 0;
  let stateExtraLabel = '';
  if (st) {
    const stateTaxable = Math.max(0, annualGross - pretax);
    if (st.type === 'flat') stateIncome = stateTaxable * st.rate;
    else if (st.type === 'progressive') stateIncome = bracketTax(stateTaxable, st.brackets);
    if (st.sdiRate) { stateExtra = stateTaxable * st.sdiRate; stateExtraLabel = 'State disability (SDI)'; }
  }

  const lines = [
    { key: 'federal', label: 'Federal income tax', amount: federalIncome },
    { key: 'ss', label: 'Social Security (6.2%)', amount: ss },
    { key: 'medicare', label: 'Medicare (1.45%)', amount: med + addlMed },
    { key: 'state', label: `${st ? st.name : 'State'} income tax`, amount: stateIncome },
  ];
  if (stateExtra > 0) lines.push({ key: 'sdi', label: stateExtraLabel, amount: stateExtra });

  const totalDeductions = lines.reduce((a, l) => a + l.amount, 0) + pretax;
  const net = annualGross - totalDeductions;
  return { currency: 'USD', gross: annualGross, lines, pretax, totalTax: totalDeductions - pretax, net };
}

// ---- India ----
export function computeIndia(annualGross, regime = 'new', basicPct = 0.5) {
  const I = INDIA;
  const sd = I.standardDeduction[regime];
  const taxable = Math.max(0, annualGross - sd);
  let tax = bracketTax(taxable, I.regimes[regime]);

  // 87A rebate: if taxable income at/under threshold, income tax becomes nil.
  if (taxable <= I.rebate87A[regime]) tax = 0;

  // surcharge on tax above income thresholds
  let surchargeRate = 0;
  for (const [upTo, rate] of I.surcharge) {
    if (upTo == null || annualGross <= upTo) { surchargeRate = rate; break; }
  }
  const surcharge = tax * surchargeRate;
  const cess = (tax + surcharge) * I.cess;
  const incomeTaxTotal = tax + surcharge + cess;

  const epf = annualGross * basicPct * I.epfRate; // employee share, on basic
  const ptax = I.professionalTaxAnnual.default;

  const lines = [
    { key: 'income', label: `Income tax (${regime} regime)`, amount: tax },
  ];
  if (surcharge > 0) lines.push({ key: 'surcharge', label: 'Surcharge', amount: surcharge });
  lines.push({ key: 'cess', label: 'Health & education cess (4%)', amount: cess });
  lines.push({ key: 'epf', label: 'Employee EPF (12% of basic)', amount: epf });
  lines.push({ key: 'ptax', label: 'Professional tax', amount: ptax });

  const totalDeductions = lines.reduce((a, l) => a + l.amount, 0);
  const net = annualGross - totalDeductions;
  return { currency: 'INR', gross: annualGross, lines, totalTax: incomeTaxTotal, net };
}

// ---- UAE ----
export function computeUAE(annualGross, status = 'expat', basicPct = 0.6) {
  const U = UAE;
  const lines = [];
  if (status === 'national') {
    const pension = annualGross * U.pension.employeeRate;
    lines.push({ key: 'pension', label: 'GPSSA pension (employee 5%)', amount: pension });
  } else {
    lines.push({ key: 'tax', label: 'Income tax', amount: 0 });
  }
  const totalDeductions = lines.reduce((a, l) => a + l.amount, 0);
  const net = annualGross - totalDeductions;

  // gratuity is an employer accrual, shown as info (not deducted from net)
  const basicAnnual = annualGross * basicPct;
  const dailyBasic = basicAnnual / 365;
  const gratuityYr1to5 = dailyBasic * U.gratuity.daysFirst5;
  const info = status === 'expat'
    ? { label: 'End-of-service gratuity accrued (per year, first 5 yrs)', amount: gratuityYr1to5 }
    : { label: 'Employer pension contribution (12.5%)', amount: annualGross * U.pension.employerRate };

  return { currency: 'AED', gross: annualGross, lines, totalTax: totalDeductions, net, info };
}
