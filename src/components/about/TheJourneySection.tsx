import React, { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const chapters = [
  {
    num: "01",
    title: "Engineer",
    desc: "A structural mind discovering the geometry of light and shadow.",
    img: "https://images.unsplash.com/photo-1542038784456-1ea8e935640e?q=80&w=2070&auto=format&fit=crop"
  },
  {
    num: "02",
    title: "Photography Found Him",
    desc: "Before a flight to pursue a Masters, destiny clicked the shutter.",
    img: "https://images.unsplash.com/photo-1516738901171-8eb4fc13bd20?q=80&w=2070&auto=format&fit=crop"
  },
  {
    num: "03",
    title: "Freelancing",
    desc: "From a passionate hobby to capturing the raw emotions of real people.",
    img: "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?q=80&w=2069&auto=format&fit=crop"
  },
  {
    num: "04",
    title: "Building Suba Studios",
    desc: "Establishing a sanctuary for visual storytelling and cinematic elegance.",
    img: "https://images.unsplash.com/photo-1606800052052-a08af7148866?q=80&w=2070&auto=format&fit=crop"
  },
  {
    num: "05",
    title: "Leading India's Wedding Stories",
    desc: "Setting the benchmark for luxury wedding photography across the nation.",
    img: "https://images.unsplash.com/photo-1519225421980-715cb0215aed?q=80&w=2070&auto=format&fit=crop"
  }
];

const TheJourneySection = () => {
  const containerRef = useRef<HTMLElement>(null);
  const leftColRef = useRef<HTMLDivElement>(null);
  const rightColRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const mm = gsap.matchMedia();

    mm.add("(min-width: 768px)", () => {
      // Desktop: Pin the left column (text) while the right column (images) scrolls
      ScrollTrigger.create({
        trigger: containerRef.current,
        start: 'top top',
        end: 'bottom bottom',
        pin: leftColRef.current,
      });

      const sections = gsap.utils.toArray('.chapter-content') as HTMLElement[];
      const images = gsap.utils.toArray('.chapter-image') as HTMLElement[];
      const timelineProgress = document.querySelector('.timeline-progress') as HTMLElement;

      // Timeline progress bar
      gsap.to(timelineProgress, {
        height: '100%',
        ease: 'none',
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top top',
          end: 'bottom bottom',
          scrub: true,
        }
      });

      sections.forEach((section, index) => {
        // Set initial state for all sections (hidden and slightly down)
        gsap.set(section, { opacity: 0, y: 50 });

        // Fade in/out text content based on section scroll
        gsap.to(section, {
          opacity: 1,
          y: 0,
          scrollTrigger: {
            trigger: images[index], // Sync with corresponding image on the right
            start: 'top 60%',
            end: 'bottom 40%',
            toggleActions: 'play reverse play reverse',
          }
        });
      });
    });
    
    mm.add("(max-width: 767px)", () => {
      // Mobile: Simple fade in for each section as it scrolls into view
      const mobileChapters = gsap.utils.toArray('.mobile-chapter') as HTMLElement[];
      
      mobileChapters.forEach((chapter) => {
        gsap.fromTo(chapter, 
          { opacity: 0, y: 30 },
          { 
            opacity: 1, 
            y: 0, 
            duration: 0.8,
            scrollTrigger: {
              trigger: chapter,
              start: 'top 80%',
            }
          }
        );
      });
    });

    return () => mm.revert();
  }, { scope: containerRef });

  return (
    <section ref={containerRef} className="relative bg-[#111111] text-white">
      {/* Desktop Layout */}
      <div className="hidden md:flex max-w-7xl mx-auto px-6 lg:px-12 flex-col md:flex-row relative">
        
        {/* Left: Text Content (Pinned) */}
        <div ref={leftColRef} className="w-full md:w-1/2 h-screen flex flex-col justify-center relative">
          
          <div className="absolute left-0 top-1/4 bottom-1/4 w-[1px] bg-white/20">
            <div className="timeline-progress w-full bg-[#D4AF37] h-0"></div>
          </div>
          
          <div className="pl-12 lg:pl-20 relative">
            <h2 className="text-sm tracking-widest uppercase text-white/50 mb-12 font-sans">The Journey</h2>
            
            <div className="relative h-[200px]">
              {chapters.map((chapter, i) => (
                <div key={i} className="chapter-content absolute top-0 left-0 w-full">
                  <span className="text-[#D4AF37] text-lg font-sans mb-4 block">Chapter {chapter.num}</span>
                  <h3 className="text-4xl md:text-5xl font-serif mb-6">{chapter.title}</h3>
                  <p className="text-white/70 font-sans font-light text-lg max-w-md leading-relaxed">
                    {chapter.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>

        </div>

        {/* Right: Images (Scrollable) */}
        <div ref={rightColRef} className="w-full md:w-1/2">
          <div className="py-[50vh] flex flex-col gap-[50vh]">
            {chapters.map((chapter, i) => (
              <div key={i} className="chapter-image w-full h-[60vh] md:h-[70vh] relative overflow-hidden rounded-sm group">
                <img 
                  src={chapter.img} 
                  alt={chapter.title} 
                  className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-black/20"></div>
              </div>
            ))}
          </div>
        </div>

      </div>

      {/* Mobile Layout */}
      <div className="md:hidden w-full px-6 py-20 flex flex-col gap-16">
        <div className="text-center mb-4">
          <h2 className="text-sm tracking-widest uppercase text-white/50 font-sans">The Journey</h2>
        </div>
        
        {chapters.map((chapter, i) => (
          <div key={i} className="mobile-chapter flex flex-col gap-6">
            <div className="w-full h-[50vh] relative overflow-hidden rounded-sm">
              <img 
                src={chapter.img} 
                alt={chapter.title} 
                className="w-full h-full object-cover"
              />
            </div>
            <div>
              <span className="text-[#D4AF37] text-sm font-sans mb-2 block">Chapter {chapter.num}</span>
              <h3 className="text-3xl font-serif mb-3">{chapter.title}</h3>
              <p className="text-white/70 font-sans font-light text-base leading-relaxed">
                {chapter.desc}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default TheJourneySection;
