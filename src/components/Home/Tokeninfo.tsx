import React, { useEffect, useState } from "react";
import axios from "axios";
import { TOKEN_INFO_DATA } from "../../../typeing";
import { formatAmount ,formatNumber} from "@/utils/number";
type Props = {};

type BOX_DATA = {
  value: number;
  text: string;
  loading:boolean
};

function BOX({ text, value,loading }: BOX_DATA) {
  return (
    <div className=" text-white backdrop-blur-8 text-left cursor-pointer  rounded-lg grid-cols-2 transition duration-200 ">
      <div className=" service-card_wrapper slimeborder px-6 py-8  bg-opacity-80  rounded-lg h-[130px]">
        {!loading ? (
          <div className="text-3xl  bg-gradient-to-r from-[#75c6e5] via-orange-500 to-[#abe8a0] text-transparent bg-clip-text text-start font-Ruberoid font-bold leading-9">
            ${formatNumber(value || 0)}
          </div>
        ) : (
          <div
            role="status"
            className="space-y-8 mb-2 bg-[#9d9d9d]  py-2 animate-pulse md:space-y-0 md:space-x-8 md:flex items-center w-[70px] h-[15px] rounded-lg"
          >
            <div className="w-full">
              <div className="h-[15px]  py-3  rounded-lg bg-gray-700 max-w-[60px] "></div>
            </div>
          </div>
        )}

        <div className="font-Ruberoid font-[400] text-gray7 ">{text}</div>
      </div>
    </div>
  );
}

function Tokeninfo({}: Props) {
  const [data, setdata] = useState<TOKEN_INFO_DATA>();
  const [loading, setloading] = useState(false);
  // gettig  data

  const Updater = async () => {
    try {
      setloading(true);
      const res = await axios.get("/api/Tokeninfo");
      const maindata = res.data.data;
      console.log(maindata,"maindata");
      
      setdata(maindata);
      setloading(false);
    } catch {
      setloading(false);
    }
  };

  useEffect(() => {
    Updater();
  }, []);


  return (
    <div className="relative">
      <div className="max-w-7xl mx-auto ">
        {/* <div className="flex flex-col gap-3 px-4">
          <h1 className="text-white font-Ruberoid text-start text-4xl font-bold">
            {" "}
            Web3, Aggregated.
          </h1>
          <p className="text-white font-Ruberoid text-start font-[400]">
            Enabling an infinitely scalable web of sovereign blockchains that
            feels like a single chain. Powered by ZK tech.
          </p>
        </div> */}
        <div className="grid grid-cols-1 gap-5 md:grid-cols-4 justify-center mx-auto max-w-7xl  pt-6  ">
          <BOX loading={loading} text="Price" value={data?.price || 0} />
          <BOX loading={loading} text="Marketcap" value={data?.price ? data.price *  9000000:0} />
          <BOX loading={loading} text="24hVolume" value={data?.totalVolume24h || 0} />
          <BOX loading={loading} text="Liquidity" value={data?.totalLiquidityUSD || 0} />
        
        </div>
      </div>
    </div>
  );
}

export default Tokeninfo;
