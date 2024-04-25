import React from "react";
import { AllsocialMedia } from "@/config";
import Image from "next/image";
const LINK = [
  {
    name: "TELEGRAM",
    link: "https://t.me/AgaTechSystems",
  },
  {
    name: "X (TWITTER)",
    link: "https://twitter.com/agatechsystems",
  },
];

type Props = {};
//bg-gradient-to-b from-teal-300 to-teal-500
function Fotter({}: Props) {
  return (
    <div className="stopscrollpadding" id="contact">
      {/* box */}
      <div className="px-3">
        <div className="max-w-7xl   slimeborder service-card_wrapper py-10 md:py-32 space-y-10   rounded-[36px] bg-opacity-75  mx-auto font-Ruberoid  ">
          <div className=" text-center text-white text-2xl font-bold md:text-5xl  leading-[68px]">
            Join The Community
          </div>
          <div className="max-w-[500px] mx-auto flex flex-wrap gap-5 md:gap-14">
            {LINK.map((e, indx) => {
              return (
                <a
       
                key={indx}
                  href={e.link}
                  target='_blank'
                  className="h-[63px] slimeborder service-card_wrapper   transition-all hover:bg-white hover:text-black  w-fit  mx-auto px-[25px] py-2.5 
                bg-neutral-800 rounded-[5px] justify-start items-start gap-2.5 inline-flex"
                >
                  <div className="text-white text-[25px] hover:text-black     font-normal  uppercase leading-[42.64px]">
                    {e.name}
                  </div>
                </a>
              );
            })}
          </div>
        </div>
      </div>
      {/* box */}

      {/* social */}
      <div className="flex flex-wrap gap-5 justify-center py-10">
        {AllsocialMedia.map((e, index) => {
          return (
            <a 
            key={index}
              href={e.link}
              target='_blank'
              className=" w-[68.52px] hover:scale-105  transition-all  slimeborder service-card_wrapper  hover:bg-opacity-50  h-[69.53px] flex items-center justify-center   rounded-[5px] bg-opacity-10"
            >
              <Image
                src={`/fotter/${e.name}`}
                width={e.w}
                height={e.h}
                alt="sayed"
              />
            </a>
          );
        })}
      </div>
      {/* social */}

      {/* copyright     */}
      <div className="py-10 border-t-2  border-white border-opacity-20">
        <div className=" text-white text-sm md:text-lg text-center font-normal font-['Plus Jakarta Sans']">{`©2024 Copyright AGATECH. All rights reserved.`}</div>
      </div>
      {/* copyright     */}
    </div>
  );
}

export default Fotter;
