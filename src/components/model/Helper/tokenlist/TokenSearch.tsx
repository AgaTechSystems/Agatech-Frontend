import React from "react";

type Props = {
  value: string;
  handleChange: (event: any) => void;
};

function TokenSearch({ value, handleChange }: Props) {
  return (
    <div className=" w-full h-[40px]">
  
      <div className="relative">
        <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
          <svg
            className="w-4 h-4 text-white  dark:text-gray-400"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 20 20"
          >
            <path
              stroke="currentColor"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
            />
          </svg>
        </div>
        <input
          type="text"
          className="block  border-x    outline-none border-transparent text-base
          focus:border-transparent focus:ring-0 border border-[rgba(255, 255, 255, 0.07)] w-full p-2 ps-10 text-white   rounded-lg bg-[#1f1e1e] "
          placeholder="Search tokens"
          value={value}
          onChange={handleChange}
          autoComplete="off"  // Add this line to turn off autocomplete
          autoFocus={false}

        />
      </div>
    </div>
  );
}

export default TokenSearch;
