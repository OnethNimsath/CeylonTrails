// src/components/ExperienceSection.js
import React from 'react';
import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';

// TODO: Import your own images for this section
import teaImage from '../images/tea.jpg';
import foodImage from '../images/nilantha-sanjeewa-OE87GAgPG18-unsplash.jpg';
import adventureImage from '../images/boat.jpg';
import cultureImage from '../images/dancer.png';

const experiences = [
  {
    title: 'Journey Through Tea Country',
    description: 'Wander through lush, emerald-green tea plantations in the central highlands. Learn the art of tea making from local experts and savor a cup of world-renowned Ceylon tea while soaking in breathtaking views.',
    image: teaImage,
    align: 'left' // Image on the left
  },
  {
    title: 'A Symphony of Spices',
    description: 'Delight your senses with Sri Lanka’s vibrant cuisine. From fiery curries and fresh seafood to sweet, tropical fruits, every meal is an unforgettable discovery of flavor and tradition.',
    image: foodImage,
    align: 'right' // Image on the right
  },
  {
    title: 'The Call of Adventure',
    description: 'Whether it’s surfing the waves of Arugam Bay, hiking to the peak of Adam’s Peak, or whale watching off the coast of Mirissa, Sri Lanka offers endless thrills for the adventurous spirit.',
    image: adventureImage,
    align: 'left' // Image on the left
  },
  {
    title: 'The Island\'s Cultural Heartbeat',
    description: 'Immerse yourself in a culture rich with history. Witness the vibrant Kandy Esala Perahera festival, explore intricate temples, and feel the warmth of Sri Lankan hospitality.',
    image: cultureImage,
    align: 'right' // Image on the right
  }
];

const ExperienceSection = () => {
  return (
    <section className="py-24 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-[#3a6042]">Live the Island Story</h2>
          <p className="text-lg text-gray-600 mt-4 max-w-3xl mx-auto">
            Beyond the sights, Sri Lanka is a feeling. It’s the taste of fresh spices, the thrill of a jungle safari, and the peace of a mountain morning.
          </p>
        </div>

        <div className="space-y-20">
          {experiences.map((exp, index) => (
            <ExperienceItem key={index} experience={exp} />
          ))}
        </div>
      </div>
    </section>
  );
};

// Sub-component for individual items to handle their own animation state
const ExperienceItem = ({ experience }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.5 });

  const { title, description, image, align } = experience;
  const isImageLeft = align === 'left';

  const variants = {
    hidden: { opacity: 0, x: isImageLeft ? -100 : 100 },
    visible: { 
      opacity: 1, 
      x: 0, 
      transition: { duration: 0.8, ease: 'easeOut' } 
    }
  };

  return (
    <div ref={ref} className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
      {/* Image Column */}
      <motion.div
        className={`w-full ${isImageLeft ? 'md:order-1' : 'md:order-2'}`}
        variants={variants}
        initial="hidden"
        animate={isInView ? 'visible' : 'hidden'}
      >
        <img src={image} alt={title} className="rounded-lg shadow-2xl object-cover w-full h-80" />
      </motion.div>

      {/* Text Column */}
      <motion.div
        className={`w-full ${isImageLeft ? 'md:order-2' : 'md:order-1'}`}
        variants={variants}
        initial="hidden"
        animate={isInView ? 'visible' : 'hidden'}
        transition={{ delay: 0.2 }} // Slight delay for the text
      >
        <h3 className="text-3xl font-bold text-[#3a6042] mb-4">{title}</h3>
        <p className="text-gray-600 leading-relaxed">{description}</p>
      </motion.div>
    </div>
  );
};

export default ExperienceSection;