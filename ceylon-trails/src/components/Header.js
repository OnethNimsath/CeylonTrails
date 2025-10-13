import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import ceylonLogo from '../images/Ceylon-Trails.jpg';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className="p-4 bg-white shadow-md sticky top-0 z-50">
      <nav className="container mx-auto flex justify-between items-center relative">
        {/* Logo */}
        <div className="flex-shrink-0">
          <Link to="/">
            <img 
              src={ceylonLogo} 
              alt="Ceylon Journeys Logo" 
              className="h-16 w-auto" 
            />
          </Link>
        </div>

        {/* Desktop Navigation Links and Book Now button */}
        <div className="hidden md:flex flex-1 items-center justify-center">
          <ul className="flex space-x-6 text-lg">
            <li>
              <Link to="/" className={`group relative transition-colors duration-300 ${location.pathname === '/' ? 'text-[#6a9772] font-semibold' : 'text-gray-700 hover:text-[#6a9772]'}`}>
                Home
                <span className="absolute bottom-0 left-0 w-full h-0.5 bg-[#6a9772] transition-transform duration-300 ease-in-out transform scale-x-0 group-hover:scale-x-100"></span>
              </Link>
            </li>
            <li>
              <Link to="/about" className={`group relative transition-colors duration-300 ${location.pathname === '/about' ? 'text-[#6a9772] font-semibold' : 'text-gray-700 hover:text-[#6a9772]'}`}>
                About
                <span className="absolute bottom-0 left-0 w-full h-0.5 bg-[#6a9772] transition-transform duration-300 ease-in-out transform scale-x-0 group-hover:scale-x-100"></span>
              </Link>
            </li>
            <li>
              <Link to="/destination" className={`group relative transition-colors duration-300 ${location.pathname === '/destination' ? 'text-[#6a9772] font-semibold' : 'text-gray-700 hover:text-[#6a9772]'}`}>
                Destinations
                <span className="absolute bottom-0 left-0 w-full h-0.5 bg-[#6a9772] transition-transform duration-300 ease-in-out transform scale-x-0 group-hover:scale-x-100"></span>
              </Link>
            </li>
            <li>
              <Link to="/tours" className={`group relative transition-colors duration-300 ${location.pathname === '/tours' ? 'text-[#6a9772] font-semibold' : 'text-gray-700 hover:text-[#6a9772]'}`}>
                Tours
                <span className="absolute bottom-0 left-0 w-full h-0.5 bg-[#6a9772] transition-transform duration-300 ease-in-out transform scale-x-0 group-hover:scale-x-100"></span>
              </Link>
            </li>
            <li>
              <Link to="/contact-us" className={`group relative transition-colors duration-300 ${location.pathname === '/contact-us' ? 'text-[#6a9772] font-semibold' : 'text-gray-700 hover:text-[#6a9772]'}`}>
                Contact
                <span className="absolute bottom-0 left-0 w-full h-0.5 bg-[#6a9772] transition-transform duration-300 ease-in-out transform scale-x-0 group-hover:scale-x-100"></span>
              </Link>
            </li>
          </ul>
        </div>

        {/* Book Now button */}
        <div className="hidden md:flex flex-shrink-0">
          <Link to="/book-now" className="bg-[#6a9772] text-white px-6 py-3 rounded-full font-semibold transition-all duration-300 hover:bg-[#3a6042] hover:scale-105 hover:shadow-lg">
            Book Now
          </Link>
        </div>

        {/* Mobile menu button */}
        <div className="md:hidden flex items-center">
            <button onClick={toggleMenu} className="text-gray-800 focus:outline-none">
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
      <div className={`md:hidden absolute top-[100%] left-0 w-full bg-white shadow-lg transition-transform duration-500 ease-in-out transform ${isMenuOpen ? 'translate-y-0 opacity-100' : '-translate-y-full opacity-0'}`}>
        <ul className="flex flex-col items-center py-6 space-y-6">
          <li><Link onClick={toggleMenu} to="/" className="block text-lg font-semibold hover:text-[#6a9772] transition-colors">Home</Link></li>
          <li><Link onClick={toggleMenu} to="/about" className="block text-lg font-semibold hover:text-[#6a9772] transition-colors">About</Link></li>
          <li><Link onClick={toggleMenu} to="/destinations" className="block text-lg font-semibold hover:text-[#6a9772] transition-colors">Destinations</Link></li>
          <li><Link onClick={toggleMenu} to="/tours" className="block text-lg font-semibold hover:text-[#6a9772] transition-colors">Tours</Link></li>
          <li><Link onClick={toggleMenu} to="/contact-us" className="block text-lg font-semibold hover:text-[#6a9772] transition-colors">Contact</Link></li>
          <li>
            <Link onClick={toggleMenu} to="/book-now" className="block bg-[#6a9772] text-white px-6 py-3 rounded-full hover:bg-[#3a6042] transition-colors">
              Book Now
            </Link>
          </li>
        </ul>
      </div>
    </header>
  );
};

export default Header;