import { Link } from 'react-router-dom';
import PeopleOpsArticleLayout from './PeopleOpsArticleLayout';

const FAQ = [
  {
    q: 'What does fractional HR mean?',
    a: 'Fractional HR means hiring an experienced HR or People Ops professional part-time instead of full-time. You get senior support for a set number of hours or days each month, and you pay a fraction of a full-time salary.',
  },
  {
    q: 'How much does fractional HR cost?',
    a: 'Fractional HR is usually priced as a monthly retainer based on the days you need. It costs far less than a full-time Head of People, because you only pay for the hours you use. Exact pricing depends on scope and the markets you operate in.',
  },
  {
    q: 'Is fractional HR the same as outsourced HR?',
    a: 'They overlap but are not identical. Outsourced HR often means handing tasks to an agency. Fractional HR means one senior person acts as your part-time HR lead, owning strategy and systems, not just processing paperwork.',
  },
  {
    q: 'When does fractional HR stop making sense?',
    a: 'Fractional HR works until the workload justifies a full-time hire, usually somewhere past fifty employees. At that point a full-time Head of People earns their salary, and a fractional lead can help you hire and hand over to them.',
  },
];

export default function PeopleOpsWhatIsFractionalHr() {
  return (
    <PeopleOpsArticleLayout
      slug="/people-ops/what-is-fractional-hr"
      title="What Is Fractional HR?"
      description="Fractional HR is part-time, senior HR support for a fraction of a full-time salary. Here is how it works, what it costs, and when to use it."
      keywords="fractional hr, what is fractional hr, fractional human resources, fractional hr meaning, fractional hr services"
      readingTime="6 min"
      faqs={FAQ}
    >
      <p className="pops__lead">
        Fractional HR is part-time, senior HR support, delivered for a fraction of a full-time salary. Instead
        of hiring one full-time HR person, you bring in an experienced lead for a set number of days each month
        to run hiring, onboarding, compliance, and policy.
      </p>

      <h2>How does fractional HR work?</h2>
      <p>
        A fractional HR lead works across several companies, giving each one a slice of their time. You agree on
        scope and a monthly commitment, often a few days a month for an early-stage team. The lead then owns the
        People function for that time: they set up systems, fix gaps, and handle the work a full-time hire would,
        without sitting on your payroll full-time.
      </p>
      <p>
        The model copies what fractional CFOs and fractional CMOs already do for finance and marketing. You get
        the senior judgment of someone who has done the job many times, at a cost that fits an early-stage budget.
      </p>

      <h2>What does a fractional HR lead actually do?</h2>
      <p>The work depends on your stage, but it usually covers:</p>
      <ul>
        <li>Setting up compliant contracts and an employee handbook.</li>
        <li>Building a hiring and onboarding flow that scales.</li>
        <li>Choosing and setting up an HRIS so your people data lives in one place.</li>
        <li>Running performance reviews and pay structures.</li>
        <li>Handling compliance across the markets you hire in.</li>
        <li>Managing offboarding cleanly when someone leaves.</li>
      </ul>
      <div className="pops__callout">
        <p>
          <strong>Key point:</strong> a fractional HR lead owns outcomes, not just tasks. That is the line
          between fractional HR and a junior coordinator who only processes paperwork.
        </p>
      </div>

      <h2>Fractional HR vs a full-time hire</h2>
      <p>
        A full-time Head of People in the US costs well into six figures once you add benefits. For a company of
        twenty people, that role is not full yet. You would be paying a senior salary for a part-time workload.
        Fractional HR closes that gap. You get the same experience for the hours you use, and you scale up only
        when the headcount justifies it. The{' '}
        <Link to="/people-ops/outsourcing-hr-pros-and-cons">pros and cons of outsourcing HR</Link> covers the
        full trade-off in detail.
      </p>

      <h2>When should you use fractional HR?</h2>
      <p>
        Fractional HR makes sense once founder-run HR starts to crack but a full-time hire is still too early.
        For most startups that is between ten and fifty employees. If you are below that, you can usually manage
        with templates and a few hours of advice. The{' '}
        <Link to="/people-ops/hr-for-startups">HR for startups guide</Link> shows what to set up at each stage.
      </p>
      <p>
        If you want the senior end of this, a{' '}
        <Link to="/people-ops/people-operations-vs-hr">People Operations</Link> lead can run the function as a
        system rather than a checklist, which matters more the faster you grow.
      </p>
    </PeopleOpsArticleLayout>
  );
}
