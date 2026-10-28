/**
 * Next.js Dynamic Robots Generator
 */
export default function robots() {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/private/'],
    },
    sitemap: 'https://shivansh-mishra.netlify.app/sitemap.xml',
    host: 'https://shivansh-mishra.netlify.app',
  };
}
