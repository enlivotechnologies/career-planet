import React from "react";

export default function TrustedCompanies() {
  const companies = [
    "HDFC Life",
    "SBI Life",
    "Bajaj Allianz",
    "Muthoot Finance",
    "Tata Capital"
  ];

  return (
    <section className="w-full bg-white py-14">
      <div className="max-w-[1600px] mx-auto px-6 md:px-16 flex flex-col md:flex-row items-center gap-8 md:gap-14">
        
        {/* Left Side: Professional Context */}
        <div className="flex-shrink-0">
          <p className="text-[14px] md:text-[15px] font-bold text-[#1A1A1A] leading-tight tracking-tight text-center md:text-left">
            Strategic recruitment partners <br className="hidden md:block" /> 
            for India's financial leaders
          </p>
        </div>

        {/* The Signature Horizontal Divider - Exactly as per reference */}
        <div className="hidden md:block w-20 h-[1px] bg-gray-200"></div>

        {/* Partner Branding Strip */}
        <div className="flex flex-wrap items-center justify-center md:justify-between flex-grow gap-x-12 gap-y-10">
          {companies.map((company, index) => (
            <span 
              key={index}
              className="text-[18px] md:text-[21px] font-bold text-[#1A1A1A] opacity-30 hover:opacity-100 transition-all duration-500 cursor-default tracking-tighter"
            >
              {/* Modern lowercase branding style for a 'logo' feel */}
              {company.toLowerCase().replace(/\s+/g, '')}
            </span>
          ))}
        </div>

      </div>
    </section>
  );
}