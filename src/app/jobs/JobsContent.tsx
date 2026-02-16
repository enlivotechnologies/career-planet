"use client";

import React, { useState, useEffect } from "react";
import { Search, MapPin, Briefcase, Clock, IndianRupee, ArrowUpRight, Filter, ChevronDown, Bookmark } from "lucide-react";
import CTASection from "@/components/CTASection";
import JobApplicationModal from "@/components/JobApplicationModal";
import { createClient } from "@supabase/supabase-js";

// Initialize Supabase Client
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "";
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_DEFAULT_KEY || "";
const supabase = createClient(supabaseUrl, supabaseKey);

interface Job {
  id: number;
  title: string;
  company: string;
  location: string;
  type: string;
  experience: string;
  salary: string;
  tags: string[];
  logoUrl?: string;
  createdAt: string;
  posted?: string;
}

// Pastel colors for the cards
const CARD_COLORS = [
  "bg-[#FFE1CC]", // Peach/Apricot
  "bg-[#D4F6ED]", // Mint
  "bg-[#E8DFF5]", // Lavender/Light Purple
  "bg-[#FCE4EC]", // Light Pink
  "bg-[#E3F2FD]", // Light Blue
  "bg-[#F0F4C3]", // Lime
];

export default function JobsContent() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedType, setSelectedType] = useState("All");
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedJob, setSelectedJob] = useState<{ id: number; title: string } | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleApply = (e: React.MouseEvent, job: Job) => {
    e.preventDefault(); 
    e.stopPropagation();
    setSelectedJob({ id: job.id, title: job.title });
    setIsModalOpen(true);
  };

  const fetchJobs = async () => {
    try {
      const res = await fetch("/api/jobs");
      if (res.ok) {
        const data = await res.json();
        setJobs(data);
      }
    } catch (error) {
      console.error("Error fetching jobs:", error);
    } finally {
      setLoading(false);
    }
  };

  // Helper to format date "20 May, 2023"
  const formatDate = (dateString: string) => {
    if (!dateString) return "Recent";
    const date = new Date(dateString);
    return date.toLocaleDateString("en-GB", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });
  };

  useEffect(() => {
    fetchJobs();

    // Real-time subscription
    const channel = supabase
      .channel('realtime-jobs')
      .on(
        'postgres_changes',
        { event: '*', schema: 'public', table: 'Job' },
        (payload) => {
          console.log('Realtime update:', payload);
          fetchJobs();
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  const filteredJobs = jobs.filter(job => 
    (selectedType === "All" || job.type === selectedType) &&
    (job.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
     job.company.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  return (
    <div className="min-h-screen bg-white">
      
      {/* Hero Section */}
      <div className="relative pt-20 pb-16 px-4 sm:px-6 border-b border-gray-100">
        <div className="max-w-[1400px] mx-auto text-center">
            
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-black text-white rounded-full text-[10px] uppercase font-bold tracking-widest mb-6">
                <span>We're Hiring</span>
                <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse"></span>
            </div>

            <h1 className="text-5xl md:text-7xl font-medium text-black tracking-tight mb-6">
               Find your next <br />
               career move.
            </h1>
            
            <p className="text-lg text-gray-500 max-w-2xl mx-auto font-light mb-12">
               Discover opportunities at India's leading financial institutions. <br className="hidden md:block"/> Connect directly with top recruiters.
            </p>

            {/* Search & Filter Bar */}
            <div className="max-w-4xl mx-auto bg-white border border-gray-200 p-2 rounded-full shadow-[0_10px_40px_-10px_rgba(0,0,0,0.05)] flex items-center">
                 <div className="flex-1 flex items-center px-4 md:px-6 border-r border-gray-100">
                    <Search className="w-5 h-5 text-gray-400" />
                    <input 
                      type="text" 
                      placeholder="Search by job title or company..." 
                      className="w-full px-4 py-3 bg-transparent outline-none text-sm font-medium text-black placeholder:text-gray-400"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                    />
                 </div>
                 <div className="hidden md:flex items-center px-6 gap-2 cursor-pointer hover:bg-gray-50 rounded-full py-3 transition-colors">
                    <Filter className="w-4 h-4 text-gray-500" />
                    <span className="text-sm font-bold text-gray-600">Filters</span>
                    <ChevronDown className="w-3 h-3 text-gray-400" />
                 </div>
                 <div className="pl-2">
                    <button className="bg-black text-white px-8 py-3.5 rounded-full text-sm font-bold hover:bg-gray-900 transition-colors shadow-lg shadow-black/10">
                       Search
                    </button>
                 </div>
            </div>

        </div>
      </div>

      {/* Jobs Grid Section */}
      <section className="py-20 px-4 sm:px-6 md:px-24 bg-white">
         <div className="max-w-[1600px] mx-auto">
            
            <div className="flex items-end justify-between mb-12">
               <div>
                  <h2 className="text-3xl font-bold text-black tracking-tight mb-2">Open Positions</h2>
                  <p className="text-sm text-gray-500 font-medium">
                    {loading ? "Loading opportunities..." : `Showing ${filteredJobs.length} opportunities`}
                  </p>
               </div>
               
               <div className="flex gap-2">
                  {["All", "Full-time", "Hybrid", "Remote"].map(type => (
                      <button 
                        key={type}
                        onClick={() => setSelectedType(type)}
                        className={`px-5 py-2.5 rounded-full text-xs font-bold transition-all border ${selectedType === type ? 'bg-black text-white border-black shadow-lg shadow-black/20' : 'bg-gray-50 text-gray-500 border-transparent hover:bg-gray-100'}`}
                      >
                        {type}
                      </button>
                  ))}
               </div>
            </div>

            {loading ? (
               <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                 {[1,2,3,4,5,6].map(i => (
                    <div key={i} className="h-[400px] bg-gray-50 animate-pulse rounded-[32px]"></div>
                 ))}
               </div>
            ) : filteredJobs.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {filteredJobs.map((job, index) => {
                      // Cycle through colors
                      const bgColor = CARD_COLORS[index % CARD_COLORS.length];
                      
                      // Ensure we have tags to display (fallback if empty)
                      const displayTags = job.tags && job.tags.length > 0 
                        ? job.tags 
                        : [job.type, job.experience, "Remote"].filter(Boolean);

                      return (
                      <div 
                        key={job.id}
                        className="group flex flex-col rounded-[32px] overflow-hidden border border-gray-100 transition-all duration-300 cursor-default h-full bg-white p-2"
                      >
                        {/* TOP SECTION: Colored Background with rounded corners */}
                        <div className={`${bgColor} rounded-[24px] p-6 flex flex-col justify-between flex-grow min-h-[260px] relative`}>
                          
                          {/* Top Row: Date & Experience */}
                          <div className="flex justify-between items-start mb-6">
                            <span className="bg-white/90 backdrop-blur-sm px-4 py-1.5 rounded-full text-xs font-bold text-black shadow-sm">
                              {formatDate(job.createdAt)}
                            </span>
                            <span className="bg-white/90 backdrop-blur-sm px-4 py-1.5 rounded-full text-xs font-bold text-black shadow-sm">
                              {job.experience} Yrs Exp
                            </span>
                          </div>

                          {/* Middle Row: Content & Logo */}
                          <div className="flex justify-between items-start mb-8">
                            <div className="flex-1 pr-4">
                              <p className="text-sm font-bold text-black/80 mb-1">{job.company}</p>
                              <h3 className="text-[28px] font-bold text-black leading-tight tracking-tight">
                                {job.title}
                              </h3>
                            </div>
                            {/* Company Logo */}
                            <div className="w-12 h-12 flex-shrink-0 bg-white rounded-full flex items-center justify-center p-2 shadow-sm overflow-hidden text-black font-bold text-xl">
                              {job.logoUrl ? (
                                 <img src={job.logoUrl} alt={job.company} className="w-full h-full object-contain" />
                              ) : (
                                 job.company.charAt(0)
                              )}
                            </div>
                          </div>

                          {/* Bottom Row of Top Section: Tags */}
                          <div className="flex flex-wrap gap-2 mt-auto">
                            {/* Always show job type and experience as tags first to match 'Part time', 'Senior level' etc */}
                            {[job.type, job.experience, ...displayTags].slice(0, 4).map((tag, i) => {
                               // Avoid duplicates if tags array already contains type/exp
                               if (!tag) return null;
                               const isFirst = i === 0;
                               return (
                                <span 
                                    key={i} 
                                    className={`px-4 py-1.5 rounded-full border border-black/60 bg-transparent text-[11px] font-medium text-black ${isFirst ? 'uppercase' : ''}`}
                                >
                                    {tag}
                                </span>
                               );
                            })}
                          </div>

                        </div>

                        {/* BOTTOM SECTION: White Background */}
                        <div className="bg-white px-4 pb-2 pt-4 flex items-center justify-between">
                          <div>
                            <p className="text-xl font-bold text-black">{job.salary}L</p>
                            <div className="flex flex-col mt-1">
                                <p className="text-xs font-medium text-gray-400">{job.location}</p>
                            </div>
                          </div>
                          
                          <button 
                            onClick={(e) => handleApply(e, job)}
                            className="bg-black text-white px-6 py-3 rounded-[16px] text-sm font-bold hover:bg-gray-800 transition-colors"
                          >
                            Apply Now
                          </button>
                        </div>

                      </div>
                      );
                    })}
                </div>
            ) : (
                <div className="text-center py-20 bg-gray-50 rounded-[40px] border border-dashed border-gray-200">
                    <Briefcase className="w-12 h-12 text-gray-300 mx-auto mb-4" />
                    <h3 className="text-lg font-bold text-black mb-1">No jobs found</h3>
                    <p className="text-gray-500 text-sm">Try adjusting your search filters.</p>
                </div>
            )}

         </div>
      </section>

      {/* CTA Section */}
      <CTASection />

      <JobApplicationModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        jobId={selectedJob?.id ?? null} 
        jobTitle={selectedJob?.title ?? ""} 
      />

    </div>
  );
}
