import { useWeb3Modal } from "@web3modal/wagmi/react";
import { useAccount } from "wagmi";
export default function Customconnetbtn() {
  const { open, close } = useWeb3Modal();
  const { address, isConnecting, isDisconnected } = useAccount();

  const connetButton = () => {
    // open({ view: 'Account' })
    open();
  };
  return (
    <div className="flex justify-center items-center">
      <button
        onClick={connetButton}
        className=" px-4 py-[0px] h-[36px] font-Ruberoid bg_swap_btn  text-sm relative z-50 font-medium   text-white rounded-3xl  "
      >
        <span className="mt-[1px]">
          {address
            ? address?.slice(0, 5) + "..." + address?.slice(-5)
            : "Connect Wallet"}
        </span>
      </button>
    </div>
  );
}
