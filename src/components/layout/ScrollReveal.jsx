import React from 'react';
import { motion } from 'framer-motion';
import { useReducedMotion } from '../../components/3d/hooks/useReducedMotion';

export function ScrollReveal({ 
  children, 
  delay = 0, 
  yOffset = 40,
  duration = 0.6,
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
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration, delay, ease: "easeOut" }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
