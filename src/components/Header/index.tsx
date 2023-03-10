import { type FC } from "react";
import { type HeaderProps } from "~/types/pagesProps";
import Input from "../Input";
import Notice from "../Notice";
import CategoriesHeader from "./CategoriesHeader";
import HeaderMenu from "./HeaderMenu";
import Link from "next/link";

const Header: FC<HeaderProps> = ({
  notice = true,
  category = true,
  categories,
}) => {
  return (
    <header className="w-full">
      {notice && <Notice />}

      {/* Header */}
      <div className="w-full">
        <div className="container mx-auto w-full p-4">
          <div className="flex items-center gap-4">
            <Logo />
            <Input />
            <HeaderMenu />
          </div>
        </div>
      </div>

      {/* Categories */}
      {category && <CategoriesHeader data={categories} />}
    </header>
  );
};

export default Header;

export const Logo = () => {
  return (
    <Link href={"/"}>
      <div className="flex select-none items-center gap-2">
        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-red-500">
          <i className="uil uil-shopping-cart-alt text-lg text-white"></i>
        </div>
        <span className="text-xl font-semibold text-black">EasyCart</span>
      </div>
    </Link>
  );
};
