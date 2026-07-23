import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import {
  Camera,
  Image as ImageIcon,
  Aperture,
  Heart,
  Users,
  Sparkles,
  Smile
} from 'lucide-react';
import { StandaloneArrowCTA } from '@/components/ui/standalone-arrow-cta';
import { SmartCardImage } from '@/components/ui/smart-card-image';


gsap.registerPlugin(ScrollTrigger);

interface ServiceCardData {
  id: number;
  title: string;
  description: string;
  image: string;
  link: string;
  icon: React.ReactNode;
}

const servicesData: ServiceCardData[] = [
  {
    id: 1,
    title: "Hindu Wedding Photography",
    description: "Capturing sacred traditions with timeless elegance.",
    image: "/hindu/14.jpg",
    link: "/weddings/hindu",
    icon: <Camera className="w-5 h-5 sm:w-6 sm:h-6 text-zg-blue" />
  },
  {
    id: 2,
    title: "Christian Wedding Photography",
    description: "Documenting vows, faith, and unforgettable celebrations.",
    image: "/Christian/4Z5A8729.JPG",
    link: "/weddings/christian",
    icon: <Heart className="w-5 h-5 sm:w-6 sm:h-6 text-zg-blue" />
  },
  {
    id: 3,
    title: "Engagement Photography",
    description: "Where every love story begins.",
    image: "/engagement/2.jpg",
    link: "/weddings/engagement",
    icon: <Sparkles className="w-5 h-5 sm:w-6 sm:h-6 text-zg-blue" />
  },
  {
    id: 4,
    title: "Pre Wedding Photography",
    description: "Cinematic moments before the big day.",
    image: "/prewed/01.jpg",
    link: "/outdoor/pre-wedding",
    icon: <ImageIcon className="w-5 h-5 sm:w-6 sm:h-6 text-zg-blue" />
  },
  {
    id: 5,
    title: "Post Wedding Photography",
    description: "Beautiful memories beyond the wedding.",
    image: "/postwed/p4.JPG",
    link: "/outdoor/post-wedding",
    icon: <Aperture className="w-5 h-5 sm:w-6 sm:h-6 text-zg-blue" />
  },
  {
    id: 6,
    title: "Maternity Photography",
    description: "Celebrating the beauty of new beginnings.",
    image: "/Maternity/heroimg.jpg",
    link: "/weddings/maternity",
    icon: <Users className="w-5 h-5 sm:w-6 sm:h-6 text-zg-blue" />
  },
  {
    id: 7,
    title: "Baby Photography",
    description: "Preserving the sweetest moments forever.",
    image: "/Baby/101.jpg",
    link: "/weddings/baby",
    icon: <Smile className="w-5 h-5 sm:w-6 sm:h-6 text-zg-blue" />
  }
];

