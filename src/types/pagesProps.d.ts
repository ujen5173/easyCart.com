import type { Category } from "./categories";
import type { Product } from "./products";

export type HeaderProps = {
  notice?: boolean;
  category?: boolean;
  categories?: Category[];
};

export type CategoriesHeaderProps = {
  data?: Category[];
};

export type CategoryParentProps = {
  category: Category;
  idx: number;
};

export type CategoryChildrenProps = {
  category: Category;
  position: string;
  childrenRefs: React.MutableRefObject<HTMLDivElement[]>;
  idx: number;
};

export type ProductGridProps = {
  responseData: data | undefined;
  category: Category | undefined;
  isLoading: boolean;
};

type data = {
  count: number;
  products: Product[];
};

export type ProductAreaTypes = {
  isLoading: boolean;
  products?: Product[];
};

export type FilterAreaProps = {
  categoryData?: Category | null;
  minMax: minMax;
  setMinMax: React.Dispatch<React.SetStateAction<minMax>>;
};

type minMax = {
  min: number;
  max: number | null;
};

export type ProductCardProps = {
  product: Product;
};

export type SingleProductPageProps = {
  data: Product;
};

export type SingleProductComponentProps = {
  product: Product;
};

export type ImageSectionProps = {
  product: Product;
};

export type ProductContentProps = {
  product: Product;
  quantity: number;
  setQuantity: React.Dispatch<React.SetStateAction<number>>;
};

export type CustomizationSectionProps = {
  product: Product;
  index: number;
  name: string;
};

export type CustomizationCardProps = {
  product: Product;
  index: number;
  item: string;
};
