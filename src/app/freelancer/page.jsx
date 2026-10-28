import FreelancerPage from '../../views/FreelancerPage';

export const metadata = {
  title: 'Freelance Software Developer — Client Solutions & MVPs',
  description:
    'Hire Shivansh Mishra as a freelance software developer. Full-stack web applications, MVP architecture, high-converting digital products, and client solutions.',
  alternates: {
    canonical: '/freelancer',
  },
  openGraph: {
    title: 'Freelance Software Developer — Client Solutions & MVPs | Shivansh Mishra',
    description:
      'Hire Shivansh Mishra as a freelance software developer. Full-stack web applications, MVP architecture, high-converting digital products, and client solutions.',
    url: 'https://shivansh-mishra.netlify.app/freelancer',
    images: [{ url: '/hero-editorial.webp', width: 1200, height: 630, alt: 'Shivansh Mishra Freelance Solutions' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Freelance Software Developer — Client Solutions & MVPs | Shivansh Mishra',
    description:
      'Full-stack web applications, MVP architecture, and high-converting digital products.',
    images: ['/hero-editorial.webp'],
  },
};

export default function Page() {
  return <FreelancerPage />;
}
