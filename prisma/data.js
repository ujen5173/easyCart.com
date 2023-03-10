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

  const data = Array(50)
    .fill(stores)
    .flat()
    .map((store) => {
      const title = faker.commerce.productName();
      const delivery = faker.datatype.boolean();
      return {
        title: title,
        slug:
          title.toLowerCase().replace(/ /g, "-") + "-" + faker.datatype.uuid(),
        description: faker.commerce.productDescription(),
        tags: Array(5)
          .fill(null)
          .map(() => faker.commerce.productAdjective()),
        status: faker.helpers.arrayElement(["ACTIVE", "INACTIVE"]),
        stock: faker.datatype.number(),
        discount: faker.datatype.number({
          min: 0,
          max: 30,
        }),
        images: Array(5)
          .fill(null)
          .map(() => faker.image.fashion()),
        brand: faker.company.name(),
        price: {
          new: faker.commerce.price(),
          old: faker.commerce.price(),
        },
        delivery: {
          availability: delivery,
          price: delivery ? faker.commerce.price() : null,
          time: delivery
            ? `${faker.datatype.number()}-${faker.datatype.number()} days`
            : null,
        },
        categoryId: faker.helpers.arrayElement(categories).id,
        sellerStoreId: store.id,
      };
    });

  const res = [...new Map(data.map((v) => [v.slug, v])).values()];
  return await prisma.product.createMany({
    data: res,
  });
};

const category = async () => {
  const data = [
    "Clothing",
    "Stickers",
    "Phone Cases",
    "Wall Art",
    "Home & Living",
    "Kids & Babies",
    "Pet Supplies",
    "Accessories",
    "Stationery & Office",
    "Gifts",
    "Explore designs",
  ].map((e) => {
    return {
      name: e,
      slug: e.toLowerCase().replace(/ /g, "-"),
      parentId: null,
    };
  });

  await prisma.category.createMany({
    data: data,
  });

  const d = await prisma.category.findMany({
    select: {
      id: true,
      name: true,
    },
  });

  // const data2 = Array(5)
  //   .fill(null)
  //   .map(() => {
  //     return {
  //       name: faker.commerce.productName(),
  //       slug: faker.commerce.productName().toLowerCase().replace(/ /g, "-"),
  //       parentId: faker.helpers.arrayElement(d).id,
  //     };
  //   });

  const data2 = [
    "All Clothing",
    "Dresses",
    "HatsNew",
    "Hoodies & Sweatshirts",
    "Leggings",
    "Skirts",
    "Socks",
    "T-Shirts",
    "Tank Tops",
    "All Stickers",
    "Car Stickers",
    "Helmet Stickers",
    "Hydro Flask Stickers",
    "Laptop Stickers",
    "Magnets",
    "All Phone Cases",
    "iPhone Cases",
    "Samsung Galaxy",
    "All Wall Art",
    "Art Board Prints",
    "Art Prints",
    "Canvas Prints",
    "Framed Prints",
    "Metal Prints",
    "Mounted Prints",
    "Photographic Prints",
    "Posters",
    "Tapestries",
    "All Home & Living",
    "Acrylic Blocks",
    "Aprons",
    "Bath Mats",
    "Clocks",
    "Coasters",
    "Comforters",
    "Duvet Covers",
    "Jigsaw Puzzles",
    "Magnets",
    "Mugs",
    "Shower Curtains",
    "Tapestries",
    "Throw Blankets",
    "Throw Pillows",
    "All Kids & Babies",
    "Baby One-Pieces",
    "Baby T-Shirts",
    "Kids Masks",
    "Kids Pullover Hoodies",
    "Kids T-Shirts",
    "Toddler Pullover Hoodies ",
    "All Pet Supplies",
    "Pet Bandanas",
    "Pet Blankets",
    "Pet BowlsNew",
    "Pet Mats",
    "All Accessories",
    "Backpacks",
    "Drawstring Bags",
    "Duffle Bags",
    "HatsNew",
    "Makeup Bags",
    "Masks",
    "Pins",
    "Scarves",
    "Socks",
    "Tech Accessories",
    "Toiletry Bags",
    "Tote Bags",
    "Travel Mugs",
    "Water Bottles",
    "Zipper Pouches",
    "All Stationery & Office",
    "Greeting Cards",
    "Hardcover Journals",
    "Mouse Pads & Desk Mats",
    "Postcards",
    "Spiral Notebooks",
    "All Gifts",
    "Gift Certificates",
    "Gifts for Friends",
    "Gifts for Her",
    "Gifts for Him",
    "Gifts for PetsNew",
    "Gifts for Teens",
    "Gifts for Them",
    "Gifts on a Budget",
    "Aesthetics",
    "Animals & Nature",
    "For You",
    "Netflix Fan Art",
    "Official Fan Art",
    "Pop Culture",
  ];

  const result = {};

  data2.forEach((e) => {
    if (e.startsWith("All ")) {
      result[e.replace("All ", "")] = [];
    } else {
      result[Object.keys(result)[Object.keys(result).length - 1]].push(e);
    }
  });

  let q = [];

  for (const [_, value] of Object.entries(result)) {
    value.forEach((v) => {
      q.push({
        name: v,
        slug: v.toLowerCase().replace(/ /g, "-"),
        parentId: d.find((e) => e.name.trim() === _.trim())
          ? d.find((e) => e.name.trim() === _.trim()).id
          : null,
      });
    });
    // q.push({
    //   name: value,
    //   slug: value.toLowerCase().replace(/ /g, "-"),
    //   parentId: d.filter((e) => e.name === _).id,
    // });
  }

  const ids = [];
  q = q
    .filter((e) => {
      if (ids.includes(e.name)) {
        return false;
      } else {
        ids.push(e.name);
        return e;
      }
    })
    .filter(Boolean);

  return await prisma.category.createMany({
    data: q,
  });
};

const run = async () => {
  await users();
  await stores();
  await category();
  await products();
};

export default run;
