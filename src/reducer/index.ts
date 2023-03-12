import type {
  ReducerType,
  CartType,
  ReducerAction,
  CartProduct,
} from "~/types/context";

export const initialState: CartType = {
  cart: [],
  wishlist: [],
};

const reducer: ReducerType = (state: CartType, action: ReducerAction) => {
  switch (action.type) {
    case "ADD_TO_CART":
      const item = state.cart.find((i) => i.id === action.payload?.id);
      if (item) {
        const newCart = state.cart.map((i) =>
          i.id === action.payload?.id
            ? { ...i, qty: i.qty + +(action.payload?.qty || 1) }
            : i
        );
        const result = {
          ...state,
          cart: newCart,
        };

        localStorage.setItem("storge", JSON.stringify(result));

        return result;
      } else {
        if (action.payload?.id === undefined) return state;
        const product: CartProduct = {
          id: action.payload?.id,
          qty: +(action.payload?.qty || 1),
          price: +(action.payload?.price || 1),
        };
        const result = {
          ...state,
          cart: [...state.cart, product],
        };

        localStorage.setItem("storge", JSON.stringify(result));

        return result;
      }

    case "REMOVE_FROM_CART":
      const newCart = state.cart
        .map((i) =>
          i.id === action.payload?.id ? { ...i, qty: i.qty - 1 } : i
        )
        .filter((i) => i.qty > 0);

      return {
        ...state,
        cart: newCart,
      };

    case "SET_CART_AND_WISHLIST":
      return {
        cart: action.loadPlayload?.cart || [],
        wishlist: action.loadPlayload?.wishlist || [],
      };

    default:
      return state;
  }
};

export default reducer;
