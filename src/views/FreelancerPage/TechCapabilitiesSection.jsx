import React from 'react';
import { motion } from 'framer-motion';
import { skills } from '../../data/skills';

import { AnimeTextReveal } from '../../components/ui/AnimeTextReveal';

export function TechCapabilitiesSection() {
  // Filter to show only the skill categories most relevant to freelance clients
  const relevantCategories = skills.filter(cat => 
    ['backend', 'frontend', 'database', 'tools'].includes(cat.id)
  );

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
            <span className="w-1.5 h-1.5 rounded-full bg-[#f97316] shadow-[0_0_8px_rgba(249,115,22,0.6)] animate-pulse" />
            <p className="text-[11px] font-mono tracking-[0.25em] text-[#aaa9a4] uppercase">06 / TECHNICAL DEPTH</p>
          </div>
          <h2 className="text-3xl md:text-5xl lg:text-6xl font-serif tracking-tight text-[#f1eee8] mb-4">
            <AnimeTextReveal trigger="visible">
              Pragmatic, Production-Tested Stacks
            </AnimeTextReveal>
          </h2>
          <p className="text-base md:text-lg text-[#aaa9a4] max-w-2xl font-light leading-relaxed">
            The reliable tools, frameworks, and architectures I leverage to deliver maintainable, high-performance applications.
          </p>
        </motion.div>

        {/* Tech Categories */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
          {relevantCategories.map((category, catIndex) => (
            <motion.div
              key={category.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: catIndex * 0.1 }}
              className="p-8 rounded-2xl border border-white/[0.08] bg-[#0c0c0c] hover:border-white/[0.18] transition-colors"
            >
              <h3 className="text-xs font-mono tracking-[0.2em] text-[#aaa9a4]/70 uppercase mb-6 flex items-center gap-2">
                <span className="w-1 h-1 rounded-full bg-white/40" />
                {category.category}
              </h3>
              <div className="flex flex-wrap gap-2.5">
                {category.items.map((item) => (
                  <span
                    key={item.name}
                    className="text-xs md:text-sm px-4 py-2 rounded-full bg-white/[0.03] border border-white/[0.08] text-[#f1eee8] font-mono hover:border-white/20 transition-colors"
                  >
                    {item.name}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
