import React from 'react';
import { motion } from 'framer-motion';
import { freelancerProcess } from '../../data/services';
import { AnimeTextReveal } from '../../components/ui/AnimeTextReveal';

export function ProcessSection() {
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
            <p className="text-[11px] font-mono tracking-[0.25em] text-[#f97316]/90 uppercase">05 / COLLABORATION</p>
          </div>
          <h2 className="text-3xl md:text-5xl lg:text-6xl font-serif tracking-tight text-[#f1eee8] mb-4">
            <AnimeTextReveal trigger="visible">Methodical From Discovery to Launch</AnimeTextReveal>
          </h2>
          <p className="text-base md:text-lg text-[#aaa9a4] max-w-2xl font-light leading-relaxed">
            From the initial conversation to production deployment — structured, transparent, and built on steady milestone deliverables.
          </p>
        </motion.div>

        {/* Process Steps */}
        <div className="relative">
          {/* Vertical connecting line (desktop only) */}
          <div className="hidden md:block absolute left-[39px] top-4 bottom-4 w-[1px] bg-white/[0.08]" />

          <div className="space-y-6 md:space-y-4">
            {freelancerProcess.map((step, index) => (
              <motion.div
                key={step.id}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.6, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
                className="relative flex flex-col md:flex-row gap-6 md:gap-8 md:p-6 rounded-2xl md:hover:bg-white/[0.02] transition-colors"
              >
                {/* Step Number */}
                <div className="relative z-10 flex-shrink-0 w-16 h-16 md:w-20 md:h-20 flex items-center justify-center rounded-2xl bg-[#0c0c0c] border border-white/[0.08] shadow-lg">
                  <span className="text-xl md:text-2xl font-serif text-[#f1eee8]">
                    {String(step.step).padStart(2, '0')}
                  </span>
                </div>

                {/* Content */}
                <div className="flex-1 pt-1">
                  <div className="flex items-center gap-3 mb-2">
                    <span className="text-[10px] font-mono tracking-widest text-[#aaa9a4]/60 uppercase">Stage {index + 1}</span>
                  </div>
                  <h3 className="text-xl md:text-2xl font-serif text-[#f1eee8] mb-3">
                    {step.title}
                  </h3>
                  <p className="text-sm md:text-base text-[#aaa9a4] leading-relaxed mb-4 max-w-2xl font-light">
                    {step.description}
                  </p>
                  
                  {/* Details */}
                  <div className="flex flex-wrap gap-2">
                    {step.details.map((detail, i) => (
                      <span key={i} className="text-xs px-3 py-1 rounded-full border border-white/[0.08] bg-white/[0.02] text-[#aaa9a4] font-mono">
                        {detail}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
