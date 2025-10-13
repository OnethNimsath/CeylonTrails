// src/components/ContactUsPage.js

import React, { useState } from 'react';
// Import your background video files
import sriLankaSceneryMp4 from '../assets/contact-us-video.mp4';

const ContactUsPage = () => {
    // State to hold form data
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '', // Added phone state
        subject: '',
        message: '',
    });

    // Handler to update state when user types
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    // Handler for form submission
    const handleWhatsAppRedirect = (e) => {
        e.preventDefault(); // Prevent default form submission

        // **IMPORTANT**: Replace with your company's WhatsApp number in international format
        // Do not include '+', '00', or any special characters. E.g., for +94 77 123 4567, use 94771234567
        const companyWhatsAppNumber = '94740681862'; 

        // Construct the message
        const message = `
*New Inquiry from Website*

*Name:* ${formData.name}
*Email:* ${formData.email}
*Phone:* ${formData.phone}
*Subject:* ${formData.subject}

*Message:*
${formData.message}
        `;

        // Encode the message for the URL
        const encodedMessage = encodeURIComponent(message);

        // Create the WhatsApp URL
        const whatsappUrl = `https://wa.me/${companyWhatsAppNumber}?text=${encodedMessage}`;

        // Open the URL in a new tab
        window.open(whatsappUrl, '_blank');
    };

    return (
        <main className="relative flex-grow min-h-screen">
            {/* Background Video Element */}
            <video
                className="absolute inset-0 z-0 w-full h-full object-cover"
                autoPlay
                loop
                muted
                playsInline // Crucial for autoplay on mobile devices
            >
                <source src={sriLankaSceneryMp4} type="video/mp4" />
                Your browser does not support the video tag.
            </video>

            {/* Dark Overlay for Readability */}
            <div className="absolute inset-0 bg-black opacity-60 z-10"></div>

            {/* Content Container (relative z-20 to be above the video and overlay) */}
            <div className="relative z-20 container mx-auto px-4 py-12 md:py-24">
                <section className="text-center mb-12 text-white">
                    <h1 className="text-4xl md:text-5xl font-extrabold mb-4 animate-fadeInDown">
                        Get in Touch
                    </h1>
                    <p className="text-lg md:text-xl animate-fadeInUp delay-300">
                        Let's plan your journey to the Pearl of the Indian Ocean.
                    </p>
                </section>

                <div className="grid md:grid-cols-2 gap-8 items-center">
                    {/* Contact Form Section */}
                    <div className="bg-white bg-opacity-90 rounded-lg shadow-xl p-8 transform transition-transform hover:scale-105 duration-300 animate-float-up">
                        <h2 className="text-3xl font-bold text-gray-800 mb-6">Send Us a Message</h2>
                        {/* Updated form tag */}
                        <form className="space-y-6" onSubmit={handleWhatsAppRedirect}>
                            <div>
                                <label htmlFor="name" className="block text-sm font-medium text-gray-700">Full Name</label>
                                <input
                                    type="text"
                                    id="name"
                                    name="name"
                                    required
                                    className="mt-1 block w-full px-4 py-3 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
                                    placeholder="Your Name"
                                    value={formData.name}
                                    onChange={handleChange}
                                />
                            </div>
                            <div>
                                <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email Address</label>
                                <input
                                    type="email"
                                    id="email"
                                    name="email"
                                    required
                                    className="mt-1 block w-full px-4 py-3 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
                                    placeholder="you@example.com"
                                    value={formData.email}
                                    onChange={handleChange}
                                />
                            </div>
                            {/* NEW Phone Number Field */}
                            <div>
                                <label htmlFor="phone" className="block text-sm font-medium text-gray-700">Phone Number (for WhatsApp)</label>
                                <input
                                    type="tel"
                                    id="phone"
                                    name="phone"
                                    required
                                    className="mt-1 block w-full px-4 py-3 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
                                    placeholder="+94 77 123 4567"
                                    value={formData.phone}
                                    onChange={handleChange}
                                />
                            </div>
                            <div>
                                <label htmlFor="subject" className="block text-sm font-medium text-gray-700">Subject</label>
                                <input
                                    type="text"
                                    id="subject"
                                    name="subject"
                                    required
                                    className="mt-1 block w-full px-4 py-3 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
                                    placeholder="e.g., Tour Booking, Custom Itinerary"
                                    value={formData.subject}
                                    onChange={handleChange}
                                />
                            </div>
                            <div>
                                <label htmlFor="message" className="block text-sm font-medium text-gray-700">Message</label>
                                <textarea
                                    id="message"
                                    name="message"
                                    rows="5"
                                    required
                                    className="mt-1 block w-full px-4 py-3 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
                                    placeholder="Tell us about your travel plans..."
                                    value={formData.message}
                                    onChange={handleChange}
                                />
                            </div>
                            <button
                                type="submit"
                                className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-lg font-semibold text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors duration-300 transform hover:-translate-y-1"
                            >
                                Send via WhatsApp
                            </button>
                        </form>
                    </div>

                    {/* Contact Information section */}
                    <div className="relative animate-slideInRight delay-500">
                         <div className="absolute inset-0 bg-gradient-to-br from-green-700 to-blue-800 opacity-80 rounded-lg transform -skew-y-3 z-0"></div>
                        <div className="relative z-10 bg-white bg-opacity-90 rounded-lg shadow-xl p-8 space-y-6 transform transition-all hover:shadow-2xl duration-300">
                           <h2 className="text-3xl font-bold text-gray-800">Our Details</h2>
                            <div className="flex items-center space-x-4">
                                <div className="p-3 bg-blue-100 rounded-full">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684L10.5 14m2.28-4.28a1 1 0 011.68-.616l2.122 2.122a1 1 0 01.616 1.68L12.72 17.68a2 2 0 01-2.616.616L8.43 14.78a2 2 0 01-.616-2.616l2.616-2.616z" />
                                    </svg>
                                </div>
                                <div>
                                    <h3 className="text-lg font-medium text-gray-900">Phone</h3>
                                    <p className="text-gray-600">+94 11 2345678</p>
                                </div>
                            </div>
                            <div className="flex items-center space-x-4">
                                <div className="p-3 bg-green-100 rounded-full">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8m-9 13h9a2 2 0 002-2V7a2 2 0 00-2-2H3a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                    </svg>
                                </div>
                                <div>
                                    <h3 className="text-lg font-medium text-gray-900">Email</h3>
                                    <p className="text-gray-600">info@ceylontrails.com</p>
                                </div>
                            </div>
                            <div className="flex items-center space-x-4">
                                <div className="p-3 bg-red-100 rounded-full">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                    </svg>
                                </div>
                                <div>
                                    <h3 className="text-lg font-medium text-gray-900">Address</h3>
                                    <p className="text-gray-600">123 Galle Road, Colombo, Sri Lanka</p>
                                </div>
                            </div>
                            <div className="pt-4">
                                <h3 className="text-lg font-medium text-gray-900">Find us on Map</h3>
                                <div className="mt-2 w-full h-48 bg-gray-200 rounded-lg overflow-hidden border border-gray-300">
                                    {/* Corrected the Google Maps iframe URL to a valid placeholder */}
                                    <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3960.902241910892!2d79.8609543152885!3d6.902203920111102!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ae2596311955555%3A0x5953e4142342555b!2sGalle%20Face%20Green!5e0!3m2!1sen!2slk!4v1665678901234!5m2!1sen!2slk"
                                    width="100%"
                                    height="100%"
                                    style={{ border: 0 }}
                                    allowFullScreen=""
                                    loading="lazy"
                                    referrerPolicy="no-referrer-when-downgrade"
                                    ></iframe>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
};

export default ContactUsPage;