import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Award, Users, CheckCircle2, Camera } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

interface StatItem {
  id: number;
  targetValue: number;
  suffix: string;
  label: string;
  icon: React.ReactNode;
  description: string;
}

const statItems: StatItem[] = [
  {
    id: 1,
    targetValue: 23,
    suffix: "+",
    label: "Years of Experience",
    icon: <Award className="w-6 h-6 sm:w-7 sm:h-7 text-amber-400" />,
    description: "Crafting timeless visual stories since our very first frame."
  },
  {
    id: 2,
    targetValue: 10000,
    suffix: "+",
    label: "Happy Customers",
    icon: <Users className="w-6 h-6 sm:w-7 sm:h-7 text-blue-400" />,
    description: "Families & couples who trusted us with their dearest moments."
  },
  {
    id: 3,
    targetValue: 100,
    suffix: "%",
    label: "Client Satisfaction",
    icon: <CheckCircle2 className="w-6 h-6 sm:w-7 sm:h-7 text-emerald-400" />,
    description: "Uncompromised dedication to excellence in every celebration."
  },
  {
    id: 4,
    targetValue: 10,
    suffix: "+",
    label: "Working Employees",
    icon: <Camera className="w-6 h-6 sm:w-7 sm:h-7 text-purple-400" />,
    description: "Master photographers, cinematographers & creative editors."
  }
];

