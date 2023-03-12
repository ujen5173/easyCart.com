import { useState, useReducer, useEffect, type FC, createContext } from "react";
import { Toast } from "~/components/mini";
import reducer, { initialState } from "~/reducer";
import type {
  CartType,
  PrimaryContextProviderProps,
  PrimaryContextType,
  ReducerType,
  Toast as ToastType,
} from "~/types/context";

export const Context = createContext({} as PrimaryContextType);

const PrimaryContext: FC<PrimaryContextProviderProps> = ({ children }) => {
  const [toast, dispatchToast] = useState<ToastType>({
    message: null,
    type: null,
    show: false,
  });

  const [cartWishlist, dispatch] = useReducer<ReducerType>(
    reducer,
    initialState
  );

  useEffect(() => {
    const cart: CartType = JSON.parse(
      localStorage.getItem("storage") || "[]"
    ) as CartType;

    if (cart) {
      dispatch({
        type: "SET_CART_AND_WISHLIST",
        loadPlayload: cart,
      });
    }
  }, []);

  useEffect(() => {
    if (toast.show) {
      const timer = setTimeout(() => {
        dispatchToast({ ...toast, show: false });
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [toast]);

  return (
    <Context.Provider
      value={{
        cartWishlist,
        dispatch,

        toast,
        dispatchToast,
      }}
    >
      {toast.show && <Toast message={toast.message} type={toast.type} />}
      {children}
    </Context.Provider>
  );
};

export default PrimaryContext;
