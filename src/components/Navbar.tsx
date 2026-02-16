import { useState } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    // Outer container with spacing
    <div className="w-full bg-white pt-2 pb-4 px-4 sm:px-6 relative z-50"> 
      
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

        {/* 2. Center: Desktop Links */}
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

        {/* 3. Right: Desktop 'Contact Us' Button */}
        <Link
          href="/contact"
          className="hidden md:block bg-[#EFFF5E] hover:bg-[#e6f83e] text-black text-sm font-medium py-3.5 px-8 rounded-[16px] hover:shadow-[#EFFF5E]/20 transition-all"
        >
          Contact Us
        </Link>
        
        {/* Mobile Hamburger Button */}
        <button 
            className="md:hidden p-2 text-black"
            onClick={() => setIsMenuOpen(true)}
        >
            <Menu className="w-6 h-6" />
        </button>

      </nav>

      {/* Mobile Menu Overlay */}
      {isMenuOpen && (
        <div className="fixed inset-0 bg-white z-[60] flex flex-col p-6 animate-in slide-in-from-right duration-300">
            <div className="flex items-center justify-between mb-12">
                <div className="flex items-center gap-3">
                    <img src="/logo/careerplanet-logo.png" alt="CareerPlanet Logo" className="h-8 w-auto object-contain" />
                    <span className="text-lg font-medium text-black tracking-tighter">CareerPlanet</span>
                </div>
                <button onClick={() => setIsMenuOpen(false)} className="p-2 bg-gray-100 rounded-full">
                    <X className="w-5 h-5 text-black" />
                </button>
            </div>
            
            <div className="flex flex-col gap-6 text-2xl font-medium text-black">
                <Link href="/" onClick={() => setIsMenuOpen(false)} className="border-b border-gray-100 pb-4">Home</Link>
                <Link href="/services" onClick={() => setIsMenuOpen(false)} className="border-b border-gray-100 pb-4">Our Services</Link>
                <Link href="/companies" onClick={() => setIsMenuOpen(false)} className="border-b border-gray-100 pb-4">For Companies</Link>
                <Link href="/job-seekers" onClick={() => setIsMenuOpen(false)} className="border-b border-gray-100 pb-4">For Job Seekers</Link>
                <Link href="/contact" onClick={() => setIsMenuOpen(false)} className="text-[#EFFF5E] bg-black px-6 py-4 rounded-2xl text-center mt-4">Contact Us</Link>
            </div>
        </div>
      )}
    </div>
  );
}