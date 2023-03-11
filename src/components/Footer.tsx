import React from "react";

const Footer = () => {
  return (
    <footer className="bg-navy">
      <div className="mx-auto max-w-[1200px] border-b border-dark-purple px-4 py-14 text-center">
        <div className="flex flex-wrap gap-4">
          <ul className="flex-1 text-left text-base text-light-gray">
            <h1 className="mb-4 text-base font-medium text-light-gray">Shop</h1>
            <li className="my-2 cursor-pointer hover:underline">Blog</li>
            <li className="my-2 cursor-pointer hover:underline">Login</li>
            <li className="my-2 cursor-pointer hover:underline">Signup</li>
            <li className="my-2 cursor-pointer hover:underline">Bulk orders</li>
            <li className="my-2 cursor-pointer hover:underline">Clothes</li>
            <li className="my-2 cursor-pointer hover:underline">Accessories</li>
          </ul>
          <ul className="flex-1 text-left text-base text-light-gray">
            <h1 className="mb-4 text-base font-medium text-light-gray">
              About
            </h1>
            <li className="my-2 cursor-pointer hover:underline">About us</li>
            <li className="my-2 cursor-pointer hover:underline">
              Social Responsibility
            </li>
            <li className="my-2 cursor-pointer hover:underline">
              Partner program
            </li>
            <li className="my-2 cursor-pointer hover:underline">Affilates</li>
            <li className="my-2 cursor-pointer hover:underline">Carrers</li>
            <li className="my-2 cursor-pointer hover:underline">Blogs</li>
          </ul>
          <ul className="flex-1 text-left text-base text-light-gray">
            <h1 className="mb-4 text-base font-medium text-light-gray">Help</h1>
            <li className="my-2 cursor-pointer hover:underline">Delivery</li>
            <li className="my-2 cursor-pointer hover:underline">Returns</li>
            <li className="my-2 cursor-pointer hover:underline">Help Center</li>
            <li className="my-2 cursor-pointer hover:underline">Guidelines</li>
            <li className="my-2 cursor-pointer hover:underline">Copyrights</li>
            <li className="my-2 cursor-pointer hover:underline">Contact us</li>
          </ul>
          <ul className="flex-1 text-left text-base text-light-gray">
            <h1 className="mb-4 text-base font-medium text-light-gray">
              Social Media
            </h1>
            <li className="my-2 cursor-pointer hover:underline">Instagram</li>
            <li className="my-2 cursor-pointer hover:underline">Youtube</li>
            <li className="my-2 cursor-pointer hover:underline">Facebook</li>
            <li className="my-2 cursor-pointer hover:underline">Pinterest</li>
          </ul>
        </div>
      </div>

      <div className="w-full">
        <div className="container mx-auto p-4 text-center">
          <p className="text-bxs text-light-gray">
            © {new Date().getFullYear()} All rights reserved. Designed by{" "}
            <a href={"https://github.com/ujen5173"}>Ujen Basi</a>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
