import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import PeopleOpsArticleLayout from './PeopleOpsArticleLayout';

const FAQ = [
  {
    q: 'What is People Operations in simple terms?',
    a: 'People Operations is the function that runs everything related to a company\u2019s team: hiring, onboarding, pay, performance, compliance, and culture. It is the modern version of HR, with more focus on systems, data, and the employee experience and less on paperwork.',
  },
  {
    q: 'What is the difference between People Operations and HR?',
    a: 'HR is the traditional function focused on compliance, payroll, and employee relations. People Operations covers the same work but treats the team like a product, using data and clear systems to improve hiring, onboarding, and retention. In most small companies, one person or partner covers both.',
  },
  {
    q: 'What does a People Operations team do?',
    a: 'A People Ops team handles talent acquisition, onboarding, total rewards, performance management, learning and development, employee relations, compliance, People analytics, and culture. In a small company these sit with one generalist. In a large company they split into specialist teams.',
  },
  {
    q: 'How much does a People Operations Manager earn?',
    a: 'In the United States, a People Operations Manager earns roughly $90,000 to $130,000 a year on average, depending on the source, location, and company size, with senior and director-level roles paying significantly more. Figures vary by data provider, so treat them as ranges.',
  },
  {
    q: 'Is People Operations a good career?',
    a: 'Yes. The US Bureau of Labor Statistics projects HR manager roles to grow 5 percent and HR specialist roles 6 percent from 2024 to 2034, both faster than the average occupation, with strong demand for people who can pair HR judgment with data and systems.',
  },
  {
    q: 'What tools does a People Operations team use?',
    a: 'A typical People Ops stack includes an HRIS as the system of record, an applicant tracking system for hiring, payroll or an employer of record for paying people, and tools for performance, engagement, and learning. Small teams often consolidate several of these into one platform.',
  },
  {
    q: 'When should a company start a People Operations function?',
    a: 'Most companies need a structured People Ops function around ten to fifteen employees, or sooner if they are hiring fast, raising a round, or hiring across borders. Before that, a founder usually handles it with templates and occasional expert help.',
  },
];

const GLOSSARY = [
  ['HRIS', 'Human Resources Information System. The central system of record for employee data, documents, leave, and org structure.'],
  ['HRMS', 'Human Resources Management System. An HRIS plus added modules like payroll, performance, and recruiting.'],
  ['HCM', 'Human Capital Management. The broadest category, covering the full employee lifecycle from hire to retire, usually for larger companies.'],
  ['ATS', 'Applicant Tracking System. Software that manages job postings, applications, and the hiring pipeline.'],
  ['HRBP', 'HR Business Partner. A senior People person embedded with a business unit to align People strategy with that team\u2019s goals.'],
  ['Total rewards', 'The full package an employee receives: salary, bonus, equity, benefits, and perks.'],
  ['eNPS', 'Employee Net Promoter Score. A simple measure of how likely employees are to recommend the company as a place to work.'],
  ['Attrition', 'The rate at which employees leave, voluntarily or involuntarily, over a period. Also called turnover.'],
  ['Time to hire', 'The number of days from a candidate entering the pipeline to accepting an offer.'],
  ['PEO', 'Professional Employer Organization. A provider that co-employs your staff to handle payroll, benefits, and compliance, mainly in the US.'],
  ['EOR', 'Employer of Record. A provider that legally employs workers on your behalf in countries where you have no entity, so you can hire abroad compliantly.'],
  ['OKRs', 'Objectives and Key Results. A goal-setting framework many People Ops teams use to align performance with company goals.'],
];

