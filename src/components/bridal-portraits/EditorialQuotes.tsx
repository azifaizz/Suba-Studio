import React, { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface Props {
  quote: string;
}

const EditorialQuotes: React.FC<Props> = ({ quote }) => {
  const containerRef = useRef<HTMLElement>(null);
  const textRef = useRef<HTMLHeadingElement>(null);

  useGSAP(() => {
    // Split text effect for the quote
    const words = quote.split(' ');
    if (textRef.current) {
      textRef.current.innerHTML = '';
      words.forEach((word) => {
        const span = document.createElement('span');
        span.className = 'inline-block overflow-hidden mr-4 mb-2';
        const innerSpan = document.createElement('span');
        innerSpan.className = 'quote-word inline-block';
        innerSpan.innerText = word;
        span.appendChild(innerSpan);
        textRef.current?.appendChild(span);
      });
    }

    gsap.from('.quote-word', {
      y: '120%',
      opacity: 0,
      rotation: 5,
      duration: 1.2,
      stagger: 0.05,
      ease: 'power4.out',
      scrollTrigger: {
        trigger: containerRef.current,
        start: 'top 75%',
      }
    });

    // Background blur reveal
    gsap.fromTo('.quote-bg-blur', 
      { opacity: 0, scale: 0.8 },
      { 
        opacity: 1, 
        scale: 1, 
        duration: 2, 
        ease: 'power2.out',
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top 80%',
          scrub: true,
        }
      }
    );

  }, { scope: containerRef });

  return (
    <section ref={containerRef} className="relative w-full py-32 md:py-48 flex items-center justify-center overflow-hidden bg-white">
      {/* Very soft blurred background gold highlight */}
      <div className="quote-bg-blur absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[60vw] h-[60vw] md:w-[40vw] md:h-[40vw] bg-[#D4AF37]/10 rounded-full blur-[100px] pointer-events-none" />
      
      <div className="relative z-10 max-w-5xl mx-auto px-6 text-center">
        <h3 ref={textRef} className="font-serif text-3xl md:text-5xl lg:text-7xl leading-tight text-[#1B1B1B] italic font-light">
          {/* Populated by GSAP */}
          {quote}
        </h3>
      </div>
    </section>
  );
};

export default EditorialQuotes;
