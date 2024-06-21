import React from "react";
import { WHITEPAPER_AUDIT } from "@/config";
import Image from "next/image";
type Props = {};

function Whitepaper({}: Props) {
  return (
    <div className="stopscrollpadding  py-12  sectionPadding md:px-10 mx-auto bg-black " id="documents">
      <div className=" slimeborder max-w-7xl service-card_wrapper bg-[#0e0e0e] mt-10 relative rounded-[36px] overflow-hidden bg-opacity-25 flex flex-col items-center justify-center md:flex-row  mx-auto p-10">
        <div>
          <Image
            src={`/lock.svg`}
            className="mx-auto px-5 md:px-2 pointer-events-none "
            width={580}
            height={480}
            alt="lock"
  
          />
        </div>

        <div className="">
          <h2  className=" text-white text-xl  md:text-4xl font-bold font-Ruberoid   md:leading-[65px] uppercase">
          Whitepaper  & AUDIT
          </h2>
          <div  className=" text-white text-sm md:text-base pt-3 font-normal font-Ruberoid   leading-normal">
            Read the whole AGATA idea and project composition and details in its
            whitepaper
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 items-center gap-5 pt-8 md:max-w-[400px]">
            {WHITEPAPER_AUDIT.map((e, indx) => {
              return (
                <a
                key={indx}
            
                  className=" h-14 px-[43px] hover:scale-105  transition-all bg-gradient-to-r from-[#75c6e5] via-orange-500 to-[#abe8a0]  font-bold text-gray font-Ruberoid  rounded-[5px] justify-center items-center inline-flex"
                  href={e.link}
                >
                  {e.name}
                </a>
              );
            })}
          </div>
        </div>

        <img src="/Looper-3.png"  className="absolute right-0 top-0 opacity-30"/>
      </div>
    </div>
  );
}

export default Whitepaper;
