import { createTRPCRouter } from "~/server/api/trpc";
// import { exampleRouter } from "~/server/api/routers/example";
import { categoriesRouter } from "./routers/categories";
import { usersRouter } from "./routers/users";
import { productsRouter } from "./routers/products";
import { storesRouter } from "./routers/stores";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
  // example: exampleRouter,
  user: usersRouter,
  categories: categoriesRouter,
  products: productsRouter,
  stores: storesRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
