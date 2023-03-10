// const cat = require("./data/products.json");

// const names = [];
// const leftovers = [];
// cat.forEach((ele) => {
//   if (names.includes(ele.slug)) {
//     leftovers.push(ele);
//   } else {
//     names.push(ele.slug);
//   }
// });

// console.log({ leftovers });

// const fs = require("fs");

// const res = cat.map((e) => ({
//   ...e,
//   slug: e.slug.toLowerCase().trim().replaceAll(" ", "-"),
// }));

// fs.writeFileSync("./prisma/data/categories.json", JSON.stringify(res, null, 2));

const file = require("./data/products.json");
const fs = require("fs");

const response = file.reduce((accum, value) => {
  return [
    ...accum,
    {
      ...value,
      price: {
        old: +value.price.old,
        new: +value.price.new,
      },
    },
  ];
}, []);

fs.writeFileSync(
  "./prisma/data/products.json",
  JSON.stringify(response, null, 2)
);
