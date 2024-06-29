import { type ChainId, ChainInfo, SUPPORTED_NETWORK } from "@/constants";
import { Menu, Transition } from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/20/solid";
import Image from "next/image";
import type React from "react";
import { Fragment, useEffect, useState } from "react";
import useNetwork from "@/hooks/useNetwork";
import { usePathname } from "next/navigation";
interface NetworkSelectorProps {
isbuttonBg?:boolean
}

const NetworkSelector: React.FC<NetworkSelectorProps> = ({isbuttonBg}) => {
    const path = usePathname();
   
  const [chain, setchain] = useState<ChainId>(56);
  const { switchNetwork, CorechainID, chainId, } = useNetwork();

  useEffect(() => {
    if (CorechainID) {
      setchain(CorechainID);
    } else {
      setchain(chainId);
    }
    
  }, [CorechainID, chainId]);

  return (
    <Menu
      as="div"
      className={`relative inline-block text-left w-fit z-[1] text-[#E1E1E1] ${path=="/" ? "hidden":""}`}
    >
      <div>
        <Menu.Button className={`flex items-center justify-between w-full hover:bg-[#191919] h-[40px]  rounded-xl outline-none pl-2 pr-4 py-1 ${isbuttonBg?"bg-[#191919]":""}`}>
          <div className="flex items-center ">
            <Image
              src={ChainInfo[chain]?.icon}
              width={20}
              height={20}
              alt={ChainInfo[chain]?.config.name}
              className="min-w-[20px] min-h-[20px] aspect-square rounded-full"
            />
            {/* <span className="font-bold ml-2.5">
              {ChainInfo[chain].config.name}
            </span> */}
          </div>
          <ChevronDownIcon
            className="-mr-1  h-6 w-6 text-[#7E7E7F]"
            aria-hidden="true"
          />
        </Menu.Button>
      </div>
      <Transition
        as={Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <Menu.Items className="absolute  right-0 min-w-[200px]   network-scrollbar mt-2 gap-3 rounded-md bg-[#292929] text-[#E1E1E1] outline-none py-2 max-h-[300px] overflow-auto">
          {SUPPORTED_NETWORK.filter((item) => item !== CorechainID).map(
            (item) => (
              <Menu.Item
                key={item}
                as="div"
                className="flex items-center px-3 py-2 cursor-pointer hover:bg-white/5 transition-all"
                onClick={() => switchNetwork(item)}
              >
                <Image
                  src={ChainInfo[item].icon}
                  width={20}
                  height={20}
                  alt={ChainInfo[item].config.name}
                  className="w-[20px] rounded-full"
                />
                <span className=" ml-2.5 text-sm font-medium">
                  {ChainInfo[item].config.name}
                </span>
              </Menu.Item>
            )
          )}
        </Menu.Items>
      </Transition>
    </Menu>
  );
};

export default NetworkSelector;
