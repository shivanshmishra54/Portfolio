import { Helmet } from 'react-helmet-async';
import { profile } from '../../data/profile';
import { useLocation } from 'react-router-dom';
import { useTheme } from 'next-themes';
import { useEffect } from 'react';

export function SEOHead({ 
  title, 
  description, 
  image, 
  type = "website",
  jsonLd 
}) {
  const location = useLocation();
  const { resolvedTheme } = useTheme();
  const canonicalUrl = `https://shivanshmishra.com${location.pathname}`;
  
  const siteTitle = title ? `${title} | ${profile.name}` : profile.seo.title;
  const siteDescription = description || profile.seo.description;
  const siteImage = image || profile.seo.ogImage;

  // Update favicon dynamically without relying purely on Helmet to avoid flashing
  useEffect(() => {
    const favicon = document.getElementById('dynamic-favicon');
    if (favicon) {
      favicon.href = resolvedTheme === 'dark' ? '/favicon-dark.svg' : '/favicon-light.svg';
    }
  }, [resolvedTheme]);

  return (
    <Helmet>
      <title>{siteTitle}</title>
      <meta name="description" content={siteDescription} />
      <link rel="canonical" href={canonicalUrl} />


      {/* Open Graph / Facebook */}
      <meta property="og:type" content={type} />
      <meta property="og:url" content={canonicalUrl} />
      <meta property="og:title" content={siteTitle} />
      <meta property="og:description" content={siteDescription} />
      <meta property="og:image" content={siteImage} />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:url" content={canonicalUrl} />
      <meta name="twitter:title" content={siteTitle} />
      <meta name="twitter:description" content={siteDescription} />
      <meta name="twitter:image" content={siteImage} />

      {jsonLd && (
        <script type="application/ld+json">
          {JSON.stringify(jsonLd)}
        </script>
      )}
    </Helmet>
  );
}
