import React, { useState, useEffect } from 'react';
import { MapPinIcon, GlobeAltIcon } from '@heroicons/react/24/outline';
import { FaWhatsapp } from 'react-icons/fa';


const ToursPage = () => {
    // WhatsApp contact for tour bookings
    const TOUR_WHATSAPP_NUMBER = "94774378268"; 

    const [isLoaded, setIsLoaded] = useState(false);

    useEffect(() => {   
        const timer = setTimeout(() => {
            setIsLoaded(true);
        }, 100); 
        return () => clearTimeout(timer);
    }, []);

    const visibleClass = isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8';

    const destinations = [
        {
            name: "Sigiriya Rock Fortress",
            description: "An ancient rock fortress and palace built by King Kashyapa. Known for its frescoes and stunning panoramic views.",
            image: require('../images/sigiriya.jpg'),
            tag: "Cultural Wonder"
        },
        {
            name: "Ella & Nine Arch Bridge",
            description: "A beautiful hill country town known for hiking, waterfalls (like Ravana Falls), and the iconic Nine Arch Bridge.",
            image: require('../images/ella.jpg'),
            tag: "Hill Country & Nature"
        },
        {
            name: "Yala National Park",
            description: "Sri Lanka's most famous national park, offering world-class leopard sightings, elephants, and a variety of birdlife.",
            image: require('../images/yala.jpg'),
            tag: "Wildlife & Safari"
        },
        {
            name: "Galle Fort",
            description: "A historic fortress built by the Dutch, now a UNESCO World Heritage site known for its colonial architecture, boutique shops, and ramparts.",
            image: require('../images/galle.jpg'),
            tag: "Heritage & Coastal"
        },
        {
            name: "Mirissa",
            description: "Famous for beautiful crescent beaches and highly recommended for whale and dolphin watching tours.",
            image: require('../images/mirissa.jpg'),
            tag: "Beaches & Marine Life"
        },
        {
            name: "Pasikudah",
            description: "Known for its wide, shallow, and calm beach, making it perfect for swimming and relaxation on the East Coast.",
            image: require('../images/pasikudah.jpg'),
            tag: "East Coast Beaches"
        },
        {
            name: "Anuradhapura",
            description: "The capital of Sri Lanka's first kingdom, housing ancient ruins, enormous stupas, and sacred Buddhist sites.",
            image: require('../images/anuradhapura.jpg'),
            tag: "Ancient History"
        },
        {
            name: "Polonnaruwa",
            description: "Home to the second oldest kingdom of Sri Lanka, featuring impressive statues and well-preserved ancient irrigation works.",
            image: require('../images/polonnaruwa.jpg'),
            tag: "Ancient History"
        },
    ];
    
    const generateTourLink = (destinationName) => {
        const message = `I am interested in booking a tour package for ${destinationName}. Could you provide details?`;
        return `https://wa.me/${TOUR_WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
    };

    return (
        <div className="flex flex-col min-h-screen w-screen overflow-x-hidden bg-white">
            <main className="container mx-auto p-4 sm:p-8 flex-grow mt-8"> 
                
                {/* Tours Hero Section */}
                <section className={`relative text-center py-16 md:py-24 bg-gray-900 rounded-xl shadow-lg text-white overflow-hidden transition-all duration-1000 ${visibleClass} delay-[50ms] mb-16`}>
                    <div className="relative z-10 p-4">
                        <GlobeAltIcon className="w-16 h-16 mx-auto mb-4 text-orange-500" />
                        <h1 className="text-4xl sm:text-5xl font-extrabold mb-4">
                            Explore Sri Lanka
                        </h1>
                        <p className="text-lg font-light max-w-3xl mx-auto">
                            Discover the island's best cultural wonders, wildlife, and stunning natural landscapes. Book your unforgettable tour with us!
                        </p>
                    </div>
                </section>

                {/* Destination Cards Grid */}
                <section className={`my-16 md:my-24 text-center transition-all duration-1000 ${visibleClass} delay-150`}>
                    <h2 className="text-3xl sm:text-4xl font-bold text-gray-800 mb-12">Top Tourist Destinations</h2>
                    
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                        {destinations.map((dest, index) => (
                            <div key={index} className="bg-white rounded-xl shadow-xl overflow-hidden flex flex-col transition duration-300 transform hover:scale-[1.02] border-t-4 border-orange-500">
                                {/* Destination Image */}
                                <img 
                                    src={dest.image} 
                                    alt={dest.name} 
                                    className="w-full h-48 object-cover" 
                                    onError={(e) => { e.target.onerror = null; e.target.src = `https://placehold.co/400x250/cccccc/333333?text=${dest.name.replace(/\s/g, '+')}` }}
                                />
                                <div className="p-6 flex flex-col flex-grow">
                                    <span className="text-xs font-semibold text-orange-600 bg-orange-100 px-2 py-1 rounded-full inline-block self-start mb-2">
                                        {dest.tag}
                                    </span>
                                    <h3 className="text-xl font-bold text-gray-800 mb-3">{dest.name}</h3>
                                    <p className="text-gray-600 text-sm flex-grow mb-4">
                                        {dest.description}
                                    </p>
                                    
                                    {/* WhatsApp Booking Button */}
                                    <a
                                        href={generateTourLink(dest.name)}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="bg-green-600 text-white font-semibold py-3 px-4 rounded-full transition duration-300 transform hover:scale-[0.98] hover:bg-green-700 mt-auto inline-flex items-center justify-center text-sm"
                                    >
                                        <FaWhatsapp className="w-5 h-5 mr-2" />
                                        Book Tour via WhatsApp
                                    </a>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>

            </main>
        </div>
    );
};

export default ToursPage;