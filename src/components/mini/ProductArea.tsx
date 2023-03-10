import React, { type FC } from "react";
import type { ProductAreaTypes } from "~/types/pagesProps";
import ProductCard from "./ProductCard";
import type { Product } from "~/types/products";
import ProductAreaLoading from "../Loading/ProductAreaLoading";

const ProductArea: FC<ProductAreaTypes> = ({ isLoading, products }) => {
  return (
    <main className="flex w-full flex-wrap gap-6 overflow-hidden">
      {isLoading ? (
        <ProductAreaLoading />
      ) : (
        products?.map((product: Product) => (
          <ProductCard key={product.id} product={product} />
        ))
      )}
    </main>
  );
};

export default ProductArea;
