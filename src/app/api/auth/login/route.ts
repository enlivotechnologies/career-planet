
import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import bcrypt from 'bcryptjs';

export async function POST(req: Request) {
  const start = Date.now();
  console.log(`[Login] Start: ${new Date().toISOString()}`);

  try {
    const { email, password } = await req.json();
    console.log(`[Login] Attempting for email: ${email}`);

    // Check if user exists
    const user = await prisma.user.findUnique({
      where: { email },
    });

    console.log(`[Login] User lookup took: ${Date.now() - start}ms`);

    if (!user) {
      console.log(`[Login] User NOT found: ${email}`);
      // For initial setup/demonstration, if NO users exist, create one with the provided credentials
      // This is NOT production safe but handles the "random one" request easily for setup
      const count = await prisma.user.count();
      if (count === 0) {
        console.log(`[Login] No users exist. Creating initial admin.`);
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = await prisma.user.create({
          data: {
            email,
            password: hashedPassword,
            name: "Admin",
          },
        });
        return NextResponse.json({
          user: { id: newUser.id, email: newUser.email, name: newUser.name },
          message: "Created initial admin user",
        });
      }
      return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 });
    }

    console.log(`[Login] User found. Verifying password...`);
    const isValid = await bcrypt.compare(password, user.password);
    console.log(`[Login] Password verification took: ${Date.now() - start}ms`);

    if (!isValid) {
      console.log(`[Login] Password INVALID.`);
      return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 });
    }

    console.log(`[Login] Success! Total time: ${Date.now() - start}ms`);
    return NextResponse.json({
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
      },
    });
  } catch (error) {
    console.error("[Login] Error:", error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
