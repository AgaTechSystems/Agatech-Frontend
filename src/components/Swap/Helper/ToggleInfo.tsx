import React, { useState, useEffect,useRef } from "react";
import { TOKEN, Field } from "../../../../typeing";
import { formatAmountFORout } from "../../../utils/numbers";
import { ChevronUpIcon } from "@heroicons/react/20/solid";
import SkeletonLoad from "./SkeletonLoad";
import { formatAmount, CountParser } from "@/utils/numbers";
import { calculateProportions } from "@/utils/swap/bsc/Swap";
import Image from "next/image";
type Props = {
  currencies: { [field in Field]?: TOKEN };
  roundedOutputAmount: string;
  roundedInputAmount: string;
  loading: boolean;
  allowedSlippage: string;
  outputTokenrate: number | null;
  sources?: any;
  estimatedPriceImpact: string;
  estimatedGas: string | null;
  nativePrice: number | null;
};

function ToggleInfo({
  roundedOutputAmount,
  roundedInputAmount,
  currencies,
  loading,
  allowedSlippage,
  outputTokenrate,
  sources,
  estimatedPriceImpact,
  estimatedGas,
  nativePrice,
}: Props) {
  const [open, setOpen] = useState(false);
  const contentRef:any = useRef(null);

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


  useEffect(() => {
    if (open) {
      // If the element is open, set its height to the height of its content
      if (contentRef.current) {
        contentRef.current.style.height = `${contentRef.current.scrollHeight}px`;
      }
    } else {
      // If the element is closed, reset its height to 0
      if (contentRef.current) {
        contentRef.current.style.height = "0";
      }
    }
  }, [open,estimatedPriceImpact]);



  const textLine = `text-white flex flex-row justify-between text-sm  py-2 slimeborder-t px-5`;
  const textLineText = ``;
  const subtext = `opacity-50`;

  const route_sources = calculateProportions(sources);

  return (
    <div className="bg-[#272626] slimeborder bg-opacity-70 mt-4 rounded-3xl  py-3  ">
      <button
        onClick={() => setOpen(!open)}
        className="flex flex-row w-full items-center justify-between px-5 "
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
          open ? "h-auto" : "h-0"
        }`}
        ref={contentRef}

      >
        {open && (
          <div className="pt-3 swap_autoheight space-y-2 mr-1">
            <div className={textLine}>
              <span className={subtext}>Max. slippage :</span>
              <span>{allowedSlippage}%</span>
            </div>
            <div className={textLine}>
              <span className={subtext}>You receive:</span>
              {loading ? (
                <SkeletonLoad h="15" />
              ) : (
                <span className="flex-1 flex justify-end flex-row gap-2  text-right w-full">
                  {minimumReceive} {currencies.OUTPUT?.symbol}{" "} 
                  <p className="opacity-70 text-[12px]">
                    {outputTokenrate &&
                      ` ($${CountParser(
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
                <div className={`flex flex-row items-center`}>
                  {route_sources?.some((e) => e.name == "MultiHop")
                    ? route_sources.map((e: any, indx) => {
                        if (e.name == "MultiHop") {
                          return (
                            <div
                              key={indx}
                              className="flex flex-row items-center"
                            >
                              {e?.hops?.map((hop: any, hopIndex: any) => (
                                <div
                                  key={hopIndex}
                                  className={`${
                                    hopIndex == 0 ? "" : "ml-[-20px]"
                                  } p-2 text-[12px]  rounded-[6px]`}
                                >
                                  <Image
                                    className="rounded-[6px] outline ring-1 ring-black ring-opacity-25 outline-offset-[-1px]"
                                    src={`/route/${hop}.webp`}
                                    width={20}
                                    height={20}
                                    alt={hop}
                                  />
                                </div>
                              ))}
                            </div>
                          );
                        } else {
                          return null;
                        }
                      })
                    : route_sources?.map((e, indx) => (
                        <div
                          key={indx}
                          className={`${
                            indx == 0 ? "" : "ml-[-20px]"
                          } p-2 text-[12px]  rounded-[6px]`}
                        >
                          <Image
                            className="rounded-[6px] outline ring-1 ring-black ring-opacity-25 outline-offset-[-1px]"
                            src={`/route/${e.name}.webp`}
                            width={20}
                            height={20}
                            alt={e.name}
                          />
                        </div>
                      ))}

                  <div>
                    {" "}
                    {route_sources?.some((e) => e.name === "MultiHop")
                      ? "MultiHop"
                      : `sources ${route_sources?.length}`}{" "} 
                    {/* Text condition */}
                  </div>
                </div>
              )}
            </div>

            {Number(estimatedPriceImpact) > 0 && (
              <div className={textLine}>
                <span className={subtext}>Price Impact :</span>
                {loading ? (
                  <SkeletonLoad h="15" />
                ) : (
                  <span>{estimatedPriceImpact}%</span>
                )}
              </div>
            )}

            <div className={textLine}>
              <span className={subtext}>Network cost :</span>

              {loading ? (
                <SkeletonLoad h="15" />
              ) : (
                <span>
                  $
                  {nativePrice &&
                    ((Number(estimatedGas) / 10 ** 9) * nativePrice).toFixed(3)}
                </span>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default ToggleInfo;
