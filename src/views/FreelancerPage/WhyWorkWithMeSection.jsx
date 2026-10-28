import React from 'react';
import { motion } from 'framer-motion';
import { differentiators } from '../../data/services';
import { AnimeTextReveal } from '../../components/ui/AnimeTextReveal';

export function WhyWorkWithMeSection() {
  return (
    <section className="py-24 md:py-32 bg-[#030303] border-t border-white/[0.06]">
      <div className="container mx-auto px-6 max-w-6xl">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="mb-16 md:mb-20"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/[0.03] border border-white/[0.08] mb-4">
            <span className="w-1.5 h-1.5 rounded-full bg-[#f97316] animate-pulse shadow-[0_0_8px_rgba(249,115,22,0.6)]" />
            <p className="text-[11px] font-mono tracking-[0.25em] text-[#f97316]/90 uppercase">07 / OPERATING PRINCIPLES</p>
          </div>
          <h2 className="text-3xl md:text-5xl lg:text-6xl font-serif tracking-tight text-[#f1eee8] mb-4">
            <AnimeTextReveal trigger="visible">Why Founders and Teams Trust Me</AnimeTextReveal>
          </h2>
          <p className="text-base md:text-lg text-[#aaa9a4] max-w-2xl font-light leading-relaxed">
            Direct communication, verified engineering standards, and zero artificial bloat.
          </p>
        </motion.div>

        {/* Differentiator List — editorial vertical layout */}
        <div className="space-y-0 border-t border-white/[0.08]">
          {differentiators.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6, delay: index * 0.08, ease: [0.16, 1, 0.3, 1] }}
              className="flex flex-col md:flex-row md:items-start gap-4 md:gap-12 py-8 border-b border-white/[0.08] hover:bg-white/[0.02] px-4 -mx-4 rounded-xl transition-colors"
            >
              {/* Number */}
              <span className="text-xs font-mono text-[#aaa9a4]/50 md:w-8 flex-shrink-0 pt-1">
                {String(index + 1).padStart(2, '0')}
              </span>
              
              {/* Title */}
              <h3 className="text-lg md:text-xl font-serif text-[#f1eee8] md:w-72 flex-shrink-0">
                {item.title}
              </h3>
              
              {/* Description */}
              <p className="text-sm md:text-base text-[#aaa9a4] leading-relaxed flex-1 font-light">
                {item.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
