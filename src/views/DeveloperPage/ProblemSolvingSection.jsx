import React from 'react';
import { motion } from 'framer-motion';
import { profile } from '../../data/profile';
import { useReducedMotion } from '../../components/3d/hooks/useReducedMotion';
import { Terminal, BrainCircuit, GitMerge, ExternalLink } from 'lucide-react';
import { SiCodechef, SiCodeforces, SiLeetcode } from 'react-icons/si';

export function ProblemSolvingSection() {
  const prefersReducedMotion = useReducedMotion();

  return (
    <section className="py-24 bg-white dark:bg-[#0a0a0a] border-t border-gray-100 dark:border-gray-900">
      <div className="container mx-auto px-6 max-w-7xl">
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          
          <div>
            <div className="flex items-center gap-4 mb-4">
              <span className="h-[1px] w-8 bg-gray-900 dark:bg-white"></span>
              <span className="text-sm font-bold tracking-[0.2em] uppercase text-gray-900 dark:text-white">Computer Science</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold tracking-tighter text-gray-900 dark:text-white mb-6">
              Problem Solving & DSA
            </h2>
            <p className="text-gray-600 dark:text-gray-400 font-light text-base md:text-lg mb-8 leading-relaxed">
              Strong foundation in Data Structures and Algorithms is crucial for writing efficient, optimized, and scalable software. My problem-solving journey involves actively tackling algorithmic challenges and mastering core computer science fundamentals.
            </p>
            
            <div className="flex flex-wrap items-center gap-3">
              {profile.social.leetcode && (
                <a 
                  href={profile.social.leetcode} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2.5 px-4 py-3 rounded-lg border border-gray-200 dark:border-neutral-800 bg-gray-50 dark:bg-neutral-900 text-gray-900 dark:text-white hover:bg-gray-100 dark:hover:bg-neutral-800 transition-colors font-medium text-xs uppercase tracking-wider"
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
                  className="inline-flex items-center gap-2.5 px-4 py-3 rounded-lg border border-gray-200 dark:border-neutral-800 bg-gray-50 dark:bg-neutral-900 text-gray-900 dark:text-white hover:bg-gray-100 dark:hover:bg-neutral-800 transition-colors font-medium text-xs uppercase tracking-wider"
                >
                  <SiCodeforces className="w-4 h-4 text-blue-500" />
                  <span>Codeforces</span>
                  <ExternalLink size={12} className="opacity-60" />
                </a>
              )}
              {profile.social.codechef && (
                <a 
                  href={profile.social.codechef} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2.5 px-4 py-3 rounded-lg border border-gray-200 dark:border-neutral-800 bg-gray-50 dark:bg-neutral-900 text-gray-900 dark:text-white hover:bg-gray-100 dark:hover:bg-neutral-800 transition-colors font-medium text-xs uppercase tracking-wider"
                >
                  <SiCodechef className="w-4 h-4 text-amber-700 dark:text-amber-500" />
                  <span>CodeChef</span>
                  <ExternalLink size={12} className="opacity-60" />
                </a>
              )}
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: prefersReducedMotion ? 0 : 0.1 }}
              className="p-8 bg-gray-50 dark:bg-[#111] border border-gray-200 dark:border-gray-800"
            >
              <BrainCircuit className="w-8 h-8 text-purple-500 mb-6" />
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">200+ Problems</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">Solved across various algorithmic domains on LeetCode, focusing on optimal time & space complexity.</p>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: prefersReducedMotion ? 0 : 0.2 }}
              className="p-8 bg-gray-50 dark:bg-[#111] border border-gray-200 dark:border-gray-800"
            >
              <Terminal className="w-8 h-8 text-green-500 mb-6" />
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">Core CS</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">Deep understanding of Object-Oriented Programming, Database Management Systems, and Operating Systems.</p>
            </motion.div>
          </div>

        </div>

      </div>
    </section>
  );
}
