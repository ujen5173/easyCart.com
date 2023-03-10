import type { User } from "./users";

export type Product = {
  id: string;
  title: string;
  slug: string;
  description: string;
  reviews: Review[];
  rating: float;
  tags: string[];
  status: Status;
  stock: number;
  discount: number;
  images: string[];
  brand?: string;
  price: {
    old: string;
    new: string;
  };
  delivery?: {
    time: string;
    charges: string;
    availability: boolean;
  };
  qna?: {
    question: string;
    answer: string;
  }[];
  seo?: {
    title: string;
    description: string;
    keywords: string;
  };
  customization?: {
    color: string[];
    size: string[];
  };
  warranty?: {
    type: string;
    duration: string;
  };

  coupons?: string[];

  category: Category;
  categoryId: string;

  seller_store: Store;
  sellerStoreId: string;

  created_at: date | string;
  updated_at: date | string;
};

export type Review = {
  id: string;
  rating: number;
  review: string;
  images: string[];

  user: User;
  userId: string;

  product: Product;
  productId: string;

  store: Store;
  storeId: string;

  created_at: date | string;
  updated_at: date | string;
};

export type Store = {
  id: string;
  name: string;
  description: string;
  logo: string;
  rating: float;
  reviews: Review[];
  location: ?string;
  email: ?string;
  phone: ?string;
  map_location: ?string;
  banner: ?string;
  verified: boolean;

  seller: User;
  sellerId: string;

  products: Product[];

  created_at: date | string;
  updated_at: date | string;
};

export enum Status {
  ACTIVE = "ACTIVE",
  INACTIVE = "INACTIVE",
}
