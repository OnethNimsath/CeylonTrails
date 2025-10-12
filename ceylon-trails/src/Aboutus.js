import React, { useState, useEffect, useRef } from 'react';
import { useInView } from 'react-intersection-observer';
import { FaCompass, FaGlobeAmericas, FaLeaf } from 'react-icons/fa';
import { motion, useScroll, useTransform } from 'framer-motion';

// --- Import your local images here ---
import adventureBg from '../src/images/Nine-Arches-Bridge.jpg';
import step1Image from '../src/images/Sri-Lanka-Beach.jpg';
import step2Image from '../src/images/Sri-Lanka-Beach.jpg';
import step3Image from '../src/images/Sri-Lanka-Beach.jpg';
import step4Image from '../src/images/Sri-Lanka-Beach.jpg';
import srilankabeach from'../src/images/dinuka-lankaloka-iduEaeBB_rQ-unsplash.jpg';

// --- Helper component for simple scroll animations ---
const AnimatedSection = ({ children, className }) => {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

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

// --- Customer Review Data ---
const customerReviews = [
  {
    name: 'Alex Johnson',
    trip: 'Sri Lankan Tea Trails Expedition',
    imageUrl: 'https://i.pravatar.cc/150?img=5',
    rating: 5,
    review: 'An absolutely unforgettable experience! Every detail was perfectly planned. Highly recommend!'
  },
  {
    name: 'Maria Garcia',
    trip: 'Coastal Wonders Tour',
    imageUrl: 'https://i.pravatar.cc/150?img=6',
    rating: 5,
    review: 'This was the adventure of a lifetime. The commitment to sustainable travel was also very impressive.'
  },
  {
    name: 'David Chen',
    trip: 'Cultural Heritage Journey',
    imageUrl: 'https://i.pravatar.cc/150?img=7',
    rating: 4,
    review: 'A fantastic way to immerse yourself in the local culture. A well-organized and enriching trip.'
  },
];

// --- Adventure Crafting Process Data ---
const journeySteps = [
    {
        imageUrl: step1Image,
        title: '1. Discover & Dream',
        description: 'We begin with a conversation, not a catalog. We listen to your travel aspirations to design an experience that is uniquely yours.'
    },
    {
        imageUrl: step2Image,
        title: '2. Blueprint of Wonder',
        description: 'Our travel artisans map out your journey, blending iconic landmarks with exclusive, off-the-beaten-path encounters.'
    },
    {
        imageUrl: step3Image,
        title: '3. Embark with Confidence',
        description: 'With every detail flawlessly arranged, you are free to immerse yourself in the moment. Your only job is to explore.'
    },
    {
        imageUrl: step4Image,
        title: '4. Memories Forged',
        description: 'Return with more than just photos. Bring back a collection of profound moments and stories that will be retold for a lifetime.'
    }
];


// --- Philosophy Data ---
const travelPhilosophy = [
    {
        icon: <FaCompass className="h-10 w-10 text-emerald-500" />,
        title: 'Authentic Experiences',
        description: 'We believe in journeys that connect you with the heart of a destination, its people, and its culture.'
    },
    {
        icon: <FaGlobeAmericas className="h-10 w-10 text-sky-500" />,
        title: 'Sustainable Travel',
        description: 'Our adventures are designed to be responsible, respecting local environments and communities.'
    },
    {
        icon: <FaLeaf className="h-10 w-10 text-lime-500" />,
        title: 'Pure Adventure',
        description: 'We craft itineraries that inspire a sense of wonder, discovery, and excitement.'
    }
];

// --- Hero Image Data for Slider ---
const heroImages = [
  {
    src: 'https://images.unsplash.com/photo-1501785888041-af3ef285b470?auto-format&fit=crop',
    alt: 'Beautiful Italian coast with colorful houses'
  },
  {
    src: 'https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?auto-format&fit=crop',
    alt: 'Person on a boat in a serene mountain lake'
  },
];

// --- Star Rating Component ---
const StarRating = ({ rating }) => {
    return (
      <div className="flex justify-center text-yellow-400">
        {[...Array(5)].map((_, i) => (
          <svg key={i} className={`h-5 w-5 ${i < rating ? 'fill-current' : 'text-gray-400'}`} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
            <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
          </svg>
        ))}
      </div>
    );
};

// --- ANIMATED Timeline Step Component ---
const JourneyStep = ({ step, index }) => {
  // Animation variants for the text content
  const contentVariants = {
    hidden: { opacity: 0, x: index % 2 === 0 ? -50 : 50 },
    visible: { 
      opacity: 1, 
      x: 0, 
      transition: { duration: 0.6, ease: "easeOut" } 
    },
  };

  return (
    <div className="relative mb-20 md:mb-28 last:mb-0 flex items-center w-full">
      {/* Text Content */}
      <motion.div
        className={`w-1/2 ${index % 2 === 0 ? 'text-right pr-12 md:pr-16' : 'text-left pl-12 md:pl-16 order-2'}`}
        variants={contentVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.5 }}
      >
        <h3 className="text-2xl font-bold text-emerald-400">{step.title}</h3>
        <p className="text-gray-200 mt-2">{step.description}</p>
      </motion.div>

      {/* Spacer to push content to the sides */}
      <div className="w-1/2"></div>
    </div>
  );
};


