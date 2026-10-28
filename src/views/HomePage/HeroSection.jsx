import React, { useState, useRef } from 'react';
import { motion, AnimatePresence, useScroll, useTransform, useAnimationFrame } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { ThreeScene } from '../../components/3d';
import { profile } from '../../data/profile';
import { useAvatarState, AvatarState } from '../../components/3d/AvatarContext';
import { useReducedMotion } from '../../components/3d/hooks/useReducedMotion';

export function HeroSection() {
  const { scrollYProgress } = useScroll();
  const prefersReducedMotion = useReducedMotion();
  const { setAvatarState } = useAvatarState();
  const navigate = useNavigate();
  const [transitioningTo, setTransitioningTo] = useState(null);

  // Parallax subtle drift on scroll
  const y = useTransform(scrollYProgress, [0, 1], [0, prefersReducedMotion ? 0 : 50]);
  const opacity = useTransform(scrollYProgress, [0, 0.22], [1, 0]);

  const handlePathClick = (path, state) => {
    if (transitioningTo) return;
    setAvatarState(state);
    setTransitioningTo(path);
    setTimeout(() => {
      navigate(`/${path}`);
      setAvatarState(AvatarState.IDLE);
    }, 1200);
  };

  return (
    <section className="relative w-full h-[100dvh] min-h-[640px] md:min-h-[720px] flex flex-col justify-end items-center overflow-x-hidden overflow-y-hidden bg-gray-50 dark:bg-black pt-12 select-none">
      
      {/* 3D Canvas Background with upper positioned skills globe */}
      <div className="absolute inset-0 pointer-events-none flex items-center justify-center z-0">
        <ThreeScene usePlaceholder={true} />
      </div>

      {/* CONTENT AREA: Positioned directly in the open space below the globe, above Scroll to Explore */}
      <motion.div 
        style={{ y, opacity }}
        className="relative z-20 w-full max-w-4xl flex flex-col items-center justify-end px-4 sm:px-6 pointer-events-none pb-4 sm:pb-6"
      >
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: "easeOut", delay: 0.15 }}
          className="flex flex-col items-center text-center w-full"
        >
          {/* Name: Elegant, balanced size that fits naturally under the globe */}
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-gray-900 dark:text-white uppercase mb-2 sm:mb-3 drop-shadow-sm leading-tight select-none">
            {profile.name}
          </h1>

          {/* Tagline / Roles */}
          <p className="text-[11px] sm:text-xs md:text-sm text-gray-600 dark:text-neutral-400 tracking-[0.2em] font-light uppercase leading-relaxed max-w-lg mb-4 sm:mb-5">
            {profile.tagline.split(' · ').map((part, index, array) => (
              <span key={index} className="inline-block whitespace-nowrap">
                {part}
                {index < array.length - 1 && <span className="mx-2 md:mx-2.5 opacity-30">/</span>}
              </span>
            ))}
          </p>

          {/* Dual Path Direct Actions (Freelancer & Software Developer) */}
          <div className="flex flex-wrap items-center justify-center gap-2.5 sm:gap-4 pointer-events-auto mb-3 sm:mb-4">
            <button
              onClick={() => handlePathClick('freelancer', AvatarState.GREETING)}
              aria-label="Explore Freelance Client Services"
              className="group relative flex items-center gap-2 px-4 sm:px-5 py-2 sm:py-2.5 rounded-full border border-gray-300/80 dark:border-neutral-700/80 bg-white/90 dark:bg-neutral-900/90 backdrop-blur-md shadow-sm hover:border-gray-900 dark:hover:border-white transition-all duration-300 hover:scale-105 active:scale-95 focus:outline-none focus:ring-2 focus:ring-gray-900 dark:focus:ring-white"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
              <span className="text-[11px] sm:text-xs font-semibold tracking-wider uppercase text-gray-900 dark:text-neutral-100">
                Freelancer
              </span>
              <span className="text-[10px] text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white group-hover:translate-x-0.5 transition-all">
                →
              </span>
            </button>

            <button
              onClick={() => handlePathClick('developer', AvatarState.THINKING)}
              aria-label="Explore Software Developer Engineering Stack"
              className="group relative flex items-center gap-2 px-4 sm:px-5 py-2 sm:py-2.5 rounded-full border border-gray-300/80 dark:border-neutral-700/80 bg-white/90 dark:bg-neutral-900/90 backdrop-blur-md shadow-sm hover:border-gray-900 dark:hover:border-white transition-all duration-300 hover:scale-105 active:scale-95 focus:outline-none focus:ring-2 focus:ring-gray-900 dark:focus:ring-white"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-blue-500 animate-pulse" />
              <span className="text-[11px] sm:text-xs font-semibold tracking-wider uppercase text-gray-900 dark:text-neutral-100">
                Software Developer
              </span>
              <span className="text-[10px] text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white group-hover:translate-x-0.5 transition-all">
                →
              </span>
            </button>
          </div>
        </motion.div>
      </motion.div>

      {/* Cinematic Transition Overlay */}
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

      {/* Scroll Indicator: Positioned cleanly below with distance maintained */}
      <motion.div 
        style={{ opacity }}
        className="relative z-20 pb-4 sm:pb-5 flex flex-col items-center gap-1.5 pointer-events-none"
      >
        <span className="text-[9px] sm:text-[10px] tracking-[0.3em] text-gray-500 dark:text-gray-400 uppercase font-medium">
          Scroll to explore
        </span>
        <motion.div 
          animate={prefersReducedMotion ? {} : { y: [0, 5, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
          className="w-[1px] h-6 sm:h-8 bg-gradient-to-b from-gray-400 to-transparent"
        />
      </motion.div>

    </section>
  );
}
