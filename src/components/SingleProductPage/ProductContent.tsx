import Link from "next/link";
import React, { useState, type FC } from "react";
import type { ProductContentProps } from "~/types/pagesProps";
import Select from "../mini/Select";

const ProductContent: FC<ProductContentProps> = ({
  product,
  quantity,
  setQuantity,
}) => {
  return (
    <div className="w-1/2 overflow-hidden rounded-md bg-white">
      <div className="border-b border-light-blue p-6">
        <h1 className="mb-2 text-2xl font-semibold text-navy">
          {product.title}
        </h1>

        <p className="item-center mb-2 flex gap-1 text-sm text-gray">
          <span>Designed by</span>
          <Link
            href={"/404"}
            className="font-semibold text-navy hover:underline"
          >
            {product.seller_store.name}
          </Link>
        </p>

        <div className="mb-4 flex items-center gap-2">
          <div className="flex items-center">
            {Array(5)
              .fill(0)
              .map((_, index) =>
                product.rating > index ? (
                  <i
                    key={index}
                    className="uis uis-star text-xl text-yellow-400"
                  ></i>
                ) : (
                  <i key={index} className="uil uil-star text-xl text-gray"></i>
                )
              )}
          </div>

          <span className="text-base font-medium text-gray">
            {product.reviews.length}
          </span>
        </div>

        <p
          className={`mb-4 flex items-center gap-1 text-base font-medium text-navy`}
        >
          <span>In Stock:</span>
          <span
            className={` ${product.stock > 0 ? "text-navy" : "text-red-600"}`}
          >
            {product.stock} pcs
          </span>
        </p>

        {product.customization && (
          <div className="mb-4">
            {Object.keys(product.customization).map((key, index) => (
              <Select
                option={Object.values(product.customization[key])}
                title={key}
                key={index}
              />
            ))}
          </div>
        )}

        <div className="mb-4">
          <p className="text-lg font-medium text-gray line-through">
            ${new Intl.NumberFormat("en-US").format(+product.price.old)}
          </p>
          <p className="text-2xl font-semibold tracking-wider text-navy">
            ${new Intl.NumberFormat("en-US").format(+product.price.new)}
          </p>
        </div>

        <div className="mb-4 flex items-center gap-2">
          {product.stock > 0 ? (
            <>
              <input
                type="number"
                value={quantity}
                onChange={(e) =>
                  setQuantity(
                    +e.target.value < +product.stock
                      ? +e.target.value
                      : quantity
                  )
                }
                max={+product.stock}
                min={1}
                className="w-16 rounded-md border-[3px] border-light-blue px-4 py-3 outline-none hover:border-lavender focus:border-lavender"
              />
              <button className="btn-primary rounded-md py-3">
                Add to Cart
              </button>
              <button className="btn-primary-white rounded-md border-light-blue py-3">
                Buy Now
              </button>
            </>
          ) : (
            <button className="btn-primary rounded-md py-3">Notify Me</button>
          )}
        </div>

        <div className="flex gap-2">
          <button className="flex items-center justify-center gap-1 px-2">
            <i className="uil uil-heart text-xl text-gray"></i>
            <span className="text-base font-semibold text-gray">Wishist</span>
          </button>

          <div className="h-6 w-[1px] bg-light-blue"></div>

          <button className="flex items-center justify-center gap-1 px-2">
            <i className="uil uil-plus-circle text-xl text-gray"></i>
            <span className="text-base font-semibold text-gray">Compare</span>
          </button>

          <div className="h-6 w-[1px] bg-light-blue"></div>

          <button className="flex items-center justify-center gap-1 px-2">
            <i className="uil uil-share-alt text-xl text-gray"></i>
            <span className="text-base font-semibold text-gray">Share</span>
          </button>
        </div>
      </div>

      <div className="mb-4 px-6">
        <div className="border-b border-light-blue py-4">
          <p className="mb-2 text-xl font-medium text-navy">Description</p>
          <p className="text-base text-gray">{product.description}</p>
        </div>

        <div className="py-4">
          <p className="mb-2 text-xl font-medium text-navy">Delivery</p>

          <div className="pl-4">
            <p className="my-2 text-base text-navy">
              <span>Available:</span>
              <span className="font-medium">
                {" "}
                {product.delivery?.availability ? "Yes" : "No"}
              </span>
            </p>
            {product.delivery?.availability && (
              <>
                <p className="my-2 text-base text-navy">
                  <span>Charges:</span>
                  <span className="font-medium">
                    {" "}
                    {product.delivery?.charges} per kilometer
                  </span>
                </p>
                <p className="my-2 text-base text-navy">
                  <span>Standard between</span>
                  <span className="font-medium"> {product.delivery?.time}</span>
                </p>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductContent;
