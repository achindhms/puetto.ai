// payrollData.js
// Single source of truth for the programmatic payroll calculator.
// Every rate here is a best-effort figure for the tax year noted and MUST be
// verified against the linked official source before relying on it.
// Add or fix a region here — the component never needs to change.

export const TAX_YEAR_US = 2025;
export const TAX_YEAR_IN = '2025-26'; // FY (AY 2026-27)
export const TAX_YEAR_AE = 2025;

export const PERIODS = [
  { id: 'annual', label: 'Year', divisor: 1 },
  { id: 'monthly', label: 'Month', divisor: 12 },
  { id: 'biweekly', label: 'Bi-weekly', divisor: 26 },
  { id: 'weekly', label: 'Week', divisor: 52 },
];

// ---------------------------------------------------------------------------
// UNITED STATES — federal
// ---------------------------------------------------------------------------
// 2025 figures. Verify: https://www.irs.gov/
export const US_FEDERAL = {
  standardDeduction: { single: 15000, married: 30000, head: 22500 },
  // [upTo, rate] — rate applies to income between previous upTo and this upTo.
  // null upTo = top bracket. Income here is AFTER the standard deduction.
  brackets: {
    single: [
      [11925, 0.10], [48475, 0.12], [103350, 0.22], [197300, 0.24],
      [250525, 0.32], [626350, 0.35], [null, 0.37],
    ],
    married: [
      [23850, 0.10], [96950, 0.12], [206700, 0.22], [394600, 0.24],
      [501050, 0.32], [751600, 0.35], [null, 0.37],
    ],
    head: [
      [17000, 0.10], [64850, 0.12], [103350, 0.22], [197300, 0.24],
      [250500, 0.32], [626350, 0.35], [null, 0.37],
    ],
  },
  fica: {
    socialSecurity: { rate: 0.062, wageBase: 176100 },
    medicare: { rate: 0.0145, addlRate: 0.009, addlThreshold: { single: 200000, married: 250000, head: 200000 } },
  },
};

// ---------------------------------------------------------------------------
// UNITED STATES — states + DC
// ---------------------------------------------------------------------------
// type: 'none' | 'flat' | 'progressive'
// flat:        { rate }
// progressive: { brackets: [[upTo, rate], ...] }  (single-filer basis)
// Optional: extra(income) -> $ for state add-ons (e.g. CA SDI). Keep simple.
// Every state has a `verify` link to its Dept. of Revenue.
const S = (name, abbr, type, data, extra) => ({ name, abbr, type, ...data, extra });

