import Link from "next/link";
import { useEffect, useState, useRef, type FC } from "react";
import type { Category } from "~/types/categories";
import type {
  CategoryChildrenProps,
  CategoryParentProps,
} from "~/types/pagesProps";
import SubCategory from "./SubCategory";

const CategoryParent: FC<CategoryParentProps> = ({ category, idx }) => {
  const [position, setPosition] = useState<string>("left-0");
  const categoryRefs = useRef<HTMLDivElement[]>([]);
  const childrenRefs = useRef<HTMLDivElement[]>([]);

  useEffect(() => {
    if (categoryRefs.current) {
      const categoryRef = categoryRefs.current[idx];
      const d = categoryRef?.getBoundingClientRect();

      const c = childrenRefs.current[idx]?.getBoundingClientRect();

      if (!d || !c || !categoryRef?.parentElement?.offsetWidth) return;

      if (c.width + c.x < categoryRef?.parentElement.offsetWidth) {
        setPosition("left-0");
      } else {
        setPosition("right-0");
      }
    }
  }, [idx, categoryRefs, childrenRefs]);

  return (
    <div
      className="relative"
      ref={(el) => el && (categoryRefs.current[idx] = el)}
      key={category.id}
    >
      <div className="category_parent">
        <Link href={`${category.slug}`}>
          <div className="py-3">
            <p className="break-keep text-sm font-medium text-slate-gray">
              {category.name}
            </p>
          </div>
        </Link>

        {category.children.length > 0 && (
          <CategoryChildren
            category={category}
            position={position}
            childrenRefs={childrenRefs}
            idx={idx}
          />
        )}
      </div>
    </div>
  );
};

export default CategoryParent;

const CategoryChildren: FC<CategoryChildrenProps> = ({
  category,
  position,
  childrenRefs,
  idx,
}) => {
  return (
    <div
      ref={(el) => el && (childrenRefs.current[idx] = el)}
      className={`category_child absolute top-[calc(100%)] ${position} z-10 w-48 rounded-md bg-white`}
    >
      <div
        className={`category_child-pointer ${
          position === "left-0" ? "left-4" : "right-3"
        }`}
      />
      <ul className="flex flex-col py-2">
        {category.children.map((child: Category) => (
          <SubCategory key={child.id} child={child} />
        ))}
      </ul>
    </div>
  );
};
