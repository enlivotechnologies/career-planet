
import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET() {
  try {
    const jobs = await prisma.job.findMany({
      orderBy: { createdAt: 'desc' },
    });
    return NextResponse.json(jobs);
  } catch (error) {
    console.error("Fetch jobs error:", error);
    return NextResponse.json({ error: 'Error fetching jobs' }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { title, company, location, type, salary, exp, tags, logoUrl, description } = body;

    const job = await prisma.job.create({
      data: {
        title,
        company,
        location,
        type,
        salary,
        experience: exp,
        tags: tags || ["Insurance", "Sales"], // Default tags if empty
        description: description || "",
        logoUrl: logoUrl || "",
        posted: "Just now",
        active: true,
        applicants: 0,
        // Colors can be randomized or selected from frontend. Using a default for now.
        color: "bg-blue-50 text-blue-600", 
      },
    });
    
    return NextResponse.json(job, { status: 201 });
  } catch (error) {
    console.error("Create job error:", error);
    return NextResponse.json({ error: 'Error creating job' }, { status: 500 });
  }
}
