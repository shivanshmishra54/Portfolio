import React from 'react';
import { motion } from 'framer-motion';
import { SectionHeading } from '../../components/shared/SectionHeading';
import { skills } from '../../data/skills';

export function CapabilitiesSection() {
  // Extract key capability areas from the skills data
  const capabilities = skills.slice(0, 4).map(group => ({
    title: group.category,
    items: group.items.map(i => i.name).join(', ')
  }));

  return (
    <section className="py-24 md:py-32 bg-gray-50 dark:bg-black border-y border-gray-200 dark:border-gray-900">
      <div className="container mx-auto px-6 max-w-7xl">
        <SectionHeading 
          title="Quick Capabilities" 
          subtitle="The technical foundation and expertise I bring to the table."
          className="text-center flex flex-col items-center"
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {capabilities.map((cap, idx) => (
            <motion.div
              key={cap.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className="group p-8 rounded-2xl bg-white dark:bg-gray-950 border border-gray-100 dark:border-gray-800 hover:border-gray-300 dark:hover:border-gray-700 transition-colors"
            >
              <h3 className="text-xl font-bold tracking-tight text-gray-900 dark:text-white mb-4 uppercase">
                {cap.title}
              </h3>
              <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed font-mono">
                {cap.items}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
