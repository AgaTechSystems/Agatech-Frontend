// ChainSelector.tsx
import { Fragment, useEffect, useState } from "react";
import React from "react";

import { useSwitchNetwork, useNetwork } from "wagmi";
import {
  CheckIcon,
  ChevronUpDownIcon,
  ChevronUpIcon,
  ChevronDownIcon,
} from "@heroicons/react/20/solid";
import { Listbox, Transition } from "@headlessui/react";
import { MdLanguage } from "react-icons/md";

export const CHAIN_ID = [
  {
    id: 56,
    name: "Binance Smart Chain",
  },
];

const Togglechain: React.FC = () => {
  const { chains, error, isLoading, pendingChainId, switchNetwork } =
    useSwitchNetwork();
  const { chain } = useNetwork();

  const [selectedChain, setSelectedChain] = useState<any>({});

  useEffect(() => {
    if (chain?.id == 56) {
      setSelectedChain(chain);
    }else{
        setSelectedChain(CHAIN_ID[0]);
    }
  }, [chain]);

  return (
    <div className=" rounded-md ">
      <Listbox
        value={selectedChain}
        onChange={(e) => {
          switchNetwork?.(Number(e));
          // handleoptionchange(e);
        }}
      >
        {({ open }) => (
          <div className="relative mt-1 z-0 items-end  md:px-0 shadow-none  ">
            <Listbox.Button className=" w-fit  h-16 shadow-none justify-end  flex flex-row items-center  gap-2    z-1   py-2 px-5 text-left  focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white/75 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300 sm:text-sm">
              <div className="text-white w-full gap-2 justify-between text-base font-normal flex flex-row items-center  leading-[18px]  ">
              <img className="w-[30px]" src={`/swap/chain/${selectedChain.id}.png`} />
                <p>
                  {selectedChain.name
                    ? selectedChain.name
                    : "Connect wallet to view"}{" "}
                </p>
                <ChevronDownIcon
                  width={20}
                  className="text-lg text-white font-bold"
                />{" "}
              </div>
            </Listbox.Button>

            <Transition
              as={Fragment}
              leave="transition ease-in duration-100"
              leaveFrom="opacity-100"
              leaveTo="opacity-0 "
            >
              <Listbox.Options className=" text-white bg-[#332e2e] relative mt-3 w-full z-[100] rounded-md    py-1 text-base shadow-lg ring-1 ring-black/5 focus:outline-none sm:text-sm">
                {CHAIN_ID.length === 0 ? (
                  <div className="text-white bg-[#332e2e] mt-3 w-full p-2 rounded-md text-center">
                    Please connect with your wallet to show all chain!
                  </div>
                ) : (
                  <Listbox.Options className="text-white bg-[#332e2e] relative mt-3 w-full z-[100] rounded-md py-1 text-base shadow-lg ring-1 ring-black/5 focus:outline-none sm:text-sm">
                    {CHAIN_ID.map((x: any, data_typeIdx: any) => (
                      <Listbox.Option
                        key={data_typeIdx}
                        className={({ active }) =>
                          `relative cursor-default  select-none py-2 text-center text-sm font-ChakraPetch font-bold  ${
                            active
                              ? "bg-amber-100 text-amber-900"
                              : "text-gray-100"
                          }`
                        }
                        value={x.id}
                        disabled={!switchNetwork || x.id === chain?.id}
                      >
                        {({ selected }) => (
                          <>
                            <span
                              className={`block  ${
                                selected ? "font-medium" : "font-normal"
                              }`}
                            >
                              {x.name}
                            </span>
                          </>
                        )}
                      </Listbox.Option>
                    ))}
                  </Listbox.Options>
                )}
              </Listbox.Options>
            </Transition>
          </div>
        )}
      </Listbox>
    </div>
  );
};

export default Togglechain;
