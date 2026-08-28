import React, { useState, useEffect, useRef } from 'react';
import { useInView } from 'react-intersection-observer';
import { FaCompass, FaGlobeAmericas, FaLeaf } from 'react-icons/fa';
import { motion, useScroll, useTransform } from 'framer-motion';
import { db } from './firebase/config';
import { collection, query, where, getDocs } from 'firebase/firestore';

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
    src: 'https://images.unsplash.com/photo-1501785888041-af3ef285b470?auto=format&fit=crop&w=1600&q=70',
    alt: 'Beautiful Italian coast with colorful houses'
  },
  {
    src: 'https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?auto=format&fit=crop&w=1600&q=70',
    alt: 'Person on a boat in a serene mountain lake'
  },
];

// --- Star Rating Component ---
const StarRating = ({ rating }) => {
    return (
      <div className="flex justify-center text-yellow-400">
        {[...Array(5)].map((_, i) => (
          <svg key={i} className={`h-4 w-4 sm:h-5 sm:w-5 ${i < rating ? 'fill-current' : 'text-gray-400'}`} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
            <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
          </svg>
        ))}
      </div>
    );
};

// --- ANIMATED Timeline Step Component (mobile-first: stacks full width, splits into two columns from md up) ---
const JourneyStep = ({ step, index }) => {
  const contentVariants = {
    hidden: { opacity: 0, x: index % 2 === 0 ? -50 : 50 },
    visible: { 
      opacity: 1, 
      x: 0, 
      transition: { duration: 0.6, ease: "easeOut" } 
    },
  };

  return (
    <div className="relative mb-14 sm:mb-16 md:mb-28 last:mb-0 flex items-center w-full">
      {/* Text Content */}
      <motion.div
        className={`w-full md:w-1/2 text-left ${
          index % 2 === 0
            ? 'md:text-right md:pr-12 lg:pr-16'
            : 'md:pl-12 lg:pl-16 md:order-2'
        }`}
        variants={contentVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.5 }}
      >
        <h3 className="text-xl sm:text-2xl font-bold text-emerald-400">{step.title}</h3>
        <p className="text-sm sm:text-base text-gray-200 mt-2">{step.description}</p>
      </motion.div>

      {/* Spacer to push content to the sides (desktop/tablet only) */}
      <div className="hidden md:block w-1/2"></div>
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

  // --- Live testimonials: pull real approved reviews and show 3 at random ---
  const [testimonials, setTestimonials] = useState([]);
  const [testimonialsLoading, setTestimonialsLoading] = useState(true);

  useEffect(() => {
    const fetchRandomTestimonials = async () => {
      try {
        const q = query(
          collection(db, 'reviews'),
          where('status', '==', 'approved')
        );
        const snapshot = await getDocs(q);
        const allReviews = [];
        snapshot.forEach((doc) => allReviews.push({ id: doc.id, ...doc.data() }));

        // Fisher-Yates shuffle, then take up to 3
        const shuffled = [...allReviews];
        for (let i = shuffled.length - 1; i > 0; i--) {
          const j = Math.floor(Math.random() * (i + 1));
          [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
        }
        setTestimonials(shuffled.slice(0, 3));
      } catch (error) {
        if (process.env.NODE_ENV !== 'production') {
          console.error('Error fetching testimonials:', error.code);
        }
      } finally {
        setTestimonialsLoading(false);
      }
    };

    fetchRandomTestimonials();
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentImageIndex(prevIndex => (prevIndex + 1) % heroImages.length);
    }, 3000); 

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="overflow-x-hidden">
      
      {/* Hero Section with Image Slider */}
      <div className="relative py-20 sm:py-32 md:py-48 lg:py-56">
        <div className="absolute inset-0">
          {heroImages.map((image, index) => (
            <img
              key={index}
              className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-1000 ease-in-out ${
                index === currentImageIndex ? 'opacity-100' : 'opacity-0'
              }`}
              src={image.src}
              alt={image.alt}
              loading={index === 0 ? 'eager' : 'lazy'}
              fetchPriority={index === 0 ? 'high' : 'auto'}
              decoding="async"
            />
          ))}
          <div className="absolute inset-0 bg-black/40"></div>
        </div>
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center text-white">
            <AnimatedSection>
                <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight">
                    Our Journey to Your Next Adventure
                </h1>
                <p className="mt-4 sm:mt-6 text-base sm:text-lg leading-7 sm:leading-8 max-w-3xl mx-auto">
                    Every great journey starts with a story. Ours began with a simple passion for exploration and a dream to share the world's wonders in the most authentic way possible.
                </p>
            </AnimatedSection>
        </div>
      </div>

      {/* --- REDESIGNED "From Dream to Destination" Section --- */}
      <div className="relative py-16 sm:py-24 md:py-32">
        <div className="absolute inset-0">
          <img className="h-full w-full object-cover" src={adventureBg} alt="Desk with a map, compass, and travel items" loading="lazy" decoding="async" />
          <div className="absolute inset-0 bg-black/80"></div>
        </div>
        <div className="relative mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <AnimatedSection className="max-w-3xl mx-auto text-center mb-12 sm:mb-16 md:mb-20">
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-white">
              From Dream to Destination
            </h2>
            <p className="mt-4 sm:mt-6 text-base sm:text-lg text-gray-300">
              Every journey is a masterpiece. Here's how we bring yours to life, step by meticulous step.
            </p>
          </AnimatedSection>
          
          <div ref={timelineRef} className="relative">
            {/* The static background line (desktop/tablet only, since layout stacks on mobile) */}
            <div className="hidden md:block absolute left-1/2 -ml-0.5 h-full w-1 bg-gray-600/50"></div>
            
            {/* The animated, colored line that draws on scroll */}
            <motion.div
              className="hidden md:block absolute left-1/2 -ml-0.5 h-full w-1 bg-emerald-400"
              style={{ height: lineHeight }}
            />

            {journeySteps.map((step, index) => (
              <JourneyStep key={index} step={step} index={index} />
            ))}
          </div>
        </div>
      </div>

      {/* Our Travel Philosophy Section */}
      <div className="relative py-16 sm:py-24 md:py-32">
        <div className="absolute inset-0">
          <img className="h-full w-full object-cover" src={srilankabeach} alt="Sri Lanka Travel" loading="lazy" decoding="async" />
          <div className="absolute inset-0 bg-black/60"></div>
        </div>
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <AnimatedSection className="max-w-2xl mx-auto text-center mb-10 sm:mb-16">
                <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight text-white">Our Travel Philosophy</h2>
            </AnimatedSection>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 sm:gap-8 text-center">
                {travelPhilosophy.map((item, index) => (
                    <AnimatedSection key={index} className="bg-white/10 p-6 sm:p-8 rounded-xl text-white">
                        <div className="flex justify-center mb-4">{React.cloneElement(item.icon, { className: "h-8 w-8 sm:h-10 sm:w-10 text-white" })}</div>
                        <h3 className="text-lg sm:text-xl font-semibold">{item.title}</h3>
                        <p className="mt-2 text-sm sm:text-base opacity-90">{item.description}</p>
                    </AnimatedSection>
                ))}
            </div>
        </div>
      </div>

      {/* Customer Reviews Section */}
      <div className="relative py-16 sm:py-24 md:py-32">
        <div className="absolute inset-0">
          <img
            className="h-full w-full object-cover"
            src="https://images.unsplash.com/photo-1501785888041-af3ef285b470?auto=format&fit=crop&w=1600&q=70"
            alt="Group of happy travelers"
            loading="lazy"
            decoding="async"
          />
          <div className="absolute inset-0 bg-gray-900/80"></div>
        </div>
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <AnimatedSection className="max-w-3xl mx-auto text-center mb-10 sm:mb-16">
                <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight text-white">What Our Adventurers Say</h2>
                <p className="mt-3 sm:mt-4 text-base sm:text-lg text-gray-300">Real stories from travelers who have journeyed with us.</p>
            </AnimatedSection>

            {testimonialsLoading ? (
              <div className="text-center py-8">
                <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-white"></div>
              </div>
            ) : testimonials.length === 0 ? (
              // No approved reviews yet — say so rather than showing nothing with no explanation
              <p className="text-center text-gray-300 text-base sm:text-lg">
                Be the first to share your experience on our Reviews page!
              </p>
            ) : (
              <div className="mx-auto grid max-w-2xl grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-8 lg:mx-0 lg:max-w-none lg:grid-cols-3">
                  {testimonials.map((review) => (
                  <AnimatedSection key={review.id}>
                      <div className="flex h-full flex-col text-center bg-white/10 p-6 sm:p-8 rounded-xl text-white shadow-lg transition-all duration-300 hover:scale-105 hover:bg-white/20">
                        <blockquote className="flex-grow">
                          <p className="text-base sm:text-lg leading-6 sm:leading-7 font-medium text-white line-clamp-5">"{review.feedback}"</p>
                        </blockquote>
                        <footer className="mt-4 sm:mt-6">
                          <p className="text-sm sm:text-base font-semibold text-white">{review.touristName}</p>
                          <p className="text-xs sm:text-sm text-emerald-300">{review.destination}</p>
                          <div className="mt-3">
                             <StarRating rating={review.rating} />
                          </div>
                        </footer>
                      </div>
                  </AnimatedSection>
                  ))}
              </div>
            )}
        </div>
      </div>
    </div>
  );
}

export default AboutUs;