import { Helmet } from 'react-helmet-async';
import Hero from '../components/Hero';
import ProblemSection from '../components/ProblemSection';
import NetworkSection from '../components/NetworkSection';
import WhatWeDo from '../components/WhatWeDo';
import AIAutomationSection from '../components/AIAutomationSection';
import HowItWorksSection from '../components/HowItWorksSection';
import IntegrationsSection from '../components/IntegrationsSection';
import ResultsSection from '../components/ResultsSection';
import FAQ from '../components/FAQ';

const HomePage = () => {
  const schemaData = {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    "name": "Puetto",
    "alternateName": "PUETTO - AI GTM OPS PARTNER",
    "description": "AI-enabled GTM operations partner helping high-growth companies automate revenue, product, and people infrastructure.",
    "url": "https://www.puetto.com",
    "logo": "https://i.ibb.co/N2CYTcvn/Frame-1-2-removebg-preview.png",
    "address": {
      "@type": "PostalAddress",
      "addressLocality": "San Francisco",
      "addressRegion": "CA",
      "addressCountry": "US"
    },
    "sameAs": [
      "https://www.linkedin.com/company/puetto",
      "https://twitter.com/puetto"
    ],
    "serviceType": [
      "AI GTM Operations",
      "Revenue Operations Automation",
      "Product Operations",
      "People Operations"
    ]
  };

  return (
    <main className="main-content">
      <Helmet>
        <title>PUETTO | AI GTM Ops Partner for Scaling Revenue, Product & People</title>
        <meta name="description" content="Puetto is your expert AI-enabled GTM operations partner. We automate CRM workflows, optimize revenue reporting, and streamline people operations for high-growth tech companies." />
        <meta name="keywords" content="AI GTM Ops, Revenue Operations, CRM Automation, Product Ops, People Ops Automation, HubSpot AI partner, Sales Ops Outsourcing, Puetto" />
        
        {/* OpenGraph / Facebook */}
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://www.puetto.com/" />
        <meta property="og:title" content="PUETTO | AI GTM Ops Partner for Scaling Revenue & Product" />
        <meta property="og:description" content="Stop manual ops. Puetto automates your GTM infrastructure using advanced AI and custom integrations." />
        <meta property="og:image" content="https://i.ibb.co/JFsW9SBm/Screenshot-2026-04-04-at-10-47-17-PM.png" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />

        {/* Twitter */}
        <meta property="twitter:card" content="summary_large_image" />
        <meta property="twitter:url" content="https://www.puetto.com/" />
        <meta property="twitter:title" content="PUETTO | AI GTM Ops Partner" />
        <meta property="twitter:description" content="AI-enabled GTM operations partner helping high-growth companies scale with zero manual overhead." />
        <meta property="twitter:image" content="https://i.ibb.co/JFsW9SBm/Screenshot-2026-04-04-at-10-47-17-PM.png" />

        {/* JSON-LD Structured Data */}
        <script type="application/ld+json">
          {JSON.stringify(schemaData)}
        </script>
      </Helmet>

      <Hero />
      <ProblemSection />
      <NetworkSection />
      <WhatWeDo />
      <AIAutomationSection />
      <HowItWorksSection />
      <IntegrationsSection />
      <ResultsSection />
      <FAQ />
    </main>
  );
};

export default HomePage;
