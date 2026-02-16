import type { Metadata } from 'next';
import CompaniesContent from './CompaniesContent';

export const metadata: Metadata = {
  title: 'Hire Talent | Career Planet',
  description: 'Partner with Career Planet to find top talent for your company. Specialized recruitment for Insurance & Banking sectors.',
  openGraph: {
    title: 'Hire Top Talent | Career Planet',
    description: 'Connect with the best candidates in the Banking & Insurance industry.',
  }
};

export default function CompaniesPage() {
  return <CompaniesContent />;
}
