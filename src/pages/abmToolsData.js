// =============================================================================
// ABM TOOL LIBRARY — single source of truth
// -----------------------------------------------------------------------------
// Add a category or a tool here and the hub, category pages, tool pages, and all
// cross-links (alternatives, "tools in this category") generate automatically.
//
// IMPORTANT EDITORIAL RULES (legal + SEO):
//  - All copy here is ORIGINAL Puetto editorial. Do NOT paste G2/Capterra/Reddit
//    text, star ratings, or review counts. Link out to them instead (sourceLinks).
//  - `community` is a Puetto-written synthesis ("practitioners frequently cite..."),
//    not a quote. Always pair it with a sourceLinks entry.
//  - `alternatives` are slugs of other tools in this file — they auto-interlink.
// =============================================================================

export const CATEGORIES = [
  {
    slug: 'email-automation',
    name: 'Email Automation',
    tagline: 'Cold outbound, sequencing, and deliverability tools for ABM email plays.',
    description:
      'Email automation tools run the outbound email layer of an ABM program: multi-step sequences, inbox rotation, deliverability management, and reply handling. In an account-based motion they are used to reach named contacts inside target accounts at scale, while keeping messaging personalized enough to land.',
    intro:
      'For account-based marketing, the email layer has to do two things that are in tension: operate at enough volume to reach a full buying committee across many accounts, and stay personalized and deliverable enough that messages actually arrive and get replies. The tools below are the ones practitioners most often reach for, each with a different balance of scale, deliverability control, and CRM depth.',
  },
  {
    slug: 'linkedin-automation',
    name: 'LinkedIn Automation',
    tagline: 'Connection, messaging, and engagement automation for LinkedIn-led ABM.',
    description:
      'LinkedIn automation tools handle connection requests, message sequences, and engagement on LinkedIn — the dominant channel for B2B account-based outreach. They are used to multi-thread across a buying committee and warm accounts before or alongside email.',
    intro:
      'LinkedIn is where most B2B buying committees are reachable, which makes it central to ABM. The challenge is doing it safely: LinkedIn actively limits automation, so the tools differ mainly in how they balance throughput against account-safety. (Category page — tools coming.)',
  },
  {
    slug: 'lead-sourcing',
    name: 'Lead Sourcing & Data',
    tagline: 'Contact data, enrichment, and list-building for target accounts.',
    description:
      'Lead sourcing and data tools supply the contacts and firmographic, technographic, and intent data that feed an ABM program — the raw material for building and enriching a target account list.',
    intro:
      'An ABM program is only as good as the data underneath it. These tools build and enrich the target account list with contacts, firmographics, technographics, and intent signals. (Category page — tools coming.)',
  },
  {
    slug: 'intent-data',
    name: 'Intent Data',
    tagline: 'Signals that reveal which accounts are in-market now.',
    description:
      'Intent data platforms surface which target accounts are actively researching your category, so teams can prioritize outreach by timing — a core input to account scoring.',
    intro:
      'Intent data answers the "is now the moment?" question in account scoring. These platforms detect research surges and buying signals across the web. (Category page — tools coming.)',
  },
  {
    slug: 'abm-platforms',
    name: 'ABM Platforms',
    tagline: 'End-to-end orchestration: targeting, advertising, and measurement.',
    description:
      'ABM platforms orchestrate the full account-based motion — account selection, advertising, web personalization, and measurement — in one connected system, typically sitting on top of the CRM.',
    intro:
      'ABM platforms are the orchestration layer that ties targeting, advertising, and measurement together. These are the heavyweight, full-stack options. (Category page — tools coming.)',
  },
];

