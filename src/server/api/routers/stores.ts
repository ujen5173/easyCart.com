import { z } from "zod";
import { prisma } from "~/server/db";
import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
  sellerProcedure,
} from "~/server/api/trpc";

export const storesRouter = createTRPCRouter({
  all: publicProcedure.query(() => {
    return prisma.store.findMany({
      include: {
        seller: true,
      },
    });
  }),

  userStores: publicProcedure
    .input(z.object({ id: z.string().cuid() }))
    .query(({ input }) => {
      return prisma.store.findMany({
        where: {
          sellerId: input.id,
        },
        include: {
          seller: true,
        },
      });
    }),

  singleStore: publicProcedure
    .input(z.object({ id: z.string().cuid() }))
    .query(({ input }) => {
      return prisma.store.findUnique({
        where: {
          id: input.id,
        },
        include: {
          seller: true,
        },
      });
    }),

  createStore: sellerProcedure
    .input(
      z.object({
        name: z.string(),
        description: z.string(),
        logo: z.string(),
        location: z.string(),
        email: z.string(),
        phone: z.string().nullable(),
        map_location: z.string().url().nullable(),
        banner: z.string().nullable(),
      })
    )
    .mutation(({ input, ctx }) => {
      return prisma.store.create({
        data: {
          ...input,
          sellerId: ctx.session.user.id,
        },
      });
    }),

  addReview: protectedProcedure
    .input(
      z.object({
        productId: z.string().cuid(),
        rating: z.number().min(1).max(5),
        review: z.string().min(10).max(500),
        images: z.array(z.string().url()).optional(),
      })
    )
    .mutation(({ input, ctx }) => {
      return prisma.review.create({
        data: {
          rating: input.rating,
          review: input.review,
          images: input.images,
          user: {
            connect: {
              id: ctx.session.user.id,
            },
          },
          store: {
            connect: {
              id: input.productId,
            },
          },
        },
      });
    }),
});