export const US_STATES = {
  AL: S('Alabama', 'AL', 'progressive', { brackets: [[500, 0.02], [3000, 0.04], [null, 0.05]] }, { verify: 'https://www.revenue.alabama.gov/' }),
  AK: S('Alaska', 'AK', 'none', { note: 'No state income tax.' }, { verify: 'https://tax.alaska.gov/' }),
  AZ: S('Arizona', 'AZ', 'flat', { rate: 0.025 }, { verify: 'https://azdor.gov/' }),
  AR: S('Arkansas', 'AR', 'progressive', { brackets: [[4500, 0.02], [8500, 0.039], [null, 0.039]] }, { verify: 'https://www.dfa.arkansas.gov/' }),
  CA: S('California', 'CA', 'progressive', {
    brackets: [[10756, 0.01], [25499, 0.02], [40245, 0.04], [55866, 0.06], [70606, 0.08], [360659, 0.093], [432787, 0.103], [721314, 0.113], [null, 0.123]],
    sdiRate: 0.011, // 2025 SDI, no wage cap
  }, { verify: 'https://www.ftb.ca.gov/' }),
  CO: S('Colorado', 'CO', 'flat', { rate: 0.044 }, { verify: 'https://tax.colorado.gov/' }),
  CT: S('Connecticut', 'CT', 'progressive', { brackets: [[10000, 0.02], [50000, 0.045], [100000, 0.055], [200000, 0.06], [250000, 0.065], [500000, 0.069], [null, 0.0699]] }, { verify: 'https://portal.ct.gov/drs' }),
  DE: S('Delaware', 'DE', 'progressive', { brackets: [[2000, 0], [5000, 0.022], [10000, 0.039], [20000, 0.048], [25000, 0.052], [60000, 0.0555], [null, 0.066]] }, { verify: 'https://revenue.delaware.gov/' }),
  DC: S('District of Columbia', 'DC', 'progressive', { brackets: [[10000, 0.04], [40000, 0.06], [60000, 0.065], [250000, 0.085], [500000, 0.0925], [1000000, 0.0975], [null, 0.1075]] }, { verify: 'https://otr.cfo.dc.gov/' }),
  FL: S('Florida', 'FL', 'none', { note: 'No state income tax.' }, { verify: 'https://floridarevenue.com/' }),
  GA: S('Georgia', 'GA', 'flat', { rate: 0.0539 }, { verify: 'https://dor.georgia.gov/' }),
  HI: S('Hawaii', 'HI', 'progressive', { brackets: [[9600, 0.014], [14400, 0.032], [19200, 0.055], [24000, 0.064], [36000, 0.068], [48000, 0.072], [150000, 0.076], [175000, 0.079], [200000, 0.0825], [null, 0.11]] }, { verify: 'https://tax.hawaii.gov/' }),
  ID: S('Idaho', 'ID', 'flat', { rate: 0.05695 }, { verify: 'https://tax.idaho.gov/' }),
  IL: S('Illinois', 'IL', 'flat', { rate: 0.0495 }, { verify: 'https://tax.illinois.gov/' }),
  IN: S('Indiana', 'IN', 'flat', { rate: 0.03 }, { verify: 'https://www.in.gov/dor/', note: 'Counties levy additional local income tax.' }),
  IA: S('Iowa', 'IA', 'flat', { rate: 0.038 }, { verify: 'https://tax.iowa.gov/' }),
  KS: S('Kansas', 'KS', 'progressive', { brackets: [[23000, 0.052], [null, 0.0558]] }, { verify: 'https://www.ksrevenue.gov/' }),
  KY: S('Kentucky', 'KY', 'flat', { rate: 0.04 }, { verify: 'https://revenue.ky.gov/' }),
  LA: S('Louisiana', 'LA', 'flat', { rate: 0.03 }, { verify: 'https://revenue.louisiana.gov/' }),
  ME: S('Maine', 'ME', 'progressive', { brackets: [[26050, 0.058], [61600, 0.0675], [null, 0.0715]] }, { verify: 'https://www.maine.gov/revenue/' }),
  MD: S('Maryland', 'MD', 'progressive', { brackets: [[1000, 0.02], [2000, 0.03], [3000, 0.04], [100000, 0.0475], [125000, 0.05], [150000, 0.0525], [250000, 0.055], [null, 0.0575]], note: 'Counties add 2.25%–3.20% local tax.' }, { verify: 'https://www.marylandtaxes.gov/' }),
  MA: S('Massachusetts', 'MA', 'flat', { rate: 0.05, note: '4% surtax on income above $1M.' }, { verify: 'https://www.mass.gov/dor' }),
  MI: S('Michigan', 'MI', 'flat', { rate: 0.0425 }, { verify: 'https://www.michigan.gov/taxes' }),
  MN: S('Minnesota', 'MN', 'progressive', { brackets: [[31690, 0.0535], [104090, 0.068], [193240, 0.0785], [null, 0.0985]] }, { verify: 'https://www.revenue.state.mn.us/' }),
  MS: S('Mississippi', 'MS', 'flat', { rate: 0.044, note: 'Applies to taxable income above $10,000.' }, { verify: 'https://www.dor.ms.gov/' }),
  MO: S('Missouri', 'MO', 'progressive', { brackets: [[1313, 0], [2626, 0.02], [3939, 0.025], [5252, 0.03], [6565, 0.035], [7878, 0.04], [9191, 0.045], [null, 0.047]] }, { verify: 'https://dor.mo.gov/' }),
  MT: S('Montana', 'MT', 'progressive', { brackets: [[20500, 0.047], [null, 0.059]] }, { verify: 'https://mtrevenue.gov/' }),
  NE: S('Nebraska', 'NE', 'progressive', { brackets: [[3700, 0.0246], [22170, 0.0351], [35730, 0.0501], [null, 0.052]] }, { verify: 'https://revenue.nebraska.gov/' }),
  NV: S('Nevada', 'NV', 'none', { note: 'No state income tax.' }, { verify: 'https://tax.nv.gov/' }),
  NH: S('New Hampshire', 'NH', 'none', { note: 'No tax on earned wages.' }, { verify: 'https://www.revenue.nh.gov/' }),
  NJ: S('New Jersey', 'NJ', 'progressive', { brackets: [[20000, 0.014], [35000, 0.0175], [40000, 0.035], [75000, 0.05525], [500000, 0.0637], [1000000, 0.0897], [null, 0.1075]] }, { verify: 'https://www.nj.gov/treasury/taxation/' }),
  NM: S('New Mexico', 'NM', 'progressive', { brackets: [[5500, 0.015], [16500, 0.032], [33500, 0.043], [66500, 0.047], [210000, 0.049], [null, 0.059]] }, { verify: 'https://www.tax.newmexico.gov/' }),
  NY: S('New York', 'NY', 'progressive', { brackets: [[8500, 0.04], [11700, 0.045], [13900, 0.0525], [80650, 0.055], [215400, 0.06], [1077550, 0.0685], [5000000, 0.0965], [25000000, 0.103], [null, 0.109]] }, { verify: 'https://www.tax.ny.gov/' }),
  NC: S('North Carolina', 'NC', 'flat', { rate: 0.0425 }, { verify: 'https://www.ncdor.gov/' }),
  ND: S('North Dakota', 'ND', 'progressive', { brackets: [[47150, 0], [238200, 0.0195], [null, 0.025]] }, { verify: 'https://www.tax.nd.gov/' }),
  OH: S('Ohio', 'OH', 'progressive', { brackets: [[26050, 0], [100000, 0.0275], [null, 0.035]] }, { verify: 'https://tax.ohio.gov/' }),
  OK: S('Oklahoma', 'OK', 'progressive', { brackets: [[1000, 0.0025], [2500, 0.0075], [3750, 0.0175], [4900, 0.0275], [7200, 0.0375], [null, 0.0475]] }, { verify: 'https://oklahoma.gov/tax.html' }),
  OR: S('Oregon', 'OR', 'progressive', { brackets: [[4300, 0.0475], [10750, 0.0675], [125000, 0.0875], [null, 0.099]] }, { verify: 'https://www.oregon.gov/dor/' }),
  PA: S('Pennsylvania', 'PA', 'flat', { rate: 0.0307 }, { verify: 'https://www.revenue.pa.gov/' }),
  RI: S('Rhode Island', 'RI', 'progressive', { brackets: [[77450, 0.0375], [176050, 0.0475], [null, 0.0599]] }, { verify: 'https://tax.ri.gov/' }),
  SC: S('South Carolina', 'SC', 'progressive', { brackets: [[3460, 0], [17330, 0.03], [null, 0.062]] }, { verify: 'https://dor.sc.gov/' }),
  SD: S('South Dakota', 'SD', 'none', { note: 'No state income tax.' }, { verify: 'https://dor.sd.gov/' }),
  TN: S('Tennessee', 'TN', 'none', { note: 'No state income tax.' }, { verify: 'https://www.tn.gov/revenue.html' }),
  TX: S('Texas', 'TX', 'none', { note: 'No state income tax.' }, { verify: 'https://comptroller.texas.gov/' }),
  UT: S('Utah', 'UT', 'flat', { rate: 0.0455 }, { verify: 'https://tax.utah.gov/' }),
  VT: S('Vermont', 'VT', 'progressive', { brackets: [[45400, 0.0335], [110050, 0.066], [229550, 0.076], [null, 0.0875]] }, { verify: 'https://tax.vermont.gov/' }),
  VA: S('Virginia', 'VA', 'progressive', { brackets: [[3000, 0.02], [5000, 0.03], [17000, 0.05], [null, 0.0575]] }, { verify: 'https://www.tax.virginia.gov/' }),
  WA: S('Washington', 'WA', 'none', { note: 'No tax on wage income (capital-gains tax exists).' }, { verify: 'https://dor.wa.gov/' }),
  WV: S('West Virginia', 'WV', 'progressive', { brackets: [[10000, 0.0222], [25000, 0.0296], [40000, 0.0333], [60000, 0.0444], [null, 0.0482]] }, { verify: 'https://tax.wv.gov/' }),
  WI: S('Wisconsin', 'WI', 'progressive', { brackets: [[14680, 0.035], [29370, 0.044], [323290, 0.053], [null, 0.0765]] }, { verify: 'https://www.revenue.wi.gov/' }),
  WY: S('Wyoming', 'WY', 'none', { note: 'No state income tax.' }, { verify: 'https://revenue.wyo.gov/' }),
};