export const StickyServicesScroll: React.FC = () => {
  const navigate = useNavigate();
  const containerRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [activeChapter, setActiveChapter] = useState(0);

  useEffect(() => {
    const mm = gsap.matchMedia();

    mm.add(
      {
        isMobile: "(max-width: 767px)",
        isDesktop: "(min-width: 768px)",
      },
      (context) => {
        const { isMobile } = context.conditions as { isMobile: boolean };
        if (!containerRef.current || cardRefs.current.length === 0) return;

        const totalCards = servicesData.length;
        const cardScrollDistance = isMobile ? 250 : 700;
        const scrollDistance = (totalCards - 1) * cardScrollDistance;

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: containerRef.current,
            pin: true,
            start: 'top top',
            end: `+=${scrollDistance}px`,
            scrub: 0.6,
            snap: {
              snapTo: 1 / (totalCards - 1),
              duration: { min: 0.2, max: 0.4 },
              ease: 'power1.inOut',
              inertia: false,
            },
            invalidateOnRefresh: true,
            fastScrollEnd: true,
            preventOverlaps: true,
            onUpdate: (self) => {
              const currentIdx = Math.min(
                totalCards - 1,
                Math.floor(self.progress * totalCards)
              );
              setActiveChapter(currentIdx);
            },
          },
        });

        cardRefs.current.forEach((card, index) => {
          if (!card) return;
          // Force GPU compositing layer on all cards to prevent sub-pixel jitter
          gsap.set(card, {
            force3D: true,
            backfaceVisibility: 'hidden',
          });
          if (index === 0) {
            gsap.set(card, { y: '0%', scale: 1, opacity: 1, zIndex: 10 });
          } else {
            gsap.set(card, { y: '100%', scale: 1, opacity: 1, zIndex: index + 10 });
          }
        });

        for (let i = 1; i < totalCards; i++) {
          const prevCard = cardRefs.current[i - 1];
          const currentCard = cardRefs.current[i];
          if (!prevCard || !currentCard) continue;

          const stepLabel = `step_${i}`;
          tl.addLabel(stepLabel);

          tl.fromTo(
            currentCard,
            {
              y: '100%',
              scale: 1,
            },
            {
              y: '0%',
              scale: 1,
              duration: 1,
              ease: 'none',
              force3D: true,
            },
            stepLabel
          );

          tl.to(
            prevCard,
            {
              scale: 0.94,
              y: '-4%',
              opacity: 0,
              duration: 1,
              ease: 'none',
              force3D: true,
            },
            stepLabel
          );
        }
      }
    );

    return () => mm.revert();
  }, []);

  return (
    <section
      id="services"
      ref={containerRef}
      className="relative w-full h-screen bg-gradient-to-b from-gray-50 via-[#FAF9F6] to-gray-50 overflow-hidden pt-20 sm:pt-24 pb-6 sm:pb-10 flex flex-col justify-center"
    >
      {/* Subtle Warm Luxury Background Accents */}
      <div className="absolute top-[15%] left-10 w-[450px] h-[450px] bg-amber-100/35 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-[10%] right-10 w-[500px] h-[500px] bg-blue-100/35 rounded-full blur-[140px] pointer-events-none" />

      {/* Main Split-Screen Container */}
      <div className="container mx-auto px-4 sm:px-8 lg:px-12 xl:px-16 max-w-[1500px] w-full h-full flex flex-col lg:flex-row items-center justify-center lg:justify-between gap-2 md:gap-8 lg:gap-14 relative z-20">
        
        {/* LEFT COLUMN: Section Title, Story Paragraph & Chapter Progress */}
        <div className="w-full lg:w-[38%] xl:w-[36%] flex flex-col justify-center text-center lg:text-left shrink-0 z-30 py-1 lg:py-6">
          <div className="inline-block self-center lg:self-start">
            <span className="text-zg-blue font-serif font-bold tracking-[0.28em] text-[10px] md:text-sm uppercase mb-1 sm:mb-3 block">
              What We Do
            </span>
          </div>

          <h2 className="text-2xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-[4rem] font-serif font-bold text-gray-950 tracking-tight leading-[1.08] mb-1 sm:mb-5">
            Expertise In Every Frame
          </h2>

          <p className="hidden sm:block text-sm sm:text-base text-gray-600 font-light leading-relaxed mb-6 sm:mb-8 max-w-xl mx-auto lg:mx-0">
            Each service is its own chapter. Turn the scroll wheel to slide through our signature editorial experiences, crafted with cinematic luxury and timeless devotion.
          </p>

          {/* Dynamic Active Chapter Progress Bar */}
          <div className="hidden sm:flex flex-col gap-2.5 max-w-xs mx-auto lg:mx-0 pt-4 border-t border-gray-200/80">
            <div className="flex items-center justify-between font-serif text-xs font-semibold tracking-[0.25em] uppercase text-gray-500">
              <span>Chapter 0{activeChapter + 1}</span>
              <span className="text-zg-blue font-bold">0{servicesData.length}</span>
            </div>
            <div className="w-full h-1.5 bg-gray-200/80 rounded-full overflow-hidden p-0.5">
              <div
                className="h-full bg-zg-blue rounded-full transition-all duration-300 ease-out"
                style={{
                  width: `${((activeChapter + 1) / servicesData.length) * 100}%`,
                }}
              />
            </div>
            <span className="text-xs font-serif text-gray-400 italic mt-0.5">
              Viewing: <strong className="text-gray-700 not-italic">{servicesData[activeChapter]?.title}</strong>
            </span>
          </div>
        </div>

        {/* RIGHT COLUMN: Breathable, Crisp Sticky Card Stack with Adaptive Smart Image Presentation */}
        <div className="w-full lg:w-[58%] xl:w-[56%] h-[55vh] sm:h-[68vh] lg:h-[70vh] min-h-[380px] sm:min-h-[430px] relative flex items-center justify-center overflow-visible lg:pr-6 xl:pr-10">
          {servicesData.map((service, index) => (
            <div
              key={service.id}
              ref={(el) => (cardRefs.current[index] = el)}
              onClick={() => navigate(service.link)}
              className="absolute inset-0 m-auto w-full max-w-[680px] h-full max-h-[620px] sm:max-h-[620px] bg-white rounded-[24px] sm:rounded-[32px] lg:rounded-[36px] p-4 sm:p-8 lg:p-10 border border-gray-100 shadow-[0_12px_40px_-8px_rgba(0,0,0,0.06),_0_1px_3px_rgba(0,0,0,0.03)] hover:shadow-[0_24px_60px_-10px_rgba(0,0,0,0.14)] transition-shadow duration-500 cursor-pointer group flex flex-col sm:flex-row justify-between gap-3 sm:gap-8 overflow-hidden"
            >
              {/* Left Side Inside Card (48% on Desktop): Icon, Chapter Pill, Title, Description */}
              <div className="w-full sm:w-[48%] flex flex-col justify-between z-10 sm:h-full shrink-0">
                <div>
                  {/* Card Header: Icon + Chapter Pill */}
                  <div className="flex items-center justify-between mb-2 sm:mb-6">
                    <div className="p-2 sm:p-3.5 bg-zg-blue/10 rounded-xl sm:rounded-2xl border border-zg-blue/20 shadow-sm group-hover:scale-110 group-hover:rotate-6 transition-transform duration-500">
                      {service.icon}
                    </div>
                    <span className="font-serif text-[10px] sm:text-xs font-semibold tracking-[0.2em] text-gray-400 uppercase bg-gray-100/80 px-2.5 py-0.5 sm:px-3 sm:py-1 rounded-full border border-gray-200/60">
                      0{index + 1} / 0{servicesData.length}
                    </span>
                  </div>

                  {/* Service Title */}
                  <h3 className="text-lg sm:text-3xl lg:text-[2.2rem] font-serif font-bold text-gray-950 leading-[1.14] mb-1 sm:mb-3 group-hover:text-zg-blue transition-colors duration-300">
                    {service.title}
                  </h3>

                  {/* Description */}
                  <p className="text-[11px] sm:text-sm text-gray-600 font-normal leading-relaxed line-clamp-2 sm:line-clamp-4">
                    {service.description}
                  </p>
                </div>

                {/* Bottom CTA Indicator */}
                <div className="hidden sm:flex items-center gap-3 text-xs font-bold tracking-[0.18em] text-gray-400 uppercase group-hover:text-zg-blue transition-colors duration-300 pt-3 border-t border-gray-100 mt-2">
                  <span>Explore Gallery</span>
                  <div className="w-8 h-[1.5px] bg-gray-300 group-hover:w-16 group-hover:bg-zg-blue transition-all duration-500" />
                </div>
              </div>

              {/* Right Side Inside Card (52% on Desktop): Smart Adaptive Photography Presentation */}
              <SmartCardImage
                src={service.image}
                alt={service.title}
                link={service.link}
              />
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
