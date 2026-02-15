"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { MapPin, Clock, IndianRupee, ArrowUpRight } from "lucide-react";
import JobApplicationModal from "./JobApplicationModal";

interface Job {
  id: number;
  title: string;
  company: string;
  location: string;
  type: string;
  salary: string;
  experience: string;
  logoUrl?: string; // Optional because API might not always return it or valid URL
  color?: string; // Optional, might be from DB or defaulting
  applicants: number;
  active: boolean;
}

export default function CurrentOpportunities() {
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

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const res = await fetch("/api/jobs");
        if (res.ok) {
          const data = await res.json();
          // Take only the latest 6 jobs
          setJobs(data.slice(0, 6));
        }
      } catch (error) {
        console.error("Failed to fetch jobs:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchJobs();
  }, []);

  return (
    <section className="w-full bg-white py-24 border-b border-gray-100">
      <div className="max-w-[1400px] mx-auto px-6">
        
        {/* Header Section */}
        <div className="flex items-end justify-between mb-16">
          <h2 className="text-[36px] sm:text-[48px] md:text-[54px] lg:text-[60px] font-medium text-black leading-[1.08] tracking-tighter">
            Latest Job Openings
          </h2>

          <Link
            href="/jobs"
            className="hidden md:flex items-center gap-2 text-sm font-semibold text-black border-b border-gray-200 pb-1 hover:border-black transition-colors"
          >
            View All Openings
            <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
          </Link>
        </div>

        {/* The Compact Premium Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {loading ? (
             // Loading Skeletons
             [1, 2, 3].map((i) => (
                <div key={i} className="h-64 bg-gray-50 animate-pulse rounded-[24px]"></div>
             ))
          ) : jobs.length > 0 ? (
            jobs.map((job) => (
              <div 
                key={job.id}
                className="group relative p-6 bg-[#FAFAFA] rounded-[24px] border border-transparent hover:border-gray-200 hover:bg-[#F0F0F0] transition-all duration-300 cursor-default"
              >
                {/* Header: Logo & Right Column */}
                <div className="flex justify-between items-start mb-5">
                  
                  {/* Logo Box */}
                  <div className={`w-12 h-12 rounded-2xl bg-white border border-gray-100 flex items-center justify-center text-lg font-bold overflow-hidden shadow-sm`}>
                    {job.logoUrl ? (
                      <img src={job.logoUrl} alt={job.company} className="w-full h-full object-cover" />
                    ) : (
                      <span className="text-gray-400">{job.company.charAt(0)}</span>
                    )}
                  </div>
                  
                  {/* Right Side: Type Badge & Applicant Count */}
                  <div className="flex flex-col items-end gap-2">
                    {/* Flat Badge: No Border, No Shadow */}
                    <span className="px-2.5 py-1 rounded-full bg-gray-200/50 text-[9px] font-bold uppercase tracking-widest text-gray-600">
                      {job.type}
                    </span>
                    
                    {/* Live Applicant Text */}
                    <div className="flex items-center gap-1.5 mt-0.5">
                      <span className={`w-1.5 h-1.5 rounded-full ${job.active ? 'bg-green-500 animate-pulse' : 'bg-gray-300'}`}></span>
                      <span className="text-[10px] font-medium text-gray-400">
                        {job.applicants} Applicants
                      </span>
                    </div>
                  </div>
                </div>

                {/* Title & Company */}
                <div className="mb-6">
                  <h3 className="text-xl font-semibold text-black leading-tight mb-1.5 group-hover:text-blue-600 transition-colors duration-300 min-h-[56px] line-clamp-2">
                    {job.title}
                  </h3>
                  <div className="flex items-center gap-2 text-xs font-medium text-gray-500">
                    <span>{job.company}</span>
                    <span className="text-gray-300">•</span>
                    <span>{job.location}</span>
                  </div>
                </div>

                {/* Footer: Metadata & Button */}
                <div className="flex items-end justify-between pt-5 border-t border-gray-200/40 group-hover:border-gray-200/80 transition-colors">
                  
                  {/* Metadata Tags with Text Labels */}
                  <div className="flex flex-col gap-2">
                     <div className="flex items-center gap-1.5 bg-white px-3 py-1.5 rounded-lg border border-gray-100 w-fit">
                        <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wide">Salary:</span>
                        <span className="text-[11px] font-semibold text-gray-600">{job.salary}</span>
                     </div>
                     <div className="flex items-center gap-1.5 bg-white px-3 py-1.5 rounded-lg border border-gray-100 w-fit">
                        <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wide">Exp:</span>
                        <span className="text-[11px] font-semibold text-gray-600">{job.experience}</span>
                     </div>
                  </div>

                  {/* Updated Button: 'Apply for job' + Arrow */}
                  <button 
                    onClick={(e) => handleApply(e, job)}
                    className="flex items-center gap-2 bg-black text-white px-5 py-2.5 rounded-full hover:bg-gray-900 transition-all duration-300 shadow-md shadow-black/10 group/btn"
                  >
                    <span className="text-xs font-bold tracking-wide">Apply</span>
                    <ArrowUpRight className="w-3.5 h-3.5 text-white/70 group-hover/btn:text-white group-hover/btn:translate-x-0.5 transition-all duration-300" />
                  </button>

                </div>
              </div>
            ))
          ) : (
            <div className="col-span-full py-12 text-center bg-gray-50 rounded-[24px] border border-dashed border-gray-200">
               <p className="text-gray-500 font-medium">No job openings at the moment. Check back later!</p>
            </div>
          )}
        </div>

        {/* Mobile Link */}
        <div className="mt-12 md:hidden flex justify-center">
            <Link href="/jobs" className="text-sm font-bold border-b border-black pb-1">View All Openings</Link>
        </div>

      </div>
      <JobApplicationModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        jobId={selectedJob?.id ?? null} 
        jobTitle={selectedJob?.title ?? ""} 
      />
    </section>
  );
}