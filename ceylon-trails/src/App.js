import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import HeroSection from './components/HeroSection';
import HighlightsSection from './components/HighlightsSection';
import ExperienceSection from './components/ExperienceSection';
import AboutUs from './Aboutus';
import ContactUsPage from './components/ContactUs';
import Destinations from './Destination';
import ToursPage from './components/ToursPage';
import Footer from './components/Footer';
import ScrollToTop from './components/ScrollToTop';

function App() {
  return (
    <Router>
      <ScrollToTop /> 
      <div className="bg-white text-gray-800 font-sans antialiased">
        <Header />
        <main>
          <Routes>
            {/* Route for the Home page */}
            <Route 
              path="/" 
              element={
                <>
                  <HeroSection />
                  <HighlightsSection />
                  <ExperienceSection />
                </>
              } 
            />

            {/* Route for the About Us page */}
            <Route path="/about" element={<AboutUs />} />

            {/* Route for the Contact Us page */}
            <Route path="/contact-us" element={<ContactUsPage />} />
            
            {/* Route for the Destination page */}
            <Route path="/destination" element={<Destinations />} />
            
            {/* Route for the Tours page */}
            <Route path="/tours" element={<ToursPage />} /> 
            
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;