// --- Main About Us Component ---
function AboutUs() {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // Ref for the timeline container to track scroll progress
  const timelineRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: timelineRef,
    offset: ["start center", "end center"],
  });
  
  // Transform the scroll progress to control the line's height
  const lineHeight = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentImageIndex(prevIndex => (prevIndex + 1) % heroImages.length);
    }, 3000); 

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="overflow-x-hidden">
      
      {/* Hero Section with Image Slider */}
      <div className="relative py-24 sm:py-32">
        <div className="absolute inset-0">
          {heroImages.map((image, index) => (
            <img
              key={index}
              className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-1000 ease-in-out ${
                index === currentImageIndex ? 'opacity-100' : 'opacity-0'
              }`}
              src={image.src}
              alt={image.alt}
            />
          ))}
          <div className="absolute inset-0 bg-black/40"></div>
        </div>
        <div className="relative mx-auto max-w-7xl px-6 lg:px-8 text-center text-white">
            <AnimatedSection>
                <h1 className="text-4xl font-bold tracking-tight sm:text-6xl">
                    Our Journey to Your Next Adventure
                </h1>
                <p className="mt-6 text-lg leading-8 max-w-3xl mx-auto">
                    Every great journey starts with a story. Ours began with a simple passion for exploration and a dream to share the world's wonders in the most authentic way possible.
                </p>
            </AnimatedSection>
        </div>
      </div>

      {/* --- REDESIGNED "From Dream to Destination" Section --- */}
      <div className="relative py-24 sm:py-32">
        <div className="absolute inset-0">
          <img className="h-full w-full object-cover" src={adventureBg} alt="Desk with a map, compass, and travel items"/>
          <div className="absolute inset-0 bg-black/80 backdrop-blur-sm"></div>
        </div>
        <div className="relative mx-auto max-w-4xl px-6 lg:px-8">
          <AnimatedSection className="max-w-3xl mx-auto text-center mb-20">
            <h2 className="text-4xl font-bold tracking-tight text-white sm:text-5xl">
              From Dream to Destination
            </h2>
            <p className="mt-6 text-lg text-gray-300">
              Every journey is a masterpiece. Here’s how we bring yours to life, step by meticulous step.
            </p>
          </AnimatedSection>
          
          <div ref={timelineRef} className="relative">
            {/* The static background line */}
            <div className="absolute left-1/2 -ml-0.5 h-full w-1 bg-gray-600/50"></div>
            
            {/* The animated, colored line that draws on scroll */}
            <motion.div
              className="absolute left-1/2 -ml-0.5 h-full w-1 bg-emerald-400"
              style={{ height: lineHeight }}
            />

            {journeySteps.map((step, index) => (
              <JourneyStep key={index} step={step} index={index} />
            ))}
          </div>
        </div>
      </div>

      {/* Our Travel Philosophy Section */}
      <div className="relative py-24 sm:py-32">
        <div className="absolute inset-0">
          <img className="h-full w-full object-cover" src={srilankabeach} alt="Sri Lanka Travel"/>
          <div className="absolute inset-0 bg-black/60"></div>
        </div>
        <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
            <AnimatedSection className="max-w-2xl mx-auto text-center mb-16">
                <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">Our Travel Philosophy</h2>
            </AnimatedSection>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
                {travelPhilosophy.map((item, index) => (
                    <AnimatedSection key={index} className="bg-white/10 backdrop-blur-md p-8 rounded-xl text-white">
                        <div className="flex justify-center mb-4">{React.cloneElement(item.icon, { className: "h-10 w-10 text-white" })}</div>
                        <h3 className="xl font-semibold">{item.title}</h3>
                        <p className="mt-2 opacity-90">{item.description}</p>
                    </AnimatedSection>
                ))}
            </div>
        </div>
      </div>

      {/* Customer Reviews Section */}
      <div className="relative py-24 sm:py-32">
        <div className="absolute inset-0">
          <img className="h-full w-full object-cover" src="https://images.unsplash.com/photo-1501785888041-af3ef285b470?auto-format&fit=crop" alt="Group of happy travelers" />
          <div className="absolute inset-0 bg-gray-900/80"></div>
        </div>
        <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
            <AnimatedSection className="max-w-3xl mx-auto text-center mb-16">
                <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">What Our Adventurers Say</h2>
                <p className="mt-4 text-lg text-gray-300">Real stories from travelers who have journeyed with us.</p>
            </AnimatedSection>
            <div className="mx-auto grid max-w-2xl grid-cols-1 gap-8 lg:mx-0 lg:max-w-none lg:grid-cols-3">
                {customerReviews.map((review) => (
                <AnimatedSection key={review.name}>
                    <div className="flex h-full flex-col text-center bg-white/10 backdrop-blur-md p-8 rounded-xl text-white shadow-lg transition-all duration-300 hover:scale-105 hover:bg-white/20">
                      <img className="mx-auto h-20 w-20 rounded-full" src={review.imageUrl} alt={review.name} />
                      <blockquote className="mt-6 flex-grow">
                        <p className="text-lg leading-7 font-medium text-white">"{review.review}"</p>
                      </blockquote>
                      <footer className="mt-6">
                        <p className="text-base font-semibold text-white">{review.name}</p>
                        <p className="text-sm text-emerald-300">{review.trip}</p>
                        <div className="mt-3">
                           <StarRating rating={review.rating} />
                        </div>
                      </footer>
                    </div>
                </AnimatedSection>
                ))}
            </div>
        </div>
      </div>
    </div>
  );
}

export default AboutUs;