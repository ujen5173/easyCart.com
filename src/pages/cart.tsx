import React from "react";
import { CartHeader } from "~/components";
import Image from "next/image";

const fakeCart = [
  {
    id: 1,
    title: "Space Record",
    category: "Tote Bag",
    size: "Medium",
    price: 26.19,
  },
];
const Cart = () => {
  return (
    <main>
      <CartHeader />

      <section className="mx-auto max-w-[768px] py-8">
        <div className="mb-6 flex items-center gap-2">
          <h1 className="text-lg font-medium">Shopping Cart</h1>
          <p className="border-r border-gray px-2 text-sm text-gray">1 Item</p>
          <p className="text-sm text-gray">$124.99</p>
        </div>

        <div className="border-y border-light-blue">
          {fakeCart.map((item) => (
            <div key={item.id} className="flex items-center gap-4 py-4">
              <div className="flex flex-[2] items-center gap-2">
                <Image
                  src={
                    "https://ih1.redbubble.net/image.2083411383.6972/tb,840x840,medium-c,1,198,600,600-bg,f8f8f8.jpg"
                  }
                  alt="Tote Bag"
                  width={100}
                  height={140}
                />
                <div>
                  <h1 className="mb-1 text-base font-medium">{item.title}</h1>
                  <p className="mb-1 text-sm text-navy">{item.category}</p>
                  <p className="mb-1 text-sm text-navy">{item.size}</p>
                </div>
              </div>

              <div className="flex flex-1 items-center gap-2">
                <button className="btn-icon">
                  <i className="uil uil-minus" />
                </button>
                <input
                  type="number"
                  defaultValue={1}
                  className="w-10 rounded-md border-[4px] border-lavender p-2 text-center text-xs outline-none focus:bg-light-gray "
                />
                <div className="btn-icon flex items-center justify-center">
                  <i className="uil uil-plus" />
                </div>
              </div>
              <div className="flex flex-1 items-center justify-center">
                <p className="text-sm font-semibold text-navy">${item.price}</p>
              </div>
              <div className="flex flex-[0.5] items-center justify-end">
                <button className="btn-icon">
                  <i className="uil uil-times" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
};

export default Cart;
