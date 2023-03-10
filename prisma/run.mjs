import usersData from "./data/users.json" assert { type: "json" };
import storesData from "./data/stores.json" assert { type: "json" };
import categoryData from "./data/categories.json" assert { type: "json" };
import productsData from "./data/products.json" assert { type: "json" };
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

const users = async () => {
  return await prisma.user.createMany({
    data: usersData,
  });
};
const stores = async () => {
  return await prisma.store.createMany({
    data: storesData,
  });
};
const category = async () => {
  return await prisma.category.createMany({
    data: categoryData,
  });
};
const products = async () => {
  return await prisma.product.createMany({
    data: productsData,
  });
};

const run = async () => {
  await users();
  await stores();
  await category();
  await products();
};

export default run;
