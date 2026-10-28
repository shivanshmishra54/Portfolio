'use client';
import { profile } from '../../data/profile';
import { useTheme } from 'next-themes';
import { useEffect } from 'react';

export function SEOHead({ 
  title, 
  description, 
  image, 
  type = "website",
  jsonLd 
}) {
  const { resolvedTheme } = useTheme();

  // Update document title and favicon dynamically in client
  useEffect(() => {
    if (typeof document !== 'undefined') {
      const siteTitle = title ? `${title} | ${profile.name}` : profile.seo.title;
      document.title = siteTitle;
      const favicon = document.getElementById('dynamic-favicon');
      if (favicon) {
        favicon.href = resolvedTheme === 'dark' ? '/favicon-dark.svg' : '/favicon-light.svg';
      }
    }
  }, [title, resolvedTheme]);

  return null;
}
