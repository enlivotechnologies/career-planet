'use server'

import { revalidatePath } from 'next/cache'
import { prisma } from '@/lib/prisma'

export async function applyForJob(formData: FormData) {
  const jobId = parseInt(formData.get('jobId') as string)
  const name = formData.get('name') as string
  const email = formData.get('email') as string
  const phone = formData.get('phone') as string
  const resumeUrl = formData.get('resumeUrl') as string

  if (!jobId || !name || !email || !phone || !resumeUrl) {
    return { error: 'All fields are required' }
  }

  try {
    // Basic validation for URL
    try {
      new URL(resumeUrl)
    } catch {
      return { error: 'Please enter a valid URL for your resume' }
    }

    await prisma.application.create({
      data: {
        jobId,
        name,
        email,
        contact: phone,
        resumeUrl,
      },
    })
    
    // Increment applicant count
    await prisma.job.update({
        where: { id: jobId },
        data: { applicants: { increment: 1 } }
    })

    revalidatePath('/jobs')
    return { success: true }
  } catch (error) {
    console.error('Failed to submit application:', error)
    return { error: 'Failed to submit application. Please try again.' }
  }
}
