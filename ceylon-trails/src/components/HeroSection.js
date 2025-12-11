// src/components/HeroSection.js
import React from 'react';
import { Link } from 'react-router-dom';
import sriLankaVideo from '../assets/Starter-video-updated.mp4';

const HeroSection = () => {
  return (
    <section className="relative h-screen flex items-center justify-center text-center text-white overflow-hidden">
      
      {/* Video element acting as the background */}
      <video 
        autoPlay 
        loop 
        muted 
        playsInline 
        className="absolute z-10 w-full h-full object-cover"
      >
        <source src={sriLankaVideo} type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      {/* Overlay for text readability */}
      <div className="absolute inset-0 bg-black opacity-40 z-20"></div>

      {/* The main content that sits on top of the video */}
      <div className="relative z-30 px-4 sm:px-6 md:px-8 lg:px-10 max-w-5xl mx-auto">
        <h1 className="text-3xl xs:text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-4 sm:mb-5 md:mb-6 lg:mb-8 tracking-tight leading-tight px-2">
          Discover the Wonders of Sri Lanka
        </h1>
        <p className="text-sm xs:text-base sm:text-lg md:text-xl lg:text-2xl mb-6 sm:mb-7 md:mb-8 lg:mb-10 px-2 sm:px-4 md:px-6 leading-relaxed max-w-3xl mx-auto">
          Your journey to the Pearl of the Indian Ocean awaits. Explore ancient history, lush landscapes, and pristine beaches with us.
        </p>
        <Link to="/tours">
          <button className="bg-[#6a9772] text-white px-6 xs:px-7 sm:px-8 md:px-10 py-2.5 xs:py-3 sm:py-3.5 md:py-4 text-sm xs:text-base sm:text-lg md:text-xl rounded-full hover:bg-[#3a6042] transition-all duration-300 hover:scale-105 active:scale-95 shadow-lg hover:shadow-xl font-semibold">
            Start your journey
          </button>
        </Link>
      </div>
    </section>
  );
};

export default HeroSection;