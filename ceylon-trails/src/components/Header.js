import React from 'react';
import { Link } from 'react-router-dom';
import ceylonLogo from '../images/Ceylon-Trails.jpg'; 

const Header = () => {
  return (
    <header className="p-4 bg-white shadow-sm sticky top-0 z-50">
      <nav className="container mx-auto flex justify-between items-center">
        <div className="flex-shrink-0">
          {/* 2. Change <a> to <Link> and href to "to" */}
          <Link to="/">
            <img 
              src={ceylonLogo} 
              alt="Ceylon Journeys Logo" 
              className="h-20 w-auto" // Increased the height
            />
          </Link>
        </div>
        
        <ul className="hidden md:flex space-x-6 text-lg items-center">
          <li>
            {/* 3. Update all links to use the Link component and correct paths */}
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
            <Link to="/destinations" className="relative group hover:text-[#6a9772] transition-colors duration-300">
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
        
        <button className="bg-[#6a9772] text-white px-4 py-2 rounded-full hover:bg-[#3a6042] transition-all duration-300 hover:scale-105">
        Book Now
        </button>
      </nav>
    </header>
  );
};

export default Header;