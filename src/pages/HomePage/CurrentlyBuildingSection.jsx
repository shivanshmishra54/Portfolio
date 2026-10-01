import React from 'react';
import { motion } from 'framer-motion';
import { SectionHeading } from '../../components/shared/SectionHeading';
import { profile } from '../../data/profile';

export function CurrentlyBuildingSection() {
  return (
    <section className="py-24 md:py-32 bg-white dark:bg-black border-t border-gray-200 dark:border-gray-900">
      <div className="container mx-auto px-6 max-w-7xl">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
          <div>
            <SectionHeading 
              title="Current Focus" 
              subtitle="What I am actively working on and learning." 
              className="mb-0"
            />
          </div>
          
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
            className="p-8 rounded-2xl bg-gray-50 dark:bg-gray-950 border border-gray-200 dark:border-gray-800"
          >
            <div className="flex items-center gap-4 mb-6">
              <div className="relative flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-gray-900 dark:bg-white opacity-40"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-gray-900 dark:bg-white"></span>
              </div>
              <span className="text-xs font-mono tracking-widest uppercase text-gray-500">Now</span>
            </div>
            
            <p className="text-xl md:text-2xl font-light leading-relaxed text-gray-800 dark:text-gray-200">
              {profile.currentFocus}
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
