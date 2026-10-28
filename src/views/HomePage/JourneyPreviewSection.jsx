'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { SectionHeading } from '../../components/shared/SectionHeading';
import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import { journey } from '../../data/journey';

export function JourneyPreviewSection() {
  const previewSteps = journey.filter(item => item.featured).slice(0, 4);

  return (
    <section className="py-24 md:py-32 bg-[#030303] text-[#f1eee8] border-t border-white/[0.08]">
      <div className="container mx-auto px-6 max-w-7xl">
        <SectionHeading 
          kicker="05 / PROGRESSION"
          title="The Journey" 
          subtitle="Chronological milestones across engineering, academic rigor, and verified achievements." 
        />

        <div className="relative mt-16 pb-16">
          {/* Horizontal hairline for desktop */}
          <div className="absolute top-1/2 left-0 w-full h-[1px] bg-white/[0.08] hidden md:block -translate-y-1/2" />
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {previewSteps.map((step, idx) => (
              <motion.div
                key={step.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.6, delay: idx * 0.1, ease: [0.16, 1, 0.3, 1] }}
                className="relative z-10 flex flex-col md:items-center text-left md:text-center group"
              >
                <div className="w-3 h-3 bg-[#f1eee8] group-hover:bg-[#f97316] group-hover:shadow-[0_0_8px_rgba(249,115,22,0.6)] rounded-full mb-6 hidden md:block outline outline-8 outline-[#030303] transition-all duration-300 group-hover:scale-150 border border-white/[0.2]" />
                <span className="text-xs font-mono tracking-widest text-[#aaa9a4] mb-2">{step.dateLabel}</span>
                <h4 className="text-lg font-serif font-normal tracking-tight text-[#f1eee8] mb-1">{step.title}</h4>
                <p className="text-xs font-mono uppercase tracking-wider text-[#aaa9a4]">{step.category}</p>
              </motion.div>
            ))}
          </div>
        </div>

        <div className="mt-8 flex justify-start md:justify-center">
          <Link 
            href="/journey"
            className="editorial-btn-secondary"
          >
            <span>Explore Full Timeline</span>
            <ArrowUpRight size={14} />
          </Link>
        </div>
      </div>
    </section>
  );
}
