import { Link } from 'react-router-dom';
import PeopleOpsArticleLayout from './PeopleOpsArticleLayout';

const FAQ = [
  {
    q: 'What is the difference between People Operations and HR?',
    a: 'HR is the traditional function focused on compliance, payroll, and employee relations. People Operations covers the same ground but treats the team like a product, using systems and data to improve hiring, onboarding, performance, and retention. People Ops is the more strategic, systems-led version of HR.',
  },
  {
    q: 'Is People Operations just a new name for HR?',
    a: 'Partly. The legal and admin work is the same. The difference is mindset and method. People Ops measures outcomes like time-to-hire and retention, automates routine work, and designs the employee experience deliberately rather than reacting to issues.',
  },
  {
    q: 'Does a small company need People Ops or HR?',
    a: 'A small company needs one capable person or partner covering both. The label matters less than getting compliant contracts, clean onboarding, and clear reviews in place. The People Ops mindset scales better as you grow.',
  },
  {
    q: 'Who owns People Operations in a startup?',
    a: 'In an early-stage startup the founder usually owns it first, then hands it to a fractional People Ops lead, and finally to a full-time Head of People once headcount justifies the role.',
  },
];

export default function PeopleOpsVsHr() {
  return (
    <PeopleOpsArticleLayout
      slug="/people-ops/people-operations-vs-hr"
      title="People Operations vs HR: What's the Difference?"
      description="People Operations is the systems-led, data-driven evolution of HR. Here is what actually changed, what stayed the same, and which one your company needs."
      keywords="people operations vs hr, people operations, what is people operations, people ops, hr vs people operations"
      readingTime="6 min"
      faqs={FAQ}
    >
      <p className="pops__lead">
        People Operations is the systems-led, data-driven evolution of HR. HR handles compliance, payroll, and
        employee relations. People Operations does the same work but treats the team like a product, using clear
        systems and metrics to improve hiring, onboarding, and retention.
      </p>

      <h2>What stayed the same</h2>
      <p>
        The legal and administrative core does not change. Both HR and People Ops handle contracts, payroll,
        compliance, leave, and the difficult conversations that come with managing people. If a company calls
        its function People Ops, those responsibilities still sit there. Anyone who tells you People Ops skips
        compliance is selling a buzzword.
      </p>

      <h2>What changed</h2>
      <p>
        The shift is in mindset and method. People Ops borrows from product and operations thinking. It measures
        what matters, automates the routine, and designs the employee experience on purpose.
      </p>
      <div className="pops__tablewrap">
        <table>
          <thead>
            <tr>
              <th>Dimension</th>
              <th>Traditional HR</th>
              <th>People Operations</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td><strong>Primary focus</strong></td>
              <td>Compliance and admin</td>
              <td>Employee experience and outcomes</td>
            </tr>
            <tr>
              <td><strong>Approach</strong></td>
              <td>Reactive, process-led</td>
              <td>Proactive, systems-led</td>
            </tr>
            <tr>
              <td><strong>Measures</strong></td>
              <td>Headcount, cases closed</td>
              <td>Time-to-hire, retention, engagement</td>
            </tr>
            <tr>
              <td><strong>Tooling</strong></td>
              <td>Paperwork and spreadsheets</td>
              <td>HRIS, automation, dashboards</td>
            </tr>
            <tr>
              <td><strong>View of the team</strong></td>
              <td>Staff to administer</td>
              <td>Users of a product to improve</td>
            </tr>
          </tbody>
        </table>
      </div>
      <div className="pops__callout">
        <p>
          <strong>In short:</strong> HR keeps the company compliant. People Ops keeps the company compliant and
          uses data to make hiring, onboarding, and retention measurably better.
        </p>
      </div>

      <h2>Which one does your company need?</h2>
      <p>
        For most startups, this is a false choice. You need one person or partner who does both: the compliance
        floor and the systems on top. The mistake is hiring a junior coordinator who only processes paperwork,
        then wondering why hiring and retention never improve. The{' '}
        <Link to="/people-ops/what-is-fractional-hr">fractional HR model</Link> gives you a senior lead who can
        run both sides without a full-time salary.
      </p>
      <p>
        If you are still setting up the basics, start with the{' '}
        <Link to="/people-ops/hr-for-startups">HR for startups guide</Link>, which lays out what to build and in
        what order. The People Ops mindset is easiest to bake in early, before bad habits set.
      </p>

      <h2>How fractional People Ops fits</h2>
      <p>
        Fractional People Ops is how a lean team gets the strategic, systems-led version without the cost. A
        fractional lead sets up the HRIS, the onboarding flow, and the review cycle, then runs them for a few
        days a month. You get People Ops thinking at an HR-light budget.
      </p>
    </PeopleOpsArticleLayout>
  );
}
