/**
 * Next.js Dynamic Sitemap Generator
 * Generates an SEO-optimized sitemap for search crawlers.
 */
export default function sitemap() {
  const baseUrl = 'https://shivansh-mishra.netlify.app';
  const lastModified = new Date();

  return [
    {
      url: `${baseUrl}`,
      lastModified,
      changeFrequency: 'weekly',
      priority: 1.0,
    },
    {
      url: `${baseUrl}/developer`,
      lastModified,
      changeFrequency: 'monthly',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/freelancer`,
      lastModified,
      changeFrequency: 'monthly',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/journey`,
      lastModified,
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/3d-lab`,
      lastModified,
      changeFrequency: 'monthly',
      priority: 0.8,
    },
  ];
}
