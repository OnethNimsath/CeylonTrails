// src/components/ContactUs.js

import React, { useState } from 'react';
// NEW: Importing specific, high-quality icons from react-icons
import { FaPhoneAlt, FaEnvelope, FaMapMarkerAlt, FaWhatsapp } from 'react-icons/fa';
// Import your background video file
import sriLankaSceneryMp4 from '../assets/contact-us-video.mp4';

const ContactUsPage = () => {
    // State to hold form data (no changes here)
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        subject: '',
        message: '',
    });

    // Handler to update state (no changes here)
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    // Handler for form submission (no changes here)
    const handleWhatsAppRedirect = (e) => {
        e.preventDefault();
        const companyWhatsAppNumber = '94754211930'; 
        const message = `
*New Inquiry from Website*

*Name:* ${formData.name}
*Email:* ${formData.email}
*Phone:* ${formData.phone}
*Subject:* ${formData.subject}

*Message:*
${formData.message}
        `;
        const encodedMessage = encodeURIComponent(message);
        const whatsappUrl = `https://wa.me/${companyWhatsAppNumber}?text=${encodedMessage}`;
        window.open(whatsappUrl, '_blank');
    };

    return (
        <main className="relative flex-grow min-h-screen">
            <video
                className="absolute inset-0 z-0 w-full h-full object-cover"
                autoPlay
                loop
                muted
                playsInline
                preload="metadata"
            >
                <source src={sriLankaSceneryMp4} type="video/mp4" />
                Your browser does not support the video tag.
            </video>

            {/* UPDATED: Overlay is slightly darker for better contrast */}
            <div className="absolute inset-0 bg-black opacity-70 z-10"></div>

            <div className="relative z-20 container mx-auto px-4 sm:px-6 py-10 sm:py-16 md:py-24">
                <section className="text-center mb-8 sm:mb-12 text-white">
                    <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold mb-3 sm:mb-4 animate-float-up" style={{ animationDelay: '0.1s' }}>
                        Get in Touch
                    </h1>
                    <p className="text-base sm:text-lg md:text-xl animate-float-up" style={{ animationDelay: '0.2s' }}>
                        Let's plan your journey to the Pearl of the Indian Ocean.
                    </p>
                </section>

                <div className="grid md:grid-cols-2 gap-6 sm:gap-8 items-start">
                    {/* === Contact Form with Glassmorphism Effect === */}
                    <div 
                        className="bg-black bg-opacity-25 backdrop-blur-xl rounded-2xl shadow-2xl p-5 sm:p-8 border border-white/20 animate-float-up"
                        style={{ animationDelay: '0.3s' }}
                    >
                        <h2 className="text-2xl sm:text-3xl font-bold text-white mb-5 sm:mb-6 text-center">Send Us a Message</h2>
                        <form className="space-y-4 sm:space-y-5" onSubmit={handleWhatsAppRedirect}>
                            <div>
                                <label htmlFor="name" className="block text-sm font-medium text-gray-200">Full Name</label>
                                <input
                                    type="text" id="name" name="name" required
                                    className="mt-1 block w-full px-4 py-2.5 sm:py-3 bg-white/10 text-white border-2 border-transparent rounded-lg shadow-sm focus:ring-2 focus:ring-cyan-400 focus:border-cyan-400 transition-all duration-300 placeholder-gray-400 text-sm sm:text-base"
                                    placeholder="Your Name" value={formData.name} onChange={handleChange}
                                />
                            </div>
                            <div>
                                <label htmlFor="email" className="block text-sm font-medium text-gray-200">Email Address</label>
                                <input
                                    type="email" id="email" name="email" required
                                    className="mt-1 block w-full px-4 py-2.5 sm:py-3 bg-white/10 text-white border-2 border-transparent rounded-lg shadow-sm focus:ring-2 focus:ring-cyan-400 focus:border-cyan-400 transition-all duration-300 placeholder-gray-400 text-sm sm:text-base"
                                    placeholder="you@example.com" value={formData.email} onChange={handleChange}
                                />
                            </div>
                             <div>
                                <label htmlFor="phone" className="block text-sm font-medium text-gray-200">Phone Number</label>
                                <input
                                    type="tel" id="phone" name="phone" required
                                    className="mt-1 block w-full px-4 py-2.5 sm:py-3 bg-white/10 text-white border-2 border-transparent rounded-lg shadow-sm focus:ring-2 focus:ring-cyan-400 focus:border-cyan-400 transition-all duration-300 placeholder-gray-400 text-sm sm:text-base"
                                    placeholder="+94 77 123 4567" value={formData.phone} onChange={handleChange}
                                />
                            </div>
                            <div>
                                <label htmlFor="subject" className="block text-sm font-medium text-gray-200">Subject</label>
                                <input
                                    type="text" id="subject" name="subject" required
                                    className="mt-1 block w-full px-4 py-2.5 sm:py-3 bg-white/10 text-white border-2 border-transparent rounded-lg shadow-sm focus:ring-2 focus:ring-cyan-400 focus:border-cyan-400 transition-all duration-300 placeholder-gray-400 text-sm sm:text-base"
                                    placeholder="e.g., Tour Booking, Custom Itinerary" value={formData.subject} onChange={handleChange}
                                />
                            </div>
                            <div>
                                <label htmlFor="message" className="block text-sm font-medium text-gray-200">Message</label>
                                <textarea
                                    id="message" name="message" rows="4" required
                                    className="mt-1 block w-full px-4 py-2.5 sm:py-3 bg-white/10 text-white border-2 border-transparent rounded-lg shadow-sm focus:ring-2 focus:ring-cyan-400 focus:border-cyan-400 transition-all duration-300 placeholder-gray-400 text-sm sm:text-base"
                                    placeholder="Tell us about your travel plans..." value={formData.message} onChange={handleChange}
                                />
                            </div>
                            {/* Animated gradient button */}
                            <button
                                type="submit"
                                className="w-full flex items-center justify-center gap-2 sm:gap-3 py-3 px-4 rounded-lg text-base sm:text-lg font-semibold text-white bg-gradient-to-r from-green-500 to-cyan-500 hover:from-green-600 hover:to-cyan-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-cyan-500 transition-all duration-300 transform hover:scale-105 shadow-lg"
                            >
                                <FaWhatsapp size={22} />
                                Send via WhatsApp
                            </button>
                        </form>
                    </div>

                    {/* === Contact Information Section === */}
                    <div 
                        className="space-y-4 sm:space-y-6 text-white animate-float-up"
                        style={{ animationDelay: '0.5s' }}
                    >
                        {/* Interactive detail cards */}
                        <div className="group flex items-center space-x-4 sm:space-x-5 p-4 sm:p-5 rounded-2xl bg-black bg-opacity-25 backdrop-blur-xl border border-white/20 hover:border-cyan-400 hover:bg-opacity-40 transition-all duration-300 transform hover:-translate-y-1 cursor-pointer">
                            <div className="p-3 sm:p-4 bg-cyan-500/20 rounded-full group-hover:bg-cyan-500 transition-colors duration-300 flex-shrink-0">
                                <FaPhoneAlt className="h-5 w-5 sm:h-6 sm:w-6 text-cyan-300 group-hover:text-white" />
                            </div>
                            <div className="min-w-0">
                                <h3 className="text-base sm:text-lg font-medium">Phone</h3>
                                <p className="text-gray-300 text-sm sm:text-base">+94 75 421 1930</p>
                            </div>
                        </div>

                        <div className="group flex items-center space-x-4 sm:space-x-5 p-4 sm:p-5 rounded-2xl bg-black bg-opacity-25 backdrop-blur-xl border border-white/20 hover:border-green-400 hover:bg-opacity-40 transition-all duration-300 transform hover:-translate-y-1 cursor-pointer">
                             <div className="p-3 sm:p-4 bg-green-500/20 rounded-full group-hover:bg-green-500 transition-colors duration-300 flex-shrink-0">
                                <FaEnvelope className="h-5 w-5 sm:h-6 sm:w-6 text-green-300 group-hover:text-white" />
                            </div>
                            <div className="min-w-0">
                                <h3 className="text-base sm:text-lg font-medium">Email</h3>
                                <p className="text-gray-300 text-sm sm:text-base break-all">ashenrathnayake0717@gmail.com</p>
                            </div>
                        </div>

                         <div className="group flex items-center space-x-4 sm:space-x-5 p-4 sm:p-5 rounded-2xl bg-black bg-opacity-25 backdrop-blur-xl border border-white/20 hover:border-red-400 hover:bg-opacity-40 transition-all duration-300 transform hover:-translate-y-1 cursor-pointer">
                             <div className="p-3 sm:p-4 bg-red-500/20 rounded-full group-hover:bg-red-500 transition-colors duration-300 flex-shrink-0">
                                <FaMapMarkerAlt className="h-5 w-5 sm:h-6 sm:w-6 text-red-300 group-hover:text-white" />
                            </div>
                            <div className="min-w-0">
                                <h3 className="text-base sm:text-lg font-medium">Address</h3>
                                <p className="text-gray-300 text-sm sm:text-base">No: 27, dehideniye, malwaththa, muruthalawa</p>
                            </div>
                        </div>

                        <div className="pt-2 sm:pt-4">
                            <h3 className="text-base sm:text-lg font-medium text-center mb-3 sm:mb-4">Find us on the Map</h3>
                            <div className="w-full h-48 sm:h-56 rounded-lg overflow-hidden border-2 border-white/20 shadow-xl">
                                {/* Using a valid Google Maps embed URL centered on Colombo */}
                                <iframe 
                                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d126743.58577717811!2d79.78616235489704!3d6.92200329972305!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ae253d10f7a7003%3A0x320b2e4d32d3838d!2sColombo!5e0!3m2!1sen!2slk!4v1668157140327!5m2!1sen!2slk"
                                    width="100%"
                                    height="100%"
                                    style={{ border: 0 }}
                                    allowFullScreen=""
                                    loading="lazy"
                                    referrerPolicy="no-referrer-when-downgrade"
                                    title="Ceylon Trails Location Map"
                                ></iframe>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
};

export default ContactUsPage;