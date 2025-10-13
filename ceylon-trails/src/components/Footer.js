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
      <div className="container mx-auto px-6 py-5">
        {/* Main content grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-x-8 gap-y-12">
          
          {/* Column 1: Brand Info */}
          <div className="md:col-span-5">
            {/* MODIFIED: Changed mb-6 to mb-4 to reduce space below the logo */}
            <Link to="/" className="inline-block mb-0">
              <img 
                src={ceylonLogo} 
                alt="Ceylon Trails Logo" 
                className="h-40 w-auto rounded-md" // Reduced logo size for better proportion
              />
            </Link>
            <p className="text-gray-300 max-w-md">
              Discover the enchanting beauty of Sri Lanka. We craft unforgettable journeys, weaving together culture, nature, and adventure into a seamless travel experience.
            </p>
            <div className="flex space-x-5 mt-8">
              <SocialIcon href="#">
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd"></path></svg>
              </SocialIcon>
              <SocialIcon href="#">
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm3.68 9.95c.1 1.54-.82 2.95-2.34 3.53-1.52.58-3.19.05-4.1-1.3-.92-1.35-.55-3.15.8-4.07.75-.5 1.6-.74 2.48-.7.34.01.68.08 1.01.22.42.17.79.43 1.15.72zm-6.23 2.5c.34.34.75.62 1.2.8.45.18.93.27 1.41.27.48 0 .96-.09 1.4-.27.45-.18.86-.45 1.2-.8.34-.34.62-.75.8-1.2.18-.45.27-.93.27-1.41s-.09-.96-.27-1.4c-.18-.45-.45-.86-.8-1.2-.34-.34-.75-.62-1.2-.8-.45-.18-.93-.27-1.4-.27-.48 0-.96.09-1.41.27-.45.18-.86.45-1.2.8-.34.34-.62.75-.8 1.2-.18.45-.27.93-.27 1.41s.09.96.27 1.4z"></path></svg>
              </SocialIcon>
              <SocialIcon href="#">
                 <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.71v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84"></path></svg>
              </SocialIcon>
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div className="md:col-span-2 md:mt-12">
            {/* MODIFIED: Added hover and transition classes */}
            <h4 className="font-semibold text-white text-lg mb-5 uppercase tracking-wider transition-all duration-300 hover:text-[#6a9772] hover:translate-x-2">Explore</h4>
            <ul className="space-y-5">
              <li><Link to="/tours" className="text-gray-300 hover:text-white transition-transform duration-300 transform hover:-translate-y-px inline-block">Tours</Link></li>
              <li><Link to="/destination" className="text-gray-300 hover:text-white transition-transform duration-300 transform hover:-translate-y-px inline-block">Destinations</Link></li>
              <li><Link to="/about" className="text-gray-300 hover:text-white transition-transform duration-300 transform hover:-translate-y-px inline-block">About Us</Link></li>
            </ul>
          </div>

          {/* Column 3: Company */}
          <div className="md:col-span-2 md:mt-12">
            {/* MODIFIED: Added hover and transition classes */}
            <h4 className="font-semibold text-white text-lg mb-5 uppercase tracking-wider transition-all duration-300 hover:text-[#6a9772] hover:translate-x-2">Company</h4>
            <ul className="space-y-5">
                <li><Link to="/" className="text-gray-300 hover:text-white transition-transform duration-300 transform hover:-translate-y-px inline-block">Home</Link></li>
                <li><Link to="/contact-us" className="text-gray-300 hover:text-white transition-transform duration-300 transform hover:-translate-y-px inline-block">Contact</Link></li>
                <li><Link to="/privacy-policy" className="text-gray-300 hover:text-white transition-transform duration-300 transform hover:-translate-y-px inline-block">Privacy Policy</Link></li>
            </ul>
          </div>
          
          {/* Column 4: Contact Us */}
          <div className="md:col-span-3 md:mt-12">
            {/* MODIFIED: Added hover and transition classes */}
            <h4 className="font-semibold text-white text-lg mb-5 uppercase tracking-wider transition-all duration-300 hover:text-[#6a9772] hover:translate-x-2">Contact Us</h4>
            <ul className="space-y-5 text-gray-300">
              <li className="flex items-center space-x-3">
                <svg className="w-5 h-5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path></svg>
                <a href="mailto:info@ceylonjourneys.lk" className="hover:text-white">info@ceylonjourneys.lk</a>
              </li>
              <li className="flex items-center space-x-3">
                <svg className="w-5 h-5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"></path></svg>
                <a href="tel:+94774378268" className="hover:text-white">+94 77 437 8268</a>
              </li>
              <li className="flex items-center space-x-3">
                <svg className="w-5 h-5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path></svg>
                <span>Colombo, Sri Lanka</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Copyright */}
        <div className="text-center text-gray-500 text-sm border-t border-gray-700/50 mt-16 pt-8">
          <p>© {new Date().getFullYear()} Ceylon Trails. All Rights Reserved.</p>
          <p className="mt-1">Developed by <a href="#" className="hover:text-white underline">Byte Orbit</a></p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;