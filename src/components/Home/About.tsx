import React from "react";
import Image from "next/image";
import { About_down_part } from "@/config/about";
import Tokeninfo from "./Tokeninfo";
type Props = {};
function About({}: Props) {
  return (
    <div className=" w-full  py-14 !relative sectionPadding">
         {/* <img src="/vector/Vector17.png" className='absolute w-[100vw] left-0 bottom-[50%] h-full opacity-30'/> */}
         
      <div
        id="about"
        className=" max-w-7xl stopscrollpadding mx-auto  py-10 space-y-5  "
      >
        {/* upper side sec */}
        <div className="flex flex-wrap items-center ">
          {/* text */}
          <div className="lg:w-[60%]  flex flex-col gap-y-5">
            {/* <div  className=" opacity-30 text-white text-2xl font-medium font-Ruberoid ">
              Know More About Us
            </div> */}
            <div className="header-small_banner w-fit my-4 mx-auto md:mx-0">About Us</div>
            <div  className="text-white text-3xl md:text-5xl text-center md:text-start font-bold font-['Ruberoid'] ">Introduction</div>
            <div  className="text-gray7 text-center md:text-start flex-col font-Ruberoid text-sm md:text-base leading-7 md:leading-8 font-normaltracking-wide w-full  space-y-2 md:max-w-[621px]">
              <div className="">
                {`Agatech Ecosystem is a pioneering initiative dedicated to propelling blockchain innovation and widespread adoption. Anchored by AgaChain, its revolutionary blockchain infrastructure, Agatech integrates cutting-edge technologies and user-centric designs to offer a seamless, scalable, and secure platform for decentralized application (dApp) development.`}
              </div>
              <div className="mt-5">
                {` From facilitating secure transactions on AgaSwap to providing educational resources through Agademy, Agatech fosters a vibrant community and promotes sustainable growth, envisioning a decentralized future where blockchain technology empowers individuals and organizations across diverse industries.`}
              </div>
            </div>
          </div>
          {/* text */}

          {/* image  */}
          <div className="lg:w-[40%] w-full">
            <Image
              className="px-5 mx-auto w-full opacity-75 pointer-events-none "
              src="/Blockchain.gif"
              width={300}
              height={300}
              alt="agatech"
            />
          </div>
          {/* image  */}
        </div>
        {/* upper side sec */}

      </div>
      <Tokeninfo/>
    </div>
  );
}

export default About;
