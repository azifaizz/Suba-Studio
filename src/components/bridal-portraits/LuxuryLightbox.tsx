import React, { useState, useEffect, useRef } from 'react';
import gsap from 'gsap';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';

interface Props {
  images: string[];
}

const LuxuryLightbox: React.FC<Props> = ({ images }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const overlayRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);

  // Expose a global method to open lightbox from anywhere
  useEffect(() => {
    const handleOpenLightbox = (e: CustomEvent) => {
      const src = e.detail;
      const index = images.indexOf(src);
      if (index !== -1) {
        setCurrentIndex(index);
        setIsOpen(true);
      }
    };
    window.addEventListener('open-lightbox', handleOpenLightbox as EventListener);
    return () => window.removeEventListener('open-lightbox', handleOpenLightbox as EventListener);
  }, [images]);

  // Handle keyboard navigation
  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') closeLightbox();
      if (e.key === 'ArrowRight') nextImage();
      if (e.key === 'ArrowLeft') prevImage();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpen]);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      gsap.fromTo(overlayRef.current, 
        { autoAlpha: 0, backdropFilter: 'blur(0px)' },
        { autoAlpha: 1, backdropFilter: 'blur(20px)', duration: 0.6, ease: 'power2.out' }
      );
      gsap.fromTo(imageRef.current,
        { scale: 0.8, opacity: 0 },
        { scale: 1, opacity: 1, duration: 0.8, ease: 'back.out(1.2)', delay: 0.1 }
      );
    } else {
      document.body.style.overflow = 'auto';
    }
  }, [isOpen]);

  const closeLightbox = () => {
    gsap.to(overlayRef.current, {
      autoAlpha: 0,
      backdropFilter: 'blur(0px)',
      duration: 0.4,
      ease: 'power2.in',
      onComplete: () => setIsOpen(false)
    });
  };

  const nextImage = () => {
    gsap.to(imageRef.current, {
      x: -50, opacity: 0, duration: 0.3, onComplete: () => {
        setCurrentIndex((prev) => (prev + 1) % images.length);
        gsap.fromTo(imageRef.current, { x: 50, opacity: 0 }, { x: 0, opacity: 1, duration: 0.4, ease: 'power2.out' });
      }
    });
  };

  const prevImage = () => {
    gsap.to(imageRef.current, {
      x: 50, opacity: 0, duration: 0.3, onComplete: () => {
        setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
        gsap.fromTo(imageRef.current, { x: -50, opacity: 0 }, { x: 0, opacity: 1, duration: 0.4, ease: 'power2.out' });
      }
    });
  };

  if (!isOpen) return null;

  return (
    <div ref={overlayRef} className="fixed inset-0 z-[100] bg-black/90 flex items-center justify-center invisible">
      
      {/* Close button */}
      <button 
        onClick={closeLightbox}
        className="absolute top-8 right-8 text-white/50 hover:text-white transition-colors z-10"
      >
        <X size={40} strokeWidth={1} />
      </button>

      {/* Image Counter */}
      <div className="absolute bottom-8 right-8 text-white/50 font-sans tracking-widest text-sm z-10">
        {String(currentIndex + 1).padStart(2, '0')} / {String(images.length).padStart(2, '0')}
      </div>

      {/* Navigation */}
      <button onClick={prevImage} className="absolute left-8 text-white/30 hover:text-white transition-colors z-10">
        <ChevronLeft size={60} strokeWidth={1} />
      </button>
      
      <button onClick={nextImage} className="absolute right-8 text-white/30 hover:text-white transition-colors z-10">
        <ChevronRight size={60} strokeWidth={1} />
      </button>

      {/* Image Container */}
      <div className="w-[85vw] h-[85vh] flex items-center justify-center">
        <img 
          ref={imageRef}
          src={images[currentIndex]} 
          alt="Lightbox" 
          className="max-w-full max-h-full object-contain shadow-2xl"
        />
      </div>

    </div>
  );
};

export default LuxuryLightbox;
