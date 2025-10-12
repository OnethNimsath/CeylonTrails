import React from 'react';
import Header from './components/Header';
import HeroSection from './components/HeroSection';
import HighlightsSection from './components/HighlightsSection';
import Footer from './components/Footer';

function App() {
  return (
    <div className="bg-white text-gray-800 font-sans antialiased">
      <Header />
      <main>
        <HeroSection />
        <HighlightsSection />
        {/* You can add more sections here for tours, reviews, etc. */}
      </main>
      <Footer />
    </div>
  );
}

export default App;