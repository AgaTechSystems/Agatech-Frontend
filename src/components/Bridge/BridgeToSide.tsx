import type { ChainId } from "@/constants";
import NetworkSelector from "./NetworkSelector";
import { useAccount, useBalance } from "wagmi";
import { AGA_TOKEN_ADDR } from "@/constants/address";

interface BridgeToSideProps {
  recipient: string | undefined;
  setRecipient: any;
  chainId: ChainId;
  setChainId: any;
}

const BridgeToSide: React.FC<BridgeToSideProps> = ({
  chainId,
  recipient,
  setChainId,
  setRecipient,
}) => {
  const { address } = useAccount();
  const { data: balance } = useBalance({
    address,
    chainId,
    token: AGA_TOKEN_ADDR[chainId],
    query: {
      refetchInterval: 5000,
    },
  });

  const onRecipientAddress = () => {
    setRecipient(recipient === undefined ? "" : undefined);
  };

  return (
    <div className="w-full z-[1]">
      <div className="flex justify-between items-center">
        <h6 className="text-[#7E7E7F] text-sm font-bold">Transfer to</h6>
        <button
          type="button"
          className="text-sm text-[#E1E1E1] font-bold"
          onClick={onRecipientAddress}
        >
          {recipient === undefined ? "+" : "-"} Recipient address
        </button>
      </div>
      <div className="bg-[#1C1D1E] rounded-2xl mt-2">
        <div className="flex flex-col sm:flex-row justify-between items-center px-3.5 py-2.5">
          <NetworkSelector chain={chainId} setChain={setChainId} />
          <div className="flex flex-row sm:flex-col items-end w-full sm:w-fit justify-between mt-2 sm:mt-0">
            <span className="text-[#8B8991] font-bold">Balance</span>
            <span className="text-[#BCBCBC] text-sm font-bold">
              {Number(balance?.formatted ?? 0).toLocaleString("en-US", {
                maximumFractionDigits: 2,
              })}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BridgeToSide;
