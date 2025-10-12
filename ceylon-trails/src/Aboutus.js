import React from 'react';
import { useInView } from 'react-intersection-observer';
import { FaLinkedin, FaTwitter, FaGithub, FaCompass, FaGlobeAmericas, FaLeaf } from 'react-icons/fa';

// --- Helper component for scroll animations ---
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

// --- Team Member Data ---
const teamMembers = [
  {
    name: 'Jane Doe',
    role: 'Founder & Chief Explorer',
    imageUrl: 'https://i.pravatar.cc/150?img=1',
    socials: { linkedin: '#', twitter: '#', github: '#' },
    bio: 'The visionary who charted the course for our incredible journeys.'
  },
  {
    name: 'John Smith',
    role: 'Lead Developer & Tech Navigator',
    imageUrl: 'https://i.pravatar.cc/150?img=2',
    socials: { linkedin: '#', twitter: '#', github: '#' },
    bio: 'The architect of our digital compass, ensuring a seamless user experience.'
  },
  {
    name: 'Emily White',
    role: 'Marketing & Storyteller',
    imageUrl: 'https://i.pravatar.cc/150?img=3',
    socials: { linkedin: '#', twitter: '#' },
    bio: 'The creative voice who shares the magic of our adventures with the world.'
  },
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
]

// --- Main About Us Component ---
function AboutUs() {
  return (
    <div className="overflow-x-hidden"> {/* overflow-x-hidden prevents horizontal scrollbars */}
      
      {/* Hero Section */}
      <div className="relative py-24 sm:py-32">
        {/* Background Image & Overlay */}
        <div className="absolute inset-0">
          <img className="h-full w-full object-cover" src="https://images.unsplash.com/photo-1528543606781-df6e6857e35b?auto=format&fit=crop" alt="Travel map background"/>
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

      {/* Timeline Section for "Our Story" */}
      <div className="relative py-24 sm:py-32">
         {/* Background Image & Overlay */}
         <div className="absolute inset-0">
          <img className="h-full w-full object-cover" src="https://images.unsplash.com/photo-1543361189-6a3583333334?auto=format&fit=crop" alt="Vintage map texture"/>
          <div className="absolute inset-0 bg-white/80 backdrop-blur-sm"></div>
        </div>
        <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
            <AnimatedSection className="max-w-2xl mx-auto text-center mb-16">
                <h2 className="text-3xl font-bold tracking-tight text-emerald-600 sm:text-4xl">The Path We've Traveled</h2>
            </AnimatedSection>
            
            <div className="relative mt-8">
                <div className="absolute left-1/2 -ml-px h-full w-0.5 bg-gray-400"></div>
                <AnimatedSection className="relative mb-12">
                    <div className="md:flex items-center md:justify-end md:mr-10">
                        <div className="md:w-1/2 text-left md:text-right pr-8">
                            <p className="text-lg font-semibold text-gray-800">2024 - The Spark</p>
                            <p className="text-gray-600">Founded in a small garage in Kadawatha, Sri Lanka, fueled by a shared vision to redefine travel.</p>
                        </div>
                    </div>
                    <div className="absolute left-1/2 -ml-2 h-4 w-4 rounded-full bg-emerald-500 border-2 border-white"></div>
                </AnimatedSection>
                <AnimatedSection className="relative mb-12">
                    <div className="md:flex items-center">
                        <div className="md:w-1/2 md:ml-10 pl-8">
                            <p className="text-lg font-semibold text-gray-800">2025 - First Expedition</p>
                            <p className="text-gray-600">We launched our first curated tour, taking a small group through the lush tea trails of central Sri Lanka.</p>
                        </div>
                    </div>
                    <div className="absolute left-1/2 -ml-2 h-4 w-4 rounded-full bg-emerald-500 border-2 border-white"></div>
                </AnimatedSection>
            </div>
        </div>
      </div>

      {/* Our Travel Philosophy Section */}
      <div className="relative py-24 sm:py-32">
        {/* Background Image & Overlay */}
        <div className="absolute inset-0">
          <img className="h-full w-full object-cover" src="https://images.unsplash.com/photo-1552332386-f8dd00dc2f85?auto=format&fit=crop" alt="Lush green jungle"/>
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
                        <h3 className="text-xl font-semibold">{item.title}</h3>
                        <p className="mt-2 opacity-90">{item.description}</p>
                    </AnimatedSection>
                ))}
            </div>
        </div>
      </div>

      {/* Team Section */}
      <div className="relative py-24 sm:py-32">
        {/* Background Image & Overlay */}
        <div className="absolute inset-0">
          <img className="h-full w-full object-cover" src="https://images.unsplash.com/photo-1589834390005-5d4fb9bf3d32?auto=format&fit=crop" alt="Mountain range"/>
          <div className="absolute inset-0 bg-gray-900/70"></div>
        </div>
        <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
            <AnimatedSection className="max-w-2xl mx-auto text-center mb-16">
                <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">Meet the Trailblazers</h2>
            </AnimatedSection>
            <ul className="mx-auto grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 sm:grid-cols-2 lg:mx-0 lg:max-w-none lg:grid-cols-3">
                {teamMembers.map((person) => (
                <AnimatedSection key={person.name}>
                    <li className="text-center bg-white p-6 rounded-lg shadow-lg transition-all duration-300 hover:scale-105 hover:shadow-2xl">
                    <img className="mx-auto h-24 w-24 rounded-full" src={person.imageUrl} alt={person.name} />
                    <h3 className="mt-6 text-base font-semibold text-gray-900">{person.name}</h3>
                    <p className="text-sm leading-6 text-emerald-600">{person.role}</p>
                    <p className="mt-2 text-sm text-gray-500">{person.bio}</p>
                    <ul className="mt-6 flex justify-center gap-x-6">
                        <li><a href={person.socials.linkedin} className="text-gray-400 hover:text-emerald-500"><FaLinkedin className="h-5 w-5" /></a></li>
                        <li><a href={person.socials.twitter} className="text-gray-400 hover:text-emerald-500"><FaTwitter className="h-5 w-5" /></a></li>
                        <li><a href={person.socials.github} className="text-gray-400 hover:text-emerald-500"><FaGithub className="h-5 w-5" /></a></li>
                    </ul>
                    </li>
                </AnimatedSection>
                ))}
            </ul>
        </div>
      </div>
    </div>
  );
}

export default AboutUs;