import React, { useRef, useState, useEffect } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const stats = [
  { num: 22, suffix: "+", label: "Years Experience" },
  { num: 5000, suffix: "+", label: "Happy Couples" },
  { num: 100, suffix: "%", label: "Client Satisfaction" },
  { num: 56, suffix: "+", label: "Professionals" }
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

  return <span ref={countRef}>{count}</span>;
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
    <section ref={containerRef} className="py-32 bg-[#ECECEC] overflow-hidden relative">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="text-center mb-24">
          <h2 className="text-4xl md:text-6xl font-serif text-[#111111]">Why People Trust Us</h2>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12">
          {stats.map((stat, i) => (
            <div 
              key={i}
              className="trust-card relative flex flex-col items-center text-center group"
            >
              {/* Background Glow */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 bg-white rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none z-0"></div>
              
              <div className="relative z-10 text-5xl md:text-7xl font-serif font-light text-[#111111] mb-4">
                <Counter end={stat.num} />
                <span className="text-[#D4AF37]">{stat.suffix}</span>
              </div>
              <div className="relative z-10 text-sm md:text-base font-sans tracking-widest uppercase text-[#2B2B2B]">
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
