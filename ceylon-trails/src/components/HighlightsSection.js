// src/components/HighlightsSection.js
import React from 'react';
import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';

// Import your highlight images
import beachHighlight from '../images/Sri-Lanka-Beach.jpg';
import ancientHighlight from '../images/Sri-Lanka-Heritage.jpg';
import wildlifeHighlight from '../images/Sri-Lanka-Widlife-Safaries.jpg';

const HighlightsSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });

  // Updated content to be more evocative and prideful
  const highlights = [
    {
      title: 'Golden Coasts & Azure Waters',
      description: 'Discover endless stretches of sun-kissed beaches, where tranquil waves whisper tales of the ocean.',
      image: beachHighlight
    },
    {
      title: 'Timeless Heritage & Sacred Sites',
      description: 'Walk through the corridors of history in ancient kingdoms and UNESCO-protected wonders.',
      image: ancientHighlight
    },
    {
      title: 'Lush Jungles & Wild Wonders',
      description: 'Embark on an adventure to witness the island’s incredible biodiversity, from gentle giants to elusive leopards.',
      image: wildlifeHighlight
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3,
      }
    }
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 50, scale: 0.9 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        type: 'spring',
        stiffness: 100,
        damping: 15,
        duration: 0.8
      }
    }
  };

  const overlayTextVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.4 } }
  };

  return (
    <section className="py-24 px-4 bg-[#f7fdf8]" ref={ref}>
      <div className="container mx-auto text-center">
        <h2 className="text-4xl md:text-5xl font-bold mb-4 text-[#3a6042]">The Jewel of the Indian Ocean</h2>
        <p className="text-lg text-gray-600 mb-16 max-w-3xl mx-auto">
            From ancient wonders to breathtaking natural beauty, every moment in Sri Lanka is a treasure waiting to be discovered.
        </p>
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-3 gap-10"
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          {highlights.map((item, index) => (
            <motion.div
              key={index}
              className="relative rounded-lg shadow-xl overflow-hidden group cursor-pointer"
              variants={cardVariants}
            >
              {/* Image */}
              <img
                src={item.image}
                alt={item.title}
                className="w-full h-96 object-cover transform transition-all duration-500 ease-in-out group-hover:scale-110 group-hover:brightness-[.6]"
              />

              {/* Hover Overlay with Gradient */}
              <motion.div 
                className="absolute inset-0 flex flex-col justify-end p-6 bg-gradient-to-t from-black/80 to-transparent"
                initial={{ opacity: 0 }}
                whileHover={{ opacity: 1 }}
                transition={{ duration: 0.5, ease: "easeInOut" }}
              >
                <motion.h3 
                  className="text-2xl font-semibold mb-2 text-white"
                  variants={overlayTextVariants}
                >
                  {item.title}
                </motion.h3>
                <motion.p 
                  className="text-gray-200"
                  variants={overlayTextVariants}
                >
                  {item.description}
                </motion.p>
              </motion.div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default HighlightsSection;