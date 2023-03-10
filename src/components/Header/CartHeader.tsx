import React from "react";
// import { Logo } from "./Header";
import { CartAndList } from "./HeaderMenu";

const CartHeader = () => {
  return (
    <header className="w-full">
      <div className="container mx-auto w-full p-4">
        <div className="flex items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <i className="uil uil-bars text-2xl text-navy" />
            <i className="uil uil-search text-xl text-navy" />
          </div>

          {/* <Logo /> */}

          <CartAndList />
        </div>
      </div>
    </header>
  );
};

export default CartHeader;
