import Link from "next/link";
import React from "react";
// import { Link as SLink, animateScroll as scroll } from "react-scroll";
type Props = {};

function Staticsection({}: Props) {
  return (
    <div className="min-h-[calc(100vh-200px)] max-[800px]:min-h-[calc(100%-100px-120px)]  mb-[-10px]    flex items-center  justify-center  bg-cover bg-center custom-bg relative py-10 ">
      <div className="space-y-5 px-5  relative z-10  ">
        <div className=" text-center text-zinc-100 text-3xl md:text-6xl md:font-semibold font-Syne uppercase ">
          SWAP
        </div>
        <div className="max-w-[584px] text-center text-white text-base font-medium  font-Inter leading-normal">
          {`Welcome to swap , trust ai
Our exchange allows you to know the speed of our application, and you can also buy our token with USdt or Binance Smart Chain 
All other tokens are available. 
 Enjoy a safe and fast experience together`}
        </div>
        <div className="flex justify-center">
          <Link
            // smooth={true}
            href="swap"
            className="sButton cursor-pointer mx-auto md:mx-0 w-fit font-bold font-Aleo text-neutral-900"
          >
            Get Started
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Staticsection;
