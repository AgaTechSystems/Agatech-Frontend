"use client";

import { ChainId } from "@/constants";
import Exchange from "../svgs/Exchange";
import { useState } from "react";
import BridgeFromSide from "./BridgeFromSide";
import BridgeToSide from "./BridgeToSide";
import BridgeDetails from "./BridgeDetails";
import BridgeConfirmButton from "./BridgeConfirmButton";
import { useAccount } from "wagmi";

const BridgeForm = () => {
  const { address } = useAccount();
  const [recipient, setRecipient] = useState<string | undefined>();
  const [chainId0, setChainId0] = useState(ChainId.BSC);
  const [chainId1, setChainId1] = useState(ChainId.ARBITRUM);
  const [amount, setAmount] = useState("");

  const setChain0 = (chain: ChainId) => {
    if (chain === chainId1) {
      setChainId1(chainId0);
    }
    setChainId0(chain);
  };

  const setChain1 = (chain: ChainId) => {
    if (chain === chainId0) {
      setChainId0(chainId1);
    }
    setChainId1(chain);
  };

  const switchChain = () => {
    const newChainId0 = chainId1;
    const newChainId1 = chainId0;
    setChain0(newChainId0);
    setChain1(newChainId1);
  };

  return (
    <div className="mx-auto max-w-[500px] bg-[#0C0B0F]/30 border border-[#1C1D1E] rounded-[20px]">
      <div className="text-2xl border-b border-[#1C1D1E] text-white font-bold py-3 px-4">
        Bridge
      </div>
      <div className="flex flex-col items-center space-y-3 px-4 pt-6 pb-4">
        <BridgeFromSide
          chainId={chainId0}
          setChainId={setChain0}
          amount={amount}
          setAmount={setAmount}
        />
        <button
          type="button"
          className="flex items-center justify-center bg-[#292929] w-12 h-12 rounded-xl text-[#FDFDFD]"
          onClick={switchChain}
        >
          <Exchange className="w-5 rotate-90" />
        </button>
        <BridgeToSide
          chainId={chainId1}
          setChainId={setChain1}
          recipient={recipient}
          setRecipient={setRecipient}
        />
        {recipient !== undefined ? (
          <div className="w-full">
            <h6 className="text-[#7E7E7F] text-sm font-bold">Recipient</h6>
            <input
              placeholder="0x...."
              value={recipient}
              onChange={(e) => setRecipient(e.target.value)}
              className="w-full outline-none bg-[#1C1D1E] border border-[#292929] rounded-xl py-2 px-3 text-lg font-semibold mt-2"
            />
          </div>
        ) : null}
        <BridgeDetails
          chainId0={chainId0}
          chainId1={chainId1}
          amount={amount}
        />
        <BridgeConfirmButton
          chainId0={chainId0}
          chainId1={chainId1}
          amount={amount}
          recipient={recipient ?? address}
        />
      </div>
    </div>
  );
};

export default BridgeForm;
