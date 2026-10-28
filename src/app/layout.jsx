import '../assets/css/index.css';
import '../styles/editorial.scss';
import { Navigation } from '../components/layout/Navigation';
import { Footer } from '../components/layout/Footer';
import { Providers } from './providers';

export const metadata = {
  metadataBase: new URL('https://shivansh-mishra.netlify.app'),
  title: {
    default: 'Shivansh Mishra — Systems Architect & Full-Stack Developer',
    template: '%s | Shivansh Mishra',
  },
  description:
    'Personal portfolio of Shivansh Mishra — Systems Architect and Full-Stack Developer. Building resilient microservices, low-latency engines, and high-impact web apps.',
  authors: [{ name: 'Shivansh Mishra', url: 'https://shivansh-mishra.netlify.app' }],
  creator: 'Shivansh Mishra',
  keywords: [
    'Shivansh Mishra',
    'Systems Architect',
    'Full Stack Developer',
    'Software Engineer',
    'Spring Boot',
    'React',
    'Next.js',
    'Distributed Systems',
    'Kafka',
    'Redis',
    'Freelance Developer',
    'Portfolio',
  ],
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  icons: {
    icon: '/favicon-light.svg',
    shortcut: '/favicon-light.svg',
    apple: '/favicon-light.svg',
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://shivansh-mishra.netlify.app',
    title: 'Shivansh Mishra — Systems Architect & Full-Stack Developer',
    description:
      'Personal portfolio of Shivansh Mishra — Systems Architect and Full-Stack Developer. Building resilient microservices, low-latency engines, and high-impact web apps.',
    siteName: 'Shivansh Mishra Portfolio',
    images: [
      {
        url: '/hero-editorial.webp',
        width: 1200,
        height: 630,
        alt: 'Shivansh Mishra — Systems Architect & Full-Stack Developer',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Shivansh Mishra — Systems Architect & Full-Stack Developer',
    description:
      'Personal portfolio of Shivansh Mishra — Systems Architect and Full-Stack Developer.',
    images: ['/hero-editorial.webp'],
  },
  alternates: {
    canonical: '/',
  },
};

export const viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  themeColor: '#030303',
};

const jsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'Person',
      '@id': 'https://shivansh-mishra.netlify.app/#person',
      name: 'Shivansh Mishra',
      jobTitle: 'Systems Architect & Full-Stack Developer',
      url: 'https://shivansh-mishra.netlify.app',
      image: 'https://shivansh-mishra.netlify.app/hero-editorial.webp',
      email: 'shivansh54mishra@gmail.com',
      sameAs: [
        'https://github.com/shivanshmishra54',
        'https://www.linkedin.com/in/shivansh-mishra54',
        'https://leetcode.com/u/shivanshmishra54/',
        'https://www.youtube.com/@ShivanshMishra54',
        'https://www.codechef.com/users/shivansh54may',
        'https://codeforces.com/profile/shivanshmishra55',
      ],
      alumniOf: {
        '@type': 'EducationalOrganization',
        name: 'K.J. Somaiya Institute of Technology',
      },
      knowsAbout: [
        'Distributed Systems',
        'Java & Spring Boot',
        'React & Next.js',
        'Apache Kafka',
        'Redis',
        'Microservices Architecture',
        'RESTful API Design',
        'High Performance Computing',
      ],
    },
    {
      '@type': 'WebSite',
      '@id': 'https://shivansh-mishra.netlify.app/#website',
      url: 'https://shivansh-mishra.netlify.app',
      name: 'Shivansh Mishra Portfolio',
      description:
        'Personal portfolio of Shivansh Mishra — Systems Architect and Full-Stack Developer.',
      publisher: {
        '@id': 'https://shivansh-mishra.netlify.app/#person',
      },
      inLanguage: 'en-US',
    },
    {
      '@type': 'ProfilePage',
      '@id': 'https://shivansh-mishra.netlify.app/#webpage',
      url: 'https://shivansh-mishra.netlify.app',
      name: 'Shivansh Mishra — Systems Architect & Full-Stack Developer',
      isPartOf: {
        '@id': 'https://shivansh-mishra.netlify.app/#website',
      },
      mainEntity: {
        '@id': 'https://shivansh-mishra.netlify.app/#person',
      },
    },
  ],
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="dark scroll-smooth">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="min-h-screen bg-[#030303] text-[#f1eee8] font-sans antialiased selection:bg-white selection:text-black">
        <Providers>
          <div className="min-h-screen w-full max-w-full overflow-x-clip flex flex-col bg-[#030303] text-[#f1eee8]">
            <Navigation />
            <main className="flex-grow flex flex-col w-full max-w-full overflow-x-clip">
              {children}
            </main>
            <Footer />
          </div>
        </Providers>
      </body>
    </html>
  );
}
