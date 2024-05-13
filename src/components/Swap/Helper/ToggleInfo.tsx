import React, { useState, useEffect } from "react";
import { TOKEN, Field } from "../../../../typeing";
import { formatAmountFORout } from "../../../utils/numbers";
import { ChevronUpIcon } from "@heroicons/react/20/solid";
import SkeletonLoad from "./SkeletonLoad";
import { formatAmount, CountParser } from "@/utils/numbers";
import { calculateProportions } from "@/utils/swap/bsc/Swap";
type Props = {
  currencies: { [field in Field]?: TOKEN };
  roundedOutputAmount: string;
  roundedInputAmount: string;
  loading: boolean;
  allowedSlippage: string;
  outputTokenrate: number | null;
  sources?: any;
  estimatedPriceImpact: string
};

function ToggleInfo({
  roundedOutputAmount,
  roundedInputAmount,
  currencies,
  loading,
  allowedSlippage,
  outputTokenrate,
  sources,
  estimatedPriceImpact
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
      const slippageAmount =
        parseFloat(roundedOutputAmount) * slippagePercentage;
      const minReceive = parseFloat(roundedOutputAmount) - slippageAmount;
      setMinimumReceive(minReceive.toFixed(4));
    };

    calculateMinimumReceive();
  }, [roundedInputAmount, roundedOutputAmount, toggleOutput]);

  const textLine = `text-white flex flex-row justify-between text-sm`;
  const textLineText = ``;
  const subtext = `opacity-50`;

  const route_sources = calculateProportions(sources);

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
          className={`text-sm text-white text-start ${loading ? "w-full" : "w-full"
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
            className={`h-5 w-5 text-white font-bold transform ${open ? "rotate-180" : ""
              } transition-transform duration-300`}
          />
        </div>
      </button>

      <div
        className={`transition-max-height swap_autoheight overflow-hidden   ${open ? "h-[160px]" : "h-0"
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
              {loading ? (
                <SkeletonLoad h="15" />
              ) : (
                <span className="flex-1 text-right">
                  {minimumReceive} {currencies.OUTPUT?.symbol}{" "}
                  <p className="opacity-70">
                    {outputTokenrate &&
                      `($${CountParser(
                        Number(minimumReceive) * outputTokenrate
                      )})`}
                  </p>{" "}
                </span>
              )}
            </div>
            <div className={textLine}>
              <span className={subtext}>Route :</span>

              {loading ? (
                <SkeletonLoad h="15" />
              ) : (
                <div className={`grid  gap-3 ${route_sources && route_sources?.length > 1 ? "grid-cols-2" : "grid-cols-1"}`}>
                  {route_sources?.map((e, indx) => {
                    return (
                      <div className="bg-white bg-opacity-5 p-2 rounded-2xl text-[12px]">
                        <span className='opacity-70'> {e.name}</span> <span className="font-bold">{e.proportion}%</span>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>


            <div className={textLine}>
              <span className={subtext}>Price Impact :</span>
              {loading ? <SkeletonLoad h="15" /> : <span>{estimatedPriceImpact}%</span>}
            </div>

            {/* 
             <div className={textLine}>
              <span className={subtext}>Trading Fee :</span>

              {loading?  <SkeletonLoad h="15"/> :  <span>1$</span>}
            </div> */}
          </div>
        )}
      </div>
    </div>
  );
}

export default ToggleInfo;
