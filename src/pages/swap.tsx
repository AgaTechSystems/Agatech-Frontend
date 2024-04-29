import React, { useState } from "react";
import Swapform from "@/components/Swap/Swapform";
import { swap_tab } from "@/config/swap";
type Props = {};

function swap({}: Props) {
  const [activeTabIndex, setActiveTabIndex] = useState(0);
  return (
    <div className="min-h-screen flex items-center sidenav-content relative pb-24">
      <div className=" m-3 z-10 relative    w-[95vw] mx-auto  md:max-w-[480px] py-2 px-4 rounded-3xl bg-gradient-to-b from-[#185a2b1a] to-neutral-800 ">
        {/* tab */}
        <div className="flex flex-row items-center gap-x-2 font-normal ">
          {swap_tab.map((tab, index) => (
            <button
              key={index}
              className={`${
                index === activeTabIndex ? "" : "opacity-60"
              } capitalize text-white  text-lg  rounded-3xl font-[600] bg-opacity-10 px-3 py-2`}
              onClick={() => setActiveTabIndex(index)}
            >
              {tab.name}
            </button>
          ))}
        </div>
        {/* tab */}
        {activeTabIndex == 0 && <Swapform />}
        {activeTabIndex == 1 && <div>buy crypto with card</div>}
      </div>
    </div>
  );
}

export default swap;
