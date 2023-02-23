import { z } from "zod";
import { prisma } from "~/server/db";
import {
  createTRPCRouter,
  publicProcedure,
  adminProcedure,
} from "~/server/api/trpc";

export const categoriesRouter = createTRPCRouter({
  all: publicProcedure.query(() => {
    return prisma.category.findMany();
  }),

  single: publicProcedure
    .input(
      z.object({
        slug: z.string(),
      })
    )
    .query(({ input }) => {
      return prisma.category.findFirst({
        where: {
          slug: input.slug,
        },
      });
    }),

  create: adminProcedure
    .input(
      z.object({
        name: z.string(),
        slug: z.string(),
        parentId: z.string().cuid().optional(),
      })
    )
    .mutation(({ input }) => {
      return prisma.category.create({
        data: input,
      });
    }),

  search: adminProcedure
    .input(
      z.object({
        name: z.string(),
      })
    )
    .query(({ input }) => {
      return prisma.category.findMany({
        where: {
          name: {
            contains: input.name,
            mode: "insensitive",
          },
        },
      });
    }),
});