export default function PeopleOpsCompleteGuide() {
  const definedTermSchema = {
    '@context': 'https://schema.org',
    '@type': 'DefinedTermSet',
    name: 'People Operations glossary',
    hasDefinedTerm: GLOSSARY.map(([t, d]) => ({
      '@type': 'DefinedTerm',
      name: t,
      description: d,
    })),
  };

  return (
    <PeopleOpsArticleLayout
      slug="/people-ops/complete-guide"
      title="People Operations: The Complete Guide"
      description="A complete guide to People Operations: what it is, why it matters, the employee lifecycle, key terminology, the People Ops tech stack, salaries, and the job market."
      keywords="people operations, what is people operations, people ops guide, people operations vs hr, people ops tech stack, people operations salary, people operations job"
      readingTime="18 min"
      faqs={FAQ}
    >
      <Helmet>
        <script type="application/ld+json">{JSON.stringify(definedTermSchema)}</script>
      </Helmet>

      <p className="pops__lead">
        People Operations is the function that runs everything connected to a company's team, from hiring and
        onboarding to pay, performance, compliance, and culture. It is the modern name for HR, built around
        systems and data rather than paperwork. This guide covers what People Ops is, why it matters, what it
        includes, the tools and terms you need to know, and what the career looks like.
      </p>

      <div className="pops__tldr">
        <h2>TL;DR</h2>
        <ul>
          <li>People Operations is HR rebuilt around systems, data, and the employee experience.</li>
          <li>It covers hiring, onboarding, pay, performance, learning, compliance, analytics, and culture.</li>
          <li>Most companies need a real People Ops function around ten to fifteen employees.</li>
          <li>Turnover is expensive. Gallup estimates replacing a technical hire costs about 80 percent of their salary, and a leader about 200 percent.</li>
          <li>A core stack is an HRIS, an ATS, payroll or an employer of record, plus performance and engagement tools.</li>
          <li>People Ops Managers in the US earn roughly $90,000 to $130,000, and the field is growing faster than average.</li>
          <li>Early teams rarely need this full-time. Fractional People Ops gives you the function without a full-time hire.</li>
        </ul>
      </div>

      <nav className="pops__toc" aria-label="On this page">
        <h2>On this page</h2>
        <ol>
          <li><a href="#what-is">What is People Operations?</a></li>
          <li><a href="#vs-hr">People Ops vs HR</a></li>
          <li><a href="#why">Why People Ops matters: the data</a></li>
          <li><a href="#responsibilities">The core responsibilities</a></li>
          <li><a href="#global">People Ops for remote and global teams</a></li>
          <li><a href="#lifecycle">The employee lifecycle</a></li>
          <li><a href="#terminology">People Ops terminology</a></li>
          <li><a href="#tech-stack">The People Ops tech stack</a></li>
          <li><a href="#metrics">Metrics that matter</a></li>
          <li><a href="#mistakes">Common People Ops mistakes</a></li>
          <li><a href="#job-market">The job market and careers</a></li>
          <li><a href="#trends">Trends shaping People Ops in 2026</a></li>
          <li><a href="#build">How to build the function</a></li>
        </ol>
      </nav>

      <h2 id="what-is">What is People Operations?</h2>
      <p>
        People Operations is the function responsible for everything related to a company's people: how they are
        hired, onboarded, paid, developed, and supported, and how the company stays compliant while doing it. The
        term came out of the tech world, where People teams started borrowing ideas from product and operations.
        Instead of treating HR as a back-office cost center, they treated the team like a product to be designed
        and improved.
      </p>
      <p>
        In practice that means a People Ops team builds repeatable systems. A new hire signs a clean contract,
        lands in a structured first week, knows how they will be reviewed, and has their data in one place. None
        of that happens by accident. It happens because someone designed the process and measures whether it
        works.
      </p>
      <p>
        The function scales with the company. In a startup it is one generalist, or a founder. In a large company
        it splits into specialist teams for recruiting, total rewards, learning, and People analytics. The work
        is the same at its core. Only the depth changes.
      </p>
      <p>
        The name change from HR to People Ops is not just branding. It signals a shift in how a company sees its
        team. HR grew up as a compliance and admin function that protected the company from its people. People
        Ops flips that. It treats the team as the thing that makes the company work, and it designs for their
        experience on purpose. Plenty of companies still call it HR and run it like People Ops, and the reverse
        is also true. The label tells you less than how the work is actually done.
      </p>

      <h2 id="vs-hr">People Operations vs HR</h2>
      <p>
        People Operations and HR overlap heavily, and many companies use the names interchangeably. The legal and
        administrative core is identical. The difference is mindset. HR has historically been reactive and
        process-led, focused on compliance and employee relations. People Ops is proactive and systems-led,
        focused on outcomes like time to hire and retention, and it leans on data and automation.
      </p>
      <div className="pops__tablewrap">
        <table>
          <thead>
            <tr><th>Dimension</th><th>Traditional HR</th><th>People Operations</th></tr>
          </thead>
          <tbody>
            <tr><td><strong>Focus</strong></td><td>Compliance and admin</td><td>Employee experience and outcomes</td></tr>
            <tr><td><strong>Approach</strong></td><td>Reactive, process-led</td><td>Proactive, systems-led</td></tr>
            <tr><td><strong>Measures</strong></td><td>Headcount, cases closed</td><td>Time to hire, retention, engagement</td></tr>
            <tr><td><strong>View of the team</strong></td><td>Staff to administer</td><td>Users of a product to improve</td></tr>
          </tbody>
        </table>
      </div>
      <p>
        For a full breakdown, read the dedicated guide on{' '}
        <Link to="/people-ops/people-operations-vs-hr">People Operations vs HR</Link>. For most companies the
        label matters less than getting the work right.
      </p>

      <h2 id="why">Why People Operations matters: the data</h2>
      <p>
        People decisions are some of the most expensive a company makes, and the cost of getting them wrong is
        well documented. The numbers below come from public research and are worth knowing.
      </p>
      <ul>
        <li>
          Replacing people is costly. Gallup estimates that replacing a leader or manager costs around 200
          percent of their salary, a technical role about 80 percent, and a frontline worker about 40 percent.
        </li>
        <li>
          Turnover adds up fast. Gallup has estimated that voluntary turnover costs US businesses around 1
          trillion dollars a year.
        </li>
        <li>
          Disengagement is a global drag. Gallup's State of the Global Workplace 2024 put the cost of low
          engagement at roughly 8.9 trillion dollars a year, close to 9 percent of global GDP.
        </li>
        <li>
          Most exits are preventable. Gallup found that 42 percent of employees who left voluntarily said their
          organization could have done something to keep them, and around half of US employees were watching for
          or actively seeking a new job in 2024.
        </li>
        <li>
          Engagement pays back. Gallup reports that highly engaged teams are roughly 23 percent more productive
          and significantly more profitable than disengaged ones.
        </li>
        <li>
          Hiring is not free either. The Society for Human Resource Management has estimated the average cost to
          hire a new employee at several thousand dollars once advertising, interviewing, and onboarding are
          counted.
        </li>
      </ul>
      <div className="pops__callout">
        <p>
          <strong>The point:</strong> People Ops is not an admin overhead. The cost of weak hiring, onboarding,
          and retention runs into real money, and a good People function is how you control it. You can model
          your own number with the{' '}
          <Link to="/people-ops/employee-turnover-cost-calculator">employee turnover cost calculator</Link>.
        </p>
      </div>

      <h2 id="responsibilities">The core responsibilities of People Ops</h2>
      <p>
        People Operations covers a wide surface area. In a small company one person owns all of it. In a large
        one each area becomes its own team. These are the main pillars.
      </p>
      <h3>Talent acquisition</h3>
      <p>
        Finding, attracting, and hiring the right people. This includes job descriptions, sourcing, interviewing,
        and the offer process, all managed through an applicant tracking system so nothing falls through the
        cracks. Done well, talent acquisition is also where a company's reputation is won or lost. Every
        candidate who goes through a slow or sloppy process tells others, and every one who has a sharp
        experience does the same. Hiring is marketing, whether you treat it that way or not.
      </p>
      <h3>Onboarding</h3>
      <p>
        Getting new hires productive and connected quickly. Good onboarding covers paperwork, accounts, training,
        and the human side of joining a team. It is one of the highest-leverage things People Ops owns, because
        a strong start lifts retention. The first ninety days shape whether someone stays for years or starts
        looking again within months. A repeatable onboarding flow, with a clear first day, a thirty-day plan, and
        an assigned buddy, turns a stressful start into a confident one.
      </p>
      <h3>Total rewards</h3>
      <p>
        Pay, equity, benefits, and perks. This includes setting pay bands, running payroll correctly, and making
        sure compensation is fair and competitive enough to keep people. Total rewards is where fairness becomes
        visible. Inconsistent pay, made up offer by offer, creates resentment the moment people compare notes.
        Clear bands and a defined philosophy prevent that and make raises and promotions easier to justify.
      </p>
      <h3>Performance management</h3>
      <p>
        Setting expectations, running reviews, and helping people grow. Many teams use a framework like OKRs to
        connect individual goals to company goals. The aim is not the annual review form. It is a steady rhythm of
        clear goals, honest feedback, and recognition, so nobody is surprised by where they stand.
      </p>
      <h3>Learning and development</h3>
      <p>
        Building skills across the team through training, coaching, and career paths. This is what keeps strong
        people challenged and reduces the urge to leave.
      </p>
      <h3>Employee relations</h3>
      <p>
        Handling the human issues: conflicts, grievances, and difficult conversations. This work needs judgment
        and discretion, and it usually stays close to leadership.
      </p>
      <h3>Compliance</h3>
      <p>
        Keeping the company on the right side of employment law in every market it operates in. Contracts, worker
        classification, and statutory policies all sit here. Mistakes are expensive, which is why this is rarely
        a place to cut corners. Misclassifying a contractor as not an employee, or copying a contract across
        borders without checking local law, are two of the most common and most costly errors a growing company
        makes. Compliance is unglamorous and it is also the work that quietly protects the whole business.
      </p>
      <h3>People analytics</h3>
      <p>
        Measuring what is happening across the team and using it to make better decisions. This is the part that
        most separates People Ops from old-style HR. It turns vague feelings about morale or hiring into numbers
        you can act on: where candidates drop out, which teams lose the most people, how long ramp-up really
        takes. You do not need a data team to start, only the discipline to track a few things consistently.
      </p>
      <h3>Culture</h3>
      <p>
        The hardest to measure and the easiest to lose. People Ops shapes culture through how it hires, onboards,
        recognises, and offboards people. It cannot be outsourced, only supported.
      </p>

      <h2 id="global">People Ops for remote and global teams</h2>
      <p>
        Hiring across borders has gone from rare to normal, and it changes the People Ops job. Each country has
        its own employment law, tax rules, notice periods, and statutory benefits. Getting any of these wrong is
        expensive and slow to fix. This is the single area where small companies most often get caught out, since
        a contract that is fine in one country can be illegal in another.
      </p>
      <p>
        There are two common ways to employ people abroad. You can set up your own legal entity in each country,
        which gives you full control but takes months and real money. Or you can use an employer of record, a
        provider that legally employs the person on your behalf so you can hire in days without an entity.
        Providers like Deel and Remote built their businesses on this model. For a team hiring its first few
        people in a new market, an employer of record is usually the faster, safer choice.
      </p>
      <p>
        Remote and global teams also change the softer side of People Ops. Onboarding has to work without a
        physical office. Communication has to bridge time zones. Culture has to be built on purpose rather than
        absorbed in a shared room. A People Ops function for a distributed team leans harder on clear written
        processes and good tooling, because the informal version simply does not exist. Puetto runs People Ops
        across the US, Singapore, the UAE, and India, where multi-country compliance is the norm rather than the
        exception.
      </p>

      <h2 id="lifecycle">The employee lifecycle</h2>
      <p>
        A useful way to organise People Ops is around the employee lifecycle, the stages a person moves through
        from first contact to departure. Each stage is a place to design a good experience.
      </p>
      <ol>
        <li><strong>Attraction.</strong> How candidates first hear about you, through your brand, content, and reputation.</li>
        <li><strong>Recruitment.</strong> The hiring process itself, from application to offer.</li>
        <li><strong>Onboarding.</strong> The first weeks, where a new hire learns the ropes and decides how they feel about the choice.</li>
        <li><strong>Development.</strong> Ongoing growth through training, feedback, and new responsibilities.</li>
        <li><strong>Retention.</strong> The work of keeping good people engaged and committed.</li>
        <li><strong>Performance.</strong> Reviews, goals, and recognition that keep people pointed at the right outcomes.</li>
        <li><strong>Offboarding.</strong> A clean, respectful exit that protects the company and leaves the door open.</li>
      </ol>
      <p>
        Treating these as a connected system, rather than separate tasks, is the heart of the People Ops
        approach.
      </p>

      <h2 id="terminology">People Operations terminology</h2>
      <p>
        People Ops comes with its own vocabulary. Here are the terms you will run into most often.
      </p>
      <dl className="pops__gloss">
        {GLOSSARY.map(([term, def]) => (
          <div key={term}>
            <dt>{term}</dt>
            <dd>{def}</dd>
          </div>
        ))}
      </dl>

      <h2 id="tech-stack">The People Operations tech stack</h2>
      <p>
        Modern People Ops runs on software. The global HR technology market was worth roughly 42 billion dollars
        in 2025 by several market-research estimates, and small and mid-sized businesses now make up the bulk of
        demand. A People Ops stack is usually built from a few core layers. You do not need all of them on day
        one.
      </p>
      <h3>HRIS: the system of record</h3>
      <p>
        The HRIS holds employee data, documents, leave, and org structure in one place. It is the foundation
        everything else connects to. Common options for startups and mid-sized teams include BambooHR, Rippling,
        HiBob, Gusto, and Deel, with Workday and SAP SuccessFactors serving large enterprises.
      </p>
      <h3>ATS: hiring</h3>
      <p>
        An applicant tracking system manages job postings, applications, and the interview pipeline. Greenhouse,
        Ashby, and Lever are widely used. A good ATS keeps hiring organised and gives you data on time to hire and
        source quality.
      </p>
      <h3>Payroll and global employment</h3>
      <p>
        Paying people correctly and on time, in every country you operate in. Gusto and Rippling are common for US
        payroll. Deel and Remote are common for hiring abroad through an employer of record, which lets you employ
        people in countries where you have no legal entity.
      </p>
      <h3>Performance and engagement</h3>
      <p>
        Tools for reviews, goals, feedback, and surveys. Lattice, 15Five, and Culture Amp are well known here.
        They turn performance and engagement from a once-a-year scramble into an ongoing, measurable process.
      </p>
      <h3>Learning and development</h3>
      <p>
        Learning management systems and course platforms that deliver training and track progress. The right
        choice depends on whether you need compliance training, skills development, or both.
      </p>
      <h3>People analytics</h3>
      <p>
        Reporting and dashboards that pull data from the systems above to answer questions about hiring,
        attrition, and engagement. Many modern HRIS platforms now include this, so a separate tool is often not
        needed early.
      </p>
      <div className="pops__callout">
        <p>
          <strong>For small teams:</strong> resist the urge to buy everything. A single all-in-one platform that
          covers HRIS, payroll, and onboarding will take most early teams a long way. Add specialist tools only
          when a clear need appears.
        </p>
      </div>
      <h3>How to choose your tools</h3>
      <p>
        The right stack is the smallest one that does the job. Start from the work you actually have, not the
        feature lists. Three questions cut through most of the noise. First, what is breaking today, and which
        tool fixes that. Second, will this still fit at three times your current headcount, so you are not
        re-platforming in a year. Third, does it connect to your system of record, because tools that do not talk
        to each other create more manual work than they remove. Buy for the problem in front of you, keep the
        HRIS as the single source of truth, and treat every new tool as a cost to justify rather than a box to
        tick.
      </p>

      <h2 id="metrics">People Ops metrics that matter</h2>
      <p>
        What gets measured gets managed. These are the metrics a strong People Ops function watches.
      </p>
      <ul>
        <li><strong>Time to hire.</strong> Days from a candidate entering the pipeline to accepting an offer.</li>
        <li><strong>Cost per hire.</strong> Total hiring spend divided by the number of hires.</li>
        <li><strong>Retention and attrition.</strong> The share of people who stay or leave over a period, ideally split by voluntary and involuntary.</li>
        <li><strong>eNPS.</strong> How likely employees are to recommend the company as a place to work.</li>
        <li><strong>Engagement score.</strong> A regular pulse on how connected and motivated the team feels.</li>
        <li><strong>Onboarding completion and ramp time.</strong> How quickly new hires become productive.</li>
        <li><strong>Offer acceptance rate.</strong> A signal of how competitive and well-run your hiring is.</li>
      </ul>
      <p>
        The maths is simple enough to start today. Annual attrition is the number of people who left in a year
        divided by the average headcount over that year. Time to hire is the average number of days from first
        contact to a signed offer across your recent hires. You do not need a dashboard to begin. A spreadsheet
        and an honest look at the last ten hires will tell you more than most companies know about themselves.
        The goal is a trend over time, not a single perfect number.
      </p>

      <h2 id="mistakes">Common People Ops mistakes to avoid</h2>
      <p>
        Most People Ops problems are predictable. These are the ones that come up again and again in growing
        companies.
      </p>
      <ul>
        <li><strong>Waiting too long to start.</strong> Founders often delay until something breaks. By then the contract gaps and compliance issues are already there, and fixing them costs more than preventing them would have.</li>
        <li><strong>Hiring a junior coordinator for a senior problem.</strong> A team that needs strategy and systems will not get them from someone whose job is processing paperwork. The mismatch wastes a salary and leaves the real work undone.</li>
        <li><strong>Buying too much software.</strong> A stack of half-used tools is common. Most early teams need far less than they think. Start with one platform and add only when a clear need appears.</li>
        <li><strong>Ad-hoc pay.</strong> Setting salaries deal by deal feels flexible until people compare notes. Clear bands prevent the resentment and the awkward corrections later.</li>
        <li><strong>Treating onboarding as paperwork.</strong> A new hire who spends week one lost and idle is a retention risk you created. A simple, repeatable flow fixes it cheaply.</li>
        <li><strong>Ignoring offboarding.</strong> How people leave shapes how the team that stays feels, and a sloppy exit creates legal and security risk. A clean process protects the company and the brand.</li>
      </ul>

      <h2 id="job-market">The People Ops job market and careers</h2>
      <p>
        People Operations is a growing field with a clear career ladder. Roles generally progress from
        coordinator to specialist or generalist, then to People Ops Manager, HR Business Partner, Head of People,
        and finally Chief People Officer at the executive level.
      </p>
      <p>
        Each rung changes the work. A coordinator runs processes and keeps records clean. A generalist owns a
        bit of everything for a small company. A People Ops Manager builds and runs the systems and usually leads
        a small team. An HR Business Partner pairs with a department to align People strategy with that team's
        goals. A Head of People owns the whole function and sits close to the leadership table. A Chief People
        Officer sets People strategy at the company level and answers to the CEO. The path rewards people who
        keep adding strategy and data skills on top of solid HR fundamentals.
      </p>
      <h3>Salaries</h3>
      <p>
        Pay varies by role, location, company size, and data source. In the United States, a People Operations
        Manager earns roughly 90,000 to 130,000 dollars a year on average across the major salary trackers, with
        senior managers and directors earning well above that. For context, the US Bureau of Labor Statistics put
        the median wage for HR managers at about 140,000 dollars in 2024, with the top 10 percent earning more
        than 239,000 dollars. Treat any single figure as a range, since trackers differ.
      </p>
      <div className="pops__stats">
        <div className="pops__stat"><div className="n">$90k to $130k</div><div className="l">Typical US People Ops Manager range</div></div>
        <div className="pops__stat"><div className="n">$140k</div><div className="l">BLS median for HR managers, 2024</div></div>
        <div className="pops__stat"><div className="n">+5 to 6%</div><div className="l">Projected HR role growth, 2024 to 2034 (BLS)</div></div>
      </div>
      <h3>Demand and outlook</h3>
      <p>
        The outlook is solid. The US Bureau of Labor Statistics projects employment of HR managers to grow 5
        percent and HR specialists 6 percent from 2024 to 2034, both faster than the average for all occupations.
        It expects roughly 17,900 HR manager openings and 81,800 HR specialist openings each year over the
        decade, many from people leaving the field or retiring. The same data notes that some companies will meet
        this demand by outsourcing HR rather than hiring it in-house.
      </p>
      <h3>Skills that stand out</h3>
      <p>
        The People Ops professionals in demand pair classic HR judgment with newer skills: comfort with data and
        analytics, fluency with the tech stack, and the ability to design systems rather than just run processes.
        The shift from admin to strategy is the defining trend in the field.
      </p>

      <h2 id="trends">Trends shaping People Ops in 2026</h2>
      <p>
        The People function is changing fast, and a few shifts are worth tracking if you run or are building one.
      </p>
      <h3>AI is moving into the daily workflow</h3>
      <p>
        Recruiting and onboarding are the first places AI has landed. Industry surveys in 2025 reported that a
        majority of companies were already using AI-driven recruitment tools, and vendors have shipped features
        that draft job descriptions, suggest interview questions, and screen applications. The useful framing is
        not whether to use AI but where. It saves the most time on repetitive, high-volume tasks and the least on
        judgment calls, which still need a human.
      </p>
      <h3>From headcount to skills</h3>
      <p>
        More companies are organising around skills rather than rigid job titles. That changes how People Ops
        thinks about hiring, development, and internal moves, since the question becomes what a person can do
        rather than what their role is called.
      </p>
      <h3>Consolidation of the stack</h3>
      <p>
        After years of buying point solutions, many teams are consolidating onto fewer, broader platforms to cut
        cost and reduce the integration headache. For small teams this is good news, because an all-in-one
        platform now covers what used to need three or four tools.
      </p>
      <h3>People analytics as a default</h3>
      <p>
        Reporting that used to require a separate tool is now built into mainstream HRIS platforms. The result is
        that data-led People Ops, once reserved for large companies, is within reach of small ones. The bar for
        what counts as a well-run function has quietly risen.
      </p>

      <h2 id="build">How to build a People Ops function</h2>
      <p>
        You build People Ops in stages that match headcount. Adding too much too early wastes money. Adding too
        little too late creates expensive gaps.
      </p>
      <ol>
        <li><strong>Pre-first-hire.</strong> Get compliant contracts and correct worker classification in place before anyone signs.</li>
        <li><strong>First handful of hires.</strong> Set up payroll, a simple onboarding flow, and a short handbook.</li>
        <li><strong>Around ten to fifteen people.</strong> Move data off spreadsheets into an HRIS and formalise basic policies.</li>
        <li><strong>Scaling team.</strong> Add performance reviews, pay bands, and engagement surveys before ad-hoc decisions create problems.</li>
        <li><strong>Past fifty people.</strong> Consider a full-time Head of People as the workload becomes constant.</li>
      </ol>
      <p>
        For a stage-by-stage walkthrough aimed at founders, see the{' '}
        <Link to="/people-ops/hr-for-startups">HR for startups guide</Link>. If you are weighing whether to keep
        this in-house, the{' '}
        <Link to="/people-ops/outsourcing-hr-pros-and-cons">pros and cons of outsourcing HR</Link> lays out both
        sides.
      </p>

      <h2 id="fractional">Do you need this full-time?</h2>
      <p>
        Most early and mid-stage companies do not need a full-time People team. They need the function, run well,
        for a few days a month. That is what fractional People Ops provides. You get a senior lead who sets up the
        systems in this guide and runs them at a fraction of a full-time salary. To understand the model, read{' '}
        <Link to="/people-ops/what-is-fractional-hr">What is fractional HR?</Link>, then see how Puetto delivers
        it on the <Link to="/people-ops">People Ops overview</Link>.
      </p>
      <p>
        The data in this guide on stats and salaries is directional and drawn from public sources that update
        over time. Verify current figures before using them in a decision or a quote.
      </p>
    </PeopleOpsArticleLayout>
  );
}
