import React from "react";

export default function IdentitySection() {
  const features = [
    { title: "Industry Expertise", description: "Deep-domain specialized focus on the Life Insurance & NBFC recruitment ecosystem." },
    { title: "Strategic Consulting", description: "End-to-end management of the recruitment lifecycle for long-term growth." },
    { title: "Quality Commitment", description: "Rigorous vetting processes ensuring only elite talent reaches your organization." },
    { title: "Skilled Screening", description: "Multi-layered technical and cultural evaluation to ensure a seamless fit." },
    { title: "Elite Talent Pool", description: "Exclusive access to India's most comprehensive finance and insurance database." },
    { title: "Dedicated Support", description: "A committed support team providing 360° transparency throughout the process." }
  ];

  return (
    <section id="services" className="w-full bg-white py-12 md:py-20">
      <div className="max-w-[1600px] mx-auto px-4 sm:px-6">
        
        {/* Main Content Card: Premium Light Gray */}
        <div className="bg-[#F6F6F6] rounded-[48px] p-10 md:p-20 border border-gray-100/50">
          
          {/* Header Layout: Precise 12-Column Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-y-12 lg:gap-x-16 mb-28 items-start">
            
            {/* Left Column: Refined Headline */}
            <div className="lg:col-span-7">
              <div className="flex items-center gap-5 mb-10">
                <span className="text-[10px] uppercase tracking-[0.5em] font-medium text-gray-400 whitespace-nowrap">
                  Our Identity
                </span>
                <div className="h-[1px] w-16 bg-gray-300"></div>
              </div>
              
              <h2 className="text-[36px] sm:text-[48px] md:text-[54px] lg:text-[60px] font-medium text-black leading-[1.08] tracking-tighter">
                Your Trusted Recruitment <br className="hidden md:block" />
                Partner.
              </h2>
            </div>
            
            {/* Right Column: Aligned Description */}
            <div className="lg:col-span-5 lg:pt-[112px]"> 
              <div className="max-w-md">
                <p className="text-[16px] md:text-[18px] text-gray-500 font-normal leading-relaxed tracking-tight">
                  Career Planet specializes in precision hiring for Life Insurance and
                  NBFC sectors, bridging the gap between high-caliber talent and 
                  India's leading financial institutions.
                </p>
              </div>
            </div>
          </div>

          {/* Grid Layout: Inner Architectural Lines Only */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
            {features.map((feature, index) => (
              <div 
                key={index} 
                className={`
                  p-8 md:p-10 
                  /* Internal Vertical Lines (Right) */
                  lg:[&:not(:nth-child(3n))]:border-r md:[&:not(:nth-child(2n))]:border-r border-gray-200/60
                  /* Internal Horizontal Lines (Bottom) */
                  border-b border-gray-200/60 lg:[&:nth-last-child(-n+3)]:border-b-0 md:[&:nth-last-child(-n+2)]:border-b-0 sm:[&:last-child]:border-b-0
                `}
              >
                <div className="mb-8 flex items-center gap-4">
                   <div className="w-1.5 h-1.5 rounded-full bg-black"></div>
                   <span className="text-[10px] font-bold text-gray-300 uppercase tracking-[0.3em]">
                     0{index + 1}
                   </span>
                </div>
                
                <h3 className="text-[18px] font-medium text-black mb-3 tracking-tight">
                  {feature.title}
                </h3>
                <p className="text-gray-500 text-[13px] md:text-[14px] leading-relaxed font-light">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
}