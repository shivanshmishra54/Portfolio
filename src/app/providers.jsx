'use client';

import React, { useEffect, useState } from 'react';
import { ReactLenis } from 'lenis/react';
import { ContactProvider } from '../components/ui/ContactContext';
import { ScrollToTop } from '../components/layout/ScrollToTop';
import { ScrollTriggerConfig } from '../components/layout/ScrollTriggerConfig';

export function Providers({ children }) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <ReactLenis root options={{ lerp: 0.08, duration: 1.2, smoothWheel: true }}>
      <ScrollTriggerConfig />
      <ContactProvider>
        <ScrollToTop />
        {children}
      </ContactProvider>
    </ReactLenis>
  );
}
