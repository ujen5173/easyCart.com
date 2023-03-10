import Image from "next/image";
import Link from "next/link";
import React, { type FC } from "react";
import type { ProductCardProps } from "~/types/pagesProps";
import { capitaize } from "~/utils/helpers";

const ProductCard: FC<ProductCardProps> = ({ product }) => {
  return (
    <Link
      className="relative w-full md:w-[calc(100%/2-12px)] lg:w-[calc(100%/3-18px)] xl:w-[calc(100%/4-24px)]"
      href={`/p/${product.slug}`}
    >
      <button className="absolute top-3 right-3 flex h-7 w-7 items-center justify-center rounded-full border border-light-blue bg-white shadow-lg outline-none hover:bg-light-gray">
        <i className="uil uil-heart"></i>
      </button>
      <div>
        <Image
          width={300}
          height={300}
          src={
            product.images[Math.floor(Math.random() * product.images.length)] ||
            ""
          }
          draggable={false}
          className="h-[calc(10vw)] max-h-[350px] min-h-[200px] w-full rounded-md object-cover"
          alt={product.title}
        />

        <div className="py-4">
          <h1 className="mb-1 block overflow-hidden text-ellipsis whitespace-nowrap text-sm font-medium leading-5">
            {capitaize(product.title)}
          </h1>
          <p className="mb-3 flex items-center gap-1 text-sm font-normal text-slate-gray">
            <span>By</span>
            <p className="inline-flex overflow-hidden text-ellipsis whitespace-nowrap">
              {capitaize(product.seller_store.seller.name)}
            </p>
          </p>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-purple">
                ${new Intl.NumberFormat("en-Us").format(+product.price?.new)}
              </p>
              {product.price?.old !== undefined && (
                <p className="text-xs font-normal text-slate-gray">
                  <span className="mr-1 line-through">
                    $
                    {new Intl.NumberFormat("en-Us").format(+product.price?.old)}
                  </span>
                  <span>
                    {product.discount && `(${product.discount}% off)`}
                  </span>
                </p>
              )}
            </div>
            <button className="flex h-7 w-7 items-center justify-center rounded-full border border-light-blue outline-none hover:bg-light-gray">
              <span className="material-symbols-outlined text-base">
                add_shopping_cart
              </span>
            </button>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;
