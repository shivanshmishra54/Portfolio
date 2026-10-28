'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { SignalText } from './SignalText';
import { ArrowUpRight, Cpu, Layers, GitPullRequest } from 'lucide-react';
import Link from 'next/link';

const DISCIPLINES = [
  {
    id: 'architect',
    label: 'ARCHITECT',
    title: 'Distributed Systems & Microservices',
    tagline: 'High-throughput microservices designed for sub-15ms p95 latency and fault-tolerant failovers.',
    stack: ['Java 21', 'Spring Boot 3', 'Spring Cloud Gateway', 'Netflix Eureka', 'Redis', 'Kafka'],
    icon: Cpu,
    shape: 'orbits',
    link: '/developer',
    linkText: 'Explore Developer Architecture'
  },
  {
    id: 'build',
    label: 'BUILD',
    title: 'Full-Stack & Client MVPs',
    tagline: 'Modern, high-converting digital products delivered with responsive layouts and clean architecture.',
    stack: ['React 18', 'Next.js', 'Tailwind CSS', 'shadcn/ui', 'Leaflet Maps', 'PostgreSQL'],
    icon: Layers,
    shape: 'mesh',
    link: '/freelancer',
    linkText: 'Explore Freelance Services'
  },
  {
    id: 'contribute',
    label: 'CONTRIBUTE',
    title: 'Enterprise Open Source & Rigor',
    tagline: 'Core contributions to mission-critical repos like codecentric AG Spring Boot Admin (PR #5738).',
    stack: ['Hazelcast', 'Event Stores', 'JUnit 5', 'Checkstyle', 'CI/CD Pipelines', 'GitHub Actions'],
    icon: GitPullRequest,
    shape: 'ripples',
    link: '/developer',
    linkText: 'View Open Source Contributions'
  }
];

export function PerspectiveSwitcher() {
  const [activeTab, setActiveTab] = useState(0);
  const current = DISCIPLINES[activeTab];

  return (
    <section className="py-20 md:py-28 bg-[#030303] text-[#f1eee8] border-b border-white/[0.08] transition-colors duration-300">
      <div className="container mx-auto px-4 sm:px-6 max-w-7xl">
        
        {/* Section Label */}
        <div className="flex items-center justify-between pb-6 mb-12 border-b border-white/[0.08] text-[10px] font-mono text-neutral-400 uppercase tracking-widest">
          <span className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-white" />
            02 / ENGINEERING PERSPECTIVES
          </span>
          <span>THREE PILLARS · ONE PURPOSE</span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          
          {/* Left: Interactive Tab Buttons and Narrative Copy */}
          <div className="lg:col-span-7 flex flex-col justify-center">
            
            {/* Buttons Row */}
            <div className="flex flex-wrap gap-2.5 sm:gap-3 mb-8" role="tablist">
              {DISCIPLINES.map((d, index) => {
                const isActive = activeTab === index;
                return (
                  <button
                    key={d.id}
                    role="tab"
                    aria-selected={isActive}
                    onClick={() => setActiveTab(index)}
                    className={`relative px-5 py-2.5 rounded-full text-xs font-mono tracking-wider uppercase transition-all duration-300 border flex items-center gap-2 select-none ${
                      isActive 
                        ? 'bg-white text-black border-white shadow-lg' 
                        : 'bg-[#0a0a0a] text-neutral-400 border-white/[0.1] hover:border-neutral-400 hover:text-white'
                    }`}
                  >
                    <span>{d.label}</span>
                    <span className="text-[10px] opacity-60">↗</span>
                  </button>
                );
              })}
            </div>

            {/* Dynamic Content Details */}
            <AnimatePresence mode="wait">
              <motion.div
                key={current.id}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.35, ease: "easeOut" }}
                className="space-y-6"
              >
                <div>
                  <span className="text-xs font-mono text-neutral-500 uppercase tracking-widest block mb-2">
                    <SignalText scrambleOnHover={false}>{`0${activeTab + 1} // ${current.label}`}</SignalText>
                  </span>
                  <h3 className="text-2xl sm:text-3xl md:text-4xl font-light text-[#f1eee8] font-serif tracking-tight">
                    {current.title}
                  </h3>
                </div>

                <p className="text-base sm:text-lg font-light text-neutral-300 leading-relaxed max-w-xl">
                  {current.tagline}
                </p>

                {/* Tech Pills */}
                <div className="flex flex-wrap gap-2 pt-2">
                  {current.stack.map(tech => (
                    <span 
                      key={tech} 
                      className="px-3 py-1 rounded-md text-xs font-mono bg-[#0c0c0c] text-neutral-200 border border-white/[0.08]"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                {/* Link to path */}
                <div className="pt-4">
                  <Link
                    href={current.link}
                    className="inline-flex items-center gap-2 pb-1 border-b border-white text-xs font-mono uppercase tracking-widest text-[#f1eee8] hover:gap-3 transition-all"
                  >
                    <span>{current.linkText}</span>
                    <ArrowUpRight size={14} />
                  </Link>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Right: Technical Geometric Canvas/Visual */}
          <div className="lg:col-span-5 flex items-center justify-center">
            <div className="relative w-full aspect-square max-w-sm rounded-2xl border border-white/[0.08] bg-[#080808] p-8 flex flex-col items-center justify-center overflow-hidden shadow-2xl">
              
              {/* Background ambient radial glow */}
              <div className="absolute inset-0 bg-radial from-neutral-800/30 to-transparent pointer-events-none" />
              
              {/* Animated Geometry */}
              <AnimatePresence mode="wait">
                <motion.div
                  key={current.id}
                  initial={{ opacity: 0, scale: 0.8, rotate: -15 }}
                  animate={{ opacity: 1, scale: 1, rotate: 0 }}
                  exit={{ opacity: 0, scale: 1.1, rotate: 15 }}
                  transition={{ duration: 0.5, ease: "easeInOut" }}
                  className="relative w-44 h-44 flex items-center justify-center"
                >
                  <div className="absolute inset-0 rounded-full border border-neutral-700 animate-[spin_20s_linear_infinite]" />
                  <div className="absolute inset-3 rounded-full border border-dashed border-neutral-600 animate-[spin_15s_linear_infinite_reverse]" />
                  <div className="absolute inset-7 rounded-full border border-neutral-700" />
                  
                  {/* Center Mark */}
                  <div className="relative z-10 w-16 h-16 rounded-full bg-white text-black flex items-center justify-center shadow-2xl">
                    <current.icon size={26} />
                  </div>
                </motion.div>
              </AnimatePresence>

              {/* Monospace coordinate caption */}
              <div className="mt-8 text-center">
                <span className="text-[10px] font-mono tracking-widest text-neutral-500 uppercase">
                  ACTIVE_LENS: [{current.id.toUpperCase()}]
                </span>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
