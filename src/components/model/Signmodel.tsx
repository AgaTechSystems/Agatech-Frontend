import Popup from "reactjs-popup";
import React, { FC, ReactNode, useEffect } from "react";
import ScaleLoader from "react-spinners/ScaleLoader";
import { useState, Fragment } from "react";
import Modal from "react-modal";
import { Content, Overlay } from "./Helper/modeconfig";
import { SwapInfo } from "../../typeing";
import { useMediaQuery } from "react-responsive";
interface ModalProps {
  open: boolean;
  onClose: () => void;
  loading: boolean;
  Signin: () => void;
}

export const Signmodel: FC<ModalProps> = ({
  open,
  onClose,
  loading,
  Signin,
}) => {
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
      <div className=" mx-auto w-[90vw] rounded-lg px-5 pb-3 md:max-w-[400px]  py-3">
        <p className="text-white text-center">
          For using our photo generator, please sign in to your wallet to access
          our dapp.
        </p>
        <div className="py-4">
          <button
            disabled={loading}
            onClick={() => Signin()}
            className="sButton px-3 md:px-10  text-xs md:text-base  text-center  flex justify-center    rounded-xl w-full   cursor-pointer mx-auto md:mx-0 font-bold font-Aleo text-neutral-900"
          >
            {!loading && "Signin"}
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
