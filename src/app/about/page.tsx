"use client";

import React from "react";
import Link from "next/link";
import CTASection from "@/components/CTASection"; // Or CTAFooterCombined

export default function AboutPage() {
  return (
    <main className="bg-white min-h-screen">
      
      {/* HERO SECTION 
        - Aligned to max-w-[1400px]
        - Reduced font sizes for elegance
      */}
      <section className="pt-32 pb-16 px-4 sm:px-6">
        <div className="max-w-[1400px] mx-auto">
          
          {/* Header */}
          <div className="max-w-3xl mb-12">
             <div className="flex items-center gap-3 mb-6">
                <div className="h-[1px] w-8 bg-black/80"></div>
                <span className="text-[9px] font-bold uppercase tracking-[0.3em] text-gray-500">
                  Who We Are
                </span>
             </div>
             
             <h1 className="text-5xl md:text-6xl lg:text-[72px] font-medium text-black tracking-tight mb-6 leading-[1]">
                About Us.
             </h1>
             
             <p className="text-lg text-gray-500 font-light leading-relaxed max-w-xl">
               We are more than just recruiters. We are career architects engaged in building the future of financial talent in India, one placement at a time.
             </p>
          </div>

          {/* Hero Image - Architectural Rounding */}
          <div className="w-full h-[400px] md:h-[500px] rounded-[32px] md:rounded-[48px] overflow-hidden relative shadow-sm">
             <img 
               src="https://i.pinimg.com/1200x/3c/f2/fc/3cf2fc05c8ba06bc5533ece8a772cbc3.jpg" 
               alt="Team collaboration" 
               className="w-full h-full object-cover"
             />
             {/* Subtle gradient overlay for depth */}
             <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
          </div>

        </div>
      </section>

      {/* FOUNDER'S MESSAGE SECTION
        - CHANGED: Text Left Alignment
        - Layout: 2-Column Editorial Grid for a "Proper" look
      */}
      <section className="py-20 px-4 sm:px-6 bg-white border-b border-gray-50">
        <div className="max-w-[1400px] mx-auto">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-24">
            
            {/* Left Column: Title & Photo (Optional) */}
            <div className="lg:col-span-4">
              <div className="sticky top-24">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#EFFF5E] text-black text-[10px] font-bold uppercase tracking-widest mb-6">
                  Founder's Message
                </div>
                <h2 className="text-3xl md:text-4xl font-medium text-black tracking-tight mb-4">
                  Building with <br />
                  <span className="text-gray-400">Purpose.</span>
                </h2>
                <div className="h-1 w-20 bg-black rounded-full mt-4"></div>
              </div>
            </div>

            {/* Right Column: The Message (Text Left) */}
            <div className="lg:col-span-8">
              <div className="space-y-6 text-base md:text-lg text-gray-600 font-light leading-relaxed">
                <p>
                  "I started CareerPlanet with a singular mission: to redefine recruitment in the Banking and Insurance sectors. Too often, I saw talented individuals lost in the noise and great companies struggling to find the fit they needed."
                </p>
                <p>
                  "We don't just fill vacancies; we build careers and strengthen organizations. My philosophy has always been about <strong className="font-semibold text-black">quality over quantity</strong>. Every placement we make is a testament to our deep understanding of the financial landscape and our commitment to the people who trust us with their professional lives."
                </p>
                <p>
                  "In an industry driven by numbers, we choose to be driven by people. That's the CareerPlanet difference."
                </p>
              </div>

              {/* Quote & Signature */}
              <div className="mt-12 pt-8 border-t border-gray-100">
                 <blockquote className="text-xl md:text-2xl font-medium text-black tracking-tight mb-4">
                   "Your career is a journey, not a destination. Let's make the next step count."
                 </blockquote>
                 <div className="flex items-center gap-3">
                   <div className="w-10 h-10 bg-gray-100 rounded-full overflow-hidden">
                      {/* Placeholder for founder face */}
                      <div className="w-full h-full bg-gray-300"></div>
                   </div>
                   <div>
                     <p className="text-sm font-bold text-black uppercase tracking-wide">Mr. Founder Name</p>
                     <p className="text-xs text-gray-400">CEO & Founder</p>
                   </div>
                 </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* VALUES SECTION 
        - Clean, Minimal Cards
      */}
      <section className="py-20 bg-[#FAFAFA]">
          <div className="max-w-[1400px] mx-auto px-4 sm:px-6">
             
             <div className="mb-12">
                <h3 className="text-2xl font-medium text-black mb-2">Our Core Values</h3>
                <p className="text-gray-500 text-sm">The principles that guide every decision we make.</p>
             </div>

             <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                
                {/* Value 1 */}
                <div className="group p-8 bg-white rounded-[24px] border border-gray-100/50 hover:border-gray-200 shadow-sm hover:shadow-lg hover:shadow-black/5 transition-all duration-300">
                   <div className="w-10 h-10 bg-black rounded-xl flex items-center justify-center text-white mb-6 group-hover:scale-110 transition-transform">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
                   </div>
                   <h3 className="text-lg font-bold text-black mb-2">Speed & Precision</h3>
                   <p className="text-sm text-gray-500 leading-relaxed">
                     Time is money. We connect you with the right opportunities faster than traditional agencies, without compromising on fit.
                   </p>
                </div>

                {/* Value 2 */}
                <div className="group p-8 bg-white rounded-[24px] border border-gray-100/50 hover:border-gray-200 shadow-sm hover:shadow-lg hover:shadow-black/5 transition-all duration-300">
                   {/* Lime Accent here */}
                   <div className="w-10 h-10 bg-[#EFFF5E] rounded-xl flex items-center justify-center text-black mb-6 group-hover:scale-110 transition-transform">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                   </div>
                   <h3 className="text-lg font-bold text-black mb-2">Trust & Integrity</h3>
                   <p className="text-sm text-gray-500 leading-relaxed">
                     Transparency is our currency. We build long-term relationships based on honest advice and genuine care.
                   </p>
                </div>

                {/* Value 3 */}
                <div className="group p-8 bg-white rounded-[24px] border border-gray-100/50 hover:border-gray-200 shadow-sm hover:shadow-lg hover:shadow-black/5 transition-all duration-300">
                   <div className="w-10 h-10 bg-black rounded-xl flex items-center justify-center text-white mb-6 group-hover:scale-110 transition-transform">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" /></svg>
                   </div>
                   <h3 className="text-lg font-bold text-black mb-2">Industry Network</h3>
                   <p className="text-sm text-gray-500 leading-relaxed">
                     With years of focused experience in banking and insurance, our network opens doors others simply can't.
                   </p>
                </div>

             </div>
          </div>
      </section>

      {/* CTA Footer */}
      <CTASection />

    </main>
  );
}