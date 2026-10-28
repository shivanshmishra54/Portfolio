import React from 'react';
import { motion } from 'framer-motion';
import { useReducedMotion } from '../../components/3d/hooks/useReducedMotion';

export function ScrollReveal({ 
  children, 
  delay = 0, 
  yOffset = 24,
  duration = 0.75,
  className = ""
}) {
  const prefersReducedMotion = useReducedMotion();

  if (prefersReducedMotion) {
    return (
      <div className={className}>
        {children}
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: yOffset }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration, delay, ease: [0.16, 1, 0.3, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
