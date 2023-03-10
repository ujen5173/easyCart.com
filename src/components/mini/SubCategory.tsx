import { textResizer } from "~/utils/helpers";
import type { FC } from "react";
import type { Category } from "~/types";
import Link from "next/link";

type SubCategoryProps = {
  child: Category;
};

const SubCategory: FC<SubCategoryProps> = ({ child }) => {
  return (
    <li>
      <Link href={`${child.slug}`}>
        <div className="px-4 py-[0.35rem] hover:bg-light-gray">
          <span className="text-sm font-medium text-slate-gray">
            {textResizer(child.name, 22)}
          </span>
        </div>
      </Link>
    </li>
  );
};

export default SubCategory;
