"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { Bookmark, ArrowUpRight } from "lucide-react";
import JobApplicationModal from "./JobApplicationModal";

interface Job {
  id: number;
  title: string;
  company: string;
  location: string;
  type: string;
  salary: string;
  experience: string;
  logoUrl?: string; 
  active: boolean;
  posted?: string; // Optional field from schema
  tags: string[];
  createdAt: string; // From API it will be string ISO date
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
    const fetchJobs = async () => {
      try {
        const res = await fetch("/api/jobs");
        if (res.ok) {
          const data = await res.json();
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
      <div className="max-w-[1600px] mx-auto px-6 md:px-24">
        
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
            <ArrowUpRight className="w-4 h-4" />
          </Link>
        </div>

        {/* The Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {loading ? (
             [1, 2, 3].map((i) => (
                <div key={i} className="h-[400px] bg-gray-50 animate-pulse rounded-[32px]"></div>
             ))
          ) : jobs.length > 0 ? (
            jobs.map((job, index) => {
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
                      {job.experience} Exp
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
            })
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