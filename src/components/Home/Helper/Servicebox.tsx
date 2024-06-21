import React from "react";
import Image from "next/image";
type Props = {
  title: string;
  logo: string;
  dec: string;
  index: number;
};

function Servicebox({ title, logo, dec, index }: Props) {
  const _target_DIV = index == 1;
  return (
    <div
      className={`flex flex-col slimeborder service-card_wrapper font-Ruberoid relative cursor-pointer gap-3 transition-all hover:scale-105 alignSelf  py-10 h-auto px-10 rounded-2xl ${
        _target_DIV
          ? "bg-[#324B4D] bg-opacity-5 "
          : "   bg-[#324B4D] bg-opacity-5   "
      }  text-white  `}
    >
      <div
        className={`w-20 h-20 mx-auto  bg-white rounded-full flex items-center justify-center ${
          _target_DIV ? "bg-opacity-20" : "bg-opacity-10 "
        }`}
      >
        <Image
          className="mx-auto pointer-events-none "
          src={`/service/${logo}`}
          width={50}
          height={50}
          alt="agatech"
        />
      </div>
      <div
        className="flex-col   gap-2 flex flex-1 justify-end 
"
      >
        <div
          className={`${
            _target_DIV ? "text-white" : "text-white"
          }  text-center font-['Ruberoid'] capitalize  text-xl md:text-2xl font-semibold -[38px]`}
        >
          {title}
        </div>
        <div
          className={`${
            _target_DIV ? "text-white" : "text-white"
          } text-center  opacity-80 text-neutral-100  text-sm font-normal  leading-relaxed`}
        >
          {dec}
        </div>
      </div>
      {/* <div className='absolute bottom-[-5px] h-[5px] right-0 w-[60%] bg-[#232225] rounded-b-xl left-1/2 transform -translate-x-1/2'>

      </div> */}
    </div>
  );
}

export default Servicebox;
