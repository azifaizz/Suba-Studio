import { ReactNode, useEffect } from "react";
import Lenis from "lenis";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import { useLocation } from "react-router-dom";

export default function SmoothScroll({ children }: { children: ReactNode }) {
  const { pathname } = useLocation();

  useEffect(() => {
    // Prevent initializing multiple instances on hot reload
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // easeOutQuart
      orientation: "vertical",
      gestureOrientation: "vertical",
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 2,
    });

    lenis.on("scroll", ScrollTrigger.update);

    // Provide lenis instance to global context if needed by other components
    window.lenis = lenis;

    gsap.ticker.add((time) => {
      lenis.raf(time * 1000);
    });

    gsap.ticker.lagSmoothing(0);

    return () => {
      gsap.ticker.remove((time) => {
        lenis.raf(time * 1000);
      });
      lenis.destroy();
      delete window.lenis;
    };
  }, []);

  // Global Scroll-to-Top on Route Change
  useEffect(() => {
    // Instantly scroll to the very top pixel
    window.scrollTo(0, 0);
    
    // If Lenis is active, force it to the top immediately without animation
    if (window.lenis) {
      window.lenis.scrollTo(0, { immediate: true });
    }
    
    // Refresh ScrollTrigger calculations after a tiny delay to ensure the new DOM is painted
    const timeoutId = setTimeout(() => {
      ScrollTrigger.refresh();
    }, 50);

    return () => clearTimeout(timeoutId);
  }, [pathname]);

  return <>{children}</>;
}

// Add global type for typescript
declare global {
  interface Window {
    lenis: Lenis;
  }
}
