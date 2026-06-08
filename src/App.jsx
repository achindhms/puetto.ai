import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import BlogPage from './pages/BlogPage';
import BlogPost from './pages/BlogPost';
import ROICalculator from './pages/ROICalculator';
import './App.css';
import ScrollToTop from './components/ScrollToTop';
import WebinarROICalculator from './pages/WebinarROICalculator';
import EventROICalculator from './pages/EventROICalculator';
import ThoughtLeadershipROICalculator from './pages/ThoughtLeadershipROICalculator';
import LinkedInAdsROICalculator from './pages/LinkedInAdsROICalculator';
import RetentionCalculator from './pages/RetentionCalculator';
import RiceCalculator from './pages/RiceCalculator';
import KanoCalculator from './pages/KanoCalculator';
import CalculatorsHub from './pages/CalculatorsHub';
import AbmOpsPillar from './pages/AbmOpsPillar';
import WhatIsAbm from './pages/WhatIsAbm';
import AbmStrategyFramework from './pages/AbmStrategyFramework';
import AbmTechStack from './pages/AbmTechStack';
import AbmSignalDataCrm from './pages/AbmSignalDataCrm';
import AbmMetricsRoi from './pages/AbmMetricsRoi';
import AbmVsDemandGen from './pages/AbmVsDemandGen';
import AccountBasedMarketingGuide from './pages/AccountBasedMarketingGuide';
import StrategyLibrary from './pages/StrategyLibrary';
import BuildB2bIcp from './pages/BuildB2bIcp';
import IcpVsBuyerPersona from './pages/IcpVsBuyerPersona';
import ValidateIcpClosedWon from './pages/ValidateIcpClosedWon';
import IcpCriteriaExplained from './pages/IcpCriteriaExplained';
import CommonIcpMistakes from './pages/CommonIcpMistakes';
import AccountScoringModel from './pages/AccountScoringModel';
import AbmAccountTiering from './pages/AbmAccountTiering';
import FitVsIntent from './pages/FitVsIntent';
import TargetAccountListSize from './pages/TargetAccountListSize';
import AccountScoringRubric from './pages/AccountScoringRubric';
import AbmToolLibrary from './pages/AbmToolLibrary';
import AbmToolCategory from './pages/AbmToolCategory';
import AbmToolReview from './pages/AbmToolReview';
import PeopleOps from './pages/PeopleOps';
import PeopleOpsWhatIsFractionalHr from './pages/PeopleOpsWhatIsFractionalHr';
import PeopleOpsHrForStartups from './pages/PeopleOpsHrForStartups';
import PeopleOpsVsHr from './pages/PeopleOpsVsHr';
import PeopleOpsOutsourcingHrProsCons from './pages/PeopleOpsOutsourcingHrProsCons';


function App() {
  return (
    <Router>
      <div className="app">
        <ScrollToTop />
        <Navbar />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/blog" element={<BlogPage />} />
          <Route path="/blog/:slug" element={<BlogPost />} />
          <Route path="/abm-roi-calculator" element={<ROICalculator />} />
          <Route path="/webinar-roi-calculator" element={<WebinarROICalculator />} />
          <Route path="/event-roi-calculator" element={<EventROICalculator />} />
          <Route path="/thought-leadership-roi-calculator" element={<ThoughtLeadershipROICalculator />} />
          <Route path="/linkedin-ads-roas-calculator" element={<LinkedInAdsROICalculator />} />
          <Route path="/retention-calculator" element={<RetentionCalculator />} />
          <Route path="/rice-calculator" element={<RiceCalculator />} />
          <Route path="/kano-calculator" element={<KanoCalculator />} />
          <Route path="/calculators" element={<CalculatorsHub />} />
          <Route path="/abm-ops" element={<AbmOpsPillar />} />
          <Route path="/abm-ops/what-is-abm" element={<WhatIsAbm />} />
          <Route path="/abm-ops/abm-strategy-framework" element={<AbmStrategyFramework />} />
          <Route path="/abm-ops/abm-tech-stack" element={<AbmTechStack />} />
          <Route path="/abm-ops/abm-signal-data-crm" element={<AbmSignalDataCrm />} />
          <Route path="/abm-ops/abm-metrics-roi" element={<AbmMetricsRoi />} />
          <Route path="/abm-ops/abm-vs-demand-gen" element={<AbmVsDemandGen />} />
          <Route path="/abm-ops/account-based-marketing-guide" element={<AccountBasedMarketingGuide />} />
          <Route path="/abm-ops/strategy-account-selection" element={<StrategyLibrary />} />
          <Route path="/abm-ops/how-to-build-b2b-icp" element={<BuildB2bIcp />} />
          <Route path="/abm-ops/icp-vs-buyer-persona" element={<IcpVsBuyerPersona />} />
          <Route path="/abm-ops/validate-icp-closed-won-data" element={<ValidateIcpClosedWon />} />
          <Route path="/abm-ops/icp-firmographic-technographic-behavioral" element={<IcpCriteriaExplained />} />
          <Route path="/abm-ops/common-icp-mistakes" element={<CommonIcpMistakes />} />
          <Route path="/abm-ops/account-scoring-model" element={<AccountScoringModel />} />
<Route path="/abm-ops/abm-account-tiering" element={<AbmAccountTiering />} />
<Route path="/abm-ops/fit-vs-intent" element={<FitVsIntent />} />
<Route path="/abm-ops/target-account-list-size" element={<TargetAccountListSize />} />
<Route path="/abm-ops/account-scoring-rubric" element={<AccountScoringRubric />} />
          <Route path="/abm-ops/tools" element={<AbmToolLibrary />} />
<Route path="/abm-ops/tools/:categorySlug" element={<AbmToolCategory />} />
<Route path="/abm-ops/tools/:categorySlug/:toolSlug" element={<AbmToolReview />} />
          <Route path="/people-ops" element={<PeopleOps />} />
<Route path="/people-ops/what-is-fractional-hr" element={<PeopleOpsWhatIsFractionalHr />} />
<Route path="/people-ops/hr-for-startups" element={<PeopleOpsHrForStartups />} />
<Route path="/people-ops/people-operations-vs-hr" element={<PeopleOpsVsHr />} />
<Route path="/people-ops/outsourcing-hr-pros-and-cons" element={<PeopleOpsOutsourcingHrProsCons />} />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
