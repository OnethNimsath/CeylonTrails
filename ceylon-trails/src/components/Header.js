// src/components/Header.js

import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import ceylonLogo from '../images/finalimg.png'; // Make sure this path is correct

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();
  const [animationKey, setAnimationKey] = useState(0);

  // Effect to re-trigger logo animation when the route changes
  useEffect(() => {
    setAnimationKey(prevKey => prevKey + 1);
  }, [location.pathname]);

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
    { path: '/contact-us', label: 'Contact' },
  ];

  // --- DYNAMIC STYLING LOGIC ---

  const headerClasses = `
    fixed top-0 left-0 right-0 z-50
    transition-all duration-300 ease-in-out
    ${isScrolled
      // ✨ MODIFICATION: Swapped white background for a dark, elegant green from your footer
      ? 'h-20 bg-[#1a2e24]/95 shadow-lg backdrop-blur-lg'
      : 'h-24 bg-gradient-to-b from-black/50 to-transparent'
    }
  `;

  const linkClasses = (path) => {
    const isActive = location.pathname === path;
    const baseStyle = 'px-4 py-2 rounded-full text-base font-medium transition-all duration-300';

    if (isActive) {
      // ✨ MODIFICATION: Active link now uses the vibrant golden-amber accent
      return `${baseStyle} bg-[#f59e0b] text-[#1a2e24] shadow-sm font-semibold`;
    }
    return isScrolled
      // ✨ MODIFICATION: Scrolled text is now light gray, with a golden-amber hover effect
      ? `${baseStyle} text-gray-300 hover:text-white hover:bg-[#f59e0b]/20`
      : `${baseStyle} text-white hover:bg-white/20`;
  };
  
  const bookNowButtonClasses = `
    px-6 py-2.5 rounded-full font-bold
    transition-all duration-300 ease-in-out transform
    ${isScrolled
      // ✨ MODIFICATION: Scrolled button now uses the golden-amber accent
      ? 'bg-[#f59e0b] text-[#1a2e24] hover:bg-[#fbbf24] hover:scale-105'
      : 'bg-white/25 text-white border border-white/50 backdrop-blur-sm hover:bg-white/30'
    }
  `;

  return (
    <>
      <header className={headerClasses}>
        <nav className="container mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center h-full">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link to="/">
              <img
                key={animationKey}
                src={ceylonLogo}
                alt="Ceylon Trails Logo"
                className={`w-auto transition-all duration-300 ease-in-out ${isScrolled ? 'h-32' : 'h-40'}`}
              />
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex flex-1 items-center justify-center">
            <ul className="flex items-center space-x-2">
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
          <div className="hidden md:flex flex-shrink-0">
            <Link to="/book-now" className={bookNowButtonClasses}>
              Book Now
            </Link>
          </div>

          {/* Mobile Menu Button (Hamburger/Close Icon) */}
          <div className="md:hidden flex items-center">
            <button
              onClick={toggleMenu}
              aria-label={isMenuOpen ? "Close navigation menu" : "Open navigation menu"}
              className={`focus:outline-none z-50 transition-colors duration-300 ${
                 isScrolled || isMenuOpen ? 'text-white' : 'text-white'
              }`}
            >
              <svg className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <title>{isMenuOpen ? "Close menu" : "Open menu"}</title>
                {isMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7" />
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
          transition-transform duration-300 ease-in-out md:hidden
          ${isMenuOpen ? 'translate-x-0' : 'translate-x-full'}
        `}
      >
        <div className="flex flex-col h-full items-center justify-center p-8">
          <ul className="flex flex-col items-center space-y-8 text-center">
            {navLinks.map((link) => (
              <li key={link.path}>
                <Link
                  to={link.path}
                  // ✨ MODIFICATION: Active link in mobile also uses the new accent
                  className={`text-3xl font-medium transition-colors ${location.pathname === link.path ? 'text-[#f59e0b]' : 'text-white'}`}
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
          
          <div className="mt-12 w-full max-w-xs">
            <Link
              to="/book-now"
               // ✨ MODIFICATION: Mobile "Book Now" button also uses the new accent
              className="block w-full text-center bg-[#f59e0b] text-[#1a2e24] px-8 py-4 rounded-full font-bold transition-all duration-300 hover:bg-[#fbbf24] hover:scale-105"
            >
              Book Now
            </Link>
          </div>
        </div>
      </div>

      {/* Spacer div to prevent content from being hidden behind the fixed header */}
      <div className="h-24" />
    </>
  );
};

export default Header;