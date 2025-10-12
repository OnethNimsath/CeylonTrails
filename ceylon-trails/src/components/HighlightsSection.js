// src/components/HighlightsSection.js
import React from 'react';
import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';

// Import your highlight images
import beachHighlight from '../images/Sri-Lanka-Beach.jpg'; // Adjust file name if different
import ancientHighlight from '../images/Sri-Lanka-Heritage.jpg'; // Adjust file name if different
import wildlifeHighlight from '../images/Sri-Lanka-Widlife-Safaries.jpg'; // Adjust file name if different

const HighlightsSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.5 });

  const highlights = [
    {
      title: 'Pristine Beaches',
      description: 'Relax on golden sands and swim in turquoise waters.',
      image: beachHighlight // Use the imported image variable
    },
    {
      title: 'Ancient Heritage',
      description: 'Explore UNESCO World Heritage sites and ancient cities.',
      image: ancientHighlight // Use the imported image variable
    },
    {
      title: 'Wildlife Safaris',
      description: 'Witness majestic elephants and leopards in their natural habitat.',
      image: wildlifeHighlight // Use the imported image variable
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5
      }
    }
  };

  return (
    <section className="py-20 px-4 bg-white" ref={ref}>
      <div className="container mx-auto text-center">
        <h2 className="text-4xl font-bold mb-12 text-[#3a6042]">Why Visit Sri Lanka?</h2>
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-3 gap-10"
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          {highlights.map((item, index) => (
            <motion.div
              key={index}
              className="bg-white rounded-lg shadow-xl overflow-hidden group"
              variants={itemVariants}
            >
              <img
                src={item.image} // This line already correctly uses the 'image' property from your data
                alt={item.title}
                className="w-full h-64 object-cover transform group-hover:scale-105 transition-transform duration-500"
              />
              <div className="p-6">
                <h3 className="text-2xl font-semibold mb-2 text-[#3a6042]">{item.title}</h3>
                <p className="text-gray-600">{item.description}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default HighlightsSection;