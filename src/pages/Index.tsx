
import React, { useEffect } from 'react';
import { Reveal } from "@/components/ui/reveal";
import { Button } from "@/components/ui/button";
import { Link, useNavigate, useLocation } from 'react-router-dom';
import {
  Instagram,
  Facebook,
  Twitter,
  ArrowRight,
  MapPin,
  Phone,
  Mail,
  Play,
  Camera,
  Image as ImageIcon,
  Aperture,
  Heart,
  Users,
  Sparkles,
  Smile,
  Gift,
  Home,
  Star
} from "lucide-react";
import { FlowButton } from "@/components/ui/flow-button";
import { HeroQuote } from "@/components/home/HeroQuote";
import { StickyServicesScroll } from "@/components/home/StickyServicesScroll";
import { AnimatedStatsSection } from "@/components/home/AnimatedStatsSection";
import { StandaloneArrowCTA } from "@/components/ui/standalone-arrow-cta";

// Mock Data for Portfolio
const portfolioItems = [
  { id: 1, title: "Wedding Tales", category: "Traditional & Candid", image: "/portfolio_wedding.png" },
  { id: 2, title: "Fashion & Style", category: "Editorial", image: "/portfolio_fashion.png" },
  { id: 3, title: "Romantic Journeys", category: "Pre-wedding", image: "/portfolio_romantic.png" },
  { id: 4, title: "Cinematic Films", category: "Videography", image: "/hero.png" },
];

const facts = [
  { id: 1, number: "23+", label: "Years of Experience" },
  { id: 2, number: "10000+", label: "Happy Customers" },
  { id: 3, number: "100%", label: "Client Satisfaction" },
  { id: 4, number: "10+", label: "Working Employees" },
];

const specializations = [
  { name: "Wedding", icon: <Camera size={40} /> },
  { name: "Pre Wedding", icon: <ImageIcon size={40} /> },
  { name: "Post Wedding", icon: <Aperture size={40} /> },
  { name: "Romantic Couple Shoot", icon: <Heart size={40} /> },
  { name: "Family Photography", icon: <Users size={40} /> },
  { name: "Baby Shower Photography", icon: <Sparkles size={40} /> },
  { name: "Toddler Photography", icon: <Smile size={40} /> },
  { name: "Birthday Party Photoshoot", icon: <Gift size={40} /> },
  { name: "House Warming Ceremony", icon: <Home size={40} /> },
  { name: "Naming Ceremony", icon: <Star size={40} /> },
  { name: "Puberty Ceremony", icon: <Sparkles size={40} /> },
  { name: "Engagement", icon: <Heart size={40} /> },
];

