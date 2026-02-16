import type { Metadata } from "next";
import Hero from "@/components/Hero";
import CompanyTagline from "@/components/CompanyTagline";
import TrustedCompanies from "@/components/TrustedCompanies";
import WhoWeAre from "@/components/WhoWeAre";
import Vision from "@/components/Vision";
import WhoWeServe from "@/components/WhoWeServe";
import CurrentOpportunities from "@/components/CurrentOpportunities";
import CTASection from "@/components/CTASection";

export const metadata: Metadata = {
  title: "Recruitment for Banking & Insurance Sector | Career Planet",
  description: "Identify and recruit top-tier financial talent with Career Planet. India's specialized recruitment consultancy for Insurance and NBFC sectors.",
  openGraph: {
    title: "Career Planet - Banking & Insurance Recruitment Experts",
    description: "Identify and recruit top-tier financial talent with Career Planet. India's specialized recruitment consultancy.",
  }
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "RecruitmentService",
  "name": "Career Planet",
  "url": "https://careerplanet.com",
  "logo": "https://careerplanet.com/logo/careerplanet-logo.png",
  "description": "Specialized Recruitment for Insurance & Banking Sector",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "1204, Cyber One, Sector 30, Vashi",
    "addressLocality": "Navi Mumbai",
    "addressRegion": "Maharashtra",
    "postalCode": "400703",
    "addressCountry": "IN"
  },
  "contactPoint": {
    "@type": "ContactPoint",
    "telephone": "+919739430055",
    "contactType": "customer service"
  }
};

export default function Home() {
  return (
    <main>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Hero />
      <CompanyTagline />
      {/* <TrustedCompanies /> */}
      <WhoWeAre />
      <Vision />
      {/* New Sections */}
      <WhoWeServe />
      <CurrentOpportunities />
      <CTASection />
    </main>
  );
}
