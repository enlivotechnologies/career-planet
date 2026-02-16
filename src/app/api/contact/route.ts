import { NextResponse } from 'next/server';
import { transporter, mailOptions } from '@/lib/nodemailer';

export async function POST(req: Request) {
  try {
    const data = await req.json();
    const { type, ...fields } = data;

    // Default subject and html content
    let subject = 'New Contact Form Submission';
    let htmlContent = '';

    if (type === 'company') {
      subject = `New Hiring Inquiry from ${fields.companyName || 'Unknown Company'}`;
      htmlContent = `
        <div style="font-family: Arial, sans-serif; padding: 20px; color: #333;">
          <h2 style="color: #000;">New Hiring Inquiry</h2>
          <p><strong>Company Name:</strong> ${fields.companyName}</p>
          <p><strong>Contact Person:</strong> ${fields.contactPerson}</p>
          <p><strong>Email:</strong> ${fields.email}</p>
          <p><strong>Phone:</strong> ${fields.phone}</p>
          <div style="margin-top: 20px;">
            <p><strong>Requirements/Message:</strong></p>
            <p style="background-color: #f9f9f9; padding: 15px; border-radius: 5px;">${fields.requirements?.replace(/\n/g, '<br>')}</p>
          </div>
        </div>
      `;
    } else {
      // General contact form
      subject = `New Contact Message from ${fields.name || 'Website Visitor'}`;
      htmlContent = `
        <div style="font-family: Arial, sans-serif; padding: 20px; color: #333;">
          <h2 style="color: #000;">New Contact Message</h2>
          <p><strong>Name:</strong> ${fields.name}</p>
          <p><strong>Email:</strong> ${fields.email}</p>
          <div style="margin-top: 20px;">
            <p><strong>Message:</strong></p>
            <p style="background-color: #f9f9f9; padding: 15px; border-radius: 5px;">${fields.message?.replace(/\n/g, '<br>')}</p>
          </div>
        </div>
      `;
    }

    // Send email to the admin (configured in env as EMAIL_USER)
    await transporter.sendMail({
      ...mailOptions,
      to: 'contact@careerplanet.com', // Now sending to the professional business email
      replyTo: fields.email, 
      subject: subject,
      html: htmlContent,
    });

    return NextResponse.json({ success: true, message: 'Email sent successfully' });
  } catch (error) {
    console.error('Failed to send email:', error);
    return NextResponse.json({ success: false, error: 'Failed to send email' }, { status: 500 });
  }
}
