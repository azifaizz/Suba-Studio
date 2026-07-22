import React, { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Camera, Heart, Sparkles, Lightbulb, Users } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const values = [
  { icon: Camera, title: "Storytelling", desc: "Every frame a narrative." },
  { icon: Heart, title: "Passion", desc: "Driven by pure emotion." },
  { icon: Sparkles, title: "Creativity", desc: "Always pushing boundaries." },
  { icon: Lightbulb, title: "Innovation", desc: "Setting modern trends." },
  { icon: Users, title: "Experience", desc: "Exceptional service for you." }
];

const ValuesSection = () => {
  const containerRef = useRef<HTMLElement>(null);

  useGSAP(() => {
    gsap.fromTo('.value-card', {
      y: 100,
      opacity: 0,
      rotationX: 45
    }, {
      y: 0,
      opacity: 1,
      rotationX: 0,
      duration: 1,
      stagger: 0.1,
      ease: "back.out(1.7)",
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top 70%",
      }
    });
  }, { scope: containerRef });

  return (
    <section ref={containerRef} className="py-12 md:py-24 lg:py-32 bg-[#111111] text-white overflow-hidden relative">
      {/* Background ambient glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-4xl h-[1px] bg-gradient-to-r from-transparent via-[#D4AF37] to-transparent opacity-30"></div>
      
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="text-center mb-12 md:mb-16">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif">Our Values</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6">
          {values.map((val, i) => {
            const Icon = val.icon;
            return (
              <div 
                key={i}
                className="value-card group bg-white/5 backdrop-blur-sm border border-white/10 p-6 md:p-8 rounded-2xl flex flex-col items-center text-center lg:hover:bg-white/10 lg:hover:-translate-y-2 md:lg:hover:-translate-y-4 transition-all duration-500 shadow-xl lg:hover:shadow-[#D4AF37]/20"
              >
                <div className="w-14 h-14 md:w-16 md:h-16 rounded-full bg-white/5 flex items-center justify-center mb-4 md:mb-6 lg:group-hover:scale-110 lg:group-hover:bg-[#D4AF37]/20 transition-all duration-500">
                  <Icon className="w-6 h-6 md:w-8 md:h-8 text-white/70 lg:group-hover:text-[#D4AF37] transition-colors duration-500" />
                </div>
                <h3 className="text-lg md:text-xl font-serif mb-2 md:mb-3 text-white/90">{val.title}</h3>
                <p className="text-sm font-sans font-light text-white/60">
                  {val.desc}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default ValuesSection;
