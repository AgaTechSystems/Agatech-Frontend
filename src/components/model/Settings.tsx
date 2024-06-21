import Popup from "reactjs-popup";
import React, { FC, ReactNode, useEffect } from "react";
import { CalculatorIcon, XMarkIcon } from "@heroicons/react/24/outline";
import { CopyToClipboard } from "react-copy-to-clipboard";
import { useState, Fragment } from "react";
import { RadioGroup } from "@headlessui/react";
import { CheckIcon } from "@heroicons/react/20/solid";
import Modal from "react-modal";
import { Content, Overlay } from "./Helper/modeconfig";
import { SwapInfo } from "../../../typeing";
import { useMediaQuery } from "react-responsive";
interface ModalProps {
  open: boolean;
  onClose: () => void;
  SwapInfo: SwapInfo;
  onChange: (txTime: string, allowedSlippage: string) => void;
  allowedSlippage: string;
}
const Slippage = ["0.1", "0.5"];

export const Settings: FC<ModalProps> = ({
  open,
  onClose,
  SwapInfo,
  onChange,
  allowedSlippage,
}) => {
  const [slippage, setslippage] = useState(Slippage[2]);
  const [data, setdata] = useState<any>(Slippage);
  const isSmallScreen = useMediaQuery({ maxWidth: 360 });
  const isExtraSmallScreen = useMediaQuery({ maxWidth: 300 });

  useEffect(() => {
    if (isExtraSmallScreen) {
      setdata(["0.5", "5"]);
    } else if (isSmallScreen) {
      setdata(["0.1", "5"]);
    } else {
      setdata(Slippage);
    }
  }, [isSmallScreen, isExtraSmallScreen]);

  const Handlechange = (e: any) => {
    const { name, value } = e.target;
    if (name == "deadline") {
      if (
        (!isNaN(parseFloat(value)) && isFinite(value)) ||
        [0, "", null].includes(value)
      ) {
        onChange(value, SwapInfo.allowedSlippage);
      }
    } else if (name == "slippage") {
      if (
        (!isNaN(parseFloat(value)) && isFinite(value)) ||
        [0, "", null].includes(value)
      ) {
        onChange(SwapInfo.txTime, value);
      }
    } else {
    }
  };

  useEffect(() => {
    if(slippage !=undefined)
    onChange(SwapInfo.txTime, slippage);
  }, [slippage]);

  return (
    <Modal
      isOpen={open}
      className="bg-transparent transition-all "
      onRequestClose={() => onClose()}
      style={{
        overlay: Overlay,
        content: Content,
      }}
    >
      <div className=" mx-auto w-[90vw] rounded-lg px-5 pb-5 md:max-w-[400px] ">
        <div className="flex flex-row  justify-between rounded-t-[19px] px-4 py-4 ">
          <div className="text-lg text-white font-semibold">Settings</div>

          <div className="relative  h-fit">
            <XMarkIcon
              onClick={(e) => {
                e.stopPropagation();
                onClose();
              }}
              className="text-white hover:text-gray-500 font-semibold  cursor-pointer relative"
              width={22}
              height={22}
            />
          </div>
        </div>

        <div className="bg-[#0000005c] px-3 rounded-lg items-center py-3">
          <div className="flex justify-between items-center pb-2">
            <div className="flex flex-col gap-2 text-white">Slippage </div>
            <span className="text-slate-400 text-sm font-semibold">
              {allowedSlippage}%
            </span>
          </div>
          <div className="border-[#ffffff17] border-2 rounded-[10px] p-[2px] flex flex-row min-h-[40px] gap-1 ">
            <RadioGroup
              value={slippage}
              onChange={setslippage}
              className="flex flex-row gap-3 py-0 "
            >
              {data.map((e: any) => (
                <RadioGroup.Option key={e} value={e} as={Fragment}>
                  {({ active, checked }) => (
                    <button
                      className={` ${
                        active
                          ? " bg-white text-black"
                          : "bg-[#fff2] text-white"
                      } inline-flex rounded-[10px] gap-2 h-[40px] items-center justify-center text-sm font-medium  bg-transparent px-2.5`}
                    >
                      {e}%
                    </button>
                  )}
                </RadioGroup.Option>
              ))}
            </RadioGroup>

            <div className=" relative flex items-center justify-between w-full bg-[#171717] rounded-[10px] ">
              <input
                onChange={Handlechange}
                name="slippage"
                value={SwapInfo ? SwapInfo.allowedSlippage : 20}
                placeholder="Custom"
                className="w-full bg-transparent flex-1 truncate appearance-none text-slate-50 outline-none  py-2 border-0 flex items-center px-3 rounded-lg font-medium bg-secondary group-hover:bg-muted group-focus:bg-accent rounded-r-none !border-r-0 flex-grow "
              />
              <div className=" appearance-none text-slate-50   outline-none  py-2 border-0 flex items-center px-3 rounded-lg font-medium  bg-secondary group-hover:bg-muted group-focus:bg-accent text-muted-foreground rounded-l-none ">
                %
              </div>
            </div>
          </div>
{/* 
          <div className="space-y-2 pt-2">
            <div className="flex flex-col gap-2 text-white">
              Tx deadline (mins){" "}
            </div>
            <div className=" relative flex items-center justify-between w-full bg-[#171717] rounded-[10px] ">
              <input
                onChange={Handlechange}
                name="deadline"
                value={SwapInfo ? SwapInfo.txTime : 20}
                placeholder="add"
                className="w-full bg-transparent flex-1 truncate appearance-none text-slate-50 outline-none  py-2 border-0 flex items-center px-3 rounded-lg font-medium bg-secondary group-hover:bg-muted group-focus:bg-accent rounded-r-none !border-r-0 flex-grow "
              />
            </div>
          </div> */}
        </div>
      </div>
    </Modal>
  );
};
