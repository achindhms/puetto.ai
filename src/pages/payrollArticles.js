// payrollArticles.js
// Editorial layer for the per-region payroll guide articles.
// The article template generates most prose from payrollData (rates, type,
// brackets) plus live worked examples. This file only adds genuinely
// state-specific colour where it is accurate. Empty entries are fine — the
// template handles a region with no notes.

// True, stable, state-specific points. Kept conservative on purpose.
export const STATE_NOTES = {
  CA: [
    'California has the highest top marginal state income tax rate in the United States.',
    'Employees also pay State Disability Insurance (SDI). The wage cap on SDI has been removed, so it applies to all wages.',
  ],
  NY: [
    'New York City and Yonkers levy their own local income taxes on top of the state tax.',
    'High earners face additional upper brackets that were extended in recent budgets.',
  ],
  TX: ['Texas funds public services through sales and property taxes rather than an income tax.'],
  FL: ['Florida has no state income tax and relies on sales and tourism-related taxes.'],
  WA: ['Washington has no tax on wage income, but it does tax certain long-term capital gains.'],
  NH: ['New Hampshire does not tax earned wages. Its tax on interest and dividends has been phased out.'],
  TN: ['Tennessee has no state income tax after fully repealing its tax on investment income.'],
  NV: ['Nevada has no state income tax and leans on gaming and sales tax revenue.'],
  AK: ['Alaska has no state income tax and no statewide sales tax.'],
  SD: ['South Dakota has no state income tax.'],
  WY: ['Wyoming has no state income tax and low overall tax burden.'],
  PA: ['Pennsylvania pairs its flat state rate with local Earned Income Tax (EIT) set by municipalities and school districts.'],
  OH: ['Many Ohio municipalities levy their own local income tax on top of the state tax.'],
  IN: ['Indiana counties add their own local income tax, which varies by county.'],
  MD: ['Maryland counties add a local income tax, so the effective rate is higher than the state rate alone.'],
  KY: ['Some Kentucky cities and counties levy local occupational taxes on wages.'],
  MO: ['Kansas City and St. Louis levy a local earnings tax on people who work in those cities.'],
  MA: ['Massachusetts applies a flat rate plus an additional surtax on income above one million dollars.'],
  CO: ['Colorado uses a single flat rate and has been reducing it through ballot measures and legislation.'],
  IL: ['Illinois uses a flat income tax rate that applies to all earned income.'],
  NC: ['North Carolina has moved to a flat rate that has been scheduled to decline over several years.'],
  AZ: ['Arizona consolidated its brackets into a single low flat rate.'],
  GA: ['Georgia moved from brackets to a flat rate that is scheduled to step down over time.'],
  ID: ['Idaho uses a flat rate after consolidating its former brackets.'],
  IA: ['Iowa has transitioned to a flat individual income tax rate.'],
  LA: ['Louisiana moved to a flat individual income tax rate.'],
  MS: ['Mississippi applies its flat rate only to taxable income above a set threshold.'],
  UT: ['Utah uses a single flat rate for all income.'],
  MI: ['Michigan uses a flat rate, and some cities levy an additional local income tax.'],
};

// Recent-changes framing by tax type. Deliberately directional, no invented bills.
export const RECENT_BY_TYPE = {
  none: 'States without an income tax rarely change that status, but they do adjust sales, property and other taxes. Check the official source for current rates on those.',
  flat: 'Several flat-tax states have been reducing their rate in steps over recent years. The figure shown here is the latest in this tool, but confirm the current rate with the official source before relying on it.',
  progressive: 'Brackets and rates in progressive states are reviewed regularly and adjusted for inflation or by legislation. Confirm the current bands with the official source before relying on a figure.',
};

// India editorial (FY 2025-26).
export const INDIA_ARTICLE = {
  intro: 'India taxes salaried income under two parallel systems: the new regime and the old regime. The new regime is now the default. It has lower headline rates but removes most exemptions and deductions. The old regime keeps the deductions but uses higher rates. Which one leaves more in your hand depends on how much you claim.',
  highlights: [
    'The new regime is the default for FY 2025-26 unless you opt for the old one.',
    'A Section 87A rebate makes income tax nil where taxable income is at or below twelve lakh under the new regime, after the standard deduction.',
    'Both regimes apply a four percent health and education cess on the tax payable.',
    'A surcharge applies on higher incomes, stepping up across income bands.',
    'Most salaried employees also contribute twelve percent of basic pay to EPF, matched by the employer.',
    'Professional tax is set by each state, so the amount differs by where you work.',
  ],
  recent: 'The FY 2025-26 budget widened the new-regime slabs and raised the rebate threshold, which removed income tax for many middle-income earners under that regime. Confirm the current slabs and rebate with the Income Tax Department before relying on a figure.',
};

// UAE editorial.
export const UAE_ARTICLE = {
  intro: 'The UAE does not levy a personal income tax on salaries. For most employees, gross pay and net pay are the same. The parts worth understanding are end-of-service gratuity for expatriates and pension contributions for UAE and GCC nationals.',
  highlights: [
    'There is no personal income tax on salary in the UAE for residents or expatriates.',
    'Expatriate employees accrue end-of-service gratuity based on their basic salary and length of service.',
    'Gratuity is roughly twenty-one days of basic pay per year for the first five years, then thirty days per year, capped at two years of pay.',
    'UAE and GCC nationals contribute to a pension scheme, with the employee paying five percent and the employer paying more.',
    'A federal corporate tax exists for businesses, but it does not apply to individual salaries.',
  ],
  recent: 'Corporate tax and VAT have been introduced for businesses in recent years, but personal salary income remains untaxed. Confirm gratuity and pension rules with MOHRE and the relevant pension authority before relying on a figure.',
};
