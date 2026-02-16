import type { Metadata } from 'next';
import ContactContent from './ContactContent';

export const metadata: Metadata = {
  title: 'Contact Us | Career Planet',
  description: 'Connect with Career Planet for recruitment needs or job inquiries. Call us, send an email, or chat on WhatsApp.',
  openGraph: {
    title: 'Contact Career Planet',
    description: 'Get in touch with the Banking & Insurance recruitment experts.',
  }
};

export default function ContactPage() {
  return <ContactContent />;
}