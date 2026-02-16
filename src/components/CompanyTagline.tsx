import React from "react";

export default function CompanyTagline() {
  return (
    <section className="w-full bg-white py-24">
      <div className="max-w-[1600px] mx-auto px-6 md:px-24 text-left">
        
        <div className="flex flex-col items-start gap-6 max-w-5xl">
           <span className="inline-block px-4 py-1.5 rounded-full border border-black/10 bg-transparent text-[11px] font-bold uppercase tracking-widest text-black">
              Why Choose Us
           </span>

           <h2 className="text-[28px] sm:text-[36px] md:text-[48px] font-medium text-black leading-[1.15] tracking-tight">
              India's leading platform connecting visionary talent with legacy institutions.
           </h2>
           
           <p className="text-lg md:text-xl text-gray-500 leading-relaxed font-light max-w-3xl">
              We bridge the gap between ambition and opportunity, serving as the trusted partner for both aspiring professionals and established enterprises. Our commitment ensures that the future of finance and insurance is built on a foundation of excellence and precision.
           </p>
        </div>

      </div>
    </section>
  );
}
