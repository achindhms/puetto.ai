import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import PeopleOpsArticleLayout from './PeopleOpsArticleLayout';

const SITE = 'https://www.puetto.com';

const FAQ = [
  {
    q: 'When should a startup start doing HR?',
    a: 'A startup should set up basic HR before its first hire, with compliant contracts and a simple onboarding flow. Structured HR, with policies and an HRIS, usually becomes necessary around ten to fifteen employees.',
  },
  {
    q: 'Does a startup need a full-time HR person?',
    a: 'Not at first. Most startups run HR through the founder, then a fractional HR or People Ops lead, and only hire full-time once they pass roughly fifty employees and the workload is constant.',
  },
  {
    q: 'What HR does a startup legally need?',
    a: 'At a minimum, compliant employment contracts, correct worker classification, payroll and tax setup, and the statutory policies required in each market you employ people. Getting classification and contracts wrong is the most common and most expensive early mistake.',
  },
  {
    q: 'How much does startup HR cost?',
    a: 'Founder-run HR costs time. A fractional HR lead costs a monthly retainer far below a full-time salary. A full-time Head of People costs well into six figures, which is hard to justify before about fifty people.',
  },
];

const STEPS = [
  { name: 'Get contracts and classification right', text: 'Before anyone signs, make sure contracts are compliant and every worker is classified correctly as an employee or contractor.' },
  { name: 'Set up payroll and statutory basics', text: 'Register for payroll and tax in each market, and put the legally required policies in place.' },
  { name: 'Build a simple onboarding flow', text: 'Give every new hire the same clear first week: accounts, a buddy, goals for the first month.' },
  { name: 'Write a lightweight handbook', text: 'Document leave, expenses, and conduct in a short handbook people will actually read.' },
  { name: 'Pick an HRIS once you pass ten people', text: 'Move people data off spreadsheets into one system so records, leave, and documents live in one place.' },
  { name: 'Add performance and pay structure', text: 'Introduce simple reviews and clear pay bands before ad-hoc raises create problems.' },
];

export default function PeopleOpsHrForStartups() {
  const howToSchema = {
    '@context': 'https://schema.org',
    '@type': 'HowTo',
    name: 'How to set up HR for a startup',
    description: 'A staged approach to setting up HR for a startup, from first hire to scaling team.',
    step: STEPS.map((s, i) => ({
      '@type': 'HowToStep',
      position: i + 1,
      name: s.name,
      text: s.text,
    })),
  };

  return (
    <PeopleOpsArticleLayout
      slug="/people-ops/hr-for-startups"
      title="HR for Startups: A Practical Guide"
      description="When to start HR, what to set up first, and how to run it without a full-time team. A staged guide to HR for startups."
      keywords="hr for startups, hr services for startups, outsourced hr for startups, startup hr support, hr solutions for startups"
      readingTime="8 min"
      faqs={FAQ}
    >
      <Helmet>
        <script type="application/ld+json">{JSON.stringify(howToSchema)}</script>
      </Helmet>

      <p className="pops__lead">
        HR for startups should start small and grow with the team. You set up compliant contracts and onboarding
        before your first hire, then add structure as you grow, and you bring in senior help on a fractional
        basis long before you need a full-time People hire.
      </p>

      <h2>Why HR matters earlier than founders think</h2>
      <p>
        The cost of skipping HR shows up later, and it is usually expensive. A misclassified contractor, a
        missing contract clause, or an onboarding that leaves a new hire lost in week one all cost money and
        goodwill. Good HR early is not bureaucracy. It is the plumbing that lets you hire fast without breaking
        things.
      </p>

      <h2>What to set up, and when</h2>
      <p>
        You do not need everything on day one. Build HR in stages that match your headcount. Here is the order
        that works for most startups.
      </p>
      <ol>
        {STEPS.map((s) => (
          <li key={s.name}><strong>{s.name}.</strong> {s.text}</li>
        ))}
      </ol>
      <div className="pops__callout">
        <p>
          <strong>Rule of thumb:</strong> handle the legal basics before your first hire, and add structure
          around ten to fifteen people. That is the point where founder memory stops scaling and gaps start to
          cost you.
        </p>
      </div>

      <h2>Do you need to hire HR full-time?</h2>
      <p>
        Almost never at the start. Most startups move through three stages. The founder runs HR while the team is
        tiny. A <Link to="/people-ops/what-is-fractional-hr">fractional HR lead</Link> takes over once it gets
        complex but a full role is not full yet. A full-time Head of People comes in once you pass roughly fifty
        employees. Trying to skip straight to a full-time hire too early means paying a senior salary for a
        part-time workload.
      </p>

      <h2>HR vs People Operations for startups</h2>
      <p>
        For a startup, the label matters less than the work. What you want is someone who treats the team like a
        system: clear hiring, clear onboarding, clear reviews. That is the{' '}
        <Link to="/people-ops/people-operations-vs-hr">People Operations</Link> mindset, and it scales far better
        than ad-hoc HR. Whether you call it HR or People Ops, get the systems right early.
      </p>

      <h2>How to get startup HR support without a full-time hire</h2>
      <p>
        The cheapest mistake to avoid is doing nothing until something breaks. The next cheapest is over-hiring
        before the workload exists. Fractional People Ops sits between the two. You get a senior lead who sets up
        the systems above, runs them for a few days a month, and scales the support as you grow. When the time
        comes, that same lead can help you hire and hand over to a full-time team.
      </p>
    </PeopleOpsArticleLayout>
  );
}
