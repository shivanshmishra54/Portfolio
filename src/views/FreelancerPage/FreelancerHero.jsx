import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowDown, ArrowRight } from 'lucide-react';
import { profile } from '../../data/profile';

export function FreelancerHero() {
  return (
    <section className="relative w-full min-h-[90vh] flex items-center justify-center bg-gray-50 dark:bg-black pt-24 pb-16 overflow-hidden">
      {/* Subtle grid background */}
      <div className="absolute inset-0 opacity-[0.03] dark:opacity-[0.05]"
        style={{
          backgroundImage: 'linear-gradient(rgba(0,0,0,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(0,0,0,0.1) 1px, transparent 1px)',
          backgroundSize: '64px 64px'
        }}
      />

      <div className="relative z-10 container mx-auto px-6 max-w-5xl">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="flex flex-col items-center text-center"
        >
          {/* Eyebrow */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="text-xs font-mono tracking-[0.3em] text-gray-500 dark:text-gray-500 uppercase mb-8"
          >
            Freelance Software Developer
          </motion.p>

          {/* Main Headline */}
          <h1 className="text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-bold tracking-tighter text-gray-900 dark:text-white uppercase leading-[0.95] mb-6">
            I turn ideas
            <br />
            <span className="text-gray-400 dark:text-gray-600">into working</span>
            <br />
            software
          </h1>

          {/* Supporting statement */}
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="text-lg md:text-xl font-light text-gray-600 dark:text-gray-400 max-w-2xl mx-auto mb-12 leading-relaxed"
          >
            Full-stack development from concept to deployment. I build web applications, 
            backend systems, and APIs using React, Java, Spring Boot, and modern tools.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.5 }}
            className="flex flex-col sm:flex-row items-center gap-4"
          >
            <a
              href="#inquiry"
              className="inline-flex items-center gap-3 px-8 py-4 bg-gray-900 dark:bg-white text-white dark:text-black text-sm font-bold tracking-widest uppercase rounded-lg hover:opacity-85 transition-opacity"
            >
              Start a Project <ArrowRight size={16} />
            </a>
            <a
              href="#work"
              className="inline-flex items-center gap-3 px-8 py-4 border border-gray-300 dark:border-gray-700 text-gray-900 dark:text-white text-sm font-bold tracking-widest uppercase rounded-lg hover:bg-gray-100 dark:hover:bg-gray-900 transition-colors"
            >
              View My Work
            </a>
          </motion.div>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        >
          <span className="text-xs tracking-[0.2em] text-gray-400 uppercase font-medium">Explore</span>
          <motion.div
            animate={{ y: [0, 6, 0] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
          >
            <ArrowDown size={16} className="text-gray-400" />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
