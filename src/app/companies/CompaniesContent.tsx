"use client";

import React, { useState } from "react";
import { MessageCircle, Send, Mail, Phone, ArrowRight, Building2, User, Globe } from "lucide-react";
import CTASection from "@/components/CTASection";

export default function CompaniesContent() {
  const [formData, setFormData] = useState({
    companyName: "",
    contactPerson: "",
    email: "",
    phone: "",
    requirements: ""
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          type: 'company',
          ...formData
        }),
      });

      const data = await response.json();

      if (data.success) {
        alert("Thanks for your interest! We'll get back to you shortly to discuss your hiring needs.");
        setFormData({ companyName: "", contactPerson: "", email: "", phone: "", requirements: "" });
      } else {
        alert("Something went wrong. Please try again later.");
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      alert("Something went wrong. Please try again later.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleWhatsAppRedirect = () => {
    const phoneNumber = "919739430055"; 
    const message = encodeURIComponent("Hi CareerPlanet, we are looking to hire talent for...");
    window.open(`https://wa.me/${phoneNumber}?text=${message}`, "_blank");
  };

  return (
    // Outer container: Matches Navbar's "w-full bg-white px-4 sm:px-6" exactly
    <div className="w-full bg-white px-4 sm:px-6 pb-20 pt-10 text-sm relative">
      
      {/* 1. Ambient Background (Subtle) */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
        <div className="absolute top-[-10%] right-[-5%] w-[800px] h-[800px] bg-yellow-50/30 rounded-full blur-[120px] mix-blend-multiply opacity-50"></div>
        <div className="absolute bottom-[-10%] left-[-10%] w-[1000px] h-[1000px] bg-blue-50/20 rounded-full blur-[140px] mix-blend-multiply opacity-40"></div>
      </div>

      {/* 2. Main Container */}
      <div className="relative z-10 max-w-[1400px] mx-auto">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-24 items-start">
            
            {/* LEFT COLUMN: Header & Contact Info (Spans 5 cols) */}
            <div className="lg:col-span-5 flex flex-col justify-end pb-4 sticky top-24">
                
                {/* Header Section */}
                <div className="mb-12">
                    <div className="flex items-center gap-3 mb-6">
                        <div className="h-[1px] w-8 bg-black/80"></div>
                        <span className="text-[9px] font-bold uppercase tracking-[0.3em] text-gray-500">For Employers</span>
                    </div>
                    <h1 className="text-4xl md:text-5xl lg:text-6xl font-medium text-black leading-[1.05] tracking-tight mb-6">
                        Find your next <br/>
                        top performer.
                    </h1>
                    <p className="text-base md:text-lg text-gray-500 font-light leading-relaxed max-w-md">
                        Partner with us to access a curated network of professionals in the Insurance and Banking sectors.
                    </p>
                </div>

                {/* WhatsApp Card - Premium & Flat */}
                <div 
                    onClick={handleWhatsAppRedirect}
                    className="group relative cursor-pointer overflow-hidden bg-[#25D366] rounded-[32px] p-8 mb-10 transition-all duration-500 hover:shadow-[0_20px_40px_-10px_rgba(37,211,102,0.25)] hover:-translate-y-1"
                >
                    {/* Overlay */}
                    <div className="absolute top-0 right-0 w-48 h-48 bg-white/20 rounded-full blur-[50px] -mr-12 -mt-12 pointer-events-none mix-blend-overlay"></div>
                    
                    <div className="relative z-10 flex flex-col justify-between min-h-[160px]">
                        <div className="flex justify-between items-start mb-6">
                            <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center text-[#25D366] shadow-sm group-hover:scale-110 transition-transform duration-500">
                                <MessageCircle className="w-6 h-6 fill-current" />
                            </div>
                            <ArrowRight className="w-6 h-6 text-white opacity-70 group-hover:opacity-100 group-hover:translate-x-1 transition-all duration-500" />
                        </div>

                        <div>
                            <h3 className="text-2xl font-medium text-white mb-1 tracking-tight">Chat on WhatsApp</h3>
                            <p className="text-white/80 font-medium text-sm">Direct line to our recruitment team.</p>
                        </div>
                    </div>
                </div>

                {/* Contact List */}
                <div className="space-y-6 pl-1">
                    <div className="group flex items-center gap-5 cursor-pointer">
                        <div className="w-10 h-10 rounded-full bg-gray-50 flex items-center justify-center text-black group-hover:bg-black group-hover:text-white transition-colors duration-300 shrink-0">
                            <Mail className="w-4 h-4" />
                        </div>
                        <div>
                            <h4 className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-0.5">Email Us</h4>
                            <a href="mailto:hiring@careerplanet.com" className="text-lg font-medium text-black hover:text-blue-600 transition-colors">
                                hiring@careerplanet.com
                            </a>
                        </div>
                    </div>

                    <div className="group flex items-center gap-5 cursor-pointer">
                        <div className="w-10 h-10 rounded-full bg-gray-50 flex items-center justify-center text-black group-hover:bg-black group-hover:text-white transition-colors duration-300 shrink-0">
                            <Phone className="w-4 h-4" />
                        </div>
                        <div>
                            <h4 className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-0.5">Call Us</h4>
                            <a href="tel:+919876543210" className="text-lg font-medium text-black hover:text-blue-600 transition-colors">
                                +91 9739430055
                            </a>
                        </div>
                    </div>

                </div>

            </div>

            {/* RIGHT COLUMN: The Form (Spans 7 cols) */}
            <div className="lg:col-span-7">
                <div className="bg-[#F8F9FB] rounded-[48px] p-8 md:p-12 border border-white flex flex-col justify-center relative overflow-hidden">
                    {/* Subtle decorative blob inside form card */}
                    <div className="absolute top-0 right-0 w-64 h-64 bg-white rounded-full blur-[80px] -mr-16 -mt-16 pointer-events-none opacity-60"></div>

                    <h3 className="relative z-10 text-3xl font-medium text-black mb-10 tracking-tight">Tell us about your hiring needs</h3>
                    
                    <form onSubmit={handleSubmit} className="relative z-10 space-y-6">
                        
                        {/* Company Name & Contact Person */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                             <div className="space-y-3">
                                <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest ml-3">Company Name</label>
                                <div className="relative group">
                                    <div className="absolute left-6 top-1/2 -translate-y-1/2 flex items-center justify-center text-gray-400 group-focus-within:text-black transition-all duration-300 z-10">
                                        <Building2 className="w-5 h-5" />
                                    </div>
                                    <input 
                                        type="text" 
                                        required
                                        placeholder="e.g. Acme Corp"
                                        value={formData.companyName}
                                        onChange={(e) => setFormData({...formData, companyName: e.target.value})}
                                        className="w-full bg-white border border-gray-100 rounded-[20px] pl-16 pr-6 py-4 text-sm font-medium text-black outline-none focus:border-black focus:ring-1 focus:ring-black/5 transition-all duration-300 placeholder:text-gray-300 shadow-[0_2px_10px_rgba(0,0,0,0.02)]"
                                    />
                                </div>
                            </div>
                            <div className="space-y-3">
                                <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest ml-3">Contact Person</label>
                                <div className="relative group">
                                    <div className="absolute left-6 top-1/2 -translate-y-1/2 flex items-center justify-center text-gray-400 group-focus-within:text-black transition-all duration-300 z-10">
                                        <User className="w-5 h-5" />
                                    </div>
                                    <input 
                                        type="text" 
                                        required
                                        placeholder="e.g. Suresh"
                                        value={formData.contactPerson}
                                        onChange={(e) => setFormData({...formData, contactPerson: e.target.value})}
                                        className="w-full bg-white border border-gray-100 rounded-[20px] pl-16 pr-6 py-4 text-sm font-medium text-black outline-none focus:border-black focus:ring-1 focus:ring-black/5 transition-all duration-300 placeholder:text-gray-300 shadow-[0_2px_10px_rgba(0,0,0,0.02)]"
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Email & Phone */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-3">
                                <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest ml-3">Work Email</label>
                                <div className="relative group">
                                    <div className="absolute left-6 top-1/2 -translate-y-1/2 flex items-center justify-center text-gray-400 group-focus-within:text-black transition-all duration-300 z-10">
                                        <Mail className="w-5 h-5" />
                                    </div>
                                    <input 
                                        type="email" 
                                        required
                                        placeholder="you@company.com"
                                        value={formData.email}
                                        onChange={(e) => setFormData({...formData, email: e.target.value})}
                                        className="w-full bg-white border border-gray-100 rounded-[20px] pl-16 pr-6 py-4 text-sm font-medium text-black outline-none focus:border-black focus:ring-1 focus:ring-black/5 transition-all duration-300 placeholder:text-gray-300 shadow-[0_2px_10px_rgba(0,0,0,0.02)]"
                                    />
                                </div>
                            </div>
                             <div className="space-y-3">
                                <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest ml-3">Phone Number</label>
                                <div className="relative group">
                                    <div className="absolute left-6 top-1/2 -translate-y-1/2 flex items-center justify-center text-gray-400 group-focus-within:text-black transition-all duration-300 z-10">
                                       <Phone className="w-5 h-5" />
                                    </div>
                                    <input 
                                        type="tel" 
                                        required
                                        placeholder="+91 98765 43210"
                                        value={formData.phone}
                                        onChange={(e) => setFormData({...formData, phone: e.target.value})}
                                        className="w-full bg-white border border-gray-100 rounded-[20px] pl-16 pr-6 py-4 text-sm font-medium text-black outline-none focus:border-black focus:ring-1 focus:ring-black/5 transition-all duration-300 placeholder:text-gray-300 shadow-[0_2px_10px_rgba(0,0,0,0.02)]"
                                    />
                                </div>
                            </div>
                        </div>

                        <div className="space-y-3">
                            <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest ml-3">Job Requirements / Message</label>
                            <textarea 
                                required
                                placeholder="Tell us about the roles you're looking to fill..."
                                rows={6}
                                value={formData.requirements}
                                onChange={(e) => setFormData({...formData, requirements: e.target.value})}
                                className="w-full bg-white border border-gray-100 rounded-[24px] px-6 py-4 text-sm font-medium text-black outline-none focus:border-black focus:ring-1 focus:ring-black/5 transition-all duration-300 placeholder:text-gray-300 resize-none shadow-[0_2px_10px_rgba(0,0,0,0.02)]"
                            ></textarea>
                        </div>

                        {/* Refined Black Button */}
                        <button 
                            type="submit"
                            disabled={isSubmitting}
                            className={`w-full bg-[#EFFF5E] text-black text-sm font-semibold py-5 rounded-[24px] hover:scale-[1.02] transition-all duration-300 flex items-center justify-center gap-3 group mt-6 shadow-xl shadow-[#EFFF5E]/20 ${isSubmitting ? 'opacity-70 cursor-not-allowed' : ''}`}
                        >
                            <span>{isSubmitting ? 'Sending...' : 'Submit Request'}</span>
                            <div className="w-6 h-6 rounded-full bg-black/10 flex items-center justify-center group-hover:bg-black/20 transition-colors duration-300">
                                <Send className="w-3 h-3 -ml-0.5 mt-0.5" />
                            </div>
                        </button>


                    </form>
                </div>
            </div>

        </div>
      </div>
      <div className="mt-20">
         <CTASection />
      </div>
      
    </div>
  );
}
