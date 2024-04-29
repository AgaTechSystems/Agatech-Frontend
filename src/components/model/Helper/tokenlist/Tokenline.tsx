import React from "react";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { Token } from "@pancakeswap/sdk";
type Props = {
  data: any;
};

function Tokenline({ data }: Props) {
  const { name, symbol, address, logoURI } = data || {};
  
  return (
    <div >
      <div className="flex flex-row items-center gap-5 px-3">
        <LazyLoadImage
          alt={"asa"}
          // effect="blur"
          src={`${
            logoURI
          }`}
          className="w-[40px] rounded-full"
        />
        <div className="flex flex-col items-start">
          <div className="flex gap-1">
            <span className="font-semibold text-white group-hover:text-gray-900 dark:text-slate-50 dark:group-hover:text-white">
              {symbol}
            </span>
          </div>
          <span
            className="text-sm text-white opacity-70 text-muted-foreground hover:underline"
            data-state="closed"
          >
            {name}
          </span>
        </div>
      </div>
    </div>
  );
}

export default Tokenline;
