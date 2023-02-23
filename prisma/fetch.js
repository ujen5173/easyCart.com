import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const main = async () => {
  //! Users
  // //? get admin
  // const admin = await prisma.user.findFirst({
  //   where: {
  //     role: "ADMIN",
  //   },
  // });

  // console.log({ admin });

  // //? get sellers
  // const sellers = await prisma.user.findMany({
  //   where: {
  //     role: "SELLER",
  //   },
  // });

  // console.log({ sellers });

  // //? get users
  // const users = await prisma.user.findMany({
  //   where: {
  //     role: "USER",
  //   },
  // });

  // console.log({ users });

  // //! stores
  // const stores = await prisma.store.findMany({});

  // console.log({ stores });

  // //! categories
  const categories = await prisma.category.findMany({
    select: {
      id: true,
      name: true,
      slug: true,
      parent: {
        select: {
          name: true,
        },
      },
      products: {
        select: {
          title: true,
        },
      },
    },
  });

  console.log({ categories: JSON.stringify(categories) });

  //! products
  // const products = await prisma.product.findMany({
  //   select: {
  //     id: true,
  //     title: true,
  //     slug: true,
  //     description: true,
  //     images: true,
  //     brand: true,
  //     price: true,
  //     delivery: true,
  //     category: {
  //       select: {
  //         id: true,
  //         name: true,
  //       },
  //     },
  //     seller_store: {
  //       select: {
  //         id: true,
  //         name: true,
  //         email: true,
  //       },
  //     },
  //   },
  // });

  console.log({ products: JSON.stringify(products) });
};

main();
