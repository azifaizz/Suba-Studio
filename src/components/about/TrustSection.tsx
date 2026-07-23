import React, { useRef, useState, useEffect } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const stats = [
  { num: 23, suffix: "+", label: "Years of Experience" },
  { num: 10000, suffix: "+", label: "Happy Customers" },
  { num: 100, suffix: "%", label: "Client Satisfaction" },
  { num: 10, suffix: "+", label: "Working Employees" }
];

const Counter = ({ end, duration = 2 }: { end: number, duration?: number }) => {
  const [count, setCount] = useState(0);
  const countRef = useRef(null);

  useGSAP(() => {
    ScrollTrigger.create({
      trigger: countRef.current,
      start: "top 80%",
      onEnter: () => {
        gsap.to({ val: 0 }, {
          val: end,
          duration: duration,
          ease: "power2.out",
          onUpdate: function () {
            setCount(Math.floor(this.targets()[0].val));
          }
        });
      },
      once: true
    });
  }, []);

  return (
    <>
      <span ref={countRef} aria-hidden="true">{count}</span>
      <span className="sr-only">{end}</span>
    </>
  );
};

const TrustSection = () => {
  const containerRef = useRef<HTMLElement>(null);

  useGSAP(() => {
    const cards = gsap.utils.toArray('.trust-card') as HTMLElement[];
    gsap.from(cards, {
      y: 100,
      opacity: 0,
      duration: 1.5,
      stagger: 0.1,
      ease: "power4.out",
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top 75%",
      }
    });
    
    // Parallax floating effect for cards
    cards.forEach((card, i) => {
      gsap.to(card, {
        y: (i % 2 === 0) ? -30 : 30,
        ease: "none",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: true,
        }
      });
    });
  }, { scope: containerRef });

  return (
    <section ref={containerRef} className="pt-16 pb-16 lg:pt-20 lg:pb-32 bg-[#ECECEC] overflow-hidden relative">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="text-center mb-16 lg:mb-20">
          <h2 className="text-4xl md:text-6xl font-serif text-[#111111]">Why People Trust Us</h2>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12">
          {stats.map((stat, i) => (
            <div 
              key={i}
              className="trust-card relative flex flex-col items-center text-center group"
            >
              {/* Refined Background Glow */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-40 h-40 bg-white rounded-full blur-3xl opacity-0 group-hover:opacity-60 transition-opacity duration-1000 pointer-events-none z-0"></div>
              
              {/* Premium Geometric Numbers */}
              <div className="relative z-10 text-6xl md:text-8xl font-poppins font-bold tracking-tighter mb-4 transition-transform duration-700 group-hover:scale-105">
                <span className="text-[#111111] relative overflow-hidden group">
                  <Counter end={stat.num} />
                  {/* Delicate shine animation on hover */}
                  <div className="absolute top-0 left-[-100%] w-1/2 h-full bg-gradient-to-r from-transparent via-white/40 to-transparent -skew-x-12 group-hover:left-[200%] transition-all duration-1000 ease-in-out z-20 pointer-events-none"></div>
                </span>
                <span className="text-[#D4AF37]">{stat.suffix}</span>
                
                {/* Thin gold underline */}
                <div className="w-12 h-[2px] bg-[#D4AF37] mx-auto mt-4 opacity-60 group-hover:w-20 transition-all duration-500"></div>
              </div>

              {/* Refined Labels */}
              <div className="relative z-10 text-xs md:text-sm font-sans tracking-[0.2em] uppercase text-[#666666] font-medium">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TrustSection;
