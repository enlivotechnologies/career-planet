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


        </div>
      </section>

      {/* LEADERSHIP & VISION SECTION
        - Editorial Style Layout
        - Staggered Images or Grid
      */}
      <section className="py-24 px-4 sm:px-6 bg-white border-b border-gray-50 overflow-hidden">
        <div className="max-w-[1400px] mx-auto">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-24">
            
            {/* Left Column: Vision Text */}
            <div className="lg:col-span-5 order-2 lg:order-1">
              <div className="sticky top-24">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#EFFF5E] text-black text-[10px] font-bold uppercase tracking-widest mb-8">
                  Leadership
                </div>
                <h2 className="text-4xl md:text-5xl lg:text-6xl font-medium text-black tracking-tight mb-8 leading-[1.1]">
                  Building with <br />
                  <span className="text-gray-400">Purpose.</span>
                </h2>
                
                <div className="space-y-6 text-lg text-gray-500 font-light leading-relaxed mb-12">
                  <p>
                    "We started CareerPlanet with a singular mission: to redefine recruitment in the Banking and Insurance sectors. Too often, we saw talented individuals lost in the noise and great companies struggling to find the fit they needed."
                  </p>
                  <p>
                    "We don't just fill vacancies; we build careers and strengthen organizations. Our philosophy has always been about <strong className="font-semibold text-black">quality over quantity</strong>. Every placement we make is a testament to our deep understanding of the financial landscape and our commitment to the people who trust us with their professional lives."
                  </p>
                </div>

                <div className="h-px w-24 bg-gray-200 mb-8"></div>
                
                <blockquote className="text-xl font-medium text-black italic">
                   "In an industry driven by numbers, we choose to be driven by people. That's the CareerPlanet difference."
                </blockquote>

              </div>
            </div>

            {/* Right Column: The Founders (Staggered Grid) */}
            <div className="lg:col-span-7 order-1 lg:order-2">
               <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
                  
                  {/* Founder 1: Shashikumar */}
                  <div className="group relative">
                     <div className="aspect-[3/4] w-full bg-gray-100 rounded-[32px] overflow-hidden mb-6 relative">
                        <img 
                          src="https://cjlpsqzjtchvpckpyllb.supabase.co/storage/v1/object/public/sentia/shashikumar.jpg" 
                          alt="Shashikumar - Founder" 
                          className="w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-60"></div>
                     </div>
                     <div>
                        <h3 className="text-2xl font-bold text-black mb-1">Shashikumar</h3>
                        <p className="text-xs font-bold text-gray-400 uppercase tracking-widest">Founder</p>
                     </div>
                  </div>

                  {/* Founder 2: Abhishek */}
                  <div className="group relative md:mt-24"> 
                     <div className="aspect-[3/4] w-full bg-gray-100 rounded-[32px] overflow-hidden mb-6 relative">
                        <img 
                          src="https://cjlpsqzjtchvpckpyllb.supabase.co/storage/v1/object/public/sentia/Abhishek.jpg" 
                          alt="Abhishek - Co-Founder" 
                          className="w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-60"></div>
                     </div>
                     <div>
                        <h3 className="text-2xl font-bold text-black mb-1">Abhishek</h3>
                        <p className="text-xs font-bold text-gray-400 uppercase tracking-widest">Co-Founder</p>
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
      {/* ABOUT COMPANY SECTION
        - Minimalist, High-Impact Typography
        - Left Aligned
        - White Background
      */}
      <section className="py-24 bg-white relative overflow-hidden border-b border-gray-50">
          
          <div className="max-w-[1400px] mx-auto px-4 sm:px-6 relative z-10">
             
             <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-black/5 text-black text-[10px] font-bold uppercase tracking-widest mb-8">
               Our Identity
             </div>

             <h2 className="text-4xl md:text-5xl lg:text-7xl font-medium tracking-tight mb-8 leading-[1.1] text-black max-w-5xl">
               Precision in <span className="text-gray-300">Placement.</span><br/>
               Partners in <span className="text-black">Growth.</span>
             </h2>

             <div className="max-w-2xl">
                <p className="text-lg md:text-xl text-gray-500 font-light leading-relaxed">
                  CareerPlanet is a premier recruitment consultancy tailored for the <strong className="text-black font-medium">Banking & Insurance</strong> sectors. We bridge the gap between exceptional talent and visionary organizations, transforming the hiring process from a transaction into a strategic advantage.
                </p>
             </div>

          </div>
      </section>

      {/* CTA Footer */}
      <CTASection />

    </main>
  );
}