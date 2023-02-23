import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";
import { prisma } from "~/server/db";

export const usersRouter = createTRPCRouter({
  sellers: publicProcedure.query(() => {
    return prisma.user.findFirst({
      where: {
        role: "SELLER",
      },
    });
  }),

  singleSeller: publicProcedure
    .input(
      z.object({
        id: z.string().cuid(),
      })
    )
    .query(({ input }) => {
      return prisma.user.findFirst({
        where: {
          id: input.id,
          role: "SELLER",
        },
      });
    }),

  all: publicProcedure
    .input(
      z.object({
        id: z.string().cuid(),
      })
    )
    .query(({ input }) => {
      return prisma.user.findFirst({
        where: {
          id: input.id,
        },
      });
    }),
});
