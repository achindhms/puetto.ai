import { Link } from 'react-router-dom';
import PeopleOpsArticleLayout from './PeopleOpsArticleLayout';

const FAQ = [
  {
    q: 'What are the main benefits of outsourcing HR?',
    a: 'Outsourcing HR gives you senior expertise without a full-time salary, faster setup of compliant systems, cover across multiple markets, and freed-up founder time. It is most valuable for lean teams that cannot justify a full-time People hire yet.',
  },
  {
    q: 'What are the downsides of outsourcing HR?',
    a: 'The main downsides are less day-to-day presence, the need to share sensitive data with an outside partner, and the risk of a transactional provider who processes tasks without owning outcomes. Choosing a senior, strategic partner avoids most of these.',
  },
  {
    q: 'Is it cheaper to outsource HR or hire in-house?',
    a: 'For a team under about fifty people, outsourcing or fractional HR is usually cheaper, because you only pay for the hours you use. Past that point, a full-time hire often becomes more cost-effective because the workload is constant.',
  },
  {
    q: 'What HR functions should you not outsource?',
    a: 'Keep ownership of culture, sensitive employee relations, and final decisions on hiring and firing. You can outsource the systems, compliance, and admin behind them, but the judgment calls should stay close to the leadership team.',
  },
];

export default function PeopleOpsOutsourcingHrProsCons() {
  return (
    <PeopleOpsArticleLayout
      slug="/people-ops/outsourcing-hr-pros-and-cons"
      title="The Pros and Cons of Outsourcing HR"
      description="An honest look at outsourcing HR: where it helps, where it falls short, and how to decide if it fits your team."
      keywords="outsourcing hr pros and cons, advantages and disadvantages of hr outsourcing, benefits of outsourcing hr, disadvantages of outsourcing hr, reasons for hr outsourcing"
      readingTime="7 min"
      faqs={FAQ}
    >
      <p className="pops__lead">
        Outsourcing HR means handing some or all of your People function to an outside partner. The main benefit
        is senior expertise without a full-time salary. The main risk is choosing a transactional provider who
        processes tasks without owning outcomes. For lean teams, the upside usually wins.
      </p>

      <h2>The case for outsourcing HR</h2>
      <p>Outsourcing HR pays off when you need experience and systems faster than you can hire for them.</p>
      <ul>
        <li><strong>Senior expertise, part-time cost.</strong> You get someone who has set up HR many times, for the hours you actually use.</li>
        <li><strong>Faster, compliant setup.</strong> Contracts, policies, and an HRIS go in correctly the first time, instead of being patched later.</li>
        <li><strong>Multi-market cover.</strong> A good partner handles compliance across the countries you hire in, which is hard to do in-house early.</li>
        <li><strong>Founder time back.</strong> Hours spent on offers, onboarding, and admin go back into the product.</li>
        <li><strong>Scales with you.</strong> You add or reduce support as headcount changes, without hiring and firing.</li>
      </ul>

      <h2>The case against outsourcing HR</h2>
      <p>It is not the right fit for everyone, and an honest view matters.</p>
      <ul>
        <li><strong>Less daily presence.</strong> An outside lead is not in the room every day, so urgent issues need a clear escalation path.</li>
        <li><strong>Data sharing.</strong> You hand sensitive people data to a partner, so contracts and security need to be solid.</li>
        <li><strong>Risk of a transactional provider.</strong> Some HR outsourcers only process paperwork. That is cheap but does not improve hiring or retention.</li>
        <li><strong>Culture stays yours.</strong> A partner can build the systems, but culture and the hardest people decisions should stay with leadership.</li>
      </ul>
      <div className="pops__callout">
        <p>
          <strong>The honest version:</strong> outsourcing HR is a strong fit for lean teams that need senior
          support without a full-time hire. It is a weak fit if you need someone on-site daily or you outsource
          to the cheapest, most junior option. The difference is whether the partner owns outcomes or just tasks.
        </p>
      </div>

      <h2>How to decide</h2>
      <p>Run your situation through three questions.</p>
      <ol>
        <li><strong>Is the workload constant or occasional?</strong> Constant past fifty people points to a full-time hire. Occasional points to fractional or outsourced.</li>
        <li><strong>Do you need strategy or just admin?</strong> If you need systems and judgment, choose a senior partner, not a task processor.</li>
        <li><strong>How many markets do you hire in?</strong> More markets makes outside compliance expertise more valuable.</li>
      </ol>
      <p>
        If you decide to keep some functions in-house, the next question is which ones. The{' '}
        <Link to="/people-ops/people-operations-vs-hr">People Operations vs HR</Link> breakdown helps you split
        the strategic work from the admin so you outsource the right half.
      </p>

      <h2>Outsourced HR vs fractional People Ops</h2>
      <p>
        These terms get used interchangeably, but there is a useful distinction. Outsourced HR often means an
        agency processing tasks. Fractional People Ops means one senior lead acting as your part-time Head of
        People, owning the systems and the outcomes. The{' '}
        <Link to="/people-ops/what-is-fractional-hr">fractional HR model</Link> avoids the biggest downside on
        this list, the transactional provider, because the lead is accountable for results, not just activity.
      </p>
      <p>
        For startups specifically, the <Link to="/people-ops/hr-for-startups">HR for startups guide</Link> shows
        which functions to set up first and where fractional support fits best.
      </p>
    </PeopleOpsArticleLayout>
  );
}
