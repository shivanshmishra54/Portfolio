import React from 'react';
import { motion } from 'framer-motion';
import { SectionHeading } from '../../components/shared/SectionHeading';
import { PlatformStatsCard } from '../../components/ui/PlatformStatsCard';
import { AnimatedNumber } from '../../components/ui/AnimatedNumber';
import { platforms } from '../../data/platforms';
import { getCredibilityMetrics } from '../../data/achievements';

export function ProofSection() {
  const metrics = getCredibilityMetrics();

  return (
    <section className="py-24 md:py-32 bg-black text-white relative overflow-hidden">
      {/* Decorative subtle grid background */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff0a_1px,transparent_1px),linear-gradient(to_bottom,#ffffff0a_1px,transparent_1px)] bg-[size:4rem_4rem]"></div>
      
      <div className="container mx-auto px-6 max-w-7xl relative z-10">
        <SectionHeading 
          title="Credibility" 
          subtitle="A verified track record of real-time software engineering and competitive accomplishments." 
          className="text-white"
        />

        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12 mt-16 mb-16">
          {metrics.map((metric, idx) => (
            <motion.div
              key={metric.id || metric.label}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className="flex flex-col items-start border-l border-neutral-800 pl-6 group"
            >
              <div className="text-4xl md:text-6xl font-light tracking-tighter mb-2 text-white flex items-baseline">
                <AnimatedNumber value={metric.rawCount} />
                {metric.hasPlus && <span className="text-3xl md:text-5xl font-extralight text-neutral-400">+</span>}
              </div>
              <span className="text-xs font-mono tracking-widest text-neutral-300 uppercase mb-1 font-semibold">{metric.label}</span>
              {metric.description && (
                <span className="text-[11px] font-mono text-neutral-500 hidden sm:inline-block leading-tight">{metric.description}</span>
              )}
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.6 }}
          className="max-w-2xl mx-auto md:mx-0"
        >
          {Object.values(platforms)
            .filter(p => p.showOn.includes('homepage'))
            .map(platform => (
              <PlatformStatsCard key={platform.id} platform={platform} />
            ))
          }
        </motion.div>
      </div>
    </section>
  );
}
