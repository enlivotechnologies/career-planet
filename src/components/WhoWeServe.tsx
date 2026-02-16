import React from "react";

export default function WhoWeServe() {
  const insuranceCompanies = [
    "LIC of India",
    "HDFC Life",
    "ICICI Prudential",
    "SBI Life",
    "Max Life",
    "Bajaj Allianz Life",
    "And other leading insurers",
  ];

  const nbfcCompanies = [
    "Housing Finance Companies",
    "Microfinance Institutions",
    "Gold Loan Companies",
    "Vehicle Finance Companies",
    "Consumer Finance NBFCs",
    "Investment & Credit Companies",
  ];

  return (
    <section className="w-full bg-white py-1 md:py-2">
      <div className="max-w-[1600px] mx-auto px-4 sm:px-6">
        
        {/* Main Premium Container: Rounded Gray Card */}
        <div className="bg-[#F6F6F6] rounded-[48px] overflow-hidden border border-gray-100/50">
          
          {/* Content Wrapper */}
          <div className="p-8 md:p-20">
            
            {/* Header Section: Architectural Alignment */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-y-12 lg:gap-x-20 mb-20 items-end">
              
              {/* Left Column: Headline */}
              <div className="lg:col-span-7">
                <div className="flex items-center gap-6 mb-8">
                  <span className="text-[10px] md:text-[11px] uppercase tracking-[0.5em] font-medium text-gray-400 whitespace-nowrap">
                    Our Clients
                  </span>
                  <div className="h-[1px] w-16 bg-gray-300"></div>
                </div>
                
                <h2 className="text-[36px] sm:text-[48px] md:text-[54px] lg:text-[60px] font-medium text-black leading-[1.08] tracking-tighter">
                  Sectors We <br />
                  Transform.
                </h2>
              </div>
              
              {/* Right Column: Description */}
              <div className="lg:col-span-5 pb-2"> 
                <p className="text-[16px] md:text-[18px] text-gray-500 font-normal leading-relaxed tracking-tight">
                  We provide specialized recruitment solutions across the 
                  entire spectrum of financial services, connecting elite 
                  institutions with visionary talent.
                </p>
              </div>
            </div>

            {/* The Content Grid: Clean Vertical Split */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-0">
              
              {/* Column 1: Life Insurance */}
              <div className="relative lg:pr-16 lg:border-r border-gray-200/60">
                
                {/* Premium Header Image - Original Color, No Icon */}
                <div className="h-56 w-full overflow-hidden rounded-2xl mb-10 relative">
                   <img 
                    src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=2070&auto=format&fit=crop" 
                    alt="Life Insurance Sector"
                    className="w-full h-full object-cover"
                   />
                   {/* Icon Removed */}
                </div>

                <div className="px-2">
                  <div className="mb-8">
                    <span className="text-[10px] font-bold text-black/30 uppercase tracking-[0.3em] mb-3 block">
                      Sector 01
                    </span>
                    <h3 className="text-3xl font-medium text-black tracking-tight">
                      Life Insurance
                    </h3>
                  </div>

                  {/* Clean List */}
                  <div className="space-y-0">
                    {insuranceCompanies.map((company, index) => (
                      <div key={index} className="flex items-center justify-between py-3 border-b border-gray-200/50">
                        <span className="text-[16px] font-medium text-gray-600">
                          {company}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Column 2: NBFCs */}
              <div className="relative lg:pl-16">
                
                {/* Premium Header Image - Original Color, No Icon */}
                <div className="h-56 w-full overflow-hidden rounded-2xl mb-10 relative">
                   <img 
                    src="https://images.unsplash.com/photo-1556761175-5973dc0f32e7?q=80&w=2664&auto=format&fit=crop" 
                    alt="NBFC Sector"
                    className="w-full h-full object-cover"
                   />
                   {/* Icon Removed */}
                </div>

                <div className="px-2">
                  <div className="mb-8">
                    <span className="text-[10px] font-bold text-black/30 uppercase tracking-[0.3em] mb-3 block">
                      Sector 02
                    </span>
                    <h3 className="text-3xl font-medium text-black tracking-tight">
                      NBFC Sector
                    </h3>
                  </div>

                  {/* Clean List */}
                  <div className="space-y-0">
                    {nbfcCompanies.map((company, index) => (
                      <div key={index} className="flex items-center justify-between py-3 border-b border-gray-200/50">
                        <span className="text-[16px] font-medium text-gray-600">
                          {company}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

            </div>
            
            {/* New Premium Tagline Section */}
            <div className="mt-24 pt-12 border-t border-gray-200/60 flex flex-col md:flex-row items-center justify-between gap-8">
               <div className="max-w-3xl">
                  <p className="text-[14px] font-bold text-black/40 uppercase tracking-widest mb-4">
                    Why Choose Us
                  </p>
                  <h3 className="text-3xl md:text-4xl lg:text-[42px] font-medium text-black leading-tight tracking-tight">
                    India's leading platform connecting visionary talent with legacy institutions.
                  </h3>
               </div>
               
               {/* Decorative Element */}
               <div className="hidden md:block flex-shrink-0">
                  <div className="w-16 h-16 rounded-full border border-black/10 flex items-center justify-center hover:bg-black hover:text-white transition-colors duration-500 cursor-default">
                    <div className="w-1.5 h-1.5 bg-current rounded-full"></div>
                  </div>
               </div>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}