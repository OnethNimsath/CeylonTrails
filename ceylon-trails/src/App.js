import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import HeroSection from './components/HeroSection';
import HighlightsSection from './components/HighlightsSection';
import AboutUs from './Aboutus';
import Destinations from './Destination'
import Footer from './components/Footer';

function App() {
  return (
    <Router>
      <div className="bg-white text-gray-800 font-sans antialiased">
        {/* Header and Footer will appear on all pages */}
        <Header />
        <main>
          {/* 3. Routes define which component to show for each URL */}
          <Routes>
            {/* Route for the Home page */}
            <Route 
              path="/" 
              element={
                <>
                  <HeroSection />
                  <HighlightsSection />
                </>
              } 
            />

            {/* Route for the About Us page */}
            <Route path="/about" element={<AboutUs />} />

            {/* Route for the Destination page */}
            <Route path="/destination" element={<Destinations />} />
            
            {/* You can add more routes for future pages here */}
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;