// ---------------------------------------------------------------------------
// INDIA — FY 2025-26
// ---------------------------------------------------------------------------
// Verify: https://incometaxindia.gov.in/
export const INDIA = {
  currency: 'INR',
  standardDeduction: { new: 75000, old: 50000 },
  cess: 0.04, // health & education cess on (tax + surcharge)
  rebate87A: { new: 1200000, old: 500000 }, // taxable income at/below -> tax nil
  regimes: {
    new: [[400000, 0], [800000, 0.05], [1200000, 0.10], [1600000, 0.15], [2000000, 0.20], [2400000, 0.25], [null, 0.30]],
    old: [[250000, 0], [500000, 0.05], [1000000, 0.20], [null, 0.30]],
  },
  surcharge: [
    [5000000, 0], [10000000, 0.10], [20000000, 0.15], [50000000, 0.25], [null, 0.25],
  ],
  // EPF: 12% of basic from employee (matched by employer). Professional tax is state-set.
  epfRate: 0.12,
  professionalTaxAnnual: { default: 2400, note: 'State-set; Karnataka ~₹2,400/yr (capped ₹2,500). Verify your state.' },
};

// ---------------------------------------------------------------------------
// UAE — 2025
// ---------------------------------------------------------------------------
// Verify: https://www.mohre.gov.ae/ and https://gpssa.gov.ae/
export const UAE = {
  currency: 'AED',
  incomeTax: 0, // no personal income tax on salary
  // Pension applies to UAE/GCC nationals only (GPSSA federal baseline).
  pension: { employeeRate: 0.05, employerRate: 0.125 },
  // End-of-service gratuity for expatriates (unlimited contract, full term):
  // 21 days basic per year for first 5 years, 30 days/year after; cap 2 years' pay.
  gratuity: { daysFirst5: 21, daysAfter5: 30, capYears: 2 },
};

export const REGION_GROUPS = [
  { label: 'United States', options: Object.values(US_STATES).map((s) => ({ id: `us-${s.abbr.toLowerCase()}`, label: s.name })) },
  { label: 'India', options: [{ id: 'india', label: 'India (national)' }] },
  { label: 'UAE', options: [{ id: 'uae', label: 'United Arab Emirates' }] },
];

// slug helpers for programmatic routing  e.g. "us-tx" <-> "texas"
export const slugForRegion = (id) => {
  if (id === 'india') return 'india';
  if (id === 'uae') return 'united-arab-emirates';
  const abbr = id.replace('us-', '').toUpperCase();
  const st = US_STATES[abbr];
  return st ? st.name.toLowerCase().replace(/[^a-z]+/g, '-') : id;
};
export const regionForSlug = (slug) => {
  if (!slug) return 'us-tx';
  if (slug === 'india') return 'india';
  if (slug === 'united-arab-emirates' || slug === 'uae') return 'uae';
  const match = Object.values(US_STATES).find((s) => s.name.toLowerCase().replace(/[^a-z]+/g, '-') === slug || s.abbr.toLowerCase() === slug);
  return match ? `us-${match.abbr.toLowerCase()}` : 'us-tx';
};
