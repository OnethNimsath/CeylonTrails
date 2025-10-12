import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-gray-100 py-10">
      <div className="container mx-auto px-4 text-center text-gray-600">
        <div className="flex flex-col md:flex-row justify-around items-center">
          <div className="mb-6 md:mb-0">
            <h4 className="font-bold text-lg mb-2">CEYLON JOURNEYS</h4>
            <p>Your trusted partner for exploring Sri Lanka.</p>
          </div>
          <div className="mb-6 md:mb-0">
            <h4 className="font-bold text-lg mb-2">Quick Links</h4>
            <ul className="space-y-1">
              <li><a href="#" className="hover:text-[#6a9772]">Home</a></li>
              <li><a href="#" className="hover:text-[#6a9772]">Tours</a></li>
              <li><a href="#" className="hover:text-[#6a9772]">About Us</a></li>
              <li><a href="#" className="hover:text-[#6a9772]">Destinations</a></li>
              <li><a href="#" className="hover:text-[#6a9772]">Contact</a></li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold text-lg mb-2">Contact Us</h4>
            <ul className="space-y-1">
              <li>Email: info@ceylonjourneys.lk</li>
              <li>Phone: +94 77 437 8268</li>
              <li>Address: Colombo, Sri Lanka</li>
            </ul>
          </div>
        </div>
        <div className="mt-8 pt-4 border-t border-gray-300">
          <p>© 2025 Ceylon Trails. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;