import React, { ChangeEvent } from "react";
import {
  SunIcon,
  ChevronUpIcon,
  ChevronDownIcon,
} from "@heroicons/react/24/solid";
type Props = {
  handlevaluechange: (value: any) => void;
  value: any;
  label: string;
  maxValue:string
};

function AmountInput({handlevaluechange,maxValue,value,label}: Props) {

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value;
    handlevaluechange(inputValue);

  
    // if (/^[0-9]*$/.test(inputValue)) {
    //   handlevaluechange(inputValue);
    // }

  };

  const handleIncrement = () => {
    handlevaluechange((Number(value) + 1).toString());
  };

  const handleDecrement = () => {
    const newValue = Math.max(Number(value) - 1, 0); 
    handlevaluechange(newValue.toString());
  };

  return (
    <div className="flex flex-col gap-2">
      <div className="flex justify-between">
        <p className="tranfer_lebel text-gray-500">{label}</p>
      </div>
      <div className="relative w-full flex items-center">
        <input
          type="text"
          title="Only numeric values are allowed."
          pattern="^[0-9]*(\.[0-9]*)?$"
          placeholder="0.00"
          className="py-2.5   bg-black  forced-colors:bg-clip-border border-[#ffffff17] focus:ring-yellow-500 focus:border-yellow-500 text-white  px-4 rounded-2xl w-full h-[48px]  flex-grow pr-[9rem]"
          value={value}
          onChange={handleChange}
        />
        <div className="absolute right-4 flex gap-2 items-center h-full truncate max-w-[8rem] pl-2">
          <button onClick={()=>handlevaluechange(maxValue)}  className="text-sm text-white sm:text-base font-normal text-subdued dark:text-subdued truncate">
            Max
          </button>
          <div>
          {/* <ChevronUpIcon
              width={14}
              className="cursor-pointer font-extrabold text-white"
              onClick={handleIncrement}
            />
            <ChevronDownIcon
              width={14}
              className="cursor-pointer font-extrabold text-white"
              onClick={handleDecrement}
            /> */}
          </div>
        </div>
      </div>
    </div>
  );
}

export default AmountInput;
