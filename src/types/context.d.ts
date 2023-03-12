export type CartProduct = {
  id: string;
  qty: number;
  price: number;
};

export type CartType = {
  cart: CartProduct[];
  wishlist: string[];
};

export type ReducerAction = {
  type: string;
  payload?: {
    id: string;
    qty?: number;
    price?: number;
  };
  loadPlayload?: CartType;
};

export type Toast = {
  show: boolean;
  message: string | null;
  type: "success" | "error" | null;
};

export type PrimaryContextType = {
  cartWishlist: CartType;
  dispatch: (action: ReducerAction) => void;

  toast: Toast;
  dispatchToast: (toast: Toast) => void;
};

export type PrimaryContextProviderProps = {
  children: React.ReactNode;
};

export type ReducerType = {
  (prevState: CartType, action: ReducerAction): CartType;
};

export enum ActionType {
  ADD_TO_CART = "ADD_TO_CART",
  REMOVE_FROM_CART = "REMOVE_FROM_CART",
  ADD_TO_WISHLIST = "ADD_TO_WISHLIST",
  REMOVE_FROM_WISHLIST = "REMOVE_FROM_WISHLIST",
}
