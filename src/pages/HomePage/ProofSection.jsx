import React from 'react';
import { motion } from 'framer-motion';
import { SectionHeading } from '../../components/shared/SectionHeading';
import { achievements } from '../../data/achievements';
import { certificates } from '../../data/certificates';
import { projects } from '../../data/projects';

export function ProofSection() {
  const metrics = [
    { label: "Projects Completed", value: projects.length + "+" },
    { label: "Certifications", value: certificates.length },
    { label: "Hackathons", value: "3" }, // From accomplishments
    { label: "LeetCode Solved", value: "200+" } // From profile
  ];

  return (
    <section className="py-24 md:py-32 bg-black text-white relative overflow-hidden">
      {/* Decorative subtle grid background */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff0a_1px,transparent_1px),linear-gradient(to_bottom,#ffffff0a_1px,transparent_1px)] bg-[size:4rem_4rem]"></div>
      
      <div className="container mx-auto px-6 max-w-7xl relative z-10">
        <SectionHeading 
          title="Credibility" 
          subtitle="A track record of continuous learning and delivery." 
          className="text-white"
        />

        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12 mt-16">
          {metrics.map((metric, idx) => (
            <motion.div
              key={metric.label}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className="flex flex-col items-center md:items-start border-l border-gray-800 pl-6"
            >
              <span className="text-4xl md:text-6xl font-light tracking-tighter mb-2">{metric.value}</span>
              <span className="text-xs font-mono tracking-widest text-gray-400 uppercase">{metric.label}</span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
