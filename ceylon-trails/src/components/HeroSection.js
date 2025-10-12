// src/components/HeroSection.js
import React from 'react';
import sriLankaVideo from '../assets/Starter-video-updated.mp4'; // Import your video file here

const HeroSection = () => {
  return (
    <section className="relative h-screen flex items-center justify-center text-center text-white overflow-hidden">
      
      {/* Video element acting as the background */}
      <video 
        autoPlay 
        loop 
        muted 
        playsInline 
        className="absolute z-10 w-auto min-w-full min-h-full max-w-none"
      >
        <source src={sriLankaVideo} type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      {/* Overlay for text readability */}
      <div className="absolute inset-0 bg-black opacity-40 z-20"></div>

      {/* The main content that sits on top of the video */}
      <div className="relative z-30 p-4 max-w-4xl mx-auto">
        <h1 className="text-5xl md:text-7xl font-bold mb-4 tracking-tight">
          Discover the Wonders of Sri Lanka
        </h1>
        <p className="text-lg md:text-xl mb-8">
          Your journey to the Pearl of the Indian Ocean awaits. Explore ancient history, lush landscapes, and pristine beaches with us.
        </p>
        <button className="bg-[#6a9772] text-white px-4 py-2 rounded-full hover:bg-[#3a6042] transition-all duration-300 hover:scale-105">
        Start your journey
        </button>
      </div>
    </section>
  );
};

export default HeroSection;