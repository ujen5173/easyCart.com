import React from "react";

const ProductAreaLoading = () => {
  return (
    <main className="flex w-full flex-wrap gap-6 overflow-hidden">
      {Array(20)
        .fill(null)
        .map((_, i) => (
          <div
            key={i}
            className="relative h-72 w-full rounded-md md:w-[calc(100%/2-12px)] lg:w-[calc(100%/3-18px)] xl:w-[calc(100%/4-24px)]"
          >
            <div className="mb-2 h-44 w-full rounded-md bg-light-blue"></div>
            <div className="mb-2 h-6 w-full rounded-md bg-light-blue"></div>
            <div className="mb-4 h-4 w-8/12 rounded-md bg-light-blue"></div>
            <div className="flex w-full items-center justify-between">
              <div className="flex-1">
                <div className="mb-1 h-4 w-6/12 rounded-md bg-light-blue"></div>
                <div className="mb-1 h-4 w-4/12 rounded-md bg-light-blue"></div>
              </div>
              <div className="h-10 w-10 rounded-full bg-light-blue"></div>
            </div>
          </div>
        ))}
    </main>
  );
};

export default ProductAreaLoading;
