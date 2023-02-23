import { faker } from "@faker-js/faker";

import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

const users = async () => {
  return await prisma.user.createMany({
    data: Array(20)
      .fill(null)
      .map(() => {
        return {
          name: faker.name.fullName(),
          email: faker.internet.email(),
          emailVerified: faker.datatype.boolean(),
          role: faker.helpers.arrayElement(["USER", "ADMIN", "SELLER"]),
          profile: faker.image.abstract(),
        };
      }),
  });
};

const stores = async () => {
  const sellers = await prisma.user.findMany({
    where: {
      role: "SELLER",
    },
    select: {
      id: true,
    },
  });

  return await prisma.store.createMany({
    data: sellers.map((seller) => {
      return {
        name: faker.company.name(),
        description: faker.lorem.paragraph(),
        logo: faker.image.abstract(),
        location: faker.address.city(),
        email: faker.internet.email(),
        phone: faker.phone.number(),
        map_location: faker.internet.url(),
        banner: faker.image.abstract(),
        sellerId: seller.id,
      };
    }),
  });
};

const products = async () => {
  const stores = await prisma.store.findMany({
    select: {
      id: true,
    },
  });

  const categories = await prisma.category.findMany({
    select: {
      id: true,
    },
  });

  return await prisma.product.createMany({
    data: stores.map((store) => {
      const title = faker.commerce.productName();
      return {
        title: title,
        slug: title.toLowerCase().replace(/ /g, "-"),
        description: faker.lorem.paragraph(),
        tags: faker.lorem.words(Math.floor(Math.random() * 5) + 1).split(" "),
        status: faker.helpers.arrayElement(["ACTIVE", "INACTIVE"]),
        stock: faker.datatype.number(),
        discount: faker.datatype.number(),
        images: Array(5)
          .fill(null)
          .map(() => faker.image.abstract()),
        brand: faker.company.name(),

        price: {
          new: faker.commerce.price(),
          old: faker.commerce.price(),
        },
        delivery: {
          availability: faker.datatype.boolean(),
          price: faker.commerce.price(),
          time: `${faker.datatype.number()}-${faker.datatype.number()} days`,
        },
        categoryId: faker.helpers.arrayElement(categories).id,
        sellerStoreId: store.id,
      };
    }),
  });
};

const category = async () => {
  const data = Array(5)
    .fill(null)
    .map(() => {
      return {
        name: faker.commerce.productName(),
        slug: faker.commerce.productName().toLowerCase().replace(/ /g, "-"),
        parentId: null,
      };
    });

  await prisma.category.createMany({
    data: data,
  });

  const d = await prisma.category.findMany({
    select: {
      id: true,
    },
  });

  const data2 = Array(5)
    .fill(null)
    .map(() => {
      return {
        name: faker.commerce.productName(),
        slug: faker.commerce.productName().toLowerCase().replace(/ /g, "-"),
        parentId: faker.helpers.arrayElement(d).id,
      };
    });

  return await prisma.category.createMany({
    data: data2,
  });
};

const run = async () => {
  await users();
  await stores();
  await category();
  await products();
};

export default run;
