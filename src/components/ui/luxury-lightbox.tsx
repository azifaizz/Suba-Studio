import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';
import { AdaptiveImage } from './adaptive-image';

interface LuxuryLightboxProps {
  images: { id: string | number; image: string; title?: string }[];
  initialIndex: number;
  isOpen: boolean;
  onClose: () => void;
}

export const LuxuryLightbox: React.FC<LuxuryLightboxProps> = ({
  images,
  initialIndex,
  isOpen,
  onClose,
}) => {
  const [currentIndex, setCurrentIndex] = useState(initialIndex);
  const [direction, setDirection] = useState(0);

  useEffect(() => {
    setCurrentIndex(initialIndex);
  }, [initialIndex, isOpen]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isOpen) return;
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowRight') nextImage();
      if (e.key === 'ArrowLeft') prevImage();
    };

    window.addEventListener('keydown', handleKeyDown);
    if (isOpen) {
        document.body.style.overflow = 'hidden';
    } else {
        document.body.style.overflow = 'unset';
    }
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, currentIndex, images.length]);

  const nextImage = () => {
    setDirection(1);
    setCurrentIndex((prev) => (prev + 1) % images.length);
  };

  const prevImage = () => {
    setDirection(-1);
    setCurrentIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const variants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 1000 : -1000,
      opacity: 0,
      scale: 0.9,
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1,
      scale: 1,
    },
    exit: (direction: number) => ({
      zIndex: 0,
      x: direction < 0 ? 1000 : -1000,
      opacity: 0,
      scale: 0.9,
    }),
  };

  if (!isOpen) return null;

  const currentImage = images[currentIndex];

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/95 backdrop-blur-xl"
        >
          {/* Top Bar */}
          <div className="absolute top-0 left-0 right-0 p-6 flex justify-between items-center z-50">
            <div className="text-white/60 font-serif text-sm tracking-widest">
              {String(currentIndex + 1).padStart(2, '0')} / {String(images.length).padStart(2, '0')}
            </div>
            <button
              onClick={onClose}
              className="text-white hover:text-[#b38b2d] transition-colors p-2"
            >
              <X size={28} strokeWidth={1} />
            </button>
          </div>

          {/* Navigation Controls */}
          <button
            onClick={(e) => { e.stopPropagation(); prevImage(); }}
            className="absolute left-4 md:left-12 top-1/2 -translate-y-1/2 text-white/50 hover:text-white transition-colors z-50 p-4"
          >
            <ChevronLeft size={48} strokeWidth={1} />
          </button>

          <button
            onClick={(e) => { e.stopPropagation(); nextImage(); }}
            className="absolute right-4 md:right-12 top-1/2 -translate-y-1/2 text-white/50 hover:text-white transition-colors z-50 p-4"
          >
            <ChevronRight size={48} strokeWidth={1} />
          </button>

          {/* Image Container */}
          <div className="relative w-full h-full flex items-center justify-center p-4 md:p-24" onClick={onClose}>
            <AnimatePresence initial={false} custom={direction}>
              <motion.div
                key={currentIndex}
                custom={direction}
                variants={variants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{
                  x: { type: "spring", stiffness: 300, damping: 30 },
                  opacity: { duration: 0.4 },
                  scale: { duration: 0.4 }
                }}
                className="absolute inset-0 flex items-center justify-center p-8 md:p-24 pointer-events-none"
              >
                {currentImage.image.endsWith('.mp4') || currentImage.image.endsWith('.webm') ? (
                  <video 
                    src={currentImage.image} 
                    autoPlay 
                    loop 
                    muted 
                    playsInline 
                    className="max-w-full max-h-full object-contain shadow-2xl rounded-sm pointer-events-auto"
                    onClick={(e) => e.stopPropagation()}
                  />
                ) : (
                  <div className="w-full h-full relative" onClick={(e) => e.stopPropagation()}>
                    <AdaptiveImage
                      src={currentImage.image}
                      alt={currentImage.title || "Gallery image"}
                      className="w-full h-full"
                      imageClassName="w-full h-full object-contain pointer-events-auto rounded-sm shadow-2xl"
                    />
                  </div>
                )}
              </motion.div>
            </AnimatePresence>
          </div>
          
          {/* Bottom Title */}
          {currentImage.title && (
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              key={`title-${currentIndex}`}
              className="absolute bottom-12 left-0 right-0 text-center z-50"
            >
              <h3 className="text-white text-lg font-serif italic font-light tracking-wide">
                {currentImage.title}
              </h3>
            </motion.div>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
};
