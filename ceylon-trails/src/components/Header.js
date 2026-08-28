// src/components/Header.js

import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import ceylonLogo from '../images/finalimg.png';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();

  // Effect to handle the header's appearance on scroll
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Effect to close the mobile menu when the route changes
  useEffect(() => {
    setIsMenuOpen(false);
  }, [location.pathname]);

  // Effect to prevent body scrolling when the mobile menu is open
  useEffect(() => {
    document.body.style.overflow = isMenuOpen ? 'hidden' : 'auto';
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [isMenuOpen]);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const navLinks = [
    { path: '/', label: 'Home' },
    { path: '/about', label: 'About' },
    { path: '/destination', label: 'Destinations' },
    { path: '/tours', label: 'Tours' },
    { path: '/reviews', label: 'Reviews' },
    { path: '/contact-us', label: 'Contact' },
  ];

  // --- DYNAMIC STYLING LOGIC ---

  const headerClasses = `
    fixed top-0 left-0 right-0 z-50
    transition-all duration-300 ease-in-out
    ${isScrolled
      ? 'h-16 sm:h-18 md:h-20 bg-[#1a2e24]/95 shadow-lg backdrop-blur-md'
      : 'h-16 sm:h-18 md:h-20 bg-gradient-to-b from-black/50 to-transparent'
    }
  `;

  const linkClasses = (path) => {
    const isActive = location.pathname === path;
    const baseStyle = 'px-2 sm:px-3 lg:px-4 py-1.5 sm:py-2 rounded-full text-xs sm:text-sm lg:text-base font-medium transition-all duration-300 whitespace-nowrap';

    if (isActive) {
      return `${baseStyle} bg-[#f59e0b] text-[#1a2e24] shadow-sm font-semibold`;
    }
    return isScrolled
      ? `${baseStyle} text-gray-300 hover:text-white hover:bg-[#f59e0b]/20`
      : `${baseStyle} text-white hover:bg-white/20`;
  };
  
  const bookNowButtonClasses = `
    px-3 sm:px-4 lg:px-6 py-1.5 sm:py-2 lg:py-2.5 rounded-full font-bold text-xs sm:text-sm lg:text-base
    transition-all duration-300 ease-in-out transform whitespace-nowrap
    ${isScrolled
      ? 'bg-[#f59e0b] text-[#1a2e24] hover:bg-[#fbbf24] hover:scale-105'
      : 'bg-white/25 text-white border border-white/50 backdrop-blur-sm hover:bg-white/30'
    }
  `;

  return (
    <div className="relative">
      <header className={headerClasses}>
        <nav className="container mx-auto px-3 sm:px-4 md:px-6 lg:px-8 flex justify-between items-center h-full">
          {/* Logo — stable element, never remounted, so it only loads/decodes once per session */}
          <div className="flex-shrink-0">
            <Link to="/" className="block">
              <img
                src={ceylonLogo}
                alt="Ceylon Trails Logo"
                loading="eager"
                fetchPriority="high"
                decoding="async"
                className={`w-auto transition-all duration-300 ease-in-out object-contain ${
                  isScrolled 
                    ? 'h-14 sm:h-16 md:h-18 lg:h-20' 
                    : 'h-14 sm:h-16 md:h-18 lg:h-20'
                }`}
              />
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex flex-1 items-center justify-center mx-4">
            <ul className="flex items-center space-x-1 xl:space-x-2">
              {navLinks.map((link) => (
                <li key={link.path}>
                  <Link to={link.path} className={linkClasses(link.path)}>
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Desktop Book Now Button */}
          <div className="hidden lg:flex flex-shrink-0">
            <Link to="/contact-us" className={bookNowButtonClasses}>
              Book Now
            </Link>
          </div>

          {/* Mobile Menu Button (Hamburger/Close Icon) */}
          <div className="lg:hidden flex items-center ml-auto">
            <button
              onClick={toggleMenu}
              aria-label={isMenuOpen ? "Close navigation menu" : "Open navigation menu"}
              className="focus:outline-none z-50 transition-colors duration-300 p-2 -mr-2 text-white"
            >
              <svg className="h-6 w-6 sm:h-7 sm:w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                <title>{isMenuOpen ? "Close menu" : "Open menu"}</title>
                {isMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </nav>
      </header>

      {/* MODERN FULLSCREEN MOBILE MENU */}
      <div
        className={`
          fixed inset-0 z-40 bg-[#1a2e24]/95 backdrop-blur-md
          transition-all duration-300 ease-in-out lg:hidden
          ${isMenuOpen ? 'opacity-100 visible' : 'opacity-0 invisible'}
        `}
        onClick={(e) => {
          if (e.target === e.currentTarget) setIsMenuOpen(false);
        }}
      >
        <div 
          className={`
            flex flex-col h-full items-center justify-center p-6 sm:p-8
            transition-transform duration-300 ease-out
            ${isMenuOpen ? 'translate-y-0' : '-translate-y-4'}
          `}
        >
          {/* Mobile Navigation Links */}
          <ul className="flex flex-col items-center space-y-4 sm:space-y-6 text-center w-full">
            {navLinks.map((link, index) => (
              <li 
                key={link.path}
                className="w-full"
                style={{
                  transitionDelay: isMenuOpen ? `${index * 50}ms` : '0ms'
                }}
              >
                <Link
                  to={link.path}
                  className={`
                    block w-full text-xl sm:text-2xl md:text-3xl font-medium 
                    transition-all duration-300 py-2 px-6 rounded-lg
                    ${location.pathname === link.path 
                      ? 'text-[#f59e0b] bg-[#f59e0b]/10' 
                      : 'text-white hover:text-[#f59e0b] hover:bg-white/5'
                    }
                  `}
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
          
          {/* Mobile Book Now Button */}
          <div className="mt-8 sm:mt-10 md:mt-12 w-full max-w-xs px-4">
            <Link
              to="/contact-us"
              className="
                block w-full text-center 
                bg-[#f59e0b] text-[#1a2e24] 
                px-6 sm:px-8 py-3 sm:py-4 
                text-base sm:text-lg font-bold 
                rounded-full 
                transition-all duration-300 
                hover:bg-[#fbbf24] 
                active:scale-95
                shadow-lg hover:shadow-xl
              "
            >
              Book Now
            </Link>
          </div>

          {/* Social Links or Additional Info (Optional) */}
          <div className="mt-8 sm:mt-10 text-center">
            <p className="text-gray-400 text-xs sm:text-sm">
              Discover the beauty of Sri Lanka
            </p>
          </div>
        </div>
      </div>

      {/* Spacer div to prevent content from being hidden behind the fixed header */}
      <div className="h-16 sm:h-18 md:h-20" />
    </div>
  );
};

export default Header;