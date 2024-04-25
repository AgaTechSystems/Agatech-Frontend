import React from "react";
import { Tokenomics_data } from "@/config";
type Props = {};

function Tokenomics({}: Props) {
  return (
    <div className="py-16 md:py-20 bg-[#0a0a0a] sectionPadding ">
         <div className="space-y-5">
         <div className="header-small_banner w-fit mx-auto my-10">TOKEN</div>
        <h2 className="text-center text-white text-2xl md:text-3xl font-Ruberoid  font-bold !capitalize leading-8">
        Tokenomics
        </h2>

        <p className="text-center text-white text-base font-normal font-['Ruberoid'] leading-normal">
          The revised total supply of 9 million Agata Coins is allocated as
          follows, adjusted proportionally from the original plan{" "}
        </p>
      </div>

      <div className="max-w-[1000px] mx-auto flex  flex-col-reverse md:grid md:grid-cols-1 justify-between  items-center py-12 gap-10  ">
        <div className="hidden">
          <ul className="flex flex-col gap-3 font-Manjari  list-disc pl-10 md:pl-0">
            {Tokenomics_data.map((e, indx) => {
              return (
                <li key={indx} className="text-white list-inside">
                  {" "}
                  <span>{e.amount}%</span> {e.name}
                </li>
              );
            })}

            {/* <div className="text-white">
              <div>Agatech Token Address:</div>
              <div>0x2541A36BE4cD39286ED61a3E6AFC2307602489d6</div>
            </div> */}
          </ul>
        </div>

        <div>
          <img src="/tokenomics-chart.svg" className="w-full scale-120 pt-3 pointer-events-none " />
        </div>
      </div>
    </div>
  );
}

export default Tokenomics;
