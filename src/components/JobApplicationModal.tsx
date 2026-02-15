'use client'

import { useState } from 'react'
import { X, Loader2, CheckCircle, UploadCloud } from 'lucide-react'
import { applyForJob } from '@/app/actions/apply'

interface JobApplicationModalProps {
  isOpen: boolean
  onClose: () => void
  jobId: number | null
  jobTitle: string
}

export default function JobApplicationModal({ isOpen, onClose, jobId, jobTitle }: JobApplicationModalProps) {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const [error, setError] = useState('')

  if (!isOpen || jobId === null) return null

  async function handleSubmit(formData: FormData) {
    setIsSubmitting(true)
    setError('')
    
    try {
      const result = await applyForJob(formData)
      
      if (result?.error) {
        setError(result.error)
        setIsSubmitting(false)
      } else {
        setIsSuccess(true)
        setIsSubmitting(false)
        // Auto-close after 2s
        setTimeout(() => {
          setIsSuccess(false) // Reset state first
          onClose() // Then close
        }, 2000)
      }
    } catch (e) {
      setError('Something went wrong. Please try again.')
      setIsSubmitting(false)
    }
  }

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-300">
      <div 
        className="bg-white rounded-[32px] w-full max-w-lg overflow-hidden shadow-2xl animate-in zoom-in-95 slide-in-from-bottom-4 duration-300 relative"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="px-8 py-6 border-b border-gray-100 flex items-center justify-between bg-gray-50/50">
          <div>
            <span className="text-xs font-bold text-gray-400 uppercase tracking-wider block mb-1">Applying for</span>
            <h2 className="text-xl font-bold text-black leading-tight pr-4">{jobTitle}</h2>
          </div>
          <button 
            onClick={onClose}
            type="button"
            className="w-9 h-9 flex-shrink-0 rounded-full bg-white border border-gray-200 flex items-center justify-center hover:bg-gray-100 transition-colors"
          >
            <X className="w-4 h-4 text-gray-500" />
          </button>
        </div>

        {/* Content */}
        <div className="p-8">
          {isSuccess ? (
            <div className="flex flex-col items-center justify-center py-8 text-center animate-in fade-in duration-300">
              <div className="w-20 h-20 bg-green-100/50 text-green-600 rounded-full flex items-center justify-center mb-6 ring-4 ring-green-50">
                <CheckCircle className="w-10 h-10" />
              </div>
              <h3 className="text-2xl font-bold text-black mb-2">Application Sent!</h3>
              <p className="text-gray-500 text-sm max-w-xs mx-auto">
                Thanks for applying to <strong>{jobTitle}</strong>. We'll review your application and get back to you soon.
              </p>
            </div>
          ) : (
            <form action={handleSubmit} className="space-y-5">
              <input type="hidden" name="jobId" value={jobId} />
              
              {/* Full Name */}
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-gray-500 uppercase tracking-wider ml-1">Full Name</label>
                <input 
                  required
                  name="name"
                  type="text" 
                  placeholder="e.g. Alex Morgan"
                  className="w-full px-5 py-3.5 bg-gray-50 border border-gray-100 rounded-2xl focus:bg-white focus:ring-2 focus:ring-black/5 focus:border-black/10 outline-none transition-all placeholder:text-gray-400 font-medium text-black text-sm"
                />
              </div>

              {/* Email */}
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-gray-500 uppercase tracking-wider ml-1">Email Address</label>
                <input 
                  required
                  name="email"
                  type="email" 
                  placeholder="name@example.com"
                  className="w-full px-5 py-3.5 bg-gray-50 border border-gray-100 rounded-2xl focus:bg-white focus:ring-2 focus:ring-black/5 focus:border-black/10 outline-none transition-all placeholder:text-gray-400 font-medium text-black text-sm"
                />
              </div>

              {/* Phone */}
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-gray-500 uppercase tracking-wider ml-1">Contact Number</label>
                <input 
                  required
                  name="phone"
                  type="tel" 
                  placeholder="+91 98765 43210"
                  className="w-full px-5 py-3.5 bg-gray-50 border border-gray-100 rounded-2xl focus:bg-white focus:ring-2 focus:ring-black/5 focus:border-black/10 outline-none transition-all placeholder:text-gray-400 font-medium text-black text-sm"
                />
              </div>

              {/* Resume URL */}
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-gray-500 uppercase tracking-wider ml-1">Resume Link (GDrive / LinkedIn)</label>
                <div className="relative">
                  <input 
                    required
                    name="resumeUrl"
                    type="url" 
                    placeholder="https://drive.google.com/..."
                    className="w-full pl-11 pr-5 py-3.5 bg-gray-50 border border-gray-100 rounded-2xl focus:bg-white focus:ring-2 focus:ring-black/5 focus:border-black/10 outline-none transition-all placeholder:text-gray-400 font-medium text-black text-sm"
                  />
                  <UploadCloud className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                </div>
                <p className="text-[10px] text-gray-400 ml-1 font-medium">Please ensure the link is publicly accessible.</p>
              </div>

              {error && (
                <p className="text-sm text-red-500 font-bold bg-red-50 p-3 rounded-xl border border-red-100 text-center animate-in fade-in slide-in-from-top-1">
                  {error}
                </p>
              )}

              <div className="pt-2">
                <button 
                  type="submit"
                  disabled={isSubmitting}
                  className="cursor-pointer w-full bg-black text-white py-4 rounded-2xl font-bold text-sm tracking-wide hover:bg-gray-900 active:scale-[0.98] transition-all disabled:opacity-70 disabled:active:scale-100 flex items-center justify-center gap-2 shadow-xl shadow-black/10 group"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      Sending...
                    </>
                  ) : (
                    <>
                        Submit Application
                    </>
                  )}
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  )
}
