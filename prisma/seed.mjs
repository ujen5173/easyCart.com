import { PrismaClient } from "@prisma/client";

// import run from "./data.js";
import run from "./run.mjs";

const prisma = new PrismaClient();
const cleanupDatabase = () => {
  return prisma.$transaction([
    prisma.product.deleteMany(),
    prisma.store.deleteMany(),
    prisma.user.deleteMany(),
    prisma.category.deleteMany(),
  ]);
};

const main = async () => {
  console.log("Cleaning up database...");
  await cleanupDatabase();
  console.log("Seeding database...");
  await run();
  console.log("Done!");
};

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
