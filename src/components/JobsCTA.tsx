import React from "react";
import Link from "next/link";

export default function JobsCTA() {
  return (
    <section className="w-full bg-white px-4 pb-20 pt-10 md:pt-20">
      {/* The "Statement" Container 
        - Rounded 48px to match your other premium sections.
        - Deep Black background for maximum contrast against the white page.
      */}
      <div className="relative max-w-[1600px] mx-auto bg-black rounded-[48px] overflow-hidden px-6 py-24 md:py-32 text-center">
        
        {/* Abstract Background Glow (Subtle Premium Touch) */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-white/5 blur-[100px] rounded-full pointer-events-none" />

        <div className="relative z-10 flex flex-col items-center max-w-4xl mx-auto">
          
          {/* Architectural Label */}
          <div className="flex items-center gap-4 mb-10 opacity-80">
            <div className="h-[1px] w-12 bg-white/30"></div>
            <span className="text-[10px] md:text-[11px] uppercase tracking-[0.4em] font-medium text-white whitespace-nowrap">
              Next Steps
            </span>
            <div className="h-[1px] w-12 bg-white/30"></div>
          </div>

          {/* Headline: Massive, Confident, Tight Tracking */}
          <h2 className="text-[40px] sm:text-[56px] md:text-[72px] font-medium text-white leading-[1.05] tracking-tighter mb-8">
            Ready to make your <br className="hidden md:block" />
            <span className="text-gray-500">next big move?</span>
          </h2>

          {/* Subtext: Clean and Editorial */}
          <p className="text-lg md:text-xl text-gray-400 max-w-xl mb-14 leading-relaxed font-light">
            Whether you're building a world-class finance team or looking 
            for your career-defining role, we bridge the gap.
          </p>

          {/* The Premium Buttons */}
          <div className="flex flex-col sm:flex-row items-center gap-5 w-full sm:w-auto">
            
            {/* Primary Action: White Pill */}
            <Link
              href="/companies"
              className="group relative flex items-center justify-center gap-3 px-10 py-5 rounded-full bg-white text-black font-bold text-sm tracking-wide hover:bg-gray-100 transition-all duration-300 min-w-[200px]"
            >
              <span>Hire Talent</span>
              <svg 
                className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
            
            {/* Secondary Action: Glassmorphism Outline */}
            <Link
              href="/register"
              className="group flex items-center justify-center gap-3 px-10 py-5 rounded-full border border-white/20 text-white font-bold text-sm tracking-wide hover:bg-white/10 transition-all duration-300 min-w-[200px]"
            >
              <span>Register as Candidate</span>
            </Link>
          </div>

        </div>
      </div>
    </section>
  );
}