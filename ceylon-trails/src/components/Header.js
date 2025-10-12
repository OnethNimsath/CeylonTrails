// src/components/Header.js
import React from 'react';
import ceylonLogo from '../images/Ceylon-Trails.jpg'; // Make sure the path is correct

const Header = () => {
  return (
    <header className="p-4 bg-white shadow-sm sticky top-0 z-50">
      <nav className="container mx-auto flex justify-between items-center">
        {/* Logo Container */}
        <div className="flex-shrink-0">
          <a href="/">
            <img 
              src={ceylonLogo} 
              alt="Ceylon Journeys Logo" 
              className="h-20 w-auto" // Increased the height
            />
          </a>
        </div>
        
        {/* Navigation Links with Animations */}
        <ul className="hidden md:flex space-x-6 text-lg items-center">
          <li>
            <a href="/" className="relative group hover:text-[#6a9772] transition-colors duration-300">
              Home
              <span className="absolute bottom-0 left-0 w-full h-0.5 bg-[#6a9772] transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 ease-in-out"></span>
            </a>
          </li>
          <li>
            <a href="#" className="relative group hover:text-[#6a9772] transition-colors duration-300">
              About 
              <span className="absolute bottom-0 left-0 w-full h-0.5 bg-[#6a9772] transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 ease-in-out"></span>
            </a>
          </li>
          <li>
            <a href="#" className="relative group hover:text-[#6a9772] transition-colors duration-300">
              Destinations
              <span className="absolute bottom-0 left-0 w-full h-0.5 bg-[#6a9772] transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 ease-in-out"></span>
            </a>
          </li>
          <li>
            <a href="#" className="relative group hover:text-[#6a9772] transition-colors duration-300">
              Tours
              <span className="absolute bottom-0 left-0 w-full h-0.5 bg-[#6a9772] transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 ease-in-out"></span>
            </a>
          </li>
          <li>
            <a href="#" className="relative group hover:text-[#6a9772] transition-colors duration-300">
              Contact
              <span className="absolute bottom-0 left-0 w-full h-0.5 bg-[#6a9772] transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 ease-in-out"></span>
            </a>
          </li>
        </ul>
        
        {/* Book Now Button */}
        <button className="bg-[#6a9772] text-white px-4 py-2 rounded-full hover:bg-[#3a6042] transition-all duration-300 hover:scale-105">
        Book Now
        </button>
      </nav>
    </header>
  );
};

export default Header;