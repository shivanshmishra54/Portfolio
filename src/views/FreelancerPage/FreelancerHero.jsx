'use client';

import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowDown, ArrowRight } from 'lucide-react';
import { profile } from '../../data/profile';
import { useReducedMotion } from '../../components/3d/hooks/useReducedMotion';
import { AnimeTextReveal } from '../../components/ui/AnimeTextReveal';

export function FreelancerHero() {
  const containerRef = useRef(null);
  const prefersReducedMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });

  const contentY = useTransform(scrollYProgress, [0, 1], [0, prefersReducedMotion ? 0 : 90]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.75], [1, 0]);
  const contentScale = useTransform(scrollYProgress, [0, 1], [1, prefersReducedMotion ? 1 : 0.95]);

  return (
    <section 
      ref={containerRef}
      className="relative w-full min-h-[85vh] flex items-center justify-center bg-[#030303] text-[#f1eee8] pt-36 pb-20 overflow-hidden border-b border-white/[0.08]"
    >
      {/* Subtle vertical grid lines */}
      <div 
        aria-hidden="true"
        className="absolute inset-0 pointer-events-none opacity-10 bg-[linear-gradient(90deg,#ffffff15_1px,transparent_1px)] bg-[size:16.666%_100%] [mask-image:linear-gradient(black_60%,transparent_95%)]"
      />

      <div className="relative z-10 container mx-auto px-6 max-w-5xl">
        <motion.div
          style={{ y: contentY, opacity: contentOpacity, scale: contentScale }}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col items-center text-center"
        >
          {/* Eyebrow */}
          <div className="flex items-center gap-2.5 mb-6 text-xs font-mono tracking-[0.2em] uppercase text-[#aaa9a4]">
            <span className="w-2 h-2 rounded-full bg-[#f97316] animate-pulse shadow-[0_0_8px_rgba(249,115,22,0.6)]" />
            <span className="text-[#f97316]/90 font-medium">01 / CLIENT SERVICES</span>
            <span className="text-[#666666]">·</span>
            <span className="text-[#aaa9a4]">FULL-STACK &amp; BACKEND ENGINEERING</span>
          </div>

          {/* Main Headline with Anime.js reveal */}
          <h1 className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-serif font-normal tracking-tight text-[#f1eee8] leading-[1.02] mb-6">
            <AnimeTextReveal delay={100}>I turn complex ideas into</AnimeTextReveal>{' '}
            <AnimeTextReveal delay={250}>
              <em className="italic font-normal text-[#dcd8d0]">production software</em>.
            </AnimeTextReveal>
          </h1>

          {/* Supporting statement */}
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="text-base sm:text-lg md:text-xl font-light text-[#aaa9a4] max-w-2xl mx-auto mb-10 leading-relaxed"
          >
            Full-stack engineering from architectural design to deployment. I deliver robust web applications, 
            high-throughput backend APIs, and responsive React interfaces using Java, Spring Boot, and modern tooling.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.45, duration: 0.5 }}
            className="flex flex-wrap items-center justify-center gap-4"
          >
            <a
              href="#inquiry"
              className="editorial-btn-primary px-8 py-3.5 shadow-xl"
            >
              <span>Initiate Project Inquiry</span>
              <ArrowRight size={14} />
            </a>
            <a
              href="#work"
              className="editorial-btn-secondary px-8 py-3.5"
            >
              <span>Explore Client Work</span>
            </a>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
