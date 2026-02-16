import type { Metadata } from 'next';
import JobsContent from './JobsContent';

export const metadata: Metadata = {
  title: 'Job Openings | Career Planet',
  description: 'Explore the latest career opportunities in Banking, Insurance, and Financial Services across India. Apply now for positions at top companies.',
  openGraph: {
    title: 'Job Openings | Career Planet',
    description: 'Find your next career move in the Banking & Insurance sector.',
  }
};

export default function JobsPage() {
  return <JobsContent />;
}
