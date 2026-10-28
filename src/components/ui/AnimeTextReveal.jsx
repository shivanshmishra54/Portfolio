'use client';

import React, { useEffect, useRef } from 'react';
import { animate, cubicBezier } from 'animejs';

/**
 * AnimeTextReveal — Phase 4 Editorial Typography Animation Component
 * Performs masked line-by-line or word-staggered reveals using Anime.js v4.
 * Guarantees accessibility, SSR fallback (text is never hidden if JS fails),
 * and viewport scroll triggering via IntersectionObserver.
 */
export function AnimeTextReveal({
  children,
  as: Component = 'span',
  className = '',
  delay = 0,
  duration = 900,
  staggerMs = 50,
  direction = 'up', // 'up' | 'down' | 'fade'
  splitBy = 'lines', // 'lines' | 'words'
  trigger = 'visible', // 'visible' (IntersectionObserver) | 'mount'
}) {
  const containerRef = useRef(null);

  useEffect(() => {
    // Respect prefers-reduced-motion
    if (typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      return;
    }

    const container = containerRef.current;
    if (!container) return;

    const targets = container.querySelectorAll('.anime-reveal-item');
    if (!targets || targets.length === 0) return;

    const easeEditorial = cubicBezier(0.16, 1, 0.3, 1);
    const yStart = direction === 'up' ? '105%' : direction === 'down' ? '-105%' : '0%';

    let animInstance = null;

    const runAnimation = () => {
      try {
        animInstance = animate(targets, {
          translateY: [yStart, '0%'],
          opacity: [0, 1],
          duration: duration,
          delay: (el, i) => delay + i * staggerMs,
          ease: easeEditorial,
        });
      } catch (e) {
        console.warn('AnimeTextReveal animation skipped:', e);
      }
    };

    if (trigger === 'mount' || typeof IntersectionObserver === 'undefined') {
      runAnimation();
      return () => {
        if (animInstance && typeof animInstance.pause === 'function') {
          animInstance.pause();
        }
      };
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            runAnimation();
            observer.disconnect();
          }
        });
      },
      { threshold: 0.15, rootMargin: '0px 0px -40px 0px' }
    );

    observer.observe(container);

    return () => {
      observer.disconnect();
      if (animInstance && typeof animInstance.pause === 'function') {
        animInstance.pause();
      }
    };
  }, [delay, duration, staggerMs, direction, trigger]);

  // If children is plain text and splitBy is 'words', split into wrapped word tokens
  if (typeof children === 'string' && splitBy === 'words') {
    const words = children.split(' ');
    return (
      <Component ref={containerRef} className={`inline ${className}`}>
        {words.map((word, index) => (
          <span key={index} className="inline-block overflow-hidden align-bottom mr-[0.25em] last:mr-0">
            <span className="anime-reveal-item inline-block will-change-transform">
              {word}
            </span>
          </span>
        ))}
      </Component>
    );
  }

  // Default: wrapped masked line / block reveal
  return (
    <Component ref={containerRef} className={`inline-block overflow-hidden align-bottom ${className}`}>
      <span className="anime-reveal-item inline-block will-change-transform">
        {children}
      </span>
    </Component>
  );
}
