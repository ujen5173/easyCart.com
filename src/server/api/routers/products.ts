import { number, z } from "zod";
import { prisma } from "~/server/db";
import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
  sellerProcedure,
} from "~/server/api/trpc";

export const productsRouter = createTRPCRouter({
  all: publicProcedure.query(async () => {
    return await prisma.product.findMany();
  }),

  singleProduct: publicProcedure
    .input(z.object({ slug: z.string() }))
    .query(async ({ input }) => {
      return await prisma.product.findUnique({
        where: {
          slug: input.slug,
        },
        include: {
          category: true,
          reviews: {
            include: {
              user: true,
            },
          },
        },
      });
    }),

  allFromStore: publicProcedure
    .input(z.object({ storeId: z.string().cuid() }))
    .query(async ({ input }) => {
      return await prisma.product.findMany({
        where: {
          sellerStoreId: input.storeId,
        },
      });
    }),

  allFromCategory: publicProcedure
    .input(
      z.object({
        slug: z.string(),
        filter: z
          .object({
            price: z.object({ gte: z.number(), lte: z.number().nullable() }),
          })
          .optional(),
      })
    )
    .query(async ({ input }) => {
      const filter: { price: { gte: number; lte: number } } = input.filter || {
        price: {
          gte: 0,
          lte: 1000000,
        },
      };

      const res = await prisma.product.findMany({
        where: {
          AND: [
            {
              OR: [
                {
                  category: {
                    slug: input.slug,
                  },
                },
                {
                  category: {
                    parent: {
                      slug: input.slug,
                    },
                  },
                },
              ],
            },
            {
              price: {
                path: ["new"],
                gte: filter.price.gte,
                lte: filter.price.lte,
              },
            },
          ],
        },
        include: {
          seller_store: {
            include: {
              seller: true,
            },
          },
        },
      });
      const count = await prisma.product.count({
        where: {
          OR: [
            {
              category: {
                slug: input.slug,
              },
            },
            {
              category: {
                parent: {
                  slug: input.slug,
                },
              },
            },
          ],
        },
      });
      return { products: res, count };
    }),

  allFromSingleStoreUsingCategory: publicProcedure
    .input(
      z.object({
        storeId: z.string().cuid(),
        categoryId: z.string().cuid(),
      })
    )
    .query(async ({ input }) => {
      return await prisma.product.findMany({
        where: {
          sellerStoreId: input.storeId,
          categoryId: input.categoryId,
        },
      });
    }),

  searchProducts: publicProcedure
    .input(z.object({ query: z.string() }))
    .query(({ input }) => {
      return prisma.product.findMany({
        where: {
          title: {
            contains: input.query,
            mode: "insensitive",
          },
          slug: {
            contains: input.query,
            mode: "insensitive",
          },
          description: {
            contains: input.query,
            mode: "insensitive",
          },
          category: {
            name: {
              contains: input.query,
              mode: "insensitive",
            },
          },
          brand: {
            contains: input.query,
            mode: "insensitive",
          },
        },
      });
    }),

  createProduct: sellerProcedure
    .input(
      z.object({
        title: z.string(),
        slug: z.string().trim(),
        description: z.string(),
        tags: z.array(z.string()),
        status: z.enum(["ACTIVE", "INACTIVE"]).default("ACTIVE"),
        stock: z.number().default(1),
        discount: z.number().default(0),
        images: z.array(z.string()),
        brand: z.string(),
        price: z.object({
          new: z.number().nullable(),
          old: z.number().nullable(),
        }),
        delivery: z.object({
          availability: z.boolean().default(false),
          price: z.number(),
          time: z.string().default("1-2 days"),
        }),
        qna: z.array(
          z.object({
            question: z.string(),
            answer: z.string(),
          })
        ),
        seo: z.object({
          title: z.string(),
          description: z.string(),
          keywords: z.string(),
        }),
        customization: z.object({
          color: z.array(z.string()),
          size: z.array(z.string()),
        }),
        warranty: z.object({
          status: z.boolean().default(false),
          time: z.string().nullable(),
        }),

        categoryId: z.string().cuid(),
        sellerStoreId: z.string().cuid(),
      })
    )
    .mutation(async ({ input }) => {
      return await prisma.product.create({
        data: input,
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
    .mutation(async ({ input, ctx }) => {
      return await prisma.review.create({
        data: {
          rating: input.rating,
          review: input.review,
          images: input.images,
          user: {
            connect: {
              id: ctx.session.user.id,
            },
          },
          product: {
            connect: {
              id: input.productId,
            },
          },
        },
      });
    }),
});
