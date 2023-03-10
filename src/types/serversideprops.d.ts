import type { Category } from "./categories";
import type { Product } from "./products";

export type HomePageServerSideProps = {
  data: Category[];
};

export type SinglePageServerSideProps = {
  product: Product;
  categories: Category[];
};

export type CategoriesServerSideProps = {
  data: Category[];
  category?: Category;
  categoryData?: Category;
};
