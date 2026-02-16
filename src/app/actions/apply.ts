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

    const application = await prisma.application.create({
      data: {
        jobId,
        name,
        email,
        contact: phone,
        resumeUrl,
      },
      include: {
        job: true
      }
    })
    
    // Increment applicant count
    const jobUpdate = await prisma.job.update({
        where: { id: jobId },
        data: { applicants: { increment: 1 } }
    })

    // Send email notification (Fail-safe: Application is already saved)
    try {
        const { transporter, mailOptions } = await import('@/lib/nodemailer');
        
        console.log('Attempting to send email to:', process.env.EMAIL_USER);
        
        await transporter.sendMail({
            ...mailOptions,
            to: process.env.EMAIL_USER, // The admin email who should receive applications
            subject: `New Job Application: ${application.job.title}`,
            text: `
New Application Received for ${application.job.title}

Name: ${name}
Email: ${email}
Phone: ${phone}
Resume Link: ${resumeUrl}

Job Details:
Title: ${application.job.title}
Location: ${application.job.location}
Salary: ${application.job.salary}

(This is an automated message from CareerPlanet)
            `,
            html: `
                <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto;">
                    <h2 style="color: #000;">New Application Received</h2>
                    <p><strong>Job:</strong> ${application.job.title}</p>
                    <hr style="border: 0; border-top: 1px solid #eaeaea;" />
                    <h3>Applicant Details:</h3>
                    <p><strong>Name:</strong> ${name}</p>
                    <p><strong>Email:</strong> <a href="mailto:${email}">${email}</a></p>
                    <p><strong>Phone:</strong> ${phone}</p>
                    <p><strong>Resume:</strong> <a href="${resumeUrl}" target="_blank" style="background: #000; color: #fff; padding: 10px 20px; text-decoration: none; border-radius: 6px; display: inline-block; margin-top: 10px;">View Resume</a></p>
                    <hr style="border: 0; border-top: 1px solid #eaeaea;" />
                    <h3>Job Info:</h3>
                    <p><strong>Location:</strong> ${application.job.location}</p>
                    <p><strong>Salary:</strong> ${application.job.salary}</p>
                </div>
            `,
        });
        console.log('Email sent successfully');
    } catch (emailError: any) {
        console.error('Failed to send email:', emailError?.message || emailError);
        // We do typically NOT want to fail the request if the DB save worked, 
        // but since the user specifically requested "email logic", we should log it clearly.
    }


    revalidatePath('/jobs')
    return { success: true }
  } catch (error) {
    console.error('Failed to submit application:', error)
    return { error: `Failed to submit application: ${(error as Error).message || 'Unknown error'}` }
  }
}
