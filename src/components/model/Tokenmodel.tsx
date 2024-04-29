import Popup from "reactjs-popup";
import React, { FC, ReactNode, useEffect, useState } from "react";
import { CalculatorIcon, XMarkIcon } from "@heroicons/react/24/outline";
import { CopyToClipboard } from "react-copy-to-clipboard";
import ScaleLoader from "react-spinners/ScaleLoader";
import { TokenInfo } from "../Tokencreator/Tokengenarator";
import {
  Token_make_fees,
  Deploy_API,
  DeployAPI_TYPE,
} from "../../config/Tokencreator";

interface ModalProps {
  open: boolean;
  onClose: () => void;
  verifyNow: () => void;
  contract?: string;
  verifyload: boolean;
  chainid: any;
  token: TokenInfo;
}

export const Tokenmodel: FC<ModalProps> = ({
  open,
  onClose,
  contract,
  verifyNow,
  verifyload,
  chainid,
  token,
}) => {
  const [chainurl, setchainurl] = useState("");
  useEffect(() => {
    const handleBeforeUnload = (event: BeforeUnloadEvent) => {
      const message =
        "Are you sure you want to leave? Your verification may not be complete.";
      event.returnValue = message;
      return message;
    };

    // window.addEventListener("beforeunload", handleBeforeUnload);

    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, []);

  const addToken = async () => {
    const options = {
      address: contract,
      symbol: token.symbol,
      decimals: token.decimals,
      image: "",
    };
    const state: any = window.ethereum;
    if (state) {
      const wasAdded = await state.request({
        method: "wallet_watchAsset",
        params: {
          type: "ERC20",
          options: options,
        },
      });
    }
  };

  useEffect(() => {
    const { chainurl } = Deploy_API[chainid] || {};
    setchainurl(chainurl);
  }, [chainid]);

  return (
    <Popup
      open={open}
      modal
      closeOnDocumentClick={false}
      className="bg-transparent"
      onClose={onClose}
    >
      {/* header */}
      <div className="rounded-[19px] px-6 py-8  bg-inputbg w-[90vw] md:w-[500px] mx-auto font-Inter ">
        <div className="text-yellow-500 text-center">
          {" "}
          Your contract has been successfully deployed to address
          <div className="flex-1 flex flex-row justify-center py-3 items-center gap-2 text-yellow-500 text-base font-normal leading-normal custom-wrap cursor-pointer">
            <div className="text-zinc-100 text-center text-base font-bold leading-normal"></div>
            <div className="flex flex-row items-center gap-2">
              <a
                className="text-yellow-500 hover:opacity-50 text-base font-normal leading-normal custom-wrap cursor-pointer"
                href={`${chainurl}${contract}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                {contract?.slice(0, 8) + "..." + contract?.slice(-6)}
              </a>
              <CopyToClipboard text={contract || ""}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-6 h-6 text-yellow-500 cursor-pointer"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M8.25 7.5V6.108c0-1.135.845-2.098 1.976-2.192.373-.03.748-.057 1.123-.08M15.75 18H18a2.25 2.25 0 0 0 2.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 0 0-1.123-.08M15.75 18.75v-1.875a3.375 3.375 0 0 0-3.375-3.375h-1.5a1.125 1.125 0 0 1-1.125-1.125v-1.5A3.375 3.375 0 0 0 6.375 7.5H5.25m11.9-3.664A2.251 2.251 0 0 0 15 2.25h-1.5a2.251 2.251 0 0 0-2.15 1.586m5.8 0c.065.21.1.433.1.664v.75h-6V4.5c0-.231.035-.454.1-.664M6.75 7.5H4.875c-.621 0-1.125.504-1.125 1.125v12c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V16.5a9 9 0 0 0-9-9Z"
                  />
                </svg>
              </CopyToClipboard>
            </div>
            <button onClick={()=>addToken()} className="px-2 hover:opacity-50  bg-[#3c3a3a] py-2 font-bold  justify-center  gap-2.5 inline-flex rounded-lg ">
              {" "}
              <img className="w-[25px]" src="/Image/metamask.png" />{" "}
            </button>
          </div>
        </div>

        <div className=" text-center py-5 text-red-600 font-Syne ">
          If you haven't verified your address, closing this window may
          interrupt the process.
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          <button
            disabled={verifyload}
            onClick={verifyNow}
            className="sButton text-center px-5 justify-center font-bold hover:opacity-50 "
          >
            {!verifyload && " Verify now"}
            <ScaleLoader
              height={20}
              loading={verifyload}
              color="#ffffff"
              className="text-white"
              aria-label="Loading Spinner"
              data-testid="loader"
            />
          </button>
          <button
            onClick={onClose}
            className="px-5 py-5 font-bold  justify-center  gap-2.5 inline-flex rounded-lg bg-red-600 hover:opacity-50 "
          >
            Close
          </button>
        </div>
      </div>

      {/* header */}

      <div className=" flex flex-col gap-2 pt-3"></div>
    </Popup>
  );
};
