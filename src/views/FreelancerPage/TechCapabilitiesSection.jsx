import React from 'react';
import { motion } from 'framer-motion';
import { skills } from '../../data/skills';

export function TechCapabilitiesSection() {
  // Filter to show only the skill categories most relevant to freelance clients
  const relevantCategories = skills.filter(cat => 
    ['backend', 'frontend', 'database', 'tools'].includes(cat.id)
  );

  return (
    <section className="py-24 md:py-32 bg-white dark:bg-black">
      <div className="container mx-auto px-6 max-w-6xl">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="mb-16 md:mb-20"
        >
          <p className="text-xs font-mono tracking-[0.3em] text-gray-500 uppercase mb-4">Technology</p>
          <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-gray-900 dark:text-white uppercase mb-4">
            Technical Stack
          </h2>
          <p className="text-lg font-light text-gray-600 dark:text-gray-400 max-w-2xl">
            The technologies I use to build reliable, maintainable software.
          </p>
        </motion.div>

        {/* Tech Categories */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {relevantCategories.map((category, catIndex) => (
            <motion.div
              key={category.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: catIndex * 0.1 }}
              className="p-8 rounded-2xl border border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-950"
            >
              <h3 className="text-sm font-mono tracking-widest text-gray-500 uppercase mb-6">
                {category.category}
              </h3>
              <div className="flex flex-wrap gap-3">
                {category.items.map((item) => (
                  <span
                    key={item.name}
                    className="text-sm px-4 py-2 rounded-lg bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 text-gray-800 dark:text-gray-200 font-medium"
                  >
                    {item.name}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
