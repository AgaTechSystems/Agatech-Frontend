import React, { useState, useEffect } from "react";
import { TOKEN, Field } from "../../../../typeing";
import { formatAmountFORout } from "../../../utils/numbers";

type Props = {
  currencies: { [field in Field]?: TOKEN };
  roundedOutputAmount: string;
  roundedInputAmount: string;
  loading:boolean
};

function Outputinfo({
  roundedOutputAmount,
  roundedInputAmount,
  currencies,loading
}: Props) {
  const [toggleOutput, setToggleOutput] = useState(true);
  const [outputToInputRatio, setOutputToInputRatio] = useState("");

  const getOutputToInputRatio = () => {
    const ratio =
      toggleOutput
        ? parseFloat(roundedOutputAmount) / parseFloat(roundedInputAmount)
        : 1 / (parseFloat(roundedOutputAmount) / parseFloat(roundedInputAmount));
  
    // Check if the ratio is NaN, and return 0 in that case
    return isNaN(ratio) ? "0" : formatAmountFORout(ratio);
  };

  useEffect(() => {
    // Update the ratio when roundedInputAmount or roundedOutputAmount changes
    setOutputToInputRatio(getOutputToInputRatio());
  }, [roundedInputAmount, roundedOutputAmount, toggleOutput]);

  return (
    <div className={`flex mx-auto items-center gap-3 justify-center pt-10 text-sm md:text-base ${loading?"opacity-25":""}`}>
      <div className="text-right text-white  font-light font-['Inter'] leading-normal">
        {toggleOutput
          ? `1 ${currencies.INPUT?.symbol} = ${outputToInputRatio} ${currencies.OUTPUT?.symbol}`
          : `1 ${currencies.OUTPUT?.symbol} = ${outputToInputRatio} ${currencies.INPUT?.symbol}`}
      </div>
      <button onClick={() => setToggleOutput(!toggleOutput)}>
        <div className="bg-white w-fit p-1.5 rounded-lg hover:scale-105 transition-all">
          <img
            className="w-[15px]  "
            src="/swap/updown.png"
            alt="Toggle button"
          />
        </div>
      </button>
    </div>
  );
}

export default Outputinfo;