export const AnimatedStatsSection: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);
  const numberRefs = useRef<(HTMLSpanElement | null)[]>([]);
  const glowRefs = useRef<(HTMLDivElement | null)[]>([]);
  const hasAnimated = useRef(false);

  useEffect(() => {
    if (!sectionRef.current) return;

    // 1. Set Initial State: cards hidden and positioned 40px down, scale 0.96
    cardsRef.current.forEach((card) => {
      if (card) {
        gsap.set(card, { opacity: 0, y: 40, scale: 0.96 });
      }
    });

    // Initialize glow elements to zero opacity
    glowRefs.current.forEach((glow) => {
      if (glow) {
        gsap.set(glow, { opacity: 0, scale: 0.8 });
      }
    });

    // 2. Define the foolproof animation start trigger function
    const triggerCounters = () => {
      if (hasAnimated.current) return;
      hasAnimated.current = true;

      statItems.forEach((item, index) => {
        const card = cardsRef.current[index];
        const numSpan = numberRefs.current[index];
        const glowEl = glowRefs.current[index];
        const staggerDelay = index * 0.13; // 130ms stagger between counters

        // Entrance Card Animation (800ms, power4.out)
        if (card) {
          gsap.to(card, {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.8,
            delay: staggerDelay,
            ease: 'power4.out',
          });
        }

        // Counter Animation (2.2s, power3.out)
        if (numSpan) {
          const counterObj = { val: 0 };
          gsap.to(counterObj, {
            val: item.targetValue,
            duration: 2.2,
            delay: staggerDelay,
            ease: 'power3.out',
            onUpdate: () => {
              if (numSpan) {
                const currentVal = Math.floor(counterObj.val);
                numSpan.textContent = `${currentVal}${item.suffix}`;
              }
            },
            onComplete: () => {
              if (numSpan) {
                numSpan.textContent = `${item.targetValue}${item.suffix}`;
              }

              // Soft Glow Highlight behind the number upon completion (300ms duration, then fade)
              if (glowEl) {
                gsap.fromTo(
                  glowEl,
                  { opacity: 0, scale: 0.85 },
                  {
                    opacity: 0.75,
                    scale: 1.15,
                    duration: 0.3,
                    ease: 'power2.out',
                    onComplete: () => {
                      gsap.to(glowEl, {
                        opacity: 0,
                        scale: 1.3,
                        duration: 0.6,
                        ease: 'power2.inOut',
                      });
                    },
                  }
                );
              }
            },
          });

          // Number Emphasis: Subtle scale pulse (1 -> 1.05 -> 1) near the climax of counting
          gsap.fromTo(
            numSpan,
            { scale: 1 },
            {
              scale: 1.05,
              duration: 0.3,
              delay: staggerDelay + 1.8,
              yoyo: true,
              repeat: 1,
              ease: 'power2.out',
            }
          );
        }
      });
    };

    // 3. Dual-Mechanism Triggering (IntersectionObserver + ScrollTrigger)
    // Using both guarantees reliable triggering when ~35%-65% enters view across any browser or scroll mechanism
    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        if (entry.isIntersecting && !hasAnimated.current) {
          triggerCounters();
          observer.disconnect();
        }
      },
      {
        root: null,
        threshold: 0.35, // Trigger when at least 35% of section is visible
      }
    );

    observer.observe(sectionRef.current);

    const st = ScrollTrigger.create({
      trigger: sectionRef.current,
      start: 'top 85%',
      once: true,
      onEnter: () => triggerCounters(),
    });

    return () => {
      observer.disconnect();
      st.kill();
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative w-full py-24 sm:py-32 bg-gradient-to-b from-[#0B0D13] via-[#10141D] to-[#0B0D13] text-white overflow-hidden z-20 border-y border-white/[0.06]"
    >
      {/* Subtle Ambient Luxury Highlights */}
      <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-[500px] h-[500px] bg-blue-600/10 rounded-full blur-[160px] pointer-events-none" />
      <div className="absolute top-1/2 right-1/4 -translate-y-1/2 w-[500px] h-[500px] bg-amber-500/10 rounded-full blur-[160px] pointer-events-none" />

      <div className="container mx-auto px-4 sm:px-6 lg:px-12 max-w-[1440px] relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16 sm:mb-20">
          <span className="text-amber-400/90 font-serif font-bold tracking-[0.28em] text-xs uppercase mb-3 block">
            Excellence By The Numbers
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif font-bold tracking-tight text-white mb-4 leading-tight">
            Our Legacy of Visual Storytelling
          </h2>
          <p className="text-sm sm:text-base text-gray-400 font-light leading-relaxed">
            Every statistic represents real emotions, joyous families, and uncompromising cinematic standards.
          </p>
        </div>

        {/* 4-Column Responsive Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
          {statItems.map((stat, index) => (
            <div
              key={stat.id}
              ref={(el) => (cardsRef.current[index] = el)}
              className="relative group rounded-3xl bg-white/[0.03] hover:bg-white/[0.06] backdrop-blur-xl border border-white/[0.08] hover:border-white/20 p-8 sm:p-9 pt-24 sm:pt-28 transition-colors duration-500 flex flex-col justify-between overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.4)]"
            >
              {/* Exact Positioning System: Completely Inside (24px top/left) */}
              <div className="absolute top-6 left-6 w-16 h-16 rounded-2xl bg-white/[0.05] border border-white/10 group-hover:scale-110 group-hover:rotate-6 transition-transform duration-500 flex items-center justify-center">
                {stat.icon}
              </div>
              
              <div className="absolute top-8 right-8">
                <span className="font-serif text-[11px] font-semibold tracking-[0.22em] text-gray-500 uppercase">
                  0{stat.id}
                </span>
              </div>

              {/* Number & Glow Climax Container */}
              <div className="relative mb-4 flex items-center">
                {/* Soft Behind-Number Climax Glow */}
                <div
                  ref={(el) => (glowRefs.current[index] = el)}
                  className="absolute left-0 top-1/2 -translate-y-1/2 w-36 h-20 bg-gradient-to-r from-amber-400/40 via-blue-500/40 to-transparent rounded-full blur-2xl pointer-events-none"
                />

                {/* Animated Number Counter (`tabular-nums` prevents width shifts) */}
                <span
                  ref={(el) => (numberRefs.current[index] = el)}
                  className="relative z-10 text-5xl sm:text-6xl font-serif font-bold text-white tracking-tight tabular-nums inline-block font-bodoni"
                >
                  0{stat.suffix}
                </span>
              </div>

              {/* Label & Description */}
              <div>
                <h3 className="text-base sm:text-lg font-bold font-serif text-gray-100 tracking-wide mb-2 uppercase">
                  {stat.label}
                </h3>
                <p className="text-xs sm:text-sm text-gray-400 font-light leading-relaxed">
                  {stat.description}
                </p>
              </div>

              {/* Subtle Bottom Accent Line */}
              <div className="w-12 h-0.5 bg-gradient-to-r from-white/30 to-transparent rounded-full mt-6 group-hover:w-24 group-hover:from-amber-400 transition-all duration-500" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
