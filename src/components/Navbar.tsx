import Link from "next/link";

export default function Navbar() {
  return (
    // Outer container with spacing
    <div className="w-full bg-white pt-2 pb-4 px-4 sm:px-6"> 
      
      {/* Floating Pill Navbar */}
      <nav className="max-w-[1600px] mx-auto bg-white rounded-[24px] border border-gray-100 px-6 py-3 flex items-center justify-between">
        
        {/* 1. Left: Logo */}
        <div className="flex items-center gap-3">
          <Link href="/">
             <img src="/logo/careerplanet-logo.png" alt="CareerPlanet Logo" className="h-10 w-auto object-contain" />
          </Link>
          <Link href="/" className="text-xl font-medium text-black tracking-tighter">
            CareerPlanet
          </Link>
        </div>

        {/* 2. Center: Updated Links */}
        <div className="hidden md:flex items-center gap-8 lg:gap-10">
          <Link href="/" className="text-[14px] font-medium text-gray-500 hover:text-black transition-colors">
            Home
          </Link>
          <Link href="/services" className="text-[14px] font-medium text-gray-500 hover:text-black transition-colors">
            Our Services
          </Link>
          <Link href="/companies" className="text-[14px] font-medium text-gray-500 hover:text-black transition-colors">
            For Companies
          </Link>
          <Link href="/job-seekers" className="text-[14px] font-medium text-gray-500 hover:text-black transition-colors">
            For Job Seekers
          </Link>
        </div>

        {/* 3. Right: Larger 'Contact Us' Button */}
        <Link
          href="/contact"
          className="bg-[#EFFF5E] hover:bg-[#e6f83e] text-black text-sm font-medium py-3.5 px-8 rounded-[16px]  hover:shadow-[#EFFF5E]/20"
        >
          Contact Us
        </Link>

      </nav>
    </div>
  );
}