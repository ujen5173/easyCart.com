import React from "react";

const Input = () => {
  return (
    <div className="relative flex flex-1 items-center gap-4 rounded-md border-[3px] border-lavender bg-light-gray px-4 py-2">
      <input
        type="text"
        placeholder="Search for any products"
        className="w-full bg-transparent text-sm font-medium outline-none"
      />
      <button className="outline-none">
        <i className="uil uil-search text-xl text-navy"></i>
      </button>
    </div>
  );
};

export default Input;
