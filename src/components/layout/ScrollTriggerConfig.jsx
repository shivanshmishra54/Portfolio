'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useLenis } from 'lenis/react';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

/**
 * ScrollTriggerConfig
 * Seamlessly connects ReactLenis virtual scroll updates with GSAP ScrollTrigger.
 * Guarantees zero lag, prevents snap jumps on pinned sections, and recalibrates
 * trigger offsets upon route changes and responsive resizes.
 */
export function ScrollTriggerConfig() {
  const pathname = usePathname();

  // Synchronize Lenis scroll with ScrollTrigger
  useLenis(() => {
    ScrollTrigger.update();
  });

  useEffect(() => {
    // Disable lagSmoothing so GSAP and Lenis tick in exact unison
    gsap.ticker.lagSmoothing(0);

    // Refresh ScrollTrigger upon route change after DOM settlement
    const timer = setTimeout(() => {
      ScrollTrigger.refresh();
    }, 150);

    const handleResize = () => {
      ScrollTrigger.refresh();
    };

    window.addEventListener('resize', handleResize);
    window.addEventListener('load', handleResize);

    return () => {
      clearTimeout(timer);
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('load', handleResize);
    };
  }, [pathname]);

  return null;
}
