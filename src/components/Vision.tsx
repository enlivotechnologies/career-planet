import React from "react";

export default function Vision() {
  return (
    <section className="w-full bg-white px-4 pb-16 pt-2">
      {/* Reduced min-height to 480px for a more compact, premium feel */}
      <div className="relative max-w-[1600px] mx-auto min-h-[480px] rounded-[48px] overflow-hidden bg-stone-900 flex items-center justify-center">
        
        {/* Background Image Layer */}
        <div className="absolute inset-0">
          <img 
            src="https://i.pinimg.com/1200x/cb/ee/d5/cbeed56f55b8fa8f3ee4fe6bf4d627a7.jpg" 
            alt="Career Planet Vision"
            className="w-full h-full object-cover object-center"
          />
          
          {/* Dual-layer Overlay for visibility and premium texture */}
          <div className="absolute inset-0 bg-black/40" /> 
          <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-transparent to-black/80" />
        </div>

        {/* Content Layer */}
        <div className="relative z-10 w-full max-w-5xl px-8 py-12 flex flex-col items-center text-center">
          
          {/* Label: Future Focus */}
          <div className="flex items-center gap-6 mb-8">
            <div className="h-[1px] w-10 bg-white/20"></div>
            <span className="text-[10px] md:text-[11px] uppercase tracking-[0.5em] font-medium text-[#EFFF5E] whitespace-nowrap">
              Future Focus
            </span>
            <div className="h-[1px] w-10 bg-white/20"></div>
          </div>

          {/* Section Header */}
          <h2 className="text-3xl md:text-5xl font-medium text-white tracking-tighter mb-10">
            Our Vision
          </h2>

          {/* Manifesto: Medium Weight with Hire-Talent Green accent */}
          <p className="text-[20px] sm:text-[28px] md:text-[34px] lg:text-[38px] font-medium text-white leading-[1.3] tracking-tight max-w-4xl mx-auto">
            "To drive <span className="text-[#EFFF5E]">upward growth</span> through 
            innovative solutions and domain-expert talent, becoming the most 
            <span className="text-[#EFFF5E] ml-2">valued partner</span> for every client we serve."
          </p>
          
          {/* Footer Signature */}
          <div className="mt-12 flex items-center justify-center gap-6 opacity-30">
            <div className="h-[1px] w-12 bg-white"></div>
            <span className="text-[8px] uppercase tracking-[0.5em] font-medium text-white">
              Career Planet Statement
            </span>
            <div className="h-[1px] w-12 bg-white"></div>
          </div>

        </div>
      </div>
    </section>
  );
}