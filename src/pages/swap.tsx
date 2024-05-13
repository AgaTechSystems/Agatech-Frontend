import React, { useEffect, useState } from "react";
import Swapform from "@/components/Swap/Swapform";
import { swap_tab } from "@/config/swap";
import Customconnetbtn from "@/components/connetbutton/Customconnetbtn";
import { useAppdispatch } from "@/hooks/redux";
import { togglesettingModal } from "@/store/reducer/swapslice"; // Update the path accordingly
import qs from "qs";

type Props = {};

function Swap({}: Props) {
  const [activeTabIndex, setActiveTabIndex] = useState(0);
  const dispatch = useAppdispatch();

  const OpenSettingModel = () => {
    dispatch(togglesettingModal(0));
  };



  return (
    <div className="min-h-screen pt-20 flex flex-col justify-center  items-center sidenav-content relative pb-24 ">
      <div className=" m-3 swap_main z-10 relative    w-[95vw] mx-auto  md:max-w-[480px] py-2 px-4 rounded-3xl bg-gradient-to-b from-[#185a2b1a] to-neutral-800 ">
        {/* tab */}
        <div className="flex flex-row items-center justify-between gap-x-2 font-normal w-full">
          <div className="flex flex-row items-center gap-x-2 font-normal w-full  ">
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
          <div>
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="text-white  flex-end cursor-pointer hover:opacity-65"
              onClick={() => OpenSettingModel()}
            >
              <path
                d="M20.83 14.6C19.9 14.06 19.33 13.07 19.33 12C19.33 10.93 19.9 9.93999 20.83 9.39999C20.99 9.29999 21.05 9.1 20.95 8.94L19.28 6.06C19.22 5.95 19.11 5.89001 19 5.89001C18.94 5.89001 18.88 5.91 18.83 5.94C18.37 6.2 17.85 6.34 17.33 6.34C16.8 6.34 16.28 6.19999 15.81 5.92999C14.88 5.38999 14.31 4.41 14.31 3.34C14.31 3.15 14.16 3 13.98 3H10.02C9.83999 3 9.69 3.15 9.69 3.34C9.69 4.41 9.12 5.38999 8.19 5.92999C7.72 6.19999 7.20001 6.34 6.67001 6.34C6.15001 6.34 5.63001 6.2 5.17001 5.94C5.01001 5.84 4.81 5.9 4.72 6.06L3.04001 8.94C3.01001 8.99 3 9.05001 3 9.10001C3 9.22001 3.06001 9.32999 3.17001 9.39999C4.10001 9.93999 4.67001 10.92 4.67001 11.99C4.67001 13.07 4.09999 14.06 3.17999 14.6H3.17001C3.01001 14.7 2.94999 14.9 3.04999 15.06L4.72 17.94C4.78 18.05 4.89 18.11 5 18.11C5.06 18.11 5.12001 18.09 5.17001 18.06C6.11001 17.53 7.26 17.53 8.19 18.07C9.11 18.61 9.67999 19.59 9.67999 20.66C9.67999 20.85 9.82999 21 10.02 21H13.98C14.16 21 14.31 20.85 14.31 20.66C14.31 19.59 14.88 18.61 15.81 18.07C16.28 17.8 16.8 17.66 17.33 17.66C17.85 17.66 18.37 17.8 18.83 18.06C18.99 18.16 19.19 18.1 19.28 17.94L20.96 15.06C20.99 15.01 21 14.95 21 14.9C21 14.78 20.94 14.67 20.83 14.6ZM12 15C10.34 15 9 13.66 9 12C9 10.34 10.34 9 12 9C13.66 9 15 10.34 15 12C15 13.66 13.66 15 12 15Z"
                fill="currentColor"
              ></path>
            </svg>
          </div>
        </div>

        {/* tab */}
        {activeTabIndex == 0 && <Swapform />}
        {activeTabIndex == 1 && (
          <div className="text-white min-h-[200px] text-center">
            coming soon!
          </div>
        )}
      </div>
    </div>
  );
}

export default Swap;
