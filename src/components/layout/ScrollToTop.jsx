'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { useLenis } from 'lenis/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

/**
 * ScrollToTop component
 * Automatically scrolls the window to the top (scrollY: 0) on every route navigation,
 * coordinating both Lenis virtual scroll and GSAP ScrollTrigger offset recalculation.
 */
export function ScrollToTop() {
  const pathname = usePathname();
  const lenis = useLenis();

  useEffect(() => {
    if (typeof window !== 'undefined') {
      if (lenis) {
        lenis.scrollTo(0, { immediate: true });
      } else {
        window.scrollTo({
          top: 0,
          left: 0,
          behavior: 'instant',
        });
      }

      setTimeout(() => {
        if (typeof ScrollTrigger !== 'undefined') {
          ScrollTrigger.refresh();
        }
      }, 60);
    }
  }, [pathname, lenis]);

  return null;
}
