import Image from "next/image";
import type { ImageSectionProps } from "~/types/pagesProps";
import { type FC } from "react";

const ImageSection: FC<ImageSectionProps> = ({ product }) => {
  return (
    <div className="flex w-4/6 flex-col overflow-hidden rounded-md bg-white">
      <Image
        width={1960}
        height={840}
        src={product.images[0] || ""}
        alt={product.title}
        className="h-full max-h-[40rem] w-full object-cover"
      />
      <div className="flex w-4/12 flex-col gap-2 bg-white p-4">
        {product.images.map((image, index) => (
          <Image
            key={index}
            src={image}
            width={500}
            height={500}
            className="h-32 w-32 rounded-md object-cover"
            alt={product.title}
          />
        ))}
      </div>
    </div>
  );
};

export default ImageSection;
