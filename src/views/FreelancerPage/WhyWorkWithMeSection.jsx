import React from 'react';
import { motion } from 'framer-motion';
import { differentiators } from '../../data/services';

export function WhyWorkWithMeSection() {
  return (
    <section className="py-24 md:py-32 bg-gray-50 dark:bg-black">
      <div className="container mx-auto px-6 max-w-6xl">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="mb-16 md:mb-20"
        >
          <p className="text-xs font-mono tracking-[0.3em] text-gray-500 uppercase mb-4">Differentiators</p>
          <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-gray-900 dark:text-white uppercase">
            Why Work With Me
          </h2>
        </motion.div>

        {/* Differentiator List — editorial vertical layout */}
        <div className="space-y-0 border-t border-gray-200 dark:border-gray-800">
          {differentiators.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: index * 0.08 }}
              className="flex flex-col md:flex-row md:items-start gap-4 md:gap-12 py-8 border-b border-gray-200 dark:border-gray-800"
            >
              {/* Number */}
              <span className="text-xs font-mono text-gray-400 md:w-8 flex-shrink-0 pt-1">
                {String(index + 1).padStart(2, '0')}
              </span>
              
              {/* Title */}
              <h3 className="text-lg md:text-xl font-bold tracking-tight text-gray-900 dark:text-white md:w-72 flex-shrink-0">
                {item.title}
              </h3>
              
              {/* Description */}
              <p className="text-sm md:text-base text-gray-600 dark:text-gray-400 leading-relaxed flex-1">
                {item.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
