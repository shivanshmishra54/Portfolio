'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { profile } from '../../data/profile';
import { useReducedMotion } from '../../components/3d/hooks/useReducedMotion';
import { AnimeTextReveal } from '../../components/ui/AnimeTextReveal';
import { Terminal, BrainCircuit, GitMerge, ExternalLink } from 'lucide-react';
import { SiCodechef, SiCodeforces, SiLeetcode } from 'react-icons/si';

export function ProblemSolvingSection() {
  const prefersReducedMotion = useReducedMotion();

  return (
    <section className="py-24 md:py-32 bg-[#030303] text-[#f1eee8] border-b border-white/[0.08]">
      <div className="container mx-auto px-6 max-w-7xl">
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          
          <div>
            <div className="flex items-center gap-2.5 mb-3 text-xs font-mono tracking-[0.2em] uppercase text-[#aaa9a4]">
              <span className="w-2 h-2 rounded-full bg-[#f97316] animate-pulse shadow-[0_0_8px_rgba(249,115,22,0.6)]" />
              <span className="text-[#f97316]/90 font-medium">05 / ALGORITHMIC RIGOR</span>
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-serif font-normal tracking-tight text-[#f1eee8] leading-[1.08] mb-6">
              <AnimeTextReveal trigger="visible">Problem Solving &amp; DSA</AnimeTextReveal>
            </h2>
            <p className="text-[#aaa9a4] font-light text-base md:text-lg mb-8 leading-relaxed">
              A rigorous foundation in Data Structures and Algorithms is crucial for writing efficient, low-latency, and scalable systems. My problem-solving practice involves actively tackling algorithmic patterns and mastering core computer science fundamentals.
            </p>
            
            <div className="flex flex-wrap items-center gap-3">
              {profile.social.leetcode && (
                <a 
                  href={profile.social.leetcode} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2.5 px-4 py-2.5 rounded-full border border-white/[0.08] bg-[#0c0c0c] text-[#f1eee8] hover:border-white/[0.25] transition-colors text-xs font-mono uppercase tracking-wider"
                >
                  <SiLeetcode className="w-4 h-4 text-[#FFA116]" />
                  <span>LeetCode</span>
                  <ExternalLink size={12} className="opacity-60" />
                </a>
              )}
              {profile.social.codeforces && (
                <a 
                  href={profile.social.codeforces} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2.5 px-4 py-2.5 rounded-full border border-white/[0.08] bg-[#0c0c0c] text-[#f1eee8] hover:border-white/[0.25] transition-colors text-xs font-mono uppercase tracking-wider"
                >
                  <SiCodeforces className="w-4 h-4 text-blue-400" />
                  <span>Codeforces</span>
                  <ExternalLink size={12} className="opacity-60" />
                </a>
              )}
              {profile.social.codechef && (
                <a 
                  href={profile.social.codechef} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2.5 px-4 py-2.5 rounded-full border border-white/[0.08] bg-[#0c0c0c] text-[#f1eee8] hover:border-white/[0.25] transition-colors text-xs font-mono uppercase tracking-wider"
                >
                  <SiCodechef className="w-4 h-4 text-amber-500" />
                  <span>CodeChef</span>
                  <ExternalLink size={12} className="opacity-60" />
                </a>
              )}
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 sm:gap-6">
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: prefersReducedMotion ? 0 : 0.1 }}
              className="p-8 rounded-2xl bg-[#0c0c0c] border border-white/[0.08] hover:border-white/[0.22] transition-colors"
            >
              <BrainCircuit className="w-7 h-7 text-[#f1eee8] mb-5 opacity-90" />
              <h3 className="text-2xl font-serif font-normal text-[#f1eee8] mb-2">200+ Solved</h3>
              <p className="text-xs font-mono text-[#aaa9a4] leading-relaxed">Systematically solved across arrays, dynamic programming, trees, and graphs on LeetCode with optimal time & space complexity.</p>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: prefersReducedMotion ? 0 : 0.2 }}
              className="p-8 rounded-2xl bg-[#0c0c0c] border border-white/[0.08] hover:border-white/[0.22] transition-colors"
            >
              <Terminal className="w-7 h-7 text-[#f1eee8] mb-5 opacity-90" />
              <h3 className="text-2xl font-serif font-normal text-[#f1eee8] mb-2">Core CS Foundations</h3>
              <p className="text-xs font-mono text-[#aaa9a4] leading-relaxed">Deep understanding of Object-Oriented Design, Relational Database Management Systems, Operating Systems, and Networking.</p>
            </motion.div>
          </div>

        </div>

      </div>
    </section>
  );
}
