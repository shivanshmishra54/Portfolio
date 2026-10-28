'use client';

import React from 'react';
import { motion } from 'framer-motion';

/**
 * Route Transition Template (App Router)
 * Provides restrained, non-blocking page transitions between routes.
 * Avoids layout shifts and heavy full-screen blocking overlays.
 */
export default function Template({ children }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
      className="w-full flex-grow flex flex-col"
    >
      {children}
    </motion.div>
  );
}
