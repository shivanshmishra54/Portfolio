import React from 'react';
import { motion } from 'framer-motion';
import { AnimatedNumber } from './AnimatedNumber';
import { getCredibilityMetrics } from '../../data/achievements';
import { SignalText } from './SignalText';

export function KineticProofStrip() {
  const metrics = getCredibilityMetrics();

  return (
    <section className="relative z-20 w-full border-y border-white/[0.08] bg-[#080808] text-[#f1eee8] transition-colors duration-300">
      <div className="container mx-auto px-4 sm:px-6 max-w-7xl">
        <div className="grid grid-cols-2 md:grid-cols-5 divide-y md:divide-y-0 md:divide-x divide-white/[0.08]">
          {metrics.map((metric, idx) => (
            <motion.div
              key={metric.id}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.5, delay: idx * 0.08 }}
              className={`p-6 sm:p-7 flex flex-col justify-between group hover:bg-[#0d0d0d] transition-colors ${
                idx === 4 ? 'col-span-2 md:col-span-1' : ''
              }`}
            >
              <div>
                <div className="text-3xl sm:text-4xl lg:text-5xl font-light tracking-tighter text-[#f1eee8] flex items-baseline gap-0.5 mb-2 font-serif">
                  <AnimatedNumber value={metric.rawCount} />
                  {metric.hasPlus && (
                    <span className="text-2xl sm:text-3xl font-extralight text-neutral-400">
                      +
                    </span>
                  )}
                </div>
                <div className="text-[10px] sm:text-[11px] font-mono tracking-widest uppercase font-semibold text-neutral-300 mb-1">
                  <SignalText scrambleOnHover={true}>{metric.label}</SignalText>
                </div>
              </div>
              
              <p className="text-[11px] font-mono text-neutral-400 leading-tight mt-2">
                {metric.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
