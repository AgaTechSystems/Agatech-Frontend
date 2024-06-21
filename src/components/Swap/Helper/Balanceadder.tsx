import React, { useState, useEffect, Fragment } from "react";
import { RadioGroup } from "@headlessui/react";
import { useMediaQuery } from "react-responsive";

type Props = {
  handlePercentageClick: (pr: string) => void;
};

const Balance = ["25", "50", "75", "Max"];

function Balanceadder({ handlePercentageClick }: Props) {
  const [balance, setBalance] = useState(Balance[1]);
  const isSmallScreen = useMediaQuery({ maxWidth: 360 });
  const isExtraSmallScreen = useMediaQuery({ maxWidth: 300 });

  let visibleBalances;

  if (isExtraSmallScreen) {
    visibleBalances = ["50", "Max"];
  } else if (isSmallScreen) {
    visibleBalances = ["25", "50", "Max"];
  } else {
    visibleBalances = Balance;
  }

  return (
    <RadioGroup
      value={balance}
      onChange={setBalance}
      className="flex flex-row gap-2 py-0 justify-end "
    >
      {visibleBalances.map((e) => (
        <RadioGroup.Option key={e} value={e} as={Fragment}>
          {({ active }) => (
            <button
              onClick={() => handlePercentageClick(e)}
              className={`${
                active ? " bg-white text-black" : " text-white "
              } inline-flex rounded-[10px] gap-2  border-[#474747] border-[1px]  items-center justify-center text-[10px] font-medium  bg-transparent px-2.5`}
            >
              {e === "Max" ? "Max" : `${e}%`}
            </button>
          )}
        </RadioGroup.Option>
      ))}
    </RadioGroup>
  );
}

export default Balanceadder;