const Index = () => {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (location.search.includes('scrollTo=services')) {
      setTimeout(() => {
        const element = document.getElementById('services');
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
        window.history.replaceState({}, '', '/');
      }, 300);
    }
  }, [location]);

  useEffect(() => {
    document.body.style.cursor = 'auto';
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-white text-black font-sans">

      {/* Hero Section */}
      <section id="home" className="relative h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0 flex items-center justify-center bg-black">
          <video
            autoPlay
            loop
            muted
            playsInline
            controls={false}
            preload="auto"
            className="w-full h-full object-cover"
          >
            <source src="/Landscape.mp4" type="video/mp4" />
          </video>
          <div className="absolute inset-0 bg-black/30" />
        </div>
        
        <HeroQuote />
      </section>

      {/* About Section */}
      <section id="about" className="py-16 md:py-24 container mx-auto px-6">
        <div className="flex flex-col md:flex-row gap-10 md:gap-16 items-center">
          <div className="w-full md:w-[30%]">
            <Reveal>
              <div className="relative group max-w-xs mx-auto md:max-w-none flex items-center justify-center p-4">
                <img src="/LOGO.png" alt="Suba Studios Logo" className="relative w-full h-auto object-contain" />
              </div>
            </Reveal>
          </div>
          <div className="w-full md:w-[70%] space-y-6">
            <Reveal>
              <span className="text-zg-blue font-serif font-bold tracking-widest text-xs uppercase mb-2 block text-center md:text-left">About Us</span>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif font-bold text-center md:text-left">Welcome to Suba Studios!</h2>
            </Reveal>
            <Reveal delay={200}>
              <p className="text-base sm:text-lg text-gray-600 leading-relaxed text-center md:text-left">
                Suba Studios is considered to be the best place for visual storytelling and is among the top wedding photography studios in the country. Our team of wedding photographers is here to assist you in having a meaningful, stress-free, and real event while uniquely documenting your love.
              </p>
              <p className="text-sm sm:text-base text-gray-600 leading-relaxed mt-4 text-center md:text-left">
                We want to be available for you all day long and that includes from the get go. During the wedding photoshoot, we give our best to help the couple with different wedding poses. We have written hundreds of original love stories using our expertise in photography all around the world.
              </p>
              <div className="pt-6 flex justify-center md:justify-start">
                <Button variant="link" className="p-0 text-zg-blue font-bold text-lg group touch-target" onClick={() => navigate('/about')}>
                  Learn More About Us <ArrowRight size={18} className="ml-2 group-hover:translate-x-2 transition-transform" />
                </Button>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Premium Animated Stats Section */}
      <AnimatedStatsSection />

      {/* Timeless Celebrations Section */}
      <section className="py-16 md:py-24 bg-white overflow-hidden">
        <div className="container mx-auto px-6">
          <Reveal>
            <div className="text-center mb-10 md:mb-16">
              <h2 className="text-3xl sm:text-4xl md:text-6xl font-serif font-bold uppercase tracking-widest">TIMELESS CELEBRATIONS</h2>
            </div>
          </Reveal>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-10">
            <Reveal delay={100}>
              <div 
                className="group cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-black focus-visible:ring-offset-4 rounded-2xl transition-all duration-500 ease-out md:hover:-translate-y-[6px] md:hover:scale-[1.02] md:hover:shadow-xl"
                onClick={() => navigate('/weddings/hindu')}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    navigate('/weddings/hindu');
                  }
                }}
                tabIndex={0}
                role="link"
                aria-label="Hindu Wedding Photography"
              >
                <div className="relative overflow-hidden rounded-2xl aspect-[4/5]">
                  <img src="/hindu/1.png" className="w-full h-full object-cover transition-all duration-700 ease-out md:group-hover:scale-[1.03] md:group-hover:brightness-105" alt="Hindu Wedding" />
                  <div className="absolute inset-0 bg-black/20 md:group-hover:bg-black/10 transition-colors duration-500" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-80 md:group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
                  
                  <div className="absolute bottom-0 left-0 p-6 sm:p-7 lg:p-8 flex flex-col items-start w-full pointer-events-none pr-20">
                    <span className="text-white/90 text-xs tracking-[0.2em] uppercase font-medium mb-2 drop-shadow-sm">
                      Photography
                    </span>
                    <h3 className="text-white text-2xl md:text-3xl font-serif font-bold leading-tight opacity-95 translate-y-[6px] transition-all duration-500 ease-out md:group-hover:translate-y-0 md:group-hover:opacity-100 drop-shadow-md">
                      Hindu Wedding
                    </h3>
                  </div>

                  <StandaloneArrowCTA to="/weddings/hindu" darkBackground={true} />
                </div>
              </div>
            </Reveal>
            <Reveal delay={200}>
              <div 
                className="group cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-black focus-visible:ring-offset-4 rounded-2xl transition-all duration-500 ease-out md:hover:-translate-y-[6px] md:hover:scale-[1.02] md:hover:shadow-xl"
                onClick={() => navigate('/weddings/engagement')}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    navigate('/weddings/engagement');
                  }
                }}
                tabIndex={0}
                role="link"
                aria-label="Engagement Photography"
              >
                <div className="relative overflow-hidden rounded-2xl aspect-[4/5]">
                  <img src="/couple_portrait/pp4.jpg" className="w-full h-full object-cover transition-all duration-700 ease-out md:group-hover:scale-[1.03] md:group-hover:brightness-105" alt="Engagement Photography" />
                  <div className="absolute inset-0 bg-black/20 md:group-hover:bg-black/10 transition-colors duration-500" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-80 md:group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
                  
                  <div className="absolute bottom-0 left-0 p-6 sm:p-7 lg:p-8 flex flex-col items-start w-full pointer-events-none pr-20">
                    <span className="text-white/90 text-xs tracking-[0.2em] uppercase font-medium mb-2 drop-shadow-sm">
                      Photography
                    </span>
                    <h3 className="text-white text-2xl md:text-3xl font-serif font-bold leading-tight opacity-95 translate-y-[6px] transition-all duration-500 ease-out md:group-hover:translate-y-0 md:group-hover:opacity-100 drop-shadow-md">
                      Engagement
                    </h3>
                  </div>

                  <StandaloneArrowCTA to="/weddings/engagement" darkBackground={true} />
                </div>
              </div>
            </Reveal>
            <Reveal delay={300}>
              <div 
                className="group cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-black focus-visible:ring-offset-4 rounded-2xl transition-all duration-500 ease-out md:hover:-translate-y-[6px] md:hover:scale-[1.02] md:hover:shadow-xl"
                onClick={() => navigate('/weddings/christian')}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    navigate('/weddings/christian');
                  }
                }}
                tabIndex={0}
                role="link"
                aria-label="Christian Wedding Photography"
              >
                <div className="relative overflow-hidden rounded-2xl aspect-[4/5]">
                  <img src="/Christian/4Z5A8733.JPG" className="w-full h-full object-cover transition-all duration-700 ease-out md:group-hover:scale-[1.03] md:group-hover:brightness-105" alt="Christian Wedding" />
                  <div className="absolute inset-0 bg-black/20 md:group-hover:bg-black/10 transition-colors duration-500" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-80 md:group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
                  
                  <div className="absolute bottom-0 left-0 p-6 sm:p-7 lg:p-8 flex flex-col items-start w-full pointer-events-none pr-20">
                    <span className="text-white/90 text-xs tracking-[0.2em] uppercase font-medium mb-2 drop-shadow-sm">
                      Photography
                    </span>
                    <h3 className="text-white text-2xl md:text-3xl font-serif font-bold leading-tight opacity-95 translate-y-[6px] transition-all duration-500 ease-out md:group-hover:translate-y-0 md:group-hover:opacity-100 drop-shadow-md">
                      Christian Wedding
                    </h3>
                  </div>

                  <StandaloneArrowCTA to="/weddings/christian" darkBackground={true} />
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      <StickyServicesScroll />
    </div>
  );
};

export default Index;
