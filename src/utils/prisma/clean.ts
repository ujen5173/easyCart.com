import { prisma } from "~/server/db";

export const cleanupDatabase = () => {
  const propertyNames = Object.getOwnPropertyNames(prisma);
  const modelNames = propertyNames.filter(
    (propertyName) => !propertyName.startsWith("_")
  );

  return Promise.all(modelNames.map((model) => prisma[model].deleteMany()));
};
