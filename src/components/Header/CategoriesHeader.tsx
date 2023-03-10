import type { FC } from "react";
import type { Category } from "~/types/categories";
import type { CategoriesHeaderProps } from "~/types/pagesProps";
import { CategoryParent } from "../mini";

const CategoriesHeader: FC<CategoriesHeaderProps> = ({ data }) => {
  return (
    <section className="relative w-full border-b border-light-gray py-2">
      <div className="container  mx-auto flex items-center justify-between gap-2 px-4">
        <div className="absolute top-0 left-0 mx-auto h-10 bg-lavender"></div>
        {data?.map((category: Category, idx: number) => (
          <CategoryParent key={category.id} idx={idx} category={category} />
        ))}
      </div>
    </section>
  );
};

export default CategoriesHeader;
