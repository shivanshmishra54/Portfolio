export const metadata = {
  title: 'In Motion — 3D Narrative Odyssey',
  description:
    'Scroll-synchronized 3D particle transformation journey of Shivansh Mishra across 7 verified engineering chapters.',
  alternates: {
    canonical: '/3d-lab',
  },
  openGraph: {
    title: 'In Motion — 3D Narrative Odyssey | Shivansh Mishra',
    description:
      'Scroll-synchronized 3D particle transformation journey of Shivansh Mishra across 7 verified engineering chapters.',
    url: 'https://shivansh-mishra.netlify.app/3d-lab',
    type: 'website',
    images: [
      {
        url: '/hero-editorial.webp',
        width: 1200,
        height: 630,
        alt: 'Shivansh Mishra — In Motion 3D Odyssey',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'In Motion — 3D Narrative Odyssey | Shivansh Mishra',
    description:
      'Scroll-synchronized 3D particle transformation journey of Shivansh Mishra across 7 verified engineering chapters.',
    images: ['/hero-editorial.webp'],
  },
};

export default function ThreeLabLayout({ children }) {
  return children;
}
