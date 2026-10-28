import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  compress: true,
  poweredByHeader: false,
  trailingSlash: false,
  images: {
    unoptimized: true,
  },
  sassOptions: {
    includePaths: [path.join(__dirname, 'src/styles')],
  },
  env: {
    NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY:
      process.env.VITE_WEB3FORMS_ACCESS_KEY ||
      process.env.NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY ||
      '319cf23f-b091-4f65-8a31-920030bdde78',
  },
  async redirects() {
    return [
      {
        source: '/in-motion',
        destination: '/3d-lab',
        permanent: true,
      },
      {
        source: '/lab',
        destination: '/3d-lab',
        permanent: true,
      },
      {
        source: '/certifications',
        destination: '/developer#certifications',
        permanent: true,
      },
      {
        source: '/certificates',
        destination: '/developer#certifications',
        permanent: true,
      },
      {
        source: '/projects',
        destination: '/developer#projects',
        permanent: true,
      },
      {
        source: '/about',
        destination: '/developer',
        permanent: true,
      },
      {
        source: '/experience',
        destination: '/developer#experience',
        permanent: true,
      },
      {
        source: '/education',
        destination: '/developer#education',
        permanent: true,
      },
      {
        source: '/skills',
        destination: '/developer#skills',
        permanent: true,
      },
      {
        source: '/contact',
        destination: '/developer#contact',
        permanent: true,
      },
      {
        source: '/services',
        destination: '/freelancer#services',
        permanent: true,
      },
      {
        source: '/work',
        destination: '/freelancer#work',
        permanent: true,
      },
      {
        source: '/resume',
        destination: '/Shivansh_Mishra_resume_f1.pdf',
        permanent: false,
      },
      {
        source: '/cv',
        destination: '/Shivansh_Mishra_resume_f1.pdf',
        permanent: false,
      },
      {
        source: '/github',
        destination: 'https://github.com/shivanshmishra54',
        permanent: false,
      },
      {
        source: '/linkedin',
        destination: 'https://www.linkedin.com/in/shivansh-mishra54',
        permanent: false,
      },
      {
        source: '/leetcode',
        destination: 'https://leetcode.com/u/shivanshmishra54/',
        permanent: false,
      },
    ];
  },
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          {
            key: 'X-DNS-Prefetch-Control',
            value: 'on',
          },
          {
            key: 'Strict-Transport-Security',
            value: 'max-age=63072000; includeSubDomains; preload',
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'X-Frame-Options',
            value: 'SAMEORIGIN',
          },
          {
            key: 'X-XSS-Protection',
            value: '1; mode=block',
          },
          {
            key: 'Referrer-Policy',
            value: 'strict-origin-when-cross-origin',
          },
          {
            key: 'Permissions-Policy',
            value: 'camera=(), microphone=(), geolocation=()',
          },
        ],
      },
      {
        source: '/_next/static/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
      {
        source: '/character/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
      {
        source: '/certificates/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
    ];
  },
};

export default nextConfig;
