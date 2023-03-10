import { useState, type FC } from "react";
import type { SingleProductComponentProps } from "~/types/pagesProps";
import ProductContent from "./ProductContent";
import ImageSection from "./ImageSection";
import {TagsSection} from "../mini";

const SingleProductComponent: FC<SingleProductComponentProps> = ({
  product,
}) => {
  const [quantity, setQuantity] = useState<number>(1);

  return (
    <section className="bg-light-gray">
      <div className="container mx-auto flex gap-2 py-2 px-4">
        <ImageSection product={product} />
        <ProductContent
          product={product}
          quantity={quantity}
          setQuantity={setQuantity}
        />
      </div>
      <TagsSection product={product} />
    </section>
  );
};

export default SingleProductComponent;
