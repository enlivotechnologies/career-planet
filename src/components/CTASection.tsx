import React from "react";
import Link from "next/link";

export default function CTAFooterCombined() {
  return (
    <section className="w-full bg-white px-2 md:px-4 pb-4 pt-10">
      
      {/* MASTER CONTAINER: Neon Gradient 
        - Gradient: #EFFF5E (Start) to #C7FF33 (End) for depth.
        - Text Color: Switched to Black for maximum legibility and premium contrast.
      */}
      <div className="relative max-w-[1600px] mx-auto bg-gradient-to-br from-[#EFFF5E] to-[#C7FF33] rounded-[48px] md:rounded-[64px] overflow-hidden flex flex-col shadow-2xl shadow-[#EFFF5E]/20">
        
        {/* Background Atmosphere (Subtle White Glow to soften the neon) */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[600px] bg-white/40 blur-[120px] rounded-full pointer-events-none mix-blend-soft-light"></div>

        {/* =========================================================================
            PART 1: THE CTA SECTION (Top Half)
           ========================================================================= */}
        <div className="relative z-10 w-full py-20 md:py-28 px-6 text-center">
          
          {/* Label */}
          <div className="flex items-center justify-center gap-4 mb-8 opacity-90">
             <div className="h-[1px] w-8 bg-black/20"></div>
             <span className="text-[10px] uppercase tracking-[0.4em] font-bold text-black/60">
               Take The Leap
             </span>
             <div className="h-[1px] w-8 bg-black/20"></div>
          </div>

          {/* Headline - Deep Black for Premium Contrast */}
          <h2 className="text-4xl md:text-6xl lg:text-[72px] font-medium text-black mb-8 leading-[1.05] tracking-tighter max-w-4xl mx-auto">
            Ready to hire top talent or <br className="hidden md:block" />
            <span className="text-black">find your next role?</span>
          </h2>

          {/* Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-10">
            {/* Primary Action: Solid Black Pill */}
            <Link
              href="/companies"
              className="group px-10 py-5 rounded-full bg-black text-white font-bold text-sm tracking-wide transition-all duration-300 hover:bg-gray-900 hover:shadow-[0_10px_30px_rgba(0,0,0,0.15)] hover:-translate-y-1 min-w-[200px]"
            >
              Hire With Us
            </Link>
            
            {/* Secondary Action: Black Outline */}
            <Link
              href="/about"
              className="group px-10 py-5 rounded-full border border-black/10 text-black font-bold text-sm tracking-wide transition-all duration-300 hover:bg-black hover:text-white hover:border-black min-w-[200px]"
            >
              About Us
            </Link>
          </div>
        </div>

        {/* =========================================================================
            PART 2: THE FOOTER SECTION (Nested White Card)
           ========================================================================= */}
        <div className="relative z-10 px-2 md:px-4 pb-2 md:pb-4">
          <div className="bg-white rounded-[40px] p-10 md:p-16 text-black">
            
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-24">
              
              {/* Left Column: Brand & Newsletter */}
              <div className="lg:col-span-5 space-y-8">
                <div>
                   <h3 className="text-3xl font-bold tracking-tight mb-2">Career Planet.</h3>
                   <p className="text-gray-500 text-base max-w-sm">
                     Connecting elite financial institutions with visionary talent across India.
                   </p>
                </div>

                {/* Newsletter Input */}
                <div className="space-y-3">
                  <p className="text-sm font-semibold text-black">Get market insights weekly.</p>
                  <form className="flex gap-2 max-w-sm">
                    <input 
                      type="email" 
                      placeholder="Enter your email" 
                      className="w-full px-5 py-3.5 bg-[#F6F6F6] rounded-full text-sm outline-none focus:ring-2 focus:ring-black/5 transition-all placeholder:text-gray-400"
                    />
                    <button className="px-6 py-3.5 bg-black text-white rounded-full text-sm font-bold hover:bg-gray-800 transition-colors">
                      Submit
                    </button>
                  </form>
                  <p className="text-[11px] text-gray-400 leading-relaxed">
                    By subscribing you agree to our Privacy Policy.
                  </p>
                </div>
              </div>

              {/* Right Column: Links Grid */}
              <div className="lg:col-span-7 grid grid-cols-2 md:grid-cols-4 gap-8">
                
                {/* Column 1 */}
                <div className="space-y-4">
                  <h4 className="font-bold text-sm text-black">For Companies</h4>
                  <ul className="space-y-3 text-sm text-gray-500">
                    <li><a href="#" className="hover:text-black transition-colors">Browse Talent</a></li>
                    <li><a href="#" className="hover:text-black transition-colors">Post a Job</a></li>
                    <li><a href="#" className="hover:text-black transition-colors">Our Process</a></li>
                    <li><a href="#" className="hover:text-black transition-colors">Pricing</a></li>
                  </ul>
                </div>

                {/* Column 2 */}
                <div className="space-y-4">
                  <h4 className="font-bold text-sm text-black">For Candidates</h4>
                  <ul className="space-y-3 text-sm text-gray-500">
                    <li><a href="/jobs" className="hover:text-black transition-colors">Browse Jobs</a></li>
                    <li><a href="#" className="hover:text-black transition-colors">Submit Resume</a></li>
                    <li><a href="#" className="hover:text-black transition-colors">Career Blog</a></li>
                    <li><a href="#" className="hover:text-black transition-colors">Salary Guide</a></li>
                  </ul>
                </div>

                {/* Column 3 */}
                <div className="space-y-4">
                  <h4 className="font-bold text-sm text-black">Company</h4>
                  <ul className="space-y-3 text-sm text-gray-500">
                    <li><a href="/about" className="hover:text-black transition-colors">About Us</a></li>
                    <li><a href="#" className="hover:text-black transition-colors">Our Team</a></li>
                    <li><a href="/contact" className="hover:text-black transition-colors">Contact</a></li>
                    <li><a href="#" className="hover:text-black transition-colors">Press</a></li>
                  </ul>
                </div>

                {/* Column 4 */}
                <div className="space-y-4">
                  <h4 className="font-bold text-sm text-black">Legal</h4>
                  <ul className="space-y-3 text-sm text-gray-500">
                    <li><a href="#" className="hover:text-black transition-colors">Privacy</a></li>
                    <li><a href="#" className="hover:text-black transition-colors">Terms</a></li>
                    <li><a href="#" className="hover:text-black transition-colors">Security</a></li>
                  </ul>
                </div>

              </div>
            </div>

            {/* Copyright Row */}
            <div className="mt-16 pt-8 border-t border-gray-100 flex flex-col md:flex-row justify-between items-center gap-4">
              <span className="text-xs text-gray-400">© 2026 Career Planet. All rights reserved.</span>
              <div className="flex gap-4">
                <a href="#" className="w-8 h-8 rounded-full bg-[#F6F6F6] flex items-center justify-center text-black hover:bg-black hover:text-white transition-all">
                  <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24"><path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"/></svg>
                </a>
                <a href="#" className="w-8 h-8 rounded-full bg-[#F6F6F6] flex items-center justify-center text-black hover:bg-black hover:text-white transition-all">
                  <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/></svg>
                </a>
              </div>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
}