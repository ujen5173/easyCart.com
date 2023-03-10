import { z } from "zod";
import { prisma } from "~/server/db";
import {
  createTRPCRouter,
  publicProcedure,
  adminProcedure,
} from "~/server/api/trpc";

export const categoriesRouter = createTRPCRouter({
  all: publicProcedure.query(async () => {
    return await prisma.category.findMany({
      where: {
        parentId: null,
      },
      include: {
        children: true,
        parent: true,
        products: {
          select: {
            id: true,
          },
        },
      },
    });
  }),

  single: publicProcedure
    .input(
      z.object({
        slug: z.string(),
      })
    )
    .query(async ({ input }) => {
      return await prisma.category.findFirst({
        where: {
          slug: input.slug,
        },
        include: {
          children: true,
          parent: {
            include: {
              children: true,
            },
          },
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
    .mutation(async ({ input }) => {
      return await prisma.category.create({
        data: input,
      });
    }),

  search: adminProcedure
    .input(
      z.object({
        name: z.string(),
      })
    )
    .query(async ({ input }) => {
      return await prisma.category.findMany({
        where: {
          name: {
            contains: input.name,
            mode: "insensitive",
          },
        },
      });
    }),
});
