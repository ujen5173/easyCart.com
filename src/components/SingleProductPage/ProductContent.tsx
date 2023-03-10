import React, { type FC } from "react";
import type {
  CustomizationCardProps,
  CustomizationSectionProps,
  ProductContentProps,
} from "~/types/pagesProps";
import { capitaize } from "~/utils/helpers";

const ProductContent: FC<ProductContentProps> = ({
  product,
  quantity,
  setQuantity,
}) => {
  return (
    <div className="w-1/2 overflow-hidden rounded-md bg-white p-6">
      <h1 className="mb-2 text-2xl font-semibold text-navy">{product.title}</h1>

      <p className="mb-2 text-base text-gray">
        Designed by {product.seller_store.name}
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

      <p className="mb-4 text-base font-medium text-navy">
        In Stock: {product.stock} pcs
      </p>

      {product.customization && (
        <div className="mb-4">
          {Object.keys(product.customization).map((key, index) => (
            <CustomizationSection
              key={index}
              name={key}
              index={index}
              product={product}
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
        <input
          type="number"
          value={quantity}
          onChange={(e) =>
            setQuantity(
              +e.target.value < +product.stock ? +e.target.value : quantity
            )
          }
          max={+product.stock}
          min={1}
          className="w-16 rounded-md border-[3px] border-light-blue px-4 py-3 outline-none hover:border-lavender focus:border-lavender"
        />
        <button className="btn-primary rounded-md py-3">Add to Cart</button>
        <button className="btn-primary-white rounded-md border-light-blue py-3">
          Buy Now
        </button>
      </div>

      <div className="mb-6 flex gap-2">
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

      <div className="mb-4">
        <p className="mb-2 text-xl font-medium text-navy">Description</p>
        <p className="text-base text-gray">{product.description}</p>
      </div>
    </div>
  );
};

export default ProductContent;

const CustomizationSection: FC<CustomizationSectionProps> = ({
  index,
  product,
  name,
}) => {
  return (
    <div key={index}>
      <h1 className="mb-2 text-base font-medium">{capitaize(name)}</h1>
      <div className="flex items-center gap-2">
        {product?.customization[name]?.map((item: string, index: number) => (
          <CustomizationCard
            key={index}
            item={item}
            index={index}
            product={product}
          />
        ))}
      </div>
    </div>
  );
};

const CustomizationCard: FC<CustomizationCardProps> = ({
  item,
  index,
  product,
}) => {
  return (
    <div className="mb-4 flex select-none items-center gap-2" key={index}>
      <input
        type="radio"
        name={item}
        id={item}
        checked={item === product.customization[item][0] ? true : false}
        hidden
        className="customization-input"
      />
      <label
        htmlFor={item}
        className="customization-label rounded-md border-[4px] border-light-blue bg-[#f5f5f5] px-4 py-2 text-base font-normal text-navy outline-none"
      >
        {capitaize(item)}
      </label>
    </div>
  );
};
