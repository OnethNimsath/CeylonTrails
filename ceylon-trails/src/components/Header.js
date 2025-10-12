// src/components/Header.js
import React, { useState } from 'react';
import { Link } from 'react-router-dom'; // Import the Link component
import ceylonLogo from '../images/Ceylon-Trails.jpg';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className="p-4 bg-white shadow-sm sticky top-0 z-50">
      <nav className="container mx-auto flex justify-between items-center relative">
        {/* Logo Container */}
        <div className="flex-shrink-0">
          <Link to="/">
            <img 
              src={ceylonLogo} 
              alt="Ceylon Journeys Logo" 
              className="h-20 w-auto" // Increased the height
            />
          </Link>
        </div>
        
        {/* Desktop Navigation Links */}
        <ul className="hidden md:flex space-x-6 text-lg items-center">
          <li>
            <Link to="/" className="relative group hover:text-[#6a9772] transition-colors duration-300">
              Home
              <span className="absolute bottom-0 left-0 w-full h-0.5 bg-[#6a9772] transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 ease-in-out"></span>
            </Link>
          </li>
          <li>
            <Link to="/about" className="relative group hover:text-[#6a9772] transition-colors duration-300">
              About 
              <span className="absolute bottom-0 left-0 w-full h-0.5 bg-[#6a9772] transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 ease-in-out"></span>
            </Link>
          </li>
          <li>
            <Link to="/destination" className="relative group hover:text-[#6a9772] transition-colors duration-300">
              Destinations
              <span className="absolute bottom-0 left-0 w-full h-0.5 bg-[#6a9772] transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 ease-in-out"></span>
            </Link>
          </li>
          <li>
            <Link to="/tours" className="relative group hover:text-[#6a9772] transition-colors duration-300">
              Tours
              <span className="absolute bottom-0 left-0 w-full h-0.5 bg-[#6a9772] transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 ease-in-out"></span>
            </Link>
          </li>
          <li>
            <Link to="/contact" className="relative group hover:text-[#6a9772] transition-colors duration-300">
              Contact
              <span className="absolute bottom-0 left-0 w-full h-0.5 bg-[#6a9772] transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 ease-in-out"></span>
            </Link>
          </li>
        </ul>
        
        {/* Mobile menu button and desktop button */}
        <div className="flex items-center">
          <button className="hidden md:block bg-[#6a9772] text-white px-4 py-2 rounded-full hover:bg-[#3a6042] transition-all duration-300 hover:scale-105">
            Book Now
          </button>
          <button onClick={toggleMenu} className="md:hidden text-gray-800 focus:outline-none ml-4">
            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              {isMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      <div className={`md:hidden absolute top-full left-0 w-full bg-white shadow-lg transition-transform duration-300 ease-in-out transform ${isMenuOpen ? 'translate-y-0' : '-translate-y-[150%]'}`}>
        <ul className="flex flex-col items-center py-4 space-y-4">
          <li><Link onClick={toggleMenu} to="/" className="block text-lg font-semibold hover:text-[#6a9772]">Home</Link></li>
          <li><Link onClick={toggleMenu} to="/about" className="block text-lg font-semibold hover:text-[#6a9772]">About</Link></li>
          <li><Link onClick={toggleMenu} to="/destinations" className="block text-lg font-semibold hover:text-[#6a9772]">Destinations</Link></li>
          <li><Link onClick={toggleMenu} to="/tours" className="block text-lg font-semibold hover:text-[#6a9772]">Tours</Link></li>
          <li><Link onClick={toggleMenu} to="/contact" className="block text-lg font-semibold hover:text-[#6a9772]">Contact</Link></li>
          <li><button onClick={toggleMenu} className="bg-[#6a9772] text-white px-4 py-2 rounded-full hover:bg-[#3a6042]">Book Now</button></li>
        </ul>
      </div>
    </header>
  );
};

export default Header;