// src/components/HighlightsSection.js
import React from 'react';
import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { FiArrowRight } from 'react-icons/fi';

// Import your highlight images
import beachHighlight from '../images/Sri-Lanka-Beach.jpg';
import ancientHighlight from '../images/Sri-Lanka-Heritage.jpg';
import wildlifeHighlight from '../images/Sri-Lanka-Widlife-Safaries.jpg';

const HighlightsSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });

  const highlights = [
    {
      title: 'Golden Coasts',
      description: 'Discover sun-kissed beaches where tranquil waves whisper tales of the ocean.',
      image: beachHighlight
    },
    {
      title: 'Timeless Heritage',
      description: 'Walk through history in ancient kingdoms and UNESCO-protected wonders.',
      image: ancientHighlight
    },
    {
      title: 'Wild Wonders',
      description: 'Embark on an adventure to witness the islands incredible biodiversity.',
      image: wildlifeHighlight
    },
  ];
  
  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.3 } }
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } }
  };

  // Internal CSS for the animated gradient background
  const gradientStyle = `
    .subtle-animated-gradient {
      background: linear-gradient(-45deg, #e8f5e9, #f3e5f5, #e3f2fd, #fcf3e6);
      background-size: 400% 400%;
      animation: subtleGradient 25s ease infinite;
    }

    @keyframes subtleGradient {
      0% { background-position: 0% 50%; }
      50% { background-position: 100% 50%; }
      100% { background-position: 0% 50%; }
    }
  `;

  return (
    <>
      <style>{gradientStyle}</style>

      <section 
        className="py-10 xs:py-12 sm:py-16 md:py-20 lg:py-24 px-3 xs:px-4 sm:px-6 lg:px-8 subtle-animated-gradient" 
        ref={ref}
      >
        <div className="container mx-auto text-center">
          <h2 className="text-2xl xs:text-3xl sm:text-4xl md:text-5xl font-bold mb-3 sm:mb-4 text-[#3a6042] px-2">
            The Jewel of the Indian Ocean
          </h2>
          <p className="text-sm xs:text-base sm:text-lg text-gray-600 mb-8 sm:mb-10 md:mb-12 lg:mb-16 max-w-3xl mx-auto px-2 sm:px-4 leading-relaxed">
            From ancient wonders to breathtaking natural beauty, every moment in Sri Lanka is a treasure waiting to be discovered.
          </p>

          <motion.div
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 xs:gap-5 sm:gap-6 md:gap-8"
            variants={containerVariants}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
          >
            {highlights.map((item, index) => (
              <motion.div
                key={index}
                className="relative rounded-xl shadow-lg overflow-hidden group cursor-pointer h-72 xs:h-80 sm:h-96 lg:h-[28rem]"
                variants={cardVariants}
              >
                <img
                  src={item.image}
                  alt={item.title}
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 ease-in-out group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                
                <motion.div 
                  className="absolute bottom-0 left-0 right-0 p-4 xs:p-5 sm:p-6 text-white text-left"
                  layout
                  transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                >
                  <h3 className="text-lg xs:text-xl sm:text-2xl font-bold">{item.title}</h3>
                  <div className="overflow-hidden">
                    <p className="mt-2 text-xs xs:text-sm sm:text-base text-gray-300 max-h-0 opacity-0 group-hover:max-h-40 group-hover:opacity-100 transition-all duration-500 ease-in-out">
                      {item.description}
                    </p>
                    <div className="mt-2 xs:mt-3 sm:mt-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <span className="inline-flex items-center font-semibold text-xs xs:text-sm sm:text-base">
                        Explore <FiArrowRight className="ml-2" />
                      </span>
                    </div>
                  </div>
                </motion.div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>
    </>
  );
};

export default HighlightsSection;