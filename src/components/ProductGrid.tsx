import { type FC } from "react";
import type { ProductGridProps } from "~/types/pagesProps";
import { capitaize } from "~/utils/helpers";
import ProductArea from "./mini/ProductArea";

const ProductGrid: FC<ProductGridProps> = ({
  responseData,
  category,
  isLoading,
}) => {
  return (
    <div className="w-full overflow-hidden">
      <div className="mb-2">
        <h1 className="mb-1 text-lg font-medium">
          {capitaize(category?.name || "")}
        </h1>
        <p className="mb-6 text-sm">
          Lorem ipsum, dolor sit amet consectetur adipisicing elit. Esse dolorum
          ad fugit quam iusto excepturi, voluptatum laudantium laboriosam
          nostrum error!
        </p>
      </div>
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="flex items-center gap-2 text-lg font-medium text-navy">
            {category?.name}
            {isLoading ? (
              <div className="h-4 w-8 rounded-md bg-light-blue"></div>
            ) : (
              <span className="text-sm font-normal text-gray">
                {new Intl.NumberFormat("en-IN").format(
                  Number(responseData?.count || 0)
                )}
                <span className="ml-1">Results</span>
              </span>
            )}
          </h1>
        </div>
        <select className="px-3 py-1 text-sm font-medium" name="" id="">
          <option className="text-sm" value="default">
            Most Relavent
          </option>
          <option className="text-sm" value="">
            Price: Low to High
          </option>
          <option className="text-sm" value="">
            Price: High to Low
          </option>
          <option className="text-sm" value="">
            Newest
          </option>
          <option className="text-sm" value="">
            Oldest
          </option>
        </select>
      </div>

      <ProductArea isLoading={isLoading} products={responseData?.products} />
    </div>
  );
};

export default ProductGrid;
