import React, { useState, useEffect } from "react";
import { TOKEN, Field } from "../../../../typeing";
import { formatAmountFORout } from "../../../utils/numbers";
import { ChevronUpIcon } from "@heroicons/react/20/solid";
import SkeletonLoad from "./SkeletonLoad";

type Props = {
  currencies: { [field in Field]?: TOKEN };
  roundedOutputAmount: string;
  roundedInputAmount: string;
  loading: boolean;
  allowedSlippage:string
};

function ToggleInfo({
  roundedOutputAmount,
  roundedInputAmount,
  currencies,
  loading,
  allowedSlippage
}: Props) {
  const [open, setOpen] = useState(false);

  const [toggleOutput, setToggleOutput] = useState(true);
  const [outputToInputRatio, setOutputToInputRatio] = useState("");
  const [minimumReceive, setMinimumReceive] = useState("");


  const getOutputToInputRatio = () => {
    const ratio = toggleOutput
      ? parseFloat(roundedOutputAmount) / parseFloat(roundedInputAmount)
      : 1 / (parseFloat(roundedOutputAmount) / parseFloat(roundedInputAmount));

    // Check if the ratio is NaN, and return 0 in that case
    return isNaN(ratio) ? "0" : formatAmountFORout(ratio);
  };

  useEffect(() => {
    // Update the ratio when roundedInputAmount or roundedOutputAmount changes
    setOutputToInputRatio(getOutputToInputRatio());
    const calculateMinimumReceive = () => {

 const slippagePercentage = Number(allowedSlippage || "0") / 100; // Convert percentage to fraction

      console.log(slippagePercentage,"slippagePercentage");
      
      const slippageAmount = parseFloat(roundedOutputAmount) * slippagePercentage;
      console.log(slippageAmount,"slippageAmount");
      const minReceive = parseFloat(roundedOutputAmount) - slippageAmount;
      setMinimumReceive((minReceive).toFixed(4));
    };

    calculateMinimumReceive()

  }, [roundedInputAmount, roundedOutputAmount, toggleOutput]);

  const textLine = `text-white flex flex-row justify-between text-sm`;
  const textLineText = ``;
  const subtext = `opacity-50`;

  return (
    <div className="bg-[#272626] slimeborder bg-opacity-70 mt-4 rounded-3xl px-5 py-3">
      <button
        onClick={() => setOpen(!open)}
        className="flex flex-row w-full items-center justify-between"
      >
        <div
          onClick={(e) => {
            e.stopPropagation();
            setToggleOutput(!toggleOutput);
          }}
          className={`text-sm text-white text-start ${
            loading ? "w-full" : "w-fit"
          } `}
        >
          {loading ? (
            <SkeletonLoad h="15" />
          ) : toggleOutput ? (
            `1 ${currencies.INPUT?.symbol} = ${outputToInputRatio} ${currencies.OUTPUT?.symbol}`
          ) : (
            `1 ${currencies.OUTPUT?.symbol} = ${outputToInputRatio} ${currencies.INPUT?.symbol}`
          )}
        </div>

        <div>
          <ChevronUpIcon
            className={`h-5 w-5 text-white font-bold transform ${
              open ? "rotate-180" : ""
            } transition-transform duration-300`}
          />
        </div>
      </button>

      <div
        className={`transition-max-height swap_autoheight overflow-hidden   ${
          open ? "h-[66px]" : "h-0"
        }`}
      >
        {open && (
          <div className="pt-3 swap_autoheight space-y-2 mr-1">
            <div className={textLine}>
              <span className={subtext}>Slippage Tolerance:</span>
              <span>{allowedSlippage}%</span>
            </div>
            <div className={textLine}>
              <span className={subtext}>Minimum receive:</span>
             {loading?   <SkeletonLoad h="15"/>:  <span>{minimumReceive} {currencies.OUTPUT?.symbol}</span>}
            
            </div>
            {/* <div className={textLine}>
              <span className={subtext}>Trading Fee :</span>

              {loading?   <SkeletonLoad/>:  <span>1$</span>}
            </div> */}
          </div>
        )}
      </div>
    </div>
  );
}

export default ToggleInfo;
