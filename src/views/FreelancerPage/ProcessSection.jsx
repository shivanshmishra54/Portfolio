import React from 'react';
import { motion } from 'framer-motion';
import { freelancerProcess } from '../../data/services';

export function ProcessSection() {
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
          <p className="text-xs font-mono tracking-[0.3em] text-gray-500 uppercase mb-4">Process</p>
          <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-gray-900 dark:text-white uppercase mb-4">
            How I Work
          </h2>
          <p className="text-lg font-light text-gray-600 dark:text-gray-400 max-w-2xl">
            From your first message to the final deployment — a clear, structured process.
          </p>
        </motion.div>

        {/* Process Steps */}
        <div className="relative">
          {/* Vertical connecting line (desktop only) */}
          <div className="hidden md:block absolute left-[39px] top-0 bottom-0 w-[1px] bg-gray-200 dark:bg-gray-800" />

          <div className="space-y-6 md:space-y-0">
            {freelancerProcess.map((step, index) => (
              <motion.div
                key={step.id}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="relative flex gap-6 md:gap-8 md:py-8"
              >
                {/* Step Number */}
                <div className="relative z-10 flex-shrink-0 w-20 h-20 flex items-center justify-center rounded-2xl bg-white dark:bg-gray-950 border border-gray-200 dark:border-gray-800">
                  <span className="text-2xl font-bold text-gray-900 dark:text-white font-mono">
                    {String(step.step).padStart(2, '0')}
                  </span>
                </div>

                {/* Content */}
                <div className="flex-1 pt-2">
                  <h3 className="text-xl md:text-2xl font-bold tracking-tight text-gray-900 dark:text-white mb-3">
                    {step.title}
                  </h3>
                  <p className="text-sm md:text-base text-gray-600 dark:text-gray-400 leading-relaxed mb-4 max-w-lg">
                    {step.description}
                  </p>
                  
                  {/* Details */}
                  <div className="flex flex-wrap gap-2">
                    {step.details.map((detail, i) => (
                      <span key={i} className="text-xs px-3 py-1.5 rounded-full border border-gray-200 dark:border-gray-800 text-gray-600 dark:text-gray-400">
                        {detail}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
