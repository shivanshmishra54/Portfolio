import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

/**
 * TypographicMarquee: Powered by GSAP ScrollTrigger
 * Exactly mirrors Sarthak's GitHub portfolio horizontal scrub (#name-div)
 */
export function TypographicMarquee({ 
  text = "SHIVANSH MISHRA · SYSTEMS ARCHITECT · SPRING BOOT 3 · DISTRIBUTED SERVICES · REACT FULL STACK · OPEN SOURCE CONTRIBUTOR ·" 
}) {
  const containerRef = useRef(null);
  const trackRef = useRef(null);

  useEffect(() => {
    if (!containerRef.current || !trackRef.current) return;

    const ctx = gsap.context(() => {
      gsap.to(trackRef.current, {
        x: '-45%',
        ease: 'none',
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top bottom',
          end: 'bottom top',
          scrub: 0.8,
        }
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div 
      ref={containerRef}
      className="relative w-full overflow-hidden py-10 md:py-14 border-b border-neutral-200 dark:border-neutral-900 bg-neutral-100/60 dark:bg-[#050505] select-none"
    >
      <div 
        ref={trackRef} 
        className="gsap-marquee-track text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-light tracking-tight uppercase text-neutral-400/80 dark:text-neutral-700/80 editorial-serif flex whitespace-nowrap"
      >
        <span className="mx-6 hover:text-neutral-900 dark:hover:text-neutral-200 transition-colors duration-300">
          {text}
        </span>
        <span className="mx-6 hover:text-neutral-900 dark:hover:text-neutral-200 transition-colors duration-300">
          {text}
        </span>
        <span className="mx-6 hover:text-neutral-900 dark:hover:text-neutral-200 transition-colors duration-300">
          {text}
        </span>
      </div>
    </div>
  );
}
