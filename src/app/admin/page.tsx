"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { createClient } from "@supabase/supabase-js";
import { 
  Briefcase, 
  Radio, 
  Users, 
  Zap, 
  Trash2, 
  LogOut, 
  Plus, 
  Search, 
  MapPin, 
  Building2, 
  IndianRupee, 
  Clock, 
  CheckCircle2, 
  XCircle,
  UploadCloud
} from "lucide-react";

// Initialize Supabase Client
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "";
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_DEFAULT_KEY || "";
const supabase = createClient(supabaseUrl, supabaseKey);

export default function AdminPage() {
  // Auth State
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  // App State
  const [jobs, setJobs] = useState<any[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  
  // New Job Form State
  const [newJob, setNewJob] = useState({
    title: "",
    company: "",
    location: "",
    type: "ON-SITE",
    salary: "",
    exp: "",
  });
  const [logoFile, setLogoFile] = useState<File | null>(null);

  // Fetch Jobs on Load
  const fetchJobs = async () => {
    try {
      const res = await fetch("/api/jobs");
      if (res.ok) {
        const data = await res.json();
        setJobs(data);
      }
    } catch (err) {
      console.error("Failed to fetch jobs", err);
    }
  };

  useEffect(() => {
    if (isAuthenticated) {
      fetchJobs();
    }
  }, [isAuthenticated]);

  // Login Handler
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      if (res.ok) {
        setIsAuthenticated(true);
      } else {
        const data = await res.json(); // Safely parse error only if request failed
        setError(data.error || "Invalid credentials.");
      }
    } catch (err) {
      setError("Something went wrong. Please check your connection.");
    } finally {
      setLoading(false);
    }
  };

  // Add Job Handler
  const handleAddJob = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      let logoUrl = "";

      // 1. Upload Logo if selected
      if (logoFile) {
        // Validation
        if (logoFile.size > 2 * 1024 * 1024) {
          alert("File size must be less than 2MB");
          setLoading(false);
          return;
        }
        
        if (!logoFile.type.startsWith('image/')) {
          alert("Only image files are allowed");
          setLoading(false);
          return;
        }

        const fileName = `${Date.now()}-${logoFile.name.replace(/[^a-zA-Z0-9.]/g, '_')}`; // Sanitize filename
        const { data, error: uploadError } = await supabase.storage
          .from("logos")
          .upload(fileName, logoFile, {
            cacheControl: '3600',
            upsert: false
          });

        if (uploadError) {
          console.error("Upload error:", uploadError);
          
          // Check for missing bucket error OR RLS Policy violation
          if (
            uploadError.message.includes("Bucket not found") || 
            (uploadError as any).statusCode === "404" || 
            (uploadError as any).error === "Bucket not found" ||
            uploadError.message.includes("violates row-level security policy")
          ) {
            alert("⚠️ STORAGE SETUP REQUIRED\n\nThe 'logos' bucket is missing or restricted.\n\nPLEASE GO TO SUPABASE DASHBOARD -> STORAGE:\n1. Create a new bucket named 'logos'\n2. Toggle 'Public Bucket' to ON during creation.\n3. (If already created) Go to 'Policies' tab -> Add Policy -> 'Full Access' for all users.\n\nThen try again.");
          } 
          else {
             alert(`Upload failed: ${uploadError.message}`);
          }
          setLoading(false);
          return;
        }

        if (data) {
          const { data: publicUrlData } = supabase.storage
            .from("logos")
            .getPublicUrl(fileName);
          logoUrl = publicUrlData.publicUrl;
        }
      }

      // 2. Create Job in DB
      const res = await fetch("/api/jobs", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...newJob,
          logoUrl,
          tags: ["Insurance", "Sales"], // Default tags for now
        }),
      });

      if (res.ok) {
        const savedJob = await res.json();
        // Optimistic update or refetch
        setJobs([savedJob, ...jobs]);
        setIsModalOpen(false);
        setNewJob({ title: "", company: "", location: "", type: "ON-SITE", salary: "", exp: "" });
        setLogoFile(null);
      } else {
        console.error("Failed to save job");
      }
    } catch (err) {
      console.error("Error adding job:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm("Are you sure you want to delete this job?")) return;
    try {
      await fetch(`/api/jobs/${id}`, { method: "DELETE" });
      setJobs(jobs.filter(j => j.id !== id));
    } catch (err) {
      console.error("Failed to delete", err);
    }
  };

  const filteredJobs = jobs.filter(job => 
    job.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    job.company.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // ------------------------------------------------------------------
  // RENDER: LOGIN VIEW (PREMIUM WHITE)
  // ------------------------------------------------------------------
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen w-full bg-white flex items-center justify-center p-4">
        
        <div className="w-full max-w-md p-6 md:p-12">
          
          <div className="text-center mb-12">
            <div className="flex justify-center mb-8">
               <img 
                 src="/logo/careerplanet-logo.png" 
                 alt="CareerPlanet" 
                 className="h-12 w-auto object-contain"
               />
            </div>
            <h1 className="text-3xl font-bold text-black tracking-tight mb-3">Welcome Back</h1>
            <p className="text-gray-400 text-sm font-medium">Safe & Secure Admin Portal</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-5">
            <div>
              <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-2">Email Address</label>
              <input 
                type="text" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-gray-50/50 border border-gray-200 rounded-xl px-4 py-3.5 text-gray-900 font-medium focus:outline-none focus:border-black focus:bg-white transition-all placeholder:text-gray-400"
                placeholder="Enter username/email"
              />
            </div>
            
            <div>
              <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-2">Password</label>
              <input 
                type="password" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-gray-50/50 border border-gray-200 rounded-xl px-4 py-3.5 text-gray-900 font-medium focus:outline-none focus:border-black focus:bg-white transition-all placeholder:text-gray-400"
                placeholder="••••••••"
              />
            </div>

            {error && (
              <div className="flex items-center gap-2 p-3 bg-red-50 text-red-600 rounded-lg text-xs font-semibold justify-center">
                 <XCircle className="w-4 h-4" />
                 {error}
              </div>
            )}

            <button 
              type="submit"
              disabled={loading}
              className="w-full bg-black hover:bg-gray-900 text-white font-bold py-3.5 rounded-xl transition-all shadow-xl shadow-black/5 transform hover:-translate-y-0.5 disabled:opacity-50"
            >
              {loading ? "Verifying..." : "Access Dashboard"}
            </button>
          </form>

          <div className="mt-8 text-center">
            <Link href="/" className="text-xs font-semibold text-gray-400 hover:text-black transition-colors">
              Return to Homepage
            </Link>
          </div>
        </div>
      </div>
    );
  }

  // ------------------------------------------------------------------
  // RENDER: DASHBOARD VIEW
  // ------------------------------------------------------------------
  return (
    <div className="min-h-screen w-full bg-[#fcfcfc]">
      
      {/* Header - No Shadow, Clean Border */}
      <header className="bg-white border-b border-gray-100 sticky top-0 z-40">
        <div className="max-w-[1600px] mx-auto px-6 h-[72px] flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-black rounded-lg flex items-center justify-center text-white">
                <Briefcase className="w-4 h-4" strokeWidth={3} />
            </div>
            <span className="font-bold text-lg tracking-tight text-black">CareerPlanet <span className="text-gray-400 font-medium">Admin</span></span>
          </div>
          
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-2 bg-green-50 px-3 py-1.5 rounded-full border border-green-100/50">
              <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse"></span>
              <span className="text-xs font-bold text-green-700 uppercase tracking-wider">System Online</span>
            </div>
            <button 
              onClick={() => setIsAuthenticated(false)}
              className="group flex items-center gap-2 text-sm font-medium text-gray-500 hover:text-red-600 transition-colors"
            >
              <LogOut className="w-4 h-4 group-hover:stroke-red-600 transition-colors" />
              <span>Sign Out</span>
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-[1600px] mx-auto px-6 py-10">
        
        {/* Stats Row - Flat Cards, No Shadows */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {[
            { label: "Total Careers", value: jobs.length, icon: Briefcase, color: "text-blue-600", bg: "bg-blue-50" },
            { label: "Active Listings", value: jobs.filter(j => j.active).length, icon: Radio, color: "text-green-600", bg: "bg-green-50" },
            { label: "Total Apps", value: jobs.reduce((acc, curr) => acc + (curr.applicants || 0), 0), icon: Users, color: "text-purple-600", bg: "bg-purple-50" },
          ].map((stat, i) => (
            <div key={i} className="bg-white p-6 rounded-2xl border border-gray-100 flex items-center justify-between group hover:border-gray-300 transition-colors duration-300">
              <div>
                <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">{stat.label}</p>
                <p className="text-3xl font-bold text-black tracking-tight">{stat.value}</p>
              </div>
              <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${stat.bg} ${stat.color}`}>
                <stat.icon className="w-6 h-6" strokeWidth={2} />
              </div>
            </div>
          ))}
        </div>

        {/* Action Bar */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-8">
          <div className="flex items-center gap-4 w-full md:w-auto">
             <h2 className="text-2xl font-bold text-black tracking-tight">Manage Careers</h2>
             <span className="bg-gray-100 text-gray-500 text-xs font-bold px-2.5 py-1 rounded-md">{jobs.length}</span>
          </div>
          
          <div className="flex items-center gap-3 w-full md:w-auto">
             <div className="relative flex-1 md:w-64">
               <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
               <input 
                 type="text" 
                 placeholder="Search careers..." 
                 value={searchQuery}
                 onChange={(e) => setSearchQuery(e.target.value)}
                 className="w-full pl-10 pr-4 py-2.5 bg-white border border-gray-200 rounded-lg text-sm text-black focus:outline-none focus:border-black transition-colors"
               />
             </div>
             <button 
               onClick={() => setIsModalOpen(true)}
               className="flex items-center gap-2 bg-black text-white px-5 py-2.5 rounded-lg font-bold text-sm hover:bg-gray-800 transition-all shadow-lg shadow-black/10 whitespace-nowrap"
             >
               <Plus className="w-4 h-4" />
               Add Career
             </button>
          </div>
        </div>

        {/* Careers Table - Flat, Clean Borders */}
        <div className="bg-white rounded-[20px] border border-gray-200 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead className="bg-[#fcfcfc] border-b border-gray-100">
                <tr>
                  <th className="px-8 py-5 text-[10px] font-bold text-gray-400 uppercase tracking-widest">Title / Company</th>
                  <th className="px-8 py-5 text-[10px] font-bold text-gray-400 uppercase tracking-widest">Location</th>
                  <th className="px-8 py-5 text-[10px] font-bold text-gray-400 uppercase tracking-widest">Type</th>
                  <th className="px-8 py-5 text-[10px] font-bold text-gray-400 uppercase tracking-widest">Applicants</th>
                  <th className="px-8 py-5 text-[10px] font-bold text-gray-400 uppercase tracking-widest">Status</th>
                  <th className="px-8 py-5 text-[10px] font-bold text-gray-400 uppercase tracking-widest text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {filteredJobs.length > 0 ? filteredJobs.map((job) => (
                  <tr key={job.id} className="group hover:bg-gray-50/50 transition-colors">
                    <td className="px-8 py-5">
                      <div className="flex items-center gap-3">
                         {job.logoUrl ? (
                           <img src={job.logoUrl} alt={job.company} className="w-8 h-8 rounded-lg object-contain bg-white border border-gray-100" />
                         ) : (
                           <div className="w-8 h-8 rounded-lg bg-gray-100 flex items-center justify-center text-[10px] font-bold text-gray-400">
                             {job.company.charAt(0)}
                           </div>
                         )}
                         <div>
                           <p className="font-bold text-sm text-gray-900">{job.title}</p>
                           <p className="text-xs text-gray-500 font-medium">{job.company}</p>
                         </div>
                      </div>
                    </td>
                    <td className="px-8 py-5">
                       <div className="flex items-center gap-1.5 text-sm text-gray-500 font-medium">
                         <MapPin className="w-3.5 h-3.5 text-gray-400" />
                         {job.location}
                       </div>
                    </td>
                    <td className="px-8 py-5">
                      <span className="inline-flex items-center px-2.5 py-1 rounded-md border border-gray-200 bg-white text-[10px] font-bold text-gray-600 uppercase tracking-wide">
                        {job.type}
                      </span>
                    </td>
                    <td className="px-8 py-5">
                      <div className="flex items-center gap-3">
                        <span className="text-xs font-bold text-black">{job.applicants}</span>
                      </div>
                    </td>
                    <td className="px-8 py-5">
                      <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${job.active ? 'bg-green-50 text-green-700 border border-green-100' : 'bg-gray-50 text-gray-500 border border-gray-100'}`}>
                        <span className={`w-1.5 h-1.5 rounded-full ${job.active ? 'bg-green-500' : 'bg-gray-400'}`}></span>
                        {job.active ? 'Active' : 'Closed'}
                      </span>
                    </td>
                    <td className="px-8 py-5 text-right">
                      <button 
                        onClick={() => handleDelete(job.id)}
                        className="text-gray-300 hover:text-red-500 hover:bg-red-50 p-2 rounded-lg transition-all"
                        title="Delete listing"
                      >
                         <Trash2 className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                )) : (
                  <tr>
                    <td colSpan={6} className="px-8 py-12 text-center text-gray-400 text-sm">
                      No careers found matching your search.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </main>

      {/* ADD JOB MODAL */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
          <div className="bg-white rounded-[24px] w-full max-w-2xl p-8 shadow-2xl shadow-black/20 animate-fade-in-up">
            <div className="flex justify-between items-center mb-8 border-b border-gray-100 pb-6">
              <div>
                <h2 className="text-xl font-bold text-black flex items-center gap-2">
                   <Briefcase className="w-5 h-5" />
                   Post New Career
                </h2>
                <p className="text-gray-500 text-sm mt-1">Fill in the details to publish a new listing.</p>
              </div>
              <button 
                onClick={() => setIsModalOpen(false)} 
                className="w-8 h-8 rounded-full bg-gray-50 hover:bg-gray-100 flex items-center justify-center text-gray-400 hover:text-black transition-colors"
              >
                <XCircle className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleAddJob} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                   <label className="flex items-center gap-2 text-[10px] font-bold text-gray-400 uppercase tracking-widest">
                     <Building2 className="w-3 h-3" /> Job Title
                   </label>
                  <input required type="text" placeholder="e.g. Senior Advisor" className="w-full bg-white border border-gray-200 rounded-lg px-4 py-3 text-sm font-medium outline-none focus:border-black focus:ring-1 focus:ring-black transition-all" value={newJob.title} onChange={e => setNewJob({...newJob, title: e.target.value})} />
                </div>
                <div className="space-y-2">
                  <label className="flex items-center gap-2 text-[10px] font-bold text-gray-400 uppercase tracking-widest">
                     <Briefcase className="w-3 h-3" /> Company
                   </label>
                  <input required type="text" placeholder="e.g. HDFC Life" className="w-full bg-white border border-gray-200 rounded-lg px-4 py-3 text-sm font-medium outline-none focus:border-black focus:ring-1 focus:ring-black transition-all" value={newJob.company} onChange={e => setNewJob({...newJob, company: e.target.value})} />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="flex items-center gap-2 text-[10px] font-bold text-gray-400 uppercase tracking-widest">
                     <MapPin className="w-3 h-3" /> Location
                   </label>
                  <input required type="text" placeholder="e.g. Mumbai" className="w-full bg-white border border-gray-200 rounded-lg px-4 py-3 text-sm font-medium outline-none focus:border-black focus:ring-1 focus:ring-black transition-all" value={newJob.location} onChange={e => setNewJob({...newJob, location: e.target.value})} />
                </div>
                <div className="space-y-2">
                  <label className="flex items-center gap-2 text-[10px] font-bold text-gray-400 uppercase tracking-widest">
                     <Briefcase className="w-3 h-3" /> Job Type
                   </label>
                  <select className="w-full bg-white border border-gray-200 rounded-lg px-4 py-3 text-sm font-medium outline-none focus:border-black focus:ring-1 focus:ring-black transition-all appearance-none" value={newJob.type} onChange={e => setNewJob({...newJob, type: e.target.value})}>
                    <option>ON-SITE</option>
                    <option>HYBRID</option>
                    <option>REMOTE</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                   <label className="flex items-center gap-2 text-[10px] font-bold text-gray-400 uppercase tracking-widest">
                     <IndianRupee className="w-3 h-3" /> Salary Range
                   </label>
                  <input required type="text" placeholder="e.g. ₹5.0L - ₹8.0L" className="w-full bg-white border border-gray-200 rounded-lg px-4 py-3 text-sm font-medium outline-none focus:border-black focus:ring-1 focus:ring-black transition-all" value={newJob.salary} onChange={e => setNewJob({...newJob, salary: e.target.value})} />
                </div>
                <div className="space-y-2">
                  <label className="flex items-center gap-2 text-[10px] font-bold text-gray-400 uppercase tracking-widest">
                     <Clock className="w-3 h-3" /> Experience
                   </label>
                  <input required type="text" placeholder="e.g. 2-5 Yrs" className="w-full bg-white border border-gray-200 rounded-lg px-4 py-3 text-sm font-medium outline-none focus:border-black focus:ring-1 focus:ring-black transition-all" value={newJob.exp} onChange={e => setNewJob({...newJob, exp: e.target.value})} />
                </div>
              </div>

              {/* Logo Upload */}
              <div className="space-y-2">
                <label className="flex items-center gap-2 text-[10px] font-bold text-gray-400 uppercase tracking-widest">
                  <UploadCloud className="w-3 h-3" /> Company Logo
                </label>
                <input 
                  type="file" 
                  accept="image/*"
                  onChange={(e) => setLogoFile(e.target.files?.[0] || null)}
                  className="w-full bg-white border border-gray-200 rounded-lg px-4 py-3 text-sm font-medium outline-none focus:border-black transition-all file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-xs file:font-semibold file:bg-gray-50 file:text-black hover:file:bg-black hover:file:text-white"
                />
              </div>

              <div className="pt-6 flex gap-4 border-t border-gray-100">
                 <button type="button" onClick={() => setIsModalOpen(false)} className="px-6 py-3 rounded-lg font-bold text-gray-500 hover:bg-gray-50 hover:text-black transition-colors text-sm">Cancel</button>
                 <button type="submit" disabled={loading} className="flex-1 bg-black text-white py-3 rounded-lg font-bold text-sm hover:bg-gray-800 transition-all shadow-lg shadow-black/10 flex items-center justify-center gap-2 disabled:opacity-50">
                    <CheckCircle2 className="w-4 h-4" />
                    {loading ? "Publishing..." : "Publish Career"}
                 </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}



