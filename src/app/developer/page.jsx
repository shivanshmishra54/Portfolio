import DeveloperPage from '../../views/DeveloperPage';

export const metadata = {
  title: 'Software Developer — Systems & Architecture',
  description:
    'Software engineering portfolio of Shivansh Mishra. Explore distributed microservices, low-latency Base-62 engines, competitive programming, and technical certifications.',
  alternates: {
    canonical: '/developer',
  },
  openGraph: {
    title: 'Software Developer — Systems & Architecture | Shivansh Mishra',
    description:
      'Software engineering portfolio of Shivansh Mishra. Explore distributed microservices, low-latency Base-62 engines, competitive programming, and technical certifications.',
    url: 'https://shivansh-mishra.netlify.app/developer',
    images: [{ url: '/hero-editorial.webp', width: 1200, height: 630, alt: 'Shivansh Mishra Developer Portfolio' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Software Developer — Systems & Architecture | Shivansh Mishra',
    description:
      'Explore distributed microservices, low-latency Base-62 engines, and technical certifications.',
    images: ['/hero-editorial.webp'],
  },
};

export default function Page() {
  return <DeveloperPage />;
}
