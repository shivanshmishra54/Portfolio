'use client';
import React from 'react';
import { motion } from 'framer-motion';
import { AnimeTextReveal } from '../ui/AnimeTextReveal';

export function SectionHeading({ title, subtitle, kicker, number, className = "", align = "left" }) {
  const displayKicker = kicker || (number ? `${number} / OVERVIEW` : null);
  const isCentered = align === 'center';

  return (
    <div className={`mb-10 sm:mb-14 md:mb-18 ${isCentered ? 'text-center flex flex-col items-center' : 'text-left'} ${className}`}>
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className="w-full"
      >
        {displayKicker && (
          <div className={`flex items-center gap-2.5 mb-3 text-[10px] sm:text-[11px] font-mono tracking-[0.2em] uppercase text-[#aaa9a4] ${isCentered ? 'justify-center' : ''}`}>
            <span className="w-2 h-2 rounded-full bg-[#f97316] animate-pulse shadow-[0_0_8px_rgba(249,115,22,0.6)]" />
            <span className="text-[#f97316]/90 font-medium">{displayKicker}</span>
          </div>
        )}

        <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-serif font-normal tracking-tight text-[#f1eee8] leading-[1.08]">
          <AnimeTextReveal trigger="visible" delay={60}>
            {title}
          </AnimeTextReveal>
        </h2>

        {subtitle && (
          <motion.p 
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.18, ease: [0.16, 1, 0.3, 1] }}
            className={`mt-3 sm:mt-4 text-sm sm:text-base md:text-lg text-[#aaa9a4] font-normal leading-relaxed ${isCentered ? 'max-w-2xl mx-auto' : 'max-w-2xl'}`}
          >
            {subtitle}
          </motion.p>
        )}
      </motion.div>
    </div>
  );
}
