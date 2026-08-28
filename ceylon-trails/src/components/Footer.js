// src/components/Footer.js

import React from 'react';
import { Link } from 'react-router-dom';
import ceylonLogo from '../images/finalimg.png';

// SVG components for social icons for better reusability and styling
const SocialIcon = ({ href, children }) => (
  <a href={href} target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-[#6a9772] transition-colors duration-300">
    {children}
  </a>
);

const Footer = () => {
  return (
    <footer className="bg-[#1a2e24] text-white">
      <div className="container mx-auto px-4 sm:px-6 py-10 sm:py-12 md:py-5">
        {/* Main content grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-12 gap-x-6 sm:gap-x-8 gap-y-10 sm:gap-y-12">
          
          {/* Column 1: Brand Info */}
          <div className="sm:col-span-2 md:col-span-5">
            <Link to="/" className="inline-block mb-0">
              <img 
                src={ceylonLogo} 
                alt="Ceylon Trails Logo" 
                loading="lazy"
                decoding="async"
                className="h-20 sm:h-28 md:h-40 w-auto rounded-md"
              />
            </Link>
            <p className="text-gray-300 max-w-md text-sm sm:text-base">
              Discover the enchanting beauty of Sri Lanka. We craft unforgettable journeys, weaving together culture, nature, and adventure into a seamless travel experience.
            </p>
            <div className="flex space-x-5 mt-6 sm:mt-8">
              <SocialIcon href="https://www.facebook.com/share/14v6Q1FVHnG/">
                <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd"></path></svg>
              </SocialIcon>
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div className="md:col-span-2 mt-0 md:mt-12">
            <h4 className="font-semibold text-white text-base sm:text-lg mb-4 sm:mb-5 uppercase tracking-wider transition-all duration-300 hover:text-[#6a9772] hover:translate-x-2">Explore</h4>
            <ul className="space-y-3 sm:space-y-5">
              <li><Link to="/tours" className="text-gray-300 hover:text-white transition-transform duration-300 transform hover:-translate-y-px inline-block text-sm sm:text-base">Tours</Link></li>
              <li><Link to="/destination" className="text-gray-300 hover:text-white transition-transform duration-300 transform hover:-translate-y-px inline-block text-sm sm:text-base">Destinations</Link></li>
              <li><Link to="/about" className="text-gray-300 hover:text-white transition-transform duration-300 transform hover:-translate-y-px inline-block text-sm sm:text-base">About Us</Link></li>
            </ul>
          </div>

          {/* Column 3: Company */}
          <div className="md:col-span-2 mt-0 md:mt-12">
            <h4 className="font-semibold text-white text-base sm:text-lg mb-4 sm:mb-5 uppercase tracking-wider transition-all duration-300 hover:text-[#6a9772] hover:translate-x-2">Company</h4>
            <ul className="space-y-3 sm:space-y-5">
                <li><Link to="/" className="text-gray-300 hover:text-white transition-transform duration-300 transform hover:-translate-y-px inline-block text-sm sm:text-base">Home</Link></li>
                <li><Link to="/contact-us" className="text-gray-300 hover:text-white transition-transform duration-300 transform hover:-translate-y-px inline-block text-sm sm:text-base">Contact</Link></li>
            </ul>
          </div>
          
          {/* Column 4: Contact Us */}
          <div className="sm:col-span-2 md:col-span-3 mt-0 md:mt-12">
            <h4 className="font-semibold text-white text-base sm:text-lg mb-4 sm:mb-5 uppercase tracking-wider transition-all duration-300 hover:text-[#6a9772] hover:translate-x-2">Contact Us</h4>
            <ul className="space-y-3 sm:space-y-5 text-gray-300">
              <li className="flex items-start sm:items-center space-x-3">
                <svg className="w-5 h-5 flex-shrink-0 mt-0.5 sm:mt-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path></svg>
                <a href="mailto:info@ceylonjourneys.lk" className="hover:text-white text-sm sm:text-base break-all">ashenrathnayake0717@gmail.com</a>
              </li>
              <li className="flex items-center space-x-3">
                <svg className="w-5 h-5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"></path></svg>
                <a href="tel:+94754211930" className="hover:text-white text-sm sm:text-base">+94 75 421 1930</a>
              </li>
              <li className="flex items-start space-x-3">
                <svg className="w-5 h-5 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path></svg>
                <span className="text-sm sm:text-base">No: 27, dehideniye, malwaththa, muruthalawa.</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Copyright */}
        <div className="text-center text-gray-500 text-xs sm:text-sm border-t border-gray-700/50 mt-10 sm:mt-16 pt-6 sm:pt-8">
          <p>© {new Date().getFullYear()} Ceylon Trails. All Rights Reserved.</p>
          <p className="mt-1">Developed by <a href="#" className="hover:text-white underline">Byte Orbit</a></p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;