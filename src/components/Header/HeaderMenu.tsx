import Image from "next/image";
import Link from "next/link";
import { useContext } from "react";
import { Context } from "~/context";
import { AuthContext } from "~/context/auth";

const HeaderMenu = () => {
  const { session, status } = useContext(AuthContext);

  return (
    <div className="ml-4 flex items-center gap-2">
      {status === "authenticated" ? (
        <button
          className="btn-icon relative flex h-10 w-10 items-center justify-center p-1"
          title="Account"
        >
          <Image
            src={session?.user?.profile || ""}
            width={40}
            height={40}
            draggable={false}
            className="rounded-full"
            alt={session?.user?.profile || ""}
          />
        </button>
      ) : (
        <ul className="flex items-center gap-2">
          <li className="btn-link">
            <Link href={"/signup?ref=seller"}>Become a Seller</Link>
          </li>
          <li className="btn-link">
            <Link href={"/auth/login"}>Login</Link>
          </li>
          <li className="btn-link">
            <Link href={"/signup"}>Signup</Link>
          </li>
        </ul>
      )}

      <CartAndList />
    </div>
  );
};

export default HeaderMenu;

export const CartAndList = () => {
  const { cartWishlist } = useContext(Context);

  console.log({ cartWishlist });

  return (
    <div className="flex items-center gap-1">
      <Link href={"/lists"}>
        <button title="Your Lists" className="btn-icon relative">
          <i className="uil uil-heart text-2xl text-navy" />

          <div className="absolute -top-[0.15rem] -right-[0.15rem] flex h-4 w-4 items-center justify-center rounded-full bg-pink text-base text-white">
            <span className="text-[0.65rem]">
              {cartWishlist.wishlist.length}
            </span>
          </div>
        </button>
      </Link>

      <Link href={"/cart"}>
        <button title="Cart" className="btn-icon relative">
          <i className="uil uil-shopping-cart-alt text-2xl text-navy" />

          <div className="absolute -top-[0.15rem] -right-[0.15rem] flex h-4 w-4 items-center justify-center rounded-full bg-pink text-base text-white">
            <span className="text-[0.65rem]">{cartWishlist.cart.length}</span>
          </div>
        </button>
      </Link>
    </div>
  );
};
