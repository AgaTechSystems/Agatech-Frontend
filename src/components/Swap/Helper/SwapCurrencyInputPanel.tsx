import React from "react";
import { Field, TOKEN } from "../../../../typeing";
import { toggleTokenListModal } from "@/store/reducer/swapslice";
import { useAppSelector, useAppdispatch } from "../../../hooks/redux";
import { Token, Currency } from "@pancakeswap/sdk";
import ClipLoader from "react-spinners/ClipLoader";
import { formatAmount } from "@/utils/numbers";
import Skeleton from "@/components/Loading/Skeleton";
import Balanceadder from "./Balanceadder";
type Props = {
  field: Field;
  currencies: TOKEN | undefined;
  amount: string;
  handleChange: (Field: Field, event: any) => void;
  loading: boolean;
  bestRouteAmount?: string | null; // Additional prop for bestRoute output amount
  currencyBalances: { [field in Field]?: string };
  balanceload: boolean;
  titletext:string
};

function SwapCurrencyInputPanel({
  field,
  currencies,
  amount,
  handleChange,
  loading,
  bestRouteAmount,
  currencyBalances,
  balanceload,
  titletext
}: Props) {
  const dispatch = useAppdispatch();
  const showModel = () => {
    dispatch(toggleTokenListModal({ isOpen: true, modelType: field }));
  };

  const handlePercentageClick = (percentage: string) => {
    const inputBalance = currencyBalances[field];
    if (inputBalance == undefined) return;
    const _inputbalance = Number(inputBalance);

    if (percentage === "Max") {
      handleChange(field, _inputbalance.toFixed(4));
    } else {
      const percentageValue = parseFloat(percentage) / 100;
      const calculatedAmount = (percentageValue * _inputbalance).toFixed(4);
      handleChange(field, calculatedAmount);
    }
  };
 
  return (
    <div className="bg-[#272626]  bg-opacity-50 space-y-2 slimeborder  rounded-3xl  px-5  gap-2.5 py-3 ">
      <div className="flex flex-row justify-between">
        <div className="text-white text-[13px] opacity-70 text-left">
          {titletext}
        </div>
        <div className="text-white text-[13px] opacity-70 text-right">
          {balanceload ? (
            <div className="flex justify-end">
              {" "}
              <Skeleton />
            </div> // Show Skeleton when balanceload is true
          ) : (
            `Balance: ${formatAmount(Number(currencyBalances[field]) || 0)}`
          )}
        </div>
      </div>
      <div className=" flex flex-row w-full justify-between items-center h-[32px] justify-baseline   ">
        {" "}
        <div className="flex flex-row">
          <button
            onClick={showModel}
            className="flex flex-row items-center cursor-pointer gap-x-2 hover:opacity-80 mr-[16px] text-lg"
          >
            <img
              className="w-[24px] rounded-full mr-[4px]"
              src={currencies?.logoURI}
            />
            <span className=" whitespace-nowrap ml-0	 text-white text-sm md:text-base font-bold font-Inter leading-normal">
              {currencies?.symbol || ""}
            </span>
            <div className="w-[12px] h-[7px] m-0">
              <svg
                width="12"
                height="7"
                viewBox="0 0 12 7"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="SwapCurrencyInputPanel__StyledDropDown-sc-28985af9-8 edEcCE"
              >
                <path d="M0.97168 1L6.20532 6L11.439 1" stroke="#AEAEAE"></path>
              </svg>
            </div>{" "}
          </button>
        </div>
        <input
          // disabled={loading}
          type="text"
          title="Only numeric values are allowed."
          pattern="^[0-9]*(\.[0-9]*)?$"
          placeholder="0.00"
          className={`${loading ? "opacity-40" : ""}  font-bold
              outline-none border-transparent flex-end text-base md:text-xl
              focus:border-transparent focus:ring-0 
              text-end bg-transparent border-none forced-colors:bg-clip-border min-h-[24px] !p-0 focus:bg-none focus:border-none text-white  rounded-2xl w-full`}
          value={amount}
          onChange={(e) => handleChange(field, e.target.value)}
          style={{
            border: "none",

            appearance: "none",
          }}
        />
      </div>
      <Balanceadder handlePercentageClick={handlePercentageClick} />
    </div>
  );
}

export default SwapCurrencyInputPanel;
