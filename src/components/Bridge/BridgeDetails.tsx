import { type ChainId, EIDS } from "@/constants";
import { AGA_BRIDGE_ADDR } from "@/constants/address";
import BridgeABI from "@/contracts/BridgeABI";
import type React from "react";
import { Address, formatEther, padHex, parseEther } from "viem";
import { useContractRead } from "wagmi";

interface BridgeDetailsProps {
	chainId0: ChainId;
	chainId1: ChainId;
	amount: string;
}

const BridgeDetails: React.FC<BridgeDetailsProps> = ({
	chainId0,
	chainId1,
	amount,
}) => {
	const { data: quoteData } = useContractRead({
		chainId: chainId0,
		abi: BridgeABI,
		address: AGA_BRIDGE_ADDR[chainId0],
		functionName: "quoteSend",
		args: [
			{
				amountLD: parseEther("1"),
				minAmountLD: parseEther("1"),
				dstEid: EIDS[chainId1],
				to: padHex("0x00000000219ab540356cbb839cbe05303d7705fa", {
					dir: "left",
				}),
				extraOptions: "0x0003010011010000000000000000000000000000ea60",
				composeMsg: "0x",
				oftCmd: "0x",
			},
			false,
		],
		watch: true,
	});

	return (
		<div className="w-full bg-[#1C1D1E] border border-[#292929] rounded-xl py-2 px-3">
			<div className="flex justify-between items-center">
				<span className="text-[#FDFDFD] text-sm font-semibold">
					You'll Receive
				</span>
				<span className="text-[#7E7E7F] text-sm font-semibold">
					{amount.length > 0
						? formatEther(
								(parseEther(amount) / 1000000000000n) * 1000000000000n,
							)
						: "-"}
				</span>
			</div>
			<div className="flex justify-between items-center mt-1">
				<span className="text-[#FDFDFD] text-sm font-semibold">
					Protocol Fee
				</span>
				<span className="text-[#7E7E7F] text-sm font-semibold">
					{quoteData?.nativeFee
						? Number(formatEther(quoteData.nativeFee)).toLocaleString("en-US", {
								maximumFractionDigits: 6,
							})
						: "-"}
				</span>
			</div>
		</div>
	);
};

export default BridgeDetails;
