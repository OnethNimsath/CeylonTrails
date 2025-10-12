import React, { useRef } from 'react';
import { useInView } from 'react-intersection-observer';
import { motion, useScroll, useTransform } from 'framer-motion';

// --- Import your local images for the destinations page ---
import heroBg from '../src/images/Nine-Arches-Bridge.jpg';
import ancientBg from '../src/images/aritra-roy-MmtNPjVyRCg-unsplash.jpg';
import beachBg from '../src/images/amal-prasad-ztFkvmLKTcY-unsplash.jpg';
import specialBg from '../src/images/vikram-tkv-SDUu3n8ctpM-unsplash.jpg';

import sigiriyaImage from '../src/images/manoj-silva-gck1WnaA_G0-unsplash.jpg';
import galleFortImage from '../src/images/shainee-fernando-WDVMyBsSSwY-unsplash.jpg';
import dambullaImage from '../src/images/matt-dany-IS5LfDPkTDg-unsplash.jpg';
import mirissaImage from '../src/images/kevin-olson-ScBHbYokiQE-unsplash.jpg';
import unawatunaImage from '../src/images/sarmat-batagov-cuZbrYoimv8-unsplash.jpg';
import arugamBayImage from '../src/images/marcelo-de-souza-romao-FfPVtA_2V2k-unsplash.jpg';
import ellaImage from '../src/images/yves-alarie-3R50kTNBKiE-unsplash.jpg';
import yalaImage from '../src/images/sach-kKeC_lgVs_o-unsplash.jpg';
import teaPlantationImage from '../src/images/gemmmm-jd1QQQbxKuw-unsplash.jpg';

// --- Helper component for simple scroll animations (reused) ---
const AnimatedSectionHeader = ({ children, className }) => {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 });
  return (
    <div
      ref={ref}
      className={`${className} transition-all duration-1000 ease-in-out ${
        inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
      }`}
    >
      {children}
    </div>
  );
};

// --- Parallax Section Component ---
const ParallaxSection = ({ imageUrl, children, overlayColor = 'bg-black/60' }) => {
    const ref = useRef(null);
    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ["start end", "end start"]
    });
    const backgroundY = useTransform(scrollYProgress, [0, 1], ["-25%", "25%"]);

    return (
        <div ref={ref} className="relative py-24 sm:py-32 overflow-hidden">
            <motion.div className="absolute inset-0 z-0" style={{ y: backgroundY }}>
                <img className="h-full w-full object-cover" src={imageUrl} alt="" />
                <div className={`absolute inset-0 ${overlayColor} backdrop-blur-sm`}></div>
            </motion.div>
            <div className="relative z-10 mx-auto max-w-7xl px-6 lg:px-8">
                {children}
            </div>
        </div>
    );
};

// --- Destination Data ---
const ancientPlaces = [
  { name: 'Sigiriya Rock Fortress', description: 'Climb the ancient citadel of King Kashyapa, a UNESCO World Heritage site, famous for its stunning frescoes and panoramic summit views.', imageUrl: sigiriyaImage },
  { name: 'Galle Fort', description: 'Explore the historic walled city, a fusion of European architecture and South Asian traditions, with charming streets, boutiques, and cafes.', imageUrl: galleFortImage },
  { name: 'Dambulla Cave Temple', description: 'Discover a sacred pilgrimage site for 22 centuries, this cave monastery is a treasure trove of Buddhist mural paintings and statues.', imageUrl: dambullaImage }
];

const beachDestinations = [
  { name: 'Mirissa', description: 'Famous for its vibrant nightlife, beautiful beaches, and being one of the best spots in the world for whale and dolphin watching.', imageUrl: mirissaImage },
  { name: 'Unawatuna', description: 'A picturesque crescent-shaped beach with calm, turquoise waters, perfect for swimming, snorkeling, and relaxing by the sea.', imageUrl: unawatunaImage },
  { name: 'Arugam Bay', description: 'A world-renowned surfing destination on the east coast, offering a laid-back atmosphere and some of the best waves in Sri Lanka.', imageUrl: arugamBayImage }
];

const specialPlaces = [
  { name: 'Ella', description: 'Nestled in the heart of tea country, Ella is famous for its breathtaking views, hiking trails like Little Adam\'s Peak, and the iconic Nine Arches Bridge.', imageUrl: ellaImage },
  { name: 'Yala National Park', description: 'Embark on a thrilling safari adventure in one of the world\'s best places to spot leopards, alongside elephants, sloth bears, and diverse birdlife.', imageUrl: yalaImage },
  { name: 'Nuwara Eliya Tea Plantations', description: 'Experience the "Little England" of Sri Lanka. Tour a lush green tea estate, learn about the tea-making process, and savor a cup of world-famous Ceylon tea.', imageUrl: teaPlantationImage }
];

