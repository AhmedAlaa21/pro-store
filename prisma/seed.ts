import "dotenv/config";

import { PrismaClient } from "@/app/generated/prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import sampleData from "@/db/sample-data";

const adapter = new PrismaPg({
  connectionString: process.env.DATABASE_URL,
});

const prisma = new PrismaClient({
  adapter,
});

async function main() {
  try {
    await prisma.product.deleteMany();
    await prisma.account.deleteMany();
    await prisma.session.deleteMany();
    await prisma.verificationToken.deleteMany();
    await prisma.user.deleteMany();

    await prisma.user.createMany({
      data: sampleData.users,
    });
    await prisma.product.createMany({
      data: sampleData.products,
    });

    console.log("Data seeded successfully.");
  } catch (error) {
    console.error(error);
  }
}

main();
