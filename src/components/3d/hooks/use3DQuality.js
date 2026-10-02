import { useState, useEffect } from 'react';

export function use3DQuality() {
  const [quality, setQuality] = useState('HIGH'); // HIGH, MEDIUM, LOW

  useEffect(() => {
    // Basic quality detection
    // In a real scenario, use detect-gpu or similar
    const checkQuality = async () => {
      let tier = 'HIGH';
      
      // Simple mobile detection as a proxy for performance
      const isMobile = window.innerWidth <= 768;
      
      // Adjust based on devicePixelRatio and rough heuristics
      if (isMobile) {
        tier = window.devicePixelRatio > 2 ? 'MEDIUM' : 'LOW';
      } else {
        tier = window.devicePixelRatio > 1.5 ? 'HIGH' : 'MEDIUM';
      }

      setQuality(tier);
    };

    checkQuality();
  }, []);

  return quality;
}
