import Popup from "reactjs-popup";
import React, { FC, ReactNode, useEffect } from "react";
import {
  CalculatorIcon,
  XMarkIcon,
  CheckBadgeIcon,
  CheckIcon,
} from "@heroicons/react/24/outline";
import ScaleLoader from "react-spinners/ScaleLoader";

import { CopyToClipboard } from "react-copy-to-clipboard";
import { useState, Fragment } from "react";
import Modal from "react-modal";
import { Content, Overlay } from "./Helper/modeconfig";
import { SwapInfo } from "../../typeing";
import { useMediaQuery } from "react-responsive";
interface ModalProps {
  open: boolean;
  onClose: () => void;
  mintnft: () => void;
  uploadmetadata: () => void;
  stepindex: number;
  loading: boolean;
  onInfoChange: (filedname: string, value: string) => void;
}
const steps = [
  "Upload metadata",
  "Mint NFT",
  // Add more steps if needed
];

export const Mintnft: FC<ModalProps> = ({
  open,
  onClose,
  stepindex,
  loading,
  mintnft,
  uploadmetadata,
  onInfoChange,
}) => {
  const handlesubmit = () => {
    if (stepindex == 1) {
      console.log("call mints");
      mintnft();
    } else {
      uploadmetadata();
    }
  };

  const handleInputChange = (e: any) => {
    const { name, value } = e.target;
    onInfoChange(name, value);
  };

  

  const _input_style =
    "w-full bg-transparent  focus:ring-[#333333] focus:border-[#333333] force:outline-none border-[#333333]  border flex-1 truncate appearance-none text-slate-50 outline-none  py-2  flex items-center px-3 rounded-lg font-medium  group-hover:bg-muted group-focus:bg-accent flex-grow ";
  return (
    <Modal
      isOpen={open}
      className="bg-transparent transition-all "
      onRequestClose={() => onClose()}
      // shouldCloseOnOverlayClick={false}
      style={{
        overlay: Overlay,
        content: Content,
      }}
    >
      <div className=" mx-auto w-[90vw] rounded-lg px-5 pb-5 md:max-w-[400px]  py-3">
        <div className="text-center text-white opacity-70">
          To mint an NFT, follow these steps:
        </div>

        <ol className="grid grid-cols-2 border border-[#333333] my-3  items-center mx-auto w-full p-3 space-x-2 text-sm font-medium text-center text-gray-500 bg-transparent rounded-lg shadow-sm dark:text-gray-400 sm:text-base dark:bg-gray-800 dark:border-gray-700 sm:p-4 sm:space-x-4 rtl:space-x-reverse">
          {steps.map((step, index) => (
            <li key={index} className="flex items-center gap-1">
              {index + 1 == stepindex ? (
                <CheckBadgeIcon className="h-6 w-6 text-green-400" />
              ) : (
                <span className="flex items-center  justify-center w-5 h-5 me-2 text-xs border border-gray-500 rounded-full shrink-0 dark:border-gray-400">
                  {index + 1}
                </span>
              )}
              <span
                className={`${index + 1 == stepindex ? "text-green-400" : ""}`}
              >
                {step}
              </span>
              {index < steps.length - 1 && (
                <svg
                  className="w-3 h-3 ms-2 sm:ms-4 rtl:rotate-180"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 12 10"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="m7 9 4-4-4-4M1 9l4-4-4-4"
                  />
                </svg>
              )}
            </li>
          ))}
        </ol>

        <div className="space-y-3">
          <div className="space-y-1">
            <label className="text-slate-50">name</label>
            <input
              name="name"
              placeholder="name"
              className={_input_style}
              onChange={(e) => handleInputChange(e)}
              disabled={stepindex == 1}
            />
          </div>

          <div className="space-y-1">
            <label className="text-slate-50">description</label>
            <textarea
              name="description"
              placeholder="description"
              className={_input_style}
              onChange={(e) => handleInputChange(e)}
              disabled={stepindex == 1}
            />
          </div>
        </div>
        <div className=" py-3">
          <button
            onClick={() => handlesubmit()}
            disabled={loading}
            className="sButton px-3 md:px-10  text-xs md:text-base  text-center  flex justify-center    rounded-xl w-full   cursor-pointer mx-auto md:mx-0 font-bold font-Aleo text-neutral-900"
          >
            {!loading ? (stepindex == 1 ? "Mint" : "Upload") : ""}

            <ScaleLoader
              height={20}
              loading={loading}
              color="#ffffff"
              className="text-white"
              aria-label="Loading Spinner"
              data-testid="loader"
            />
          </button>
        </div>
      </div>
    </Modal>
  );
};
