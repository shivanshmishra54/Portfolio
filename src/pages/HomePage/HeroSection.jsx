import React from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ThreeScene } from '../../components/3d';
import { profile } from '../../data/profile';
import { useReducedMotion } from '../../components/3d/hooks/useReducedMotion';

export function HeroSection() {
  const { scrollYProgress } = useScroll();
  const prefersReducedMotion = useReducedMotion();

  // Subtle scroll parallax for the text content
  const y = useTransform(scrollYProgress, [0, 1], [0, prefersReducedMotion ? 0 : 200]);
  const opacity = useTransform(scrollYProgress, [0, 0.2], [1, 0]);

  return (
    <section className="relative w-full h-screen min-h-[600px] flex items-center justify-center overflow-hidden bg-gray-50 dark:bg-black">
      
      {/* 3D Environment Background */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <ThreeScene usePlaceholder={true} />
      </div>

      {/* Foreground Content */}
      <motion.div 
        style={{ y, opacity }}
        className="relative z-10 container mx-auto px-6 max-w-7xl flex flex-col items-center text-center mt-20"
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="mb-8"
        >
          <div className="w-24 h-24 md:w-32 md:h-32 mx-auto rounded-full overflow-hidden border-2 border-white/10 shadow-2xl mb-8 relative">
            {/* Fallback image that sits behind the 3D placeholder if WebGL fails */}
            <img 
              src={profile.photo} 
              alt={profile.name}
              className="w-full h-full object-cover"
              loading="eager"
            />
            {/* An overlay gradient to make it feel integrated */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent"></div>
          </div>

          <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tighter text-gray-900 dark:text-white uppercase mb-4">
            {profile.name}
          </h1>
          <p className="text-xl md:text-2xl text-gray-600 dark:text-gray-300 tracking-wide font-light max-w-2xl mx-auto">
            {profile.tagline.split(' · ').map((part, index, array) => (
              <span key={index}>
                {part}
                {index < array.length - 1 && <span className="mx-3 opacity-30">/</span>}
              </span>
            ))}
          </p>
        </motion.div>
      </motion.div>

      {/* Scroll Indicator */}
      <motion.div 
        style={{ opacity }}
        className="absolute bottom-12 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2"
      >
        <span className="text-xs tracking-[0.2em] text-gray-400 uppercase font-medium">Scroll to explore</span>
        <motion.div 
          animate={prefersReducedMotion ? {} : { y: [0, 8, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
          className="w-[1px] h-12 bg-gradient-to-b from-gray-400 to-transparent"
        />
      </motion.div>

    </section>
  );
}
