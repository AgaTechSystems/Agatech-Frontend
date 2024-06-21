import React from "react";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { Token } from "@pancakeswap/sdk";
import { formatAmount } from "@/utils/numbers";
type Props = {
  data: any;
  chainID:number
};

function Tokenline({ data,chainID }: Props) {
  const { name, symbol, address, logoURI, balance ,usdValue} = data || {};

  return (
    <div className="flex flex-row items-center gap-5  w-full justify-between px-3 hover:bg-[#211f1f] py-2">
      <div className="flex flex-row items-center gap-5 ">
     <div className='relative'>
     <LazyLoadImage
          alt={name}
          // effect="blur"
          src={logoURI || "/tokens/none.svg"}
          className="w-[40px] rounded-full logo_shadow"
        />

        <LazyLoadImage src={`/chainImg/${chainID}.png`} className="w-[16px] absolute bottom-0 right-[1px] rounded-[5px] border border-black" />


     </div>

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

      <div>
       { balance > 0 && <div className="flex flex-col items-end">
          <div className="flex gap-1">
            <span className="font-semibold text-white group-hover:text-gray-900 dark:text-slate-50 dark:group-hover:text-white">
              {formatAmount(balance)}
            </span>
          </div>
          <span
            className="text-sm text-end text-white opacity-70 text-muted-foreground hover:underline"
            data-state="closed"
          >
            ${formatAmount(usdValue)}
          </span>
        </div>}
      </div>
    </div>
  );
}

export default Tokenline;
