import React from 'react';
import { motion } from 'framer-motion';

export function SectionHeading({ title, subtitle, className = "" }) {
  return (
    <div className={`mb-12 md:mb-20 ${className}`}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.5 }}
      >
        <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-gray-900 dark:text-white uppercase">
          {title}
        </h2>
        {subtitle && (
          <p className="mt-4 text-lg text-gray-600 dark:text-gray-400 max-w-2xl font-light">
            {subtitle}
          </p>
        )}
      </motion.div>
    </div>
  );
}
