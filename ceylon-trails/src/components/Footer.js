import React from 'react';
import { Link } from 'react-router-dom';
import ceylonLogo from '../images/Ceylon-Trails.jpg';

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white py-12">
      <div className="container mx-auto px-4">
        {/* Adjusted the main flex container for better spacing */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center border-b border-gray-700 pb-8 mb-8">
          {/* Logo and Company Info */}
          <div className="flex flex-col items-center md:items-start mb-8 md:mb-0 md:mr-10">
            <Link to="/">
              <img 
                src={ceylonLogo} 
                alt="Ceylon Trails Logo" 
                className="h-20 w-auto mb-4" 
              />
            </Link>
            <p className="text-gray-400 max-w-sm text-center md:text-left">
              Discover the wonders of Sri Lanka. Your trusted partner for an unforgettable journey.
            </p>
          </div>

          {/* Quick Links */}
          <div className="text-center md:text-left mb-8 md:mb-0">
            <h4 className="font-bold text-lg mb-4 text-white uppercase">Quick Links</h4>
            <ul className="space-y-2 text-gray-400">
              <li><Link to="/" className="hover:text-white hover:underline transition-colors duration-300">Home</Link></li>
              <li><Link to="/tours" className="hover:text-white hover:underline transition-colors duration-300">Tours</Link></li>
              <li><Link to="/about" className="hover:text-white hover:underline transition-colors duration-300">About Us</Link></li>
              <li><Link to="/destination" className="hover:text-white hover:underline transition-colors duration-300">Destinations</Link></li>
              <li><Link to="/contact-us" className="hover:text-white hover:underline transition-colors duration-300">Contact</Link></li>
            </ul>
          </div>
          
          {/* Contact Us */}
          <div className="text-center md:text-left md:ml-10">
            <h4 className="font-bold text-lg mb-4 text-white uppercase">Contact Us</h4>
            <ul className="space-y-2 text-gray-400">
              <li><span className="font-semibold">Email:</span> info@ceylonjourneys.lk</li>
              <li><span className="font-semibold">Phone:</span> +94 77 437 8268</li>
              <li><span className="font-semibold">Address:</span> Colombo, Sri Lanka</li>
            </ul>
          </div>
        </div>

        {/* Copyright */}
        <div className="text-center text-gray-500 text-sm">
          <p>© 2025 Ceylon Trails. All rights reserved.</p>
          <p>Developed by Byte Orbit</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;