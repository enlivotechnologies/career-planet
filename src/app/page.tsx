import Hero from "@/components/Hero";
import TrustedCompanies from "@/components/TrustedCompanies";
import WhoWeAre from "@/components/WhoWeAre";
import Vision from "@/components/Vision";
import WhoWeServe from "@/components/WhoWeServe";
import CurrentOpportunities from "@/components/CurrentOpportunities";
import CTASection from "@/components/CTASection";

export default function Home() {
  return (
    <main>
      <Hero />
      <TrustedCompanies />
      <WhoWeAre />
      <Vision />
      {/* New Sections */}
      <WhoWeServe />
      <CurrentOpportunities />
      <CTASection />
    </main>
  );
}
