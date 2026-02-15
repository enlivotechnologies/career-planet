import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  const email = "admin@careerplanet.com";
  
  console.log("Checking for user:", email);
  
  const user = await prisma.user.findUnique({
    where: { email },
  });

  if (!user) {
    console.log("User NOT found in database.");
  } else {
    console.log("User FOUND.");
    console.log("ID:", user.id);
    console.log("Email:", user.email);
    console.log("Password Hash:", user.password);
    
    // Verify password locally
    const isMatch = await bcrypt.compare("admin", user.password);
    console.log("Password 'admin' matches hash:", isMatch);
  }
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
