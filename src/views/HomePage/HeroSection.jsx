'use client';

import React, { useState, useRef } from 'react';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { ThreeScene } from '../../components/3d';
import { profile } from '../../data/profile';
import { useAvatarState, AvatarState } from '../../components/3d/AvatarContext';
import { useReducedMotion } from '../../components/3d/hooks/useReducedMotion';
import { SignalText } from '../../components/ui/SignalText';
import { AnimeTextReveal } from '../../components/ui/AnimeTextReveal';
import { ArrowDown, ArrowUpRight } from 'lucide-react';

export function HeroSection() {
  const sectionRef = useRef(null);
  const prefersReducedMotion = useReducedMotion();
  const { setAvatarState } = useAvatarState();
  const router = useRouter();
  const [transitioningTo, setTransitioningTo] = useState(null);
  const [showPortrait, setShowPortrait] = useState(true);

  // Accurate target-linked scroll progress across the hero's exit viewport
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"]
  });

  // Layered parallax: Content drifts down and fades smoothly
  const contentY = useTransform(scrollYProgress, [0, 1], [0, prefersReducedMotion ? 0 : 130]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.72], [1, 0]);
  const contentScale = useTransform(scrollYProgress, [0, 1], [1, prefersReducedMotion ? 1 : 0.94]);

  // Layered portrait parallax: Slower drift creating true stereoscopic depth behind text
  const portraitY = useTransform(scrollYProgress, [0, 1], [0, prefersReducedMotion ? 0 : 75]);
  const portraitScale = useTransform(scrollYProgress, [0, 1], [1, prefersReducedMotion ? 1 : 0.96]);
  const portraitScrollOpacity = useTransform(scrollYProgress, [0, 0.85], [1, 0.1]);

  // Ambient bars fade early as user begins exploration
  const barsOpacity = useTransform(scrollYProgress, [0, 0.35], [1, 0]);

  const handlePathClick = (path, state) => {
    if (transitioningTo) return;
    setAvatarState(state);
    setTransitioningTo(path);
    setTimeout(() => {
      router.push(`/${path}`);
      setAvatarState(AvatarState.IDLE);
    }, 1200);
  };

  return (
    <section
      ref={sectionRef}
      className="relative w-full h-[100dvh] min-h-[700px] flex flex-col justify-between items-center overflow-hidden bg-[#030303] text-[#f1eee8] select-none pt-28 sm:pt-32 pb-8 px-4 sm:px-6"
    >

      {/* 1. Subtle Editorial Vertical Grid Lines */}
      <div
        aria-hidden="true"
        className="absolute inset-0 pointer-events-none opacity-10 bg-[linear-gradient(90deg,#ffffff15_1px,transparent_1px)] bg-[size:16.666%_100%] [mask-image:linear-gradient(black_60%,transparent_95%)]"
      />

      {/* 2. Atmospheric Portrait Backdrop with Parallax Depth and Sarthak Warm Orange Rim Lighting */}
      <motion.div
        style={{ y: portraitY, scale: portraitScale, opacity: portraitScrollOpacity }}
        className="absolute inset-0 pointer-events-none flex items-center justify-center z-0 overflow-hidden"
      >
        {showPortrait ? (
          <motion.div
            key="hero-portrait"
            initial={{ opacity: 0, y: prefersReducedMotion ? 0 : 35, scale: prefersReducedMotion ? 1 : 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
            className="relative w-[340px] sm:w-[440px] md:w-[500px] max-w-[90vw] h-[540px] sm:h-[660px] -top-3 sm:-top-6 flex items-center justify-center [mask-image:linear-gradient(to_bottom,black_50%,transparent_96%)]"
          >
            {/* Soft Yellow/Amber Radial Glow positioned BEHIND subject with natural falloff */}
            <div
              aria-hidden="true"
              className="absolute left-1/2 top-1/3 -translate-x-1/2 -translate-y-1/2 w-[340px] sm:w-[440px] h-[340px] sm:h-[440px] rounded-full bg-[radial-gradient(circle,rgba(245,158,11,0.22)_0%,rgba(217,119,6,0.08)_45%,transparent_70%)] blur-[55px] pointer-events-none z-0"
            />

            {/* Base Portrait Image - Natural original facial features and crisp resolution */}
            <img
              src={profile.photo || "/hero-editorial.webp"}
              alt="Shivansh Mishra Portrait"
              className="relative z-10 w-full h-full object-contain filter contrast-[1.08] brightness-[1.0] select-none"
            />
          </motion.div>
        ) : (
          <ThreeScene usePlaceholder={true} />
        )}
      </motion.div>

      {/* 3. Topline Status Bar */}
      <motion.div
        style={{ opacity: barsOpacity }}
        className="relative z-20 w-full max-w-6xl flex items-center justify-between text-[9px] sm:text-[10px] font-mono tracking-widest text-[#aaa9a4] uppercase pt-2"
      >
        <div className="flex items-center gap-2.5">
          <span className="w-2 h-2 rounded-full bg-[#f97316] animate-pulse shadow-[0_0_8px_rgba(249,115,22,0.6)]" />
          <span>
            <SignalText scrambleOnHover={false}>BASED IN MUMBAI · OPEN FOR HIGH-IMPACT ROLES</SignalText>
          </span>
        </div>
        <div className="hidden md:flex items-center gap-4 text-[#aaa9a4]">
          <span className="text-[#f97316] font-medium">01 / PRESENCE</span>
          <span className="text-white/20">·</span>
          <span>B.TECH IT · CGPA 8.72</span>
        </div>
      </motion.div>

      {/* 4. Center Editorial Content - Wide container for single-line desktop name composition */}
      <motion.div
        style={{ y: contentY, opacity: contentOpacity, scale: contentScale }}
        className="relative z-20 w-full max-w-6xl flex flex-col items-center text-center mt-auto mb-auto pointer-events-none px-4"
      >
        {/* Kicker / Category */}
        <div className="text-[10px] sm:text-xs font-mono tracking-[0.25em] text-[#aaa9a4] uppercase mb-3 flex items-center gap-3">
          <span className="w-4 h-[1px] bg-white/[0.2]" />
          <SignalText scrambleOnHover={true}>SYSTEMS ARCHITECT · FULL-STACK DEVELOPER</SignalText>
          <span className="w-4 h-[1px] bg-white/[0.2]" />
        </div>

        {/* Large Editorial Headline: Single Line on Desktop (Sarthak Reference Composition) */}
        <h1 className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-[6.5rem] font-normal tracking-tight text-[#f1eee8] font-serif leading-[1.0] mb-4 drop-shadow-2xl whitespace-normal sm:whitespace-nowrap flex flex-wrap sm:flex-nowrap items-center justify-center gap-x-3 sm:gap-x-4">
          <AnimeTextReveal delay={150}>Shivansh</AnimeTextReveal>
          <AnimeTextReveal delay={300}>
            <em className="font-serif italic font-normal text-[#dcd8d0]">Mishra</em>
          </AnimeTextReveal>
        </h1>

        {/* Subtitle statement */}
        <motion.p
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="text-sm sm:text-base md:text-lg font-light text-[#aaa9a4] max-w-xl mx-auto leading-relaxed mb-8"
        >
          Architecting resilient distributed microservices, low-latency Base-62 engines, and production-grade full-stack web applications.
        </motion.p>

        {/* Dual Path Direct Actions */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.55 }}
          className="flex flex-wrap items-center justify-center gap-3 sm:gap-5 pointer-events-auto"
        >
          {/* Developer Path CTA */}
          <button
            onClick={() => handlePathClick('developer', AvatarState.THINKING)}
            aria-label="Explore Software Developer Engineering Stack"
            className="group relative flex items-center gap-2.5 px-6 py-3 rounded-full bg-[#f1eee8] hover:bg-white text-[#030303] text-xs font-mono uppercase tracking-wider font-semibold transition-all duration-300 hover:scale-105 active:scale-95 shadow-xl cursor-pointer"
          >
            <span>Software Developer</span>
            <span className="group-hover:translate-x-1 transition-transform">→</span>
          </button>

          {/* Freelancer Path CTA */}
          <button
            onClick={() => handlePathClick('freelancer', AvatarState.GREETING)}
            aria-label="Explore Freelance Client Services"
            className="group relative flex items-center gap-2.5 px-6 py-3 rounded-full border border-white/[0.12] bg-[#0c0c0c]/80 backdrop-blur-md text-[#f1eee8] text-xs font-mono uppercase tracking-wider hover:border-white/[0.3] transition-all duration-300 hover:scale-105 active:scale-95 cursor-pointer"
          >
            <span>Freelance Services</span>
            <ArrowUpRight size={14} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform text-[#f97316]" />
          </button>
        </motion.div>
      </motion.div>

      {/* 5. Bottom Navigation & Scroll Indicator */}
      <motion.div
        style={{ opacity: barsOpacity }}
        className="relative z-20 w-full max-w-6xl flex items-center justify-between text-[9px] sm:text-[10px] font-mono tracking-widest text-[#aaa9a4] uppercase pt-4 border-t border-white/[0.08]"
      >

        {/* Scroll link with vertical orange accent */}
        <a
          href="#proof"
          className="flex items-center gap-2 text-[#aaa9a4] hover:text-[#f1eee8] transition-colors group"
        >
          <span className="w-[2px] h-3 bg-[#f97316] group-hover:scale-y-125 transition-transform" />
          <span>SCROLL TO EXPLORE</span>
          <ArrowDown size={11} className="animate-bounce text-[#f97316]" />
        </a>

        {/* 3D / Portrait Toggle */}
        <button
          onClick={() => setShowPortrait(prev => !prev)}
          className="pointer-events-auto px-3 py-1 rounded-full border border-white/[0.08] bg-[#0c0c0c]/80 hover:border-white/[0.25] text-[#aaa9a4] hover:text-[#f1eee8] transition-all cursor-pointer"
        >
          {showPortrait ? 'SWITCH TO 3D GLOBE' : 'SWITCH TO PORTRAIT'}
        </button>

        <span className="hidden sm:inline-block text-[#666666]">
          SPRING BOOT · REACT · KAFKA · REDIS
        </span>
      </motion.div>

      {/* Cinematic Transition Overlay on route exit */}
      <AnimatePresence>
        {transitioningTo && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className={`fixed inset-0 z-50 transition-colors duration-700 pointer-events-none
              ${transitioningTo === 'freelancer' ? 'bg-white/95 dark:bg-black/95 backdrop-blur-md' : 'bg-gray-900/95 dark:bg-black/95 backdrop-blur-md'}
            `}
          />
        )}
      </AnimatePresence>

    </section>
  );
}
