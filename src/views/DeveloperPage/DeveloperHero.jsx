import React from 'react';
import { motion } from 'framer-motion';
import { profile } from '../../data/profile';
import { Code2, Terminal, Database, Cpu } from 'lucide-react';

export function DeveloperHero() {
  return (
    <section className="relative w-full min-h-[90vh] flex flex-col justify-center bg-gray-50 dark:bg-black pt-32 pb-20 px-6 overflow-hidden">
      {/* Background technical pattern */}
      <div className="absolute inset-0 z-0 opacity-[0.03] dark:opacity-[0.05] pointer-events-none" 
           style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, currentColor 1px, transparent 0)', backgroundSize: '32px 32px' }}>
      </div>

      <div className="container mx-auto max-w-7xl relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="max-w-4xl"
        >
          <div className="flex items-center gap-4 mb-6">
            <span className="h-[1px] w-12 bg-gray-900 dark:bg-white"></span>
            <span className="text-sm font-bold tracking-[0.2em] uppercase text-gray-900 dark:text-white">Software Engineer</span>
          </div>
          
          <h1 className="text-5xl md:text-7xl font-bold tracking-tighter text-gray-900 dark:text-white leading-tight mb-8">
            Engineering scalable systems & clean architectures.
          </h1>
          
          <p className="text-lg md:text-xl text-gray-600 dark:text-gray-300 font-light leading-relaxed max-w-3xl mb-12">
            {profile.bio.full}
          </p>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-12 mt-16 pt-16 border-t border-gray-200 dark:border-gray-800">
            <div className="flex flex-col gap-3">
              <Terminal className="w-6 h-6 text-gray-400" />
              <h3 className="text-sm font-bold uppercase tracking-wider text-gray-900 dark:text-white">Backend</h3>
              <p className="text-sm text-gray-500 dark:text-gray-400">Java, Spring Boot, Microservices</p>
            </div>
            <div className="flex flex-col gap-3">
              <Code2 className="w-6 h-6 text-gray-400" />
              <h3 className="text-sm font-bold uppercase tracking-wider text-gray-900 dark:text-white">Frontend</h3>
              <p className="text-sm text-gray-500 dark:text-gray-400">React.js, Tailwind, Modern Web</p>
            </div>
            <div className="flex flex-col gap-3">
              <Database className="w-6 h-6 text-gray-400" />
              <h3 className="text-sm font-bold uppercase tracking-wider text-gray-900 dark:text-white">Database</h3>
              <p className="text-sm text-gray-500 dark:text-gray-400">MySQL, PostgreSQL, Redis</p>
            </div>
            <div className="flex flex-col gap-3">
              <Cpu className="w-6 h-6 text-gray-400" />
              <h3 className="text-sm font-bold uppercase tracking-wider text-gray-900 dark:text-white">Systems</h3>
              <p className="text-sm text-gray-500 dark:text-gray-400">OOP, DSA, OS, Architecture</p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
