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
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
