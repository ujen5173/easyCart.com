import Link from "next/link";
import React, { useState, type FC } from "react";
import type { FilterAreaProps } from "~/types/pagesProps";

const FilterArea: FC<FilterAreaProps> = ({
  minMax,
  setMinMax,
  categoryData,
  refetch,
}) => {
  const applyFilter = async () => {
    const res = await refetch();
    console.log({ res });
  };

  return (
    <div className="w-64">
      <h1 className="text-lg font-medium">Filters</h1>
      <div className="w-full px-2">
        <div className="border-b border-light-blue py-3">
          <div className="flex items-center justify-between">
            <h1 className="text-sm font-medium">Category</h1>
            <i className="uil uil-angle-down text-2xl" />
          </div>

          {categoryData?.parent
            ? categoryData?.parent.children.map((child) => (
                <Link href={`${child.slug}`} key={child.id}>
                  <div className="py-2 px-3">
                    <p
                      className={`text-sm hover:underline ${
                        child.name === categoryData.name
                          ? "font-medium"
                          : "font-normal"
                      }`}
                    >
                      {child.name}
                    </p>
                  </div>
                </Link>
              ))
            : categoryData?.children.map((child) => (
                <Link href={`${child.slug}`} key={child.id}>
                  <div className="py-2 pl-7">
                    <p
                      className={`text-sm hover:underline ${
                        child.name.toLowerCase() ===
                        categoryData.name.toLowerCase()
                          ? "font-medium"
                          : "font-normal"
                      }`}
                    >
                      {child.name}
                    </p>
                  </div>
                </Link>
              ))}
        </div>

        <div className="border-b border-light-blue py-3">
          <div className="flex items-center justify-between">
            <h1 className="text-sm font-medium">Price</h1>
            <i className="uil uil-angle-up text-2xl" />
          </div>
          <div className="py-3">
            {/* price selecting area */}
            <div className="mb-2 flex items-center justify-center gap-2">
              <div>
                <label htmlFor="min" className="mb-1">
                  Min
                </label>
                <input
                  type="number"
                  id="min"
                  name="min"
                  onChange={(e) =>
                    setMinMax({ min: +e.target.value, max: minMax.max })
                  }
                  value={minMax.min}
                  placeholder="50"
                  className="w-full rounded-md border-[3px] border-light-blue px-4 py-2 text-sm outline-none hover:border-lavender focus:border-lavender"
                />
              </div>
              <span className="mt-5 inline-flex select-none">-</span>
              <div>
                <label htmlFor="max" className="mb-1">
                  Max
                </label>
                <input
                  type="number"
                  name="max"
                  id="max"
                  onChange={(e) =>
                    setMinMax({ max: +e.target.value, min: minMax.min })
                  }
                  value={minMax.max}
                  placeholder="500"
                  className="w-full rounded-md border-[3px] border-light-blue px-4 py-2 text-sm outline-none hover:border-lavender focus:border-lavender"
                />
              </div>
            </div>
            <button
              onClick={applyFilter}
              className="w-full rounded-md bg-blue-400 px-4 py-2 text-base font-medium text-white outline-none"
            >
              Apply Filter
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FilterArea;
