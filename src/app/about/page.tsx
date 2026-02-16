import type { Metadata } from 'next';
import AboutContent from './AboutContent';

export const metadata: Metadata = {
  title: 'About Us | Career Planet',
  description: 'Learn about Career Planet, India\'s premier recruitment consultancy for the Banking & Insurance sectors. Meet our leadership team and discover our mission.',
  openGraph: {
    title: 'About Career Planet',
    description: 'We are more than just recruiters. We are career architects for financial talent.',
  }
};

export default function AboutPage() {
  return <AboutContent />;
}