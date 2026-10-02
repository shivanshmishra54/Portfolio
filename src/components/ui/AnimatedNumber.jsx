import React, { useEffect, useRef, useState } from 'react';
import { motion, useInView, useMotionValue, useSpring } from 'framer-motion';
import { useReducedMotion } from '../3d/hooks/useReducedMotion';

export function AnimatedNumber({ value, duration = 2, className = "", format = true }) {
  const prefersReducedMotion = useReducedMotion();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });
  const [displayValue, setDisplayValue] = useState(prefersReducedMotion ? value : 0);

  // Use motion values for smooth animation
  const motionValue = useMotionValue(0);
  const springValue = useSpring(motionValue, {
    damping: 60,
    stiffness: 100,
    mass: 1,
    duration: duration * 1000,
  });

  useEffect(() => {
    if (prefersReducedMotion) {
      setDisplayValue(value);
      return;
    }

    if (isInView) {
      motionValue.set(value);
    }
  }, [isInView, value, prefersReducedMotion, motionValue]);

  useEffect(() => {
    if (prefersReducedMotion) return;
    
    // Subscribe to spring changes to update state
    const unsubscribe = springValue.on("change", (latest) => {
      setDisplayValue(Math.round(latest));
    });

    return () => unsubscribe();
  }, [springValue, prefersReducedMotion]);

  // Format large numbers (e.g., 1500 -> 1.5K, 150000 -> 150K)
  const formatNumber = (num) => {
    if (!format) return num.toLocaleString();
    if (num >= 1000000) return (num / 1000000).toFixed(1) + 'M';
    if (num >= 1000) return (num / 1000).toFixed(1) + 'K';
    return num.toLocaleString();
  };

  return (
    <span ref={ref} className={className}>
      {formatNumber(displayValue)}
    </span>
  );
}
