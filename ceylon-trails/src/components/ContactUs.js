import React from 'react';
import sriLankaHeritageBg from '../images/Sri-Lanka-Sigiriya.jpg'; 

const ContactUsPage = () => {
    return (
        <main
            className="relative flex-grow min-h-screen bg-cover bg-center bg-no-repeat"
            style={{ backgroundImage: `url(${sriLankaHeritageBg})` }}
        >
            <div className="absolute inset-0 bg-black opacity-60"></div>

            <div className="relative z-10 container mx-auto px-4 py-12 md:py-24">
                <section className="text-center mb-12 text-white">
                    <h1 className="text-4xl md:text-5xl font-extrabold mb-4 animate-fadeInDown">
                        Get in Touch 📧
                    </h1>
                    <p className="text-lg md:text-xl animate-fadeInUp delay-300">
                        Let's plan your journey to the Pearl of the Indian Ocean.
                    </p>
                </section>

                <div className="grid md:grid-cols-2 gap-8 items-center">
                    
                    {/* Contact Form Section with float-up animation */}
                    <div className="bg-white bg-opacity-90 rounded-lg shadow-xl p-8 transform transition-transform hover:scale-105 duration-300 animate-float-up">
                        <h2 className="text-3xl font-bold text-gray-800 mb-6">Send Us a Message</h2>
                        <form className="space-y-6">
                            <div>
                                <label htmlFor="name" className="block text-sm font-medium text-gray-700">Full Name</label>
                                <input
                                    type="text"
                                    id="name"
                                    name="name"
                                    required
                                    className="mt-1 block w-full px-4 py-3 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
                                    placeholder="Your Name"
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
                                />
                            </div>
                            <button
                                type="submit"
                                className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-lg font-semibold text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors duration-300 transform hover:-translate-y-1"
                            >
                                Send Message 🚀
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
                                    <iframe 
                                        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3960.916027387332!2d79.85172697500174!3d6.901614893092261!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ae2596489a263c1%3A0x633d711f5d63f0d5!2s123%20Galle%20Rd%2C%20Colombo%2000300%2C%20Sri%20Lanka!5e0!3m2!1sen!2sus!4v1697116643666!5m2!1sen!2sus"
                                        width="100%"
                                        height="100%"
                                        style={{ border: 0 }}
                                        allowFullScreen="" 
                                        loading="lazy" 
                                        referrerPolicy="no-referrer-when-downgrade"
                                        title="Google Maps Location"
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