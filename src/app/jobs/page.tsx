"use client";

import React, { useState, useEffect } from "react";
import { Search, MapPin, Briefcase, Clock, IndianRupee, ArrowUpRight, Filter, ChevronDown } from "lucide-react";
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
  color: string;
  logoUrl?: string;
}

export default function JobsPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedType, setSelectedType] = useState("All");
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedJob, setSelectedJob] = useState<{ id: number; title: string } | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleApply = (e: React.MouseEvent, job: Job) => {
    e.stopPropagation(); // Prevent card click if we add card click later
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
      <section className="py-20 px-4 sm:px-6 bg-white">
         <div className="max-w-[1400px] mx-auto">
            
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
                    <div key={i} className="h-64 bg-gray-100 animate-pulse rounded-[40px]"></div>
                 ))}
               </div>
            ) : filteredJobs.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {filteredJobs.map((job) => (
                        <div key={job.id} className="group bg-[#F5F5F7] rounded-[40px] p-8 transition-all duration-500 hover:shadow-[0_20px_40px_-15px_rgba(0,0,0,0.1)] hover:-translate-y-1 cursor-pointer relative overflow-hidden flex flex-col items-start h-full border border-transparent hover:border-black/5">
                            
                            {/* Hover Gradient Overlay */}
                            <div className={`absolute top-0 right-0 w-64 h-64 bg-gradient-to-br ${job.color ? job.color.replace('text-', 'from-').replace('600', '50/0').replace('bg-', 'to-') : 'from-gray-50/0 to-gray-200/20'} opacity-0 group-hover:opacity-30 transition-opacity duration-500 rounded-bl-[150px] pointer-events-none blur-3xl`}></div>

                            {/* Top Row: Logo & Arrow */}
                            <div className="flex justify-between items-start w-full mb-6 relative z-10">
                                {/* Company Logo Placeholder */}
                                <div className="w-16 h-16 rounded-[20px] bg-white shadow-[0_4px_20px_-5px_rgba(0,0,0,0.05)] flex items-center justify-center text-xl font-bold text-black border border-gray-100 group-hover:scale-105 transition-transform duration-500 overflow-hidden">
                                   {job.logoUrl ? (
                                     <img src={job.logoUrl} alt={job.company} className="w-full h-full object-cover" />
                                   ) : (
                                     job.company.charAt(0)
                                   )}
                                </div>
                                
                                <div className="w-10 h-10 rounded-full bg-white border border-gray-200 flex items-center justify-center group-hover:bg-black group-hover:text-white group-hover:border-black transition-all duration-500 shadow-sm">
                                   <ArrowUpRight className="w-5 h-5" />
                                </div>
                            </div>

                            {/* Job Info */}
                            <div className="relative z-10 mb-8">
                                <span className={`inline-block px-3 py-1 rounded-lg text-[10px] font-bold uppercase tracking-wider text-black bg-white border border-gray-200 mb-4`}>
                                   {job.type}
                                </span>
                                <h3 className="text-2xl font-bold text-black mb-1 group-hover:text-blue-600 transition-colors duration-300 tracking-tight leading-tight min-h-[64px]">
                                    {job.title}
                                </h3>
                                <p className="text-sm font-semibold text-gray-500">{job.company}</p>
                            </div>

                            {/* Tags / Details Row */}
                            <div className="flex flex-wrap gap-2 mb-8 relative z-10 w-full">
                               <div className="flex items-center gap-1.5 text-[11px] font-bold text-gray-600 bg-white px-3 py-2 rounded-xl border border-gray-100 shadow-sm">
                                  <MapPin className="w-3 h-3 text-gray-400" />
                                  {job.location}
                               </div>
                               <div className="flex items-center gap-1.5 text-[11px] font-bold text-gray-600 bg-white px-3 py-2 rounded-xl border border-gray-100 shadow-sm">
                                  <Clock className="w-3 h-3 text-gray-400" />
                                  {job.experience}
                                </div>
                               <div className="flex items-center gap-1.5 text-[11px] font-bold text-gray-600 bg-white px-3 py-2 rounded-xl border border-gray-100 shadow-sm">
                                  <IndianRupee className="w-3 h-3 text-gray-400" />
                                  {job.salary}
                               </div>
                            </div>

                            {/* Footer */}
                            <div className="mt-auto pt-6 border-t border-gray-200 w-full flex items-center justify-between relative z-10">
                                <div className="flex gap-2">
                                   {job.tags && job.tags.slice(0, 2).map((tag, i) => (
                                     <span key={i} className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">{tag}</span>
                                   ))}
                                </div>
                                <button 
                                   onClick={(e) => handleApply(e, job)}
                                   className="text-xs font-bold text-black group-hover:underline underline-offset-4 decoration-black transition-all flex items-center gap-1 cursor-pointer z-20"
                                >
                                   Apply Now
                                </button>
                            </div>
                        </div>
                    ))}
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

