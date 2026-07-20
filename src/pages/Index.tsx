
import React, { useEffect } from 'react';
import { Reveal } from "@/components/ui/reveal";
import { Button } from "@/components/ui/button";
import { Link, useNavigate } from 'react-router-dom';
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
  Smile,
  Gift,
  Home,
  Sparkles,
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
  { id: 1, number: "22+", label: "Years Experience" },
  { id: 2, number: "5000+", label: "Happy Customers" },
  { id: 3, number: "100%", label: "Client Satisfaction" },
  { id: 4, number: "56+", label: "Professionals" },
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
      <section id="home" className="relative h-screen flex items-center overflow-hidden">
        <div className="absolute inset-0 z-0 flex items-center justify-center bg-black">
          <video
            autoPlay
            loop
            muted
            playsInline
            controls={false}
            className="w-full h-full object-cover"
          >
            <source src="/Mk1.mp4" type="video/mp4" />
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
              <div className="relative group max-w-xs mx-auto md:max-w-none">
                <div className="absolute inset-0 bg-zg-blue/10 transform group-hover:translate-x-6 group-hover:translate-y-6 transition-transform duration-500 rounded-lg" />
                <img src="/muhurtham.jpg" alt="Suba Studios Story" className="relative w-full rounded-lg shadow-2xl transition-all duration-700" />
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
              <div className="group cursor-pointer" onClick={() => navigate('/weddings/hindu')}>
                <div className="relative overflow-hidden rounded-2xl aspect-[4/5]">
                  <img src="/portfolio_wedding.png" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" alt="Hindu Wedding" />
                  <div className="absolute inset-0 bg-black/20 group-hover:bg-black/0 transition-colors" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-black/10 to-transparent opacity-70 group-hover:opacity-85 transition-opacity duration-500 pointer-events-none" />
                  <StandaloneArrowCTA to="/weddings/hindu" darkBackground={true} />
                </div>
              </div>
            </Reveal>
            <Reveal delay={200}>
              <div className="group cursor-pointer" onClick={() => navigate('/weddings/engagement')}>
                <div className="relative overflow-hidden rounded-2xl aspect-[4/5]">
                  <img src="/portfolio_romantic.png" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" alt="Engagement Photography" />
                  <div className="absolute inset-0 bg-black/20 group-hover:bg-black/0 transition-colors" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-black/10 to-transparent opacity-70 group-hover:opacity-85 transition-opacity duration-500 pointer-events-none" />
                  <StandaloneArrowCTA to="/weddings/engagement" darkBackground={true} />
                </div>
              </div>
            </Reveal>
            <Reveal delay={300}>
              <div className="group cursor-pointer" onClick={() => navigate('/weddings/christian')}>
                <div className="relative overflow-hidden rounded-2xl aspect-[4/5]">
                  <img src="/portfolio_romantic.png" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" alt="Christian Wedding" />
                  <div className="absolute inset-0 bg-black/20 group-hover:bg-black/0 transition-colors" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-black/10 to-transparent opacity-70 group-hover:opacity-85 transition-opacity duration-500 pointer-events-none" />
                  <StandaloneArrowCTA to="/weddings/christian" darkBackground={true} />
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Premium Sticky Card Stack Scroll Services Section */}
      <StickyServicesScroll />

      {/* WhatsApp Floating Button */}
      <a
        href="https://wa.me/918994442768"
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-6 right-6 z-50 bg-transparent border-2 border-[#25D366] text-[#25D366] p-2.5 rounded-full shadow-md hover:scale-110 transition-all duration-300 flex items-center justify-center"
        aria-label="Chat on WhatsApp"
      >
        <svg
          viewBox="0 0 24 24"
          fill="currentColor"
          className="w-5 h-5"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
        </svg>
      </a>
    </div>
  );
};

export default Index;
