import React, { useState, useRef, type FC } from "react";
import type { SelectProps } from "~/types/pagesProps";
import { capitaize } from "~/utils/helpers";

const Select: FC<SelectProps> = ({ title, option }) => {
  const [selected, setSelected] = useState<string>(option[0] || "");
  const [options] = useState<string[]>(option || []);
  const containerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const change = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!containerRef.current) return;
    if (e.target.checked) {
      containerRef.current.classList.add("block");
      containerRef.current.classList.remove("hidden");
    } else {
      containerRef.current.classList.remove("bock");
      containerRef.current.classList.add("hidden");
    }
  };

  return (
    <div className="relative mt-4">
      <h1 className="mb-2 select-none text-base font-medium">
        {capitaize(title)}
      </h1>
      <button
        type="button"
        className={`block w-full select-none rounded-md border-[2px] border-light-blue bg-white outline-none transition duration-150 hover:bg-light-gray focus:outline-4 focus:outline-lavender`}
      >
        <label
          className="block cursor-pointer px-4 py-2 text-left text-base font-medium"
          htmlFor={title}
        >
          {capitaize(selected || "")}
        </label>
        <div className="absolute right-2 top-1/2 select-none">
          <i className="uil uil-angle-down text-2xl"></i>
        </div>
      </button>

      <div
        ref={containerRef}
        className="absolute top-full left-0 z-20 mt-2 hidden w-full overflow-hidden rounded-md border border-light-blue bg-white shadow-lg"
      >
        {options.map((option, index) => (
          <SelectOptions
            key={index}
            selected={selected}
            option={option}
            setSelected={setSelected}
            containerRef={containerRef}
            inputRef={inputRef}
          />
        ))}
      </div>
      <input
        type="checkbox"
        hidden
        onChange={(e) => void change(e)}
        ref={inputRef}
        id={title}
      />
    </div>
  );
};

export default Select;

type SelectOptionProps = {
  selected: string;
  option: string;
  setSelected: (option: string) => void;
  containerRef: React.MutableRefObject<HTMLDivElement | null>;
  inputRef: React.MutableRefObject<HTMLInputElement | null>;
};

const SelectOptions: FC<SelectOptionProps> = ({
  selected,
  option,
  setSelected,
  containerRef,
  inputRef,
}) => {
  return (
    <div
      className={`w-full cursor-pointer px-4 py-2 text-base font-medium ${
        option === selected
          ? "bg-dark-purple text-white"
          : "text-navy hover:bg-light-gray"
      }`}
      onClick={() => {
        setSelected(option);
        if (inputRef.current && containerRef.current) {
          console.log(inputRef.current.checked);
          inputRef.current.checked = false;

          containerRef.current.classList.remove("bock");
          containerRef.current.classList.add("hidden");
        }
      }}
    >
      {capitaize(option)}
    </div>
  );
};
