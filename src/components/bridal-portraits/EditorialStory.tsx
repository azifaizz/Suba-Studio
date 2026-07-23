import React, { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import imageMetadata from '../../data/imageMetadata.json';

gsap.registerPlugin(ScrollTrigger);

interface AlbumImage {
  id: number;
  title: string;
  image: string;
}

interface Props {
  collageImages?: string[];
  albums: AlbumImage[];
}

const getAspectStyle = (src?: string) => {
  if (!src) return '4 / 5';
  const filename = src.split('/').pop();
  const key1 = src;
  const key2 = `/${filename}`;
  const key3 = `/Bridal/${filename}`;
  
  const meta = (imageMetadata as any)[key1] || (imageMetadata as any)[key2] || (imageMetadata as any)[key3];
  
  if (meta) {
    return `${meta.width} / ${meta.height}`;
  }
  return '4 / 5';
};

const EditorialStory: React.FC<Props> = ({ albums }) => {
  const containerRef = useRef<HTMLElement>(null);
  
  const categories = [
    {
      title: "The Dress",
      description: "A masterpiece of fabric and thread. Every fold tells a story of tradition, elegance, and timeless grace.",
      mainImage: albums[0]?.image || '', 
      detailImage: albums[1]?.image || '', 
    },
    {
      title: "The Jewellery",
      description: "Heirlooms of light. Intricate gold, radiant diamonds, and the subtle glimmer that completes the bridal aura.",
      mainImage: albums[2]?.image || '', 
      detailImage: albums[3]?.image || '', 
    },
    {
      title: "The Expressions",
      description: "A quiet breath, a joyful smile, a tender glance. The raw, beautiful emotions that make the moment truly yours.",
      mainImage: albums[4]?.image || '', 
      detailImage: albums[5]?.image || '', 
    }
  ];

  useGSAP(() => {
    const mm = gsap.matchMedia();

    mm.add("(min-width: 768px)", () => {
      const sections = gsap.utils.toArray('.showcase-section');
      const texts = gsap.utils.toArray('.showcase-text');
      const visuals = gsap.utils.toArray('.showcase-visual');

      // Create the main pinned scroll sequence
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: '.showcase-wrapper',
          start: 'top top',
          end: '+=300%', // 300vh of scrolling
          pin: true,
          scrub: 1,
        }
      });

      // We have 3 sections.
      // Initially, section 0 is visible.
      // We animate from 0 -> 1, then 1 -> 2.
      
      // Setup initial states for elements that are hidden
      gsap.set(texts.slice(1), { opacity: 0, y: 30 });
      gsap.set(visuals.slice(1), { opacity: 0, y: 100 });
      // Scale down images slightly for initial state
      visuals.forEach((visual: any, i: number) => {
          if (i > 0) {
              const imgs = visual.querySelectorAll('img');
              gsap.set(imgs, { scale: 0.95 });
          }
      });

      // Transition 0 -> 1 (The Dress -> The Jewellery)
      tl.to(texts[0], { opacity: 0, y: -30, duration: 1 }, 0)
        .to(visuals[0], { opacity: 0, y: -100, duration: 1 }, 0)
        .to(texts[1], { opacity: 1, y: 0, duration: 1 }, 0.5)
        .to(visuals[1], { opacity: 1, y: 0, duration: 1 }, 0.5)
        .to((visuals[1] as HTMLElement).querySelectorAll('img'), { scale: 1, duration: 1.5, ease: "power2.out" }, 0.5);

      // Pause briefly at section 1
      tl.addLabel("section1", "+=0.5");

      // Transition 1 -> 2 (The Jewellery -> The Expressions)
      tl.to(texts[1], { opacity: 0, y: -30, duration: 1 }, "section1")
        .to(visuals[1], { opacity: 0, y: -100, duration: 1 }, "section1")
        .to(texts[2], { opacity: 1, y: 0, duration: 1 }, "section1+=0.5")
        .to(visuals[2], { opacity: 1, y: 0, duration: 1 }, "section1+=0.5")
        .to((visuals[2] as HTMLElement).querySelectorAll('img'), { scale: 1, duration: 1.5, ease: "power2.out" }, "section1+=0.5");

      // Subtle parallax on the images themselves as they scroll within the pinned section
      // This happens independent of the crossfade timeline
      visuals.forEach((visual: any) => {
        const detailImg = visual.querySelector('.detail-img-container');
        if (detailImg) {
          gsap.to(detailImg, {
            y: -50,
            ease: 'none',
            scrollTrigger: {
              trigger: '.showcase-wrapper',
              start: 'top top',
              end: '+=300%',
              scrub: 1,
            }
          });
        }
      });
    });

    mm.add("(max-width: 767px)", () => {
      // On mobile, we won't pin the whole section to avoid scroll trapping issues.
      // Instead, we just fade them in naturally as the user scrolls down.
      const visuals = gsap.utils.toArray('.showcase-visual-mobile');
      
      visuals.forEach((visual: any) => {
        gsap.fromTo(visual, 
          { opacity: 0, y: 50 },
          {
            opacity: 1, 
            y: 0, 
            duration: 1.5,
            ease: "power3.out",
            scrollTrigger: {
              trigger: visual,
              start: "top 80%",
            }
          }
        );
      });
    });

    return () => mm.revert();
  }, { scope: containerRef });

  return (
    <section ref={containerRef} className="w-full bg-[#FAF9F7] relative">
      
      {/* --- DESKTOP: STICKY SHOWCASE --- */}
      <div className="showcase-wrapper hidden md:block w-full h-[100vh] overflow-hidden relative">
        <div className="max-w-[100rem] mx-auto px-12 h-full flex items-center pt-24">
          
          {/* Left Side: Typography */}
          <div className="w-[40%] h-full relative flex items-center">
            {categories.map((cat, i) => (
              <div key={i} className="showcase-text absolute w-full pr-16 flex flex-col justify-center">
                <h4 className="text-sm font-sans tracking-widest uppercase text-[#D4AF37] mb-6">Chapter {i + 1}</h4>
                <h2 className="text-5xl lg:text-7xl font-serif text-[#1B1B1B] leading-tight mb-8">
                  {cat.title}
                </h2>
                <p className="text-gray-600 font-sans font-light text-lg lg:text-xl leading-relaxed max-w-md">
                  {cat.description}
                </p>
              </div>
            ))}
          </div>

          {/* Right Side: Photography */}
          <div className="w-[60%] h-full relative flex items-center justify-center">
            {categories.map((cat, i) => (
              <div key={i} className="showcase-visual absolute w-full h-full flex items-center justify-center">
                
                {/* Main Large Photograph */}
                <div 
                  className="main-img-container w-[75%] lg:w-[65%] shadow-2xl relative z-10 overflow-hidden"
                  style={{ aspectRatio: getAspectStyle(cat.mainImage) }}
                >
                  <img src={cat.mainImage} alt={cat.title} className="w-full h-full object-cover" />
                </div>

                {/* Supporting Detail Photograph - Offset based on index for variety */}
                <div 
                  className={`detail-img-container absolute z-20 shadow-xl border-8 border-[#FAF9F7] overflow-hidden w-[40%] lg:w-[35%]
                    ${i === 0 ? 'bottom-8 left-4 lg:left-8' : ''}
                    ${i === 1 ? 'top-16 -right-12 lg:-right-16' : ''}
                    ${i === 2 ? 'bottom-16 right-8 lg:right-12' : ''}
                  `}
                  style={{ aspectRatio: getAspectStyle(cat.detailImage) }}
                >
                  <img src={cat.detailImage} alt={`${cat.title} Details`} className="w-full h-full object-cover" />
                </div>

              </div>
            ))}
          </div>

        </div>
      </div>

      {/* --- MOBILE: STACKED SHOWCASE --- */}
      <div className="md:hidden w-full px-6 py-24 space-y-32">
        {categories.map((cat, i) => (
          <div key={i} className="showcase-visual-mobile flex flex-col items-start w-full">
            <h4 className="text-xs font-sans tracking-widest uppercase text-[#D4AF37] mb-4">Chapter {i + 1}</h4>
            <h2 className="text-4xl font-serif text-[#1B1B1B] mb-6">{cat.title}</h2>
            <p className="text-gray-600 font-sans font-light text-base leading-relaxed mb-12">
              {cat.description}
            </p>
            
            <div className="w-full relative">
              <div 
                className="w-[90%] shadow-2xl overflow-hidden"
                style={{ aspectRatio: getAspectStyle(cat.mainImage) }}
              >
                <img src={cat.mainImage} alt={cat.title} className="w-full h-full object-cover" />
              </div>
              
              <div 
                className="absolute -bottom-8 -right-4 w-[60%] shadow-xl border-4 border-[#FAF9F7] overflow-hidden"
                style={{ aspectRatio: getAspectStyle(cat.detailImage) }}
              >
                <img src={cat.detailImage} alt={`${cat.title} Details`} className="w-full h-full object-cover" />
              </div>
            </div>
          </div>
        ))}
      </div>

    </section>
  );
};

export default EditorialStory;
