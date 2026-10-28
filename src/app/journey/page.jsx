import JourneyPage from '../../views/JourneyPage';

export const metadata = {
  title: 'Engineering Journey — Milestones & Growth',
  description:
    'Chronological journey of Shivansh Mishra — from foundational algorithms and academic excellence to production microservices and open source contributions.',
  alternates: {
    canonical: '/journey',
  },
  openGraph: {
    title: 'Engineering Journey — Milestones & Growth | Shivansh Mishra',
    description:
      'Chronological journey of Shivansh Mishra — from foundational algorithms and academic excellence to production microservices and open source contributions.',
    url: 'https://shivansh-mishra.netlify.app/journey',
    images: [{ url: '/hero-editorial.webp', width: 1200, height: 630, alt: 'Shivansh Mishra Engineering Journey' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Engineering Journey — Milestones & Growth | Shivansh Mishra',
    description:
      'Milestones and engineering growth of Shivansh Mishra from algorithms to production microservices.',
    images: ['/hero-editorial.webp'],
  },
};

export default function Page() {
  return <JourneyPage />;
}
