import React from 'react';
import { motion } from 'framer-motion';
import { SectionHeading } from '../../components/shared/SectionHeading';
import { PlatformStatsCard } from '../../components/ui/PlatformStatsCard';
import { platforms } from '../../data/platforms';

export function CodingProfilesSection() {
  const codingPlatforms = Object.values(platforms).filter(p => p.showOn.includes('developer'));

  if (codingPlatforms.length === 0) return null;

  return (
    <section className="py-24 md:py-32 bg-[#030303] text-[#f1eee8] border-b border-white/[0.08]">
      <div className="container mx-auto px-6 max-w-7xl">
        <SectionHeading 
          kicker="06 / BENCHMARKS"
          title="Coding Profiles" 
          subtitle="Continuous competitive programming, algorithmic contests, and verified problem solving." 
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-16">
          {codingPlatforms.map((platform, index) => (
            <motion.div
              key={platform.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <PlatformStatsCard platform={platform} />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