// --- Animation Variants for Framer Motion ---
const gridContainerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
    },
  },
};

const cardVariants = {
  hidden: { y: 20, opacity: 0, scale: 0.9 },
  visible: {
    y: 0,
    opacity: 1,
    scale: 1,
    transition: {
      type: 'spring',
      stiffness: 100,
      damping: 10,
    },
  },
};

// --- ENHANCED Destination Card Component (with lazy loading) ---
const DestinationCard = ({ destination }) => {
    return (
        <motion.div
            variants={cardVariants}
            whileHover={{ y: -8, scale: 1.05 }}
            className="flex h-full flex-col overflow-hidden bg-white/5 backdrop-blur-lg rounded-xl text-white shadow-2xl transition-shadow duration-300 hover:shadow-emerald-400/30 cursor-pointer"
        >
            <img
                className="h-56 w-full object-cover"
                src={destination.imageUrl}
                alt={destination.name}
                loading="lazy" // <-- THIS IS THE CHANGE TO PREVENT LAG
            />
            <div className="p-6 flex flex-col flex-grow">
                <h3 className="text-xl font-semibold text-emerald-300">{destination.name}</h3>
                <p className="mt-3 text-gray-300 flex-grow">{destination.description}</p>
            </div>
        </motion.div>
    );
};


// --- Main Destinations Component ---
function Destinations() {
  return (
    <div className="overflow-x-hidden bg-gray-900">
      
      {/* Hero Section */}
      <ParallaxSection imageUrl={heroBg} overlayColor="bg-black/50">
        <div className="text-center text-white py-12 sm:py-20">
          <motion.div
            variants={{
              hidden: { opacity: 0 },
              visible: {
                opacity: 1,
                transition: {
                  staggerChildren: 0.3,
                },
              },
            }}
            initial="hidden"
            animate="visible"
          >
              <motion.h1
                variants={{
                    hidden: { opacity: 0, y: 20 },
                    visible: { opacity: 1, y: 0, transition: { duration: 0.8 } }
                }}
                className="text-4xl font-bold tracking-tight sm:text-6xl drop-shadow-lg"
              >
                  Discover Sri Lanka's Treasures
              </motion.h1>
              <motion.p
                variants={{
                    hidden: { opacity: 0, y: 20 },
                    visible: { opacity: 1, y: 0, transition: { duration: 0.8 } }
                }}
                className="mt-6 text-lg leading-8 max-w-3xl mx-auto"
              >
                  From ancient kingdoms lost in time to sun-drenched beaches and misty mountains, your Sri Lankan story awaits.
              </motion.p>
          </motion.div>
        </div>
      </ParallaxSection>

      {/* Ancient Places Section */}
      <ParallaxSection imageUrl={ancientBg} overlayColor="bg-gray-900/80">
          <AnimatedSectionHeader className="max-w-3xl mx-auto text-center mb-16">
              <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">Echoes of Antiquity: The Ancient Cities</h2>
          </AnimatedSectionHeader>
          <motion.div
            className="mx-auto grid max-w-2xl grid-cols-1 gap-8 lg:mx-0 lg:max-w-none lg:grid-cols-3"
            variants={gridContainerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
          >
              {ancientPlaces.map((place) => (
                  <DestinationCard key={place.name} destination={place} />
              ))}
          </motion.div>
      </ParallaxSection>

      {/* Beach Side Section */}
      <ParallaxSection imageUrl={beachBg} overlayColor="bg-sky-950/70">
          <AnimatedSectionHeader className="max-w-3xl mx-auto text-center mb-16">
              <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">Sun-Kissed Shores: The Coastal Havens</h2>
          </AnimatedSectionHeader>
          <motion.div
            className="mx-auto grid max-w-2xl grid-cols-1 gap-8 lg:mx-0 lg:max-w-none lg:grid-cols-3"
            variants={gridContainerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
          >
              {beachDestinations.map((beach) => (
                  <DestinationCard key={beach.name} destination={beach} />
              ))}
          </motion.div>
      </ParallaxSection>
      
      {/* Special Places Section */}
      <ParallaxSection imageUrl={specialBg} overlayColor="bg-emerald-950/70">
          <AnimatedSectionHeader className="max-w-3xl mx-auto text-center mb-16">
              <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">Unique Wonders: Beyond the Beaten Path</h2>
          </AnimatedSectionHeader>
          <motion.div
            className="mx-auto grid max-w-2xl grid-cols-1 gap-8 lg:mx-0 lg:max-w-none lg:grid-cols-3"
            variants={gridContainerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
          >
              {specialPlaces.map((place) => (
                  <DestinationCard key={place.name} destination={place} />
              ))}
          </motion.div>
      </ParallaxSection>

    </div>
  );
}

export default Destinations;