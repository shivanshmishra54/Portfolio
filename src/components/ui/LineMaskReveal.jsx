import React from 'react';
import { motion } from 'framer-motion';

/**
 * LineMaskReveal: Editorial mask reveal animation
 * Text slides up from behind an overflow-hidden wrapper
 */
export function LineMaskReveal({ 
  children, 
  className = '', 
  delay = 0,
  duration = 0.8,
  yOffset = '105%' 
}) {
  return (
    <span className={`inline-block overflow-hidden pb-1 -mb-1 align-bottom ${className}`}>
      <motion.span
        initial={{ y: yOffset, opacity: 0 }}
        whileInView={{ y: '0%', opacity: 1 }}
        viewport={{ once: true }}
        transition={{
          duration,
          delay,
          ease: [0.16, 1, 0.3, 1], // Custom smooth editorial cubic-bezier
        }}
        className="inline-block"
      >
        {children}
      </motion.span>
    </span>
  );
}
