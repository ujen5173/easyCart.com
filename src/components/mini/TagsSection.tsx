import React, { type FC } from "react";
import type { Product } from "~/types/products";

const TagsSection: FC<{ product: Product }> = ({ product }) => {
  return (
    <section className="container mx-auto py-8 px-4">
      <div className="rounded-md bg-white p-4 shadow-lg">
        <h1 className="mb-4 text-xl font-semibold text-navy">Tags</h1>

        <div className="flex flex-wrap gap-2">
          {product.tags.map((tag) => (
            <button
              key={tag}
              className="rounded-full bg-light-gray px-3 py-1 text-xs font-medium text-navy focus:outline-8 focus:outline-lavender"
            >
              {tag}
            </button>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TagsSection;
