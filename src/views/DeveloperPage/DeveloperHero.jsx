'use client';

import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { profile } from '../../data/profile';
import { useReducedMotion } from '../../components/3d/hooks/useReducedMotion';
import { AnimeTextReveal } from '../../components/ui/AnimeTextReveal';
import { Code2, Terminal, Database, Cpu, ArrowDown, ArrowRight } from 'lucide-react';

export function DeveloperHero() {
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
      {/* Background subtle technical grid */}
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
          {/* Eyebrow / Kicker */}
          <div className="flex items-center gap-2.5 mb-6 text-xs font-mono tracking-[0.2em] uppercase text-[#aaa9a4]">
            <span className="w-2 h-2 rounded-full bg-[#f97316] animate-pulse shadow-[0_0_8px_rgba(249,115,22,0.6)]" />
            <span className="text-[#f97316]/90 font-medium">01 / ENGINEERING PROFILE</span>
            <span className="text-[#666666]">·</span>
            <span className="text-[#aaa9a4]">JAVA 21 &amp; DISTRIBUTED SYSTEMS</span>
          </div>
          
          {/* Main Headline with Anime.js reveal */}
          <h1 className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-serif font-normal tracking-tight text-[#f1eee8] leading-[1.02] mb-6">
            <AnimeTextReveal delay={100}>Engineering scalable systems</AnimeTextReveal>{' '}
            <AnimeTextReveal delay={250}>
              &amp; <em className="italic font-normal text-[#dcd8d0]">clean architectures</em>.
            </AnimeTextReveal>
          </h1>
          
          {/* Supporting Statement */}
          <p className="text-base sm:text-lg md:text-xl text-[#aaa9a4] font-light leading-relaxed max-w-2xl mx-auto mb-10">
            {profile.bio.full}
          </p>

          {/* Centered Action CTAs */}
          <div className="flex flex-wrap items-center justify-center gap-4 mb-12">
            <a
              href="#projects"
              className="editorial-btn-primary px-8 py-3.5 shadow-xl flex items-center gap-2"
            >
              <span>Explore Systems &amp; Projects</span>
              <ArrowDown size={14} />
            </a>
            <a
              href="#architecture"
              className="editorial-btn-secondary px-8 py-3.5 flex items-center gap-2"
            >
              <span>Systems Architecture</span>
              <ArrowRight size={14} />
            </a>
          </div>

          {/* 4 Technical Highlight Cards */}
          <div className="w-full grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 pt-10 border-t border-white/[0.08] text-left">
            <div className="p-5 rounded-2xl bg-[#0c0c0c] border border-white/[0.08] hover:border-white/[0.2] transition-colors flex flex-col justify-between">
              <Terminal className="w-5 h-5 text-[#f97316] mb-3" />
              <div>
                <h3 className="text-xs font-mono uppercase tracking-wider text-[#f1eee8] font-semibold mb-1">Backend</h3>
                <p className="text-xs font-mono text-[#aaa9a4]">Java 21, Spring Boot 3, Microservices</p>
              </div>
            </div>
            <div className="p-5 rounded-2xl bg-[#0c0c0c] border border-white/[0.08] hover:border-white/[0.2] transition-colors flex flex-col justify-between">
              <Code2 className="w-5 h-5 text-[#f97316] mb-3" />
              <div>
                <h3 className="text-xs font-mono uppercase tracking-wider text-[#f1eee8] font-semibold mb-1">Frontend</h3>
                <p className="text-xs font-mono text-[#aaa9a4]">React 18, Next.js, Modern SCSS</p>
              </div>
            </div>
            <div className="p-5 rounded-2xl bg-[#0c0c0c] border border-white/[0.08] hover:border-white/[0.2] transition-colors flex flex-col justify-between">
              <Database className="w-5 h-5 text-[#f97316] mb-3" />
              <div>
                <h3 className="text-xs font-mono uppercase tracking-wider text-[#f1eee8] font-semibold mb-1">Storage</h3>
                <p className="text-xs font-mono text-[#aaa9a4]">PostgreSQL, Redis, MySQL, Base-62</p>
              </div>
            </div>
            <div className="p-5 rounded-2xl bg-[#0c0c0c] border border-white/[0.08] hover:border-white/[0.2] transition-colors flex flex-col justify-between">
              <Cpu className="w-5 h-5 text-[#f97316] mb-3" />
              <div>
                <h3 className="text-xs font-mono uppercase tracking-wider text-[#f1eee8] font-semibold mb-1">Systems</h3>
                <p className="text-xs font-mono text-[#aaa9a4]">200+ DSA, OS, OOP, Low-Latency</p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
