'use client';

import React from 'react';

/**
 * PageTransition wrapper
 * Passthrough container that avoids double-nested Framer Motion transforms
 * while template.jsx handles route-level entrance and ScrollToTop handles resets.
 */
export function PageTransition({ children }) {
  return <div className="w-full h-full flex flex-col">{children}</div>;
}
