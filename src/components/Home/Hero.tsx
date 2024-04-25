import React, { useRef } from "react";
import { HeroBtn, Partner } from "@/config";
import Marquee from "react-fast-marquee";
import { useMediaQuery } from "react-responsive";
import Tokeninfo from "./Tokeninfo";

//test
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Sphere } from "@react-three/drei";
import { pointsInner, pointsOuter } from "../../utils/animation";

type Props = {};

function Hero({}: Props) {
  const isDesktopOrLaptop = useMediaQuery({
    query: "(min-width: 1224px)",
  });

  const isTablet = useMediaQuery({
    query: "(min-width: 768px) and (max-width: 1223px)",
  });

  return (
    <div className="bg-black min-h-screen   relative">
      <div className="bg-gray    py-12 md:py-0 service-card_wrapper   min-h-screen z-0 flex flex-col items-center justify-center  ">
        <div className="space-y-7 flex-1 flex flex-col justify-center items-center px-4">
          {/* title */}

          <div className="flex items-center w-8/12 justify-center mx-auto">
            <div className="w-4 h-4 rounded-full ring-2 ring-zinc-700 ring-inset bg-zinc-950"></div>
            <div className="flex flex-grow h-0.5 bg-zinc-700"></div>
            <div className="px-4 py-2 rounded-2xl bg-zinc-950/10 backdrop-blur  border-[#5de4bb] border-[1px] border-opacity-40">
              <div className="text-xs middlePro:text-[10px] md:text-sm text-zinc-400 drop-shadow-[0_0_16px_rgba(0,229,206,0.8)] uppercase whitespace-nowrap font-display font-semibold tracking-wide ">
                Revolutionizing the digital ecosystem

              </div>
            </div>
            <div className="flex flex-grow h-0.5 bg-zinc-700"></div>
            <div className="w-4 h-4 rounded-full ring-2 ring-zinc-700 ring-inset bg-zinc-950"></div>
          </div>

          {/* title */}

          {/* heading  */}

          <h1 className="text-3xl middlePro:text-2xl w-[95%] md:w-full mx-auto drop-shadow-[0_0_16px_rgba(0,40,40,0.8)] md:text-5xl xl:text-7xl titleHeading text-white capitalize text-center font-Ruberoid font-bold xl:leading-[80px] pt-3 ">
          Where Tomorrow <br />Transacts  Today ? 
               
          </h1>

          {/* heading  */}

          {/* small text  */}

          <p className="text-white middlePro:text-sm middlePro:px-3 middlePro:text-balance 	 text-base md:max-w-[800px] text-center mx-auto font-Ruberoid font-[400]">
            Agatech offers an innovative ecosystem, prioritizing scalability,
            interoperability, and user-friendliness, to revolutionize your
            engagement with blockchain technology, digital assets, and
            decentralized applications.
          </p>

          {/* small text  */}

          {/* button */}
          <div className="grid grid-cols-2 items-center justify-center gap-5 middlePro:gap-3 md:gap-10 z-10 ">
            {HeroBtn.map((e, index) => {
              return (
                <div key={index} className="button__wrap">
                  <a
                    key={index}
                    target="_blank"
                    className="group w-full inline-flex middlePro:text-[10px] hover:opacity-60   text-center border-[1px] font-Ruberoid border-[#4d4d4d]   tracking-wide capitalize no-underline items-center justify-center text-[12px] md:text-base font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2  disabled:opacity-50 text-white py-3 px-6 middlePro:px-4"

                    href={e.link}
                  >
                  {e.name}
                  </a>
                </div>
              );
            })}
          </div>
          {/* button */}
        </div>

        <div className=" relative w-[100vw] pb-10 ">
          <Marquee
            direction="right"
            autoFill={true}
            pauseOnHover={isDesktopOrLaptop ? true : false}
            play={true}
            pauseOnClick={true}
            speed={15}
          >
            {Partner.map((e, indx) => (
              <div key={indx} className="max-w-[210px] px-5">
                <a href={e.link} target="_blank" rel="noopener noreferrer">
                  <img
                    style={{
                      maxHeight: `${e.h}px`,
                      height: "fit",
                    }}
                    src={`/Links/${e.logo}`}
                    alt={e.name}
                    className="mx-auto pointer-events-none "
                  />
                </a>
              </div>
            ))}
          </Marquee>
        </div>
      </div>
    </div>
  );
}

export default Hero;