// -----------------------------------------------------------------------------
// TOOLS
// -----------------------------------------------------------------------------
export const TOOLS = [
  {
    slug: 'smartlead',
    name: 'Smartlead',
    category: 'email-automation',
    website: 'https://www.smartlead.ai',
    oneLiner:
      'Cold email platform built around unlimited mailboxes and deliverability, aimed at high-volume outbound.',
    whatItDoes:
      'Smartlead is a cold email automation platform whose central pitch is scale without burning deliverability. It lets teams connect unlimited email accounts and rotate sends across them, runs multi-step sequences with conditional logic, and includes a unified master inbox for handling replies across all connected mailboxes. It also offers a warmup network, sub-account structures aimed at agencies, and an API for teams that want to build sending into their own systems. In an ABM context it is typically the engine for reaching many contacts across a target account list while keeping per-mailbox volume low enough to stay deliverable.',
    bestFor:
      'Agencies and high-volume outbound teams that send across many mailboxes and need deliverability control and an API, rather than teams wanting a tightly integrated all-in-one CRM.',
    pros: [
      'Unlimited mailbox connections with automatic rotation, which keeps per-inbox volume low.',
      'Strong focus on deliverability — warmup, rotation, and sending controls are core, not add-ons.',
      'Master inbox consolidates replies across all connected accounts.',
      'Agency-friendly sub-account structure and a capable API.',
    ],
    cons: [
      'The interface and depth can be steep for first-time outbound teams.',
      'It is an outbound engine, not a full CRM — pipeline management lives elsewhere.',
      'Heavy multi-mailbox setups require real deliverability know-how to run well.',
    ],
    pricing:
      'Subscription tiers based on sending volume and features, with higher tiers for agencies and unlimited mailboxes. Check the vendor site for current pricing, as it changes.',
    community:
      'Across outbound communities and review sites, practitioners frequently cite Smartlead for deliverability and unlimited-mailbox scaling as its standout strengths, while a recurring critique is a learning curve and occasional support friction at high volume. Treat this as a directional synthesis and verify against current first-hand sources below.',
    alternatives: ['instantly', 'lemlist', 'apollo-sequences'],
    sourceLinks: [
      { label: 'Smartlead on G2', url: 'https://www.g2.com/products/smartlead-ai/reviews' },
      { label: 'r/Emailmarketing (Reddit)', url: 'https://www.reddit.com/r/Emailmarketing/' },
    ],
  },
  {
    slug: 'instantly',
    name: 'Instantly',
    category: 'email-automation',
    website: 'https://www.instantly.ai',
    oneLiner:
      'Cold email and deliverability platform popular with agencies and lead-gen teams for its simplicity and built-in lead database.',
    whatItDoes:
      'Instantly is a cold outbound platform combining unlimited mailbox sending, a warmup network, campaign sequencing, and a unified inbox, with an emphasis on being approachable. It bundles a built-in B2B lead database and deliverability tooling, positioning itself as a place to source, send, and manage replies in one flow. For ABM teams it is often the day-one outbound tool because it gets a multi-mailbox campaign running quickly without deep configuration.',
    bestFor:
      'Lead-gen teams and agencies that want multi-mailbox cold email running fast, with sourcing and warmup bundled in, and who value ease of use over deep customization.',
    pros: [
      'Fast to set up — a multi-mailbox campaign can be live quickly.',
      'Large warmup network and built-in deliverability tooling.',
      'Bundled lead database reduces the number of separate tools needed.',
      'Clean, approachable interface.',
    ],
    cons: [
      'Less granular control than tools aimed at power users.',
      'Bundled lead data quality varies by segment and should be verified.',
      'Like all cold-email tools, results depend heavily on list and copy quality, not the tool alone.',
    ],
    pricing:
      'Tiered subscriptions by sending volume and seats, with separate pricing for the lead database. Verify current pricing on the vendor site.',
    community:
      'Practitioners in outbound and agency communities often praise Instantly for ease of setup and deliverability, while recurring critiques center on lead-data quality and support response at scale. This is a Puetto synthesis of commonly expressed views — verify against the first-hand sources below.',
    alternatives: ['smartlead', 'lemlist', 'apollo-sequences'],
    sourceLinks: [
      { label: 'Instantly on G2', url: 'https://www.g2.com/products/instantly/reviews' },
      { label: 'r/coldemail (Reddit)', url: 'https://www.reddit.com/r/coldemail/' },
    ],
  },
  {
    slug: 'lemlist',
    name: 'lemlist',
    category: 'email-automation',
    website: 'https://www.lemlist.com',
    oneLiner:
      'Outbound platform known for personalization at scale — dynamic images, custom landing pages, and multichannel sequences.',
    whatItDoes:
      'lemlist is an outbound sequencing platform that leans into personalization: dynamic image and text personalization, personalized landing pages, and multichannel steps that combine email with LinkedIn and calls. It includes warmup and a contact database. For ABM, its differentiator is making each touch feel bespoke even when sent at volume, which suits account-based plays where relevance matters more than raw throughput.',
    bestFor:
      'Teams that prioritize personalization and multichannel sequencing over maximum send volume, and want email, LinkedIn, and calls in one cadence.',
    pros: [
      'Strong personalization features, including dynamic images and custom landing pages.',
      'Native multichannel sequences (email + LinkedIn + calls).',
      'Built-in warmup and contact database.',
      'Active community and template library.',
    ],
    cons: [
      'Personalization depth adds setup effort per campaign.',
      'Can be pricier per seat than bare-bones senders.',
      'Very high-volume, many-mailbox setups are not its core focus.',
    ],
    pricing:
      'Per-seat subscription tiers, with higher tiers unlocking multichannel and advanced personalization. Confirm current pricing on the vendor site.',
    community:
      'Reviewers commonly highlight lemlist for personalization and multichannel flows, with critiques around price and a learning curve for advanced features. Puetto synthesis — verify against the sources below.',
    alternatives: ['smartlead', 'instantly', 'apollo-sequences'],
    sourceLinks: [
      { label: 'lemlist on G2', url: 'https://www.g2.com/products/lemlist/reviews' },
      { label: 'lemlist on Capterra', url: 'https://www.capterra.com/p/151730/lemlist/' },
    ],
  },
  {
    slug: 'apollo-sequences',
    name: 'Apollo.io (Sequences)',
    category: 'email-automation',
    website: 'https://www.apollo.io',
    oneLiner:
      'Combined contact database and outbound sequencing — sourcing and sending in one platform.',
    whatItDoes:
      'Apollo.io pairs a large B2B contact and company database with built-in outbound sequencing, so teams can find target-account contacts and email them from the same tool. It includes enrichment, basic intent signals, and CRM-style features. For ABM, its appeal is consolidation: sourcing the buying committee and running sequences against it without exporting to a separate sender.',
    bestFor:
      'Teams that want sourcing and sending in one place and prefer consolidation over best-in-class deliverability tooling.',
    pros: [
      'Combines a large contact database with sequencing — fewer tools to stitch together.',
      'Built-in enrichment and basic intent data.',
      'Cost-effective entry point for smaller teams.',
    ],
    cons: [
      'Deliverability controls are less specialized than dedicated cold-email tools.',
      'Data accuracy varies by region and segment.',
      'Sending at high volume from few mailboxes carries deliverability risk.',
    ],
    pricing:
      'Freemium with paid tiers by seats and credits. Verify current pricing on the vendor site.',
    community:
      'Practitioners frequently value Apollo for all-in-one sourcing plus sending and price, while raising data-accuracy and deliverability caveats for heavy cold outbound. Puetto synthesis — verify against the sources below.',
    alternatives: ['smartlead', 'instantly', 'lemlist'],
    sourceLinks: [
      { label: 'Apollo.io on G2', url: 'https://www.g2.com/products/apollo-io/reviews' },
      { label: 'r/sales (Reddit)', url: 'https://www.reddit.com/r/sales/' },
    ],
  },
];

// -----------------------------------------------------------------------------
// Helpers — used by the page components
// -----------------------------------------------------------------------------
export const getCategory = (slug) => CATEGORIES.find((c) => c.slug === slug);
export const getTool = (slug) => TOOLS.find((t) => t.slug === slug);
export const getToolsInCategory = (catSlug) =>
  TOOLS.filter((t) => t.category === catSlug);
export const getAlternatives = (tool) =>
  (tool.alternatives || []).map((s) => getTool(s)).filter(Boolean);
export const getCategoryForTool = (tool) => getCategory(tool.category);

// Flat list of route paths for the sitemap (add these to vite.config.js routes).
export const ALL_TOOL_LIBRARY_ROUTES = [
  '/abm-ops/tools',
  ...CATEGORIES.map((c) => `/abm-ops/tools/${c.slug}`),
  ...TOOLS.map((t) => `/abm-ops/tools/${t.category}/${t.slug}`),
];
