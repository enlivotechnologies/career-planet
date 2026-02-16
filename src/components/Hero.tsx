import React from "react";
import Link from "next/link";

export default function Hero() {
  return (
    <section className="w-full bg-white px-4 pb-10 pt-2">
      <div className="relative max-w-[1600px] mx-auto h-[580px] bg-[#f5f5f5] rounded-3xl overflow-hidden">
        
        {/* Background Image Layer */}
        <div className="absolute inset-0">
          <img 
            src="https://i.pinimg.com/736x/eb/ba/ec/ebbaec2aecfabf4f6f0742d5d138bd93.jpg" 
            alt="CareerPlanet Recruitment"
            className="w-full h-full object-cover object-center"
          />
          <div className="absolute inset-0 bg-black/40 md:bg-gradient-to-r md:from-black/70 md:via-black/20 md:to-transparent" />
        </div>

        {/* Content Layer */}
        <div className="relative z-10 h-full flex flex-col justify-center px-6 md:px-24">
          {/* Increased max-width to 4xl (approx 896px) to let the headline breathe */}
          <div className="max-w-4xl pt-10 md:pt-0">
            <h1 className="text-[32px] sm:text-[40px] md:text-5xl lg:text-[64px] font-medium text-white mb-4 md:mb-5 leading-[1.1] tracking-tight">
              Specialized Recruitment  <br className="hidden xl:block" />
              for Insurance & Banking Sector
            </h1>
            
            <p className="text-[15px] md:text-lg text-white/80 mb-8 md:mb-10 max-w-xl font-light leading-relaxed">
              Connecting finance professionals with leading insurance 
              companies and NBFCs across India.
            </p>
            
            {/* Action Buttons */}
            <div className="grid grid-cols-2 md:flex gap-3 md:gap-4 mb-10 md:mb-14 w-full md:w-auto">
              <Link
                href="/companies"
                className="w-full md:w-auto px-6 md:px-8 py-3.5 md:py-3.5 rounded-[14px] bg-[#EFFF5E] text-black font-medium text-sm text-center transition-transform hover:scale-105 active:scale-95 flex items-center justify-center whitespace-nowrap"
              >
                Hire Talent
              </Link>
              
              <Link
                href="/jobs"
                className="w-full md:w-auto px-6 md:px-8 py-3.5 md:py-3.5 rounded-[14px] border border-white/30 bg-white/5 backdrop-blur-md text-white font-medium text-sm text-center hover:bg-white/10 active:scale-95 flex items-center justify-center whitespace-nowrap"
              >
                Find Jobs
              </Link>
            </div>

            {/* Social Proof */}
            <div className="flex items-center gap-3">
              <div className="flex -space-x-2.5">
                 {[1,2,3,4].map((i) => (
                   <div key={i} className="w-8 h-8 md:w-9 md:h-9 rounded-full border-2 border-white/10 bg-gray-500 overflow-hidden">
                      <img 
                        src={`https://i.pravatar.cc/100?u=cp${i}`} 
                        alt="professional" 
                        className="w-full h-full object-cover grayscale"
                      />
                   </div>
                 ))}
                 <div className="w-8 h-8 md:w-9 md:h-9 rounded-full border-2 border-white/10 bg-black flex items-center justify-center text-[10px] font-bold text-white z-10">
                   10K+
                 </div>
              </div>
              <p className="text-xs text-white/60 font-medium tracking-wide">
                2,000+ Professionals Trusted Nationwide
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}