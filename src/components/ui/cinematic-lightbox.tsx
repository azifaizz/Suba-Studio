import React, { useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';
import { HinduWeddingImage } from '@/data/hindu-wedding-images';

interface CinematicLightboxProps {
  images: HinduWeddingImage[];
  currentIndex: number | null;
  onClose: () => void;
  onNavigate: (index: number) => void;
}

export const CinematicLightbox: React.FC<CinematicLightboxProps> = ({
  images,
  currentIndex,
  onClose,
  onNavigate,
}) => {
  const isOpen = currentIndex !== null;
  const currentImage = isOpen ? images[currentIndex] : null;

  const handlePrevious = useCallback(() => {
    if (currentIndex === null) return;
    onNavigate(currentIndex === 0 ? images.length - 1 : currentIndex - 1);
  }, [currentIndex, images.length, onNavigate]);

  const handleNext = useCallback(() => {
    if (currentIndex === null) return;
    onNavigate(currentIndex === images.length - 1 ? 0 : currentIndex + 1);
  }, [currentIndex, images.length, onNavigate]);

  // Keyboard Navigation
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowLeft') handlePrevious();
      if (e.key === 'ArrowRight') handleNext();
    };

    window.addEventListener('keydown', handleKeyDown);
    // Lock body scroll
    document.body.style.overflow = 'hidden';

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [isOpen, onClose, handlePrevious, handleNext]);

  return (
    <AnimatePresence>
      {isOpen && currentImage && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/95 backdrop-blur-xl"
        >
          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-6 right-6 md:top-10 md:right-10 z-50 text-white/50 hover:text-white transition-colors p-2"
          >
            <X size={32} strokeWidth={1} />
          </button>

          {/* Navigation Controls */}
          <button
            onClick={(e) => { e.stopPropagation(); handlePrevious(); }}
            className="absolute left-4 md:left-10 top-1/2 -translate-y-1/2 z-50 text-white/50 hover:text-white transition-colors p-4 hidden md:block"
          >
            <ChevronLeft size={48} strokeWidth={1} />
          </button>
          
          <button
            onClick={(e) => { e.stopPropagation(); handleNext(); }}
            className="absolute right-4 md:right-10 top-1/2 -translate-y-1/2 z-50 text-white/50 hover:text-white transition-colors p-4 hidden md:block"
          >
            <ChevronRight size={48} strokeWidth={1} />
          </button>

          {/* Counter */}
          <div className="absolute bottom-6 md:bottom-10 left-1/2 -translate-x-1/2 z-50 text-white/50 font-poppins text-sm tracking-[0.2em]">
            {String(currentIndex + 1).padStart(2, '0')} / {String(images.length).padStart(2, '0')}
          </div>

          {/* Image Container with Swipe Support */}
          <motion.div
            key={currentIndex}
            initial={{ opacity: 0, scale: 0.95, filter: 'blur(10px)' }}
            animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
            exit={{ opacity: 0, scale: 1.05, filter: 'blur(10px)' }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            drag="x"
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={0.7}
            onDragEnd={(e, { offset, velocity }) => {
              const swipe = offset.x;
              if (swipe < -50 || velocity.x < -500) {
                handleNext();
              } else if (swipe > 50 || velocity.x > 500) {
                handlePrevious();
              }
            }}
            className="relative w-full h-full flex items-center justify-center p-4 md:p-16 cursor-grab active:cursor-grabbing"
            onClick={onClose}
          >
            <img
              src={currentImage.src}
              alt="Hindu Wedding"
              className="max-w-full max-h-full object-contain pointer-events-none shadow-[0_0_100px_rgba(255,255,255,0.05)]"
              onClick={(e) => e.stopPropagation()} // Prevent closing when clicking the image itself
            />